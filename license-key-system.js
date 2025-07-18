// License Key Generation System for ReviPromptLab
// Can be deployed as Vercel Function, Netlify Function, or AWS Lambda

// Generate cryptographically secure license keys
function generateLicenseKey(productTier, userEmail, purchaseDate) {
    const crypto = require('crypto');
    
    // Product prefixes
    const prefixes = {
        'foundation': 'RPL-F',
        'professional': 'RPL-P', 
        'enterprise': 'RPL-E'
    };
    
    // Create unique identifier
    const identifier = crypto
        .createHash('sha256')
        .update(userEmail + purchaseDate + productTier)
        .digest('hex')
        .substring(0, 8)
        .toUpperCase();
    
    // Generate random suffix
    const suffix = crypto.randomBytes(4).toString('hex').toUpperCase();
    
    const licenseKey = `${prefixes[productTier]}-${identifier}-${suffix}`;
    
    return licenseKey;
}

// Validate license key structure
function validateLicenseKey(licenseKey) {
    const pattern = /^RPL-[FPE]-[A-F0-9]{8}-[A-F0-9]{8}$/;
    return pattern.test(licenseKey);
}

// Store license in database (example with PostgreSQL)
async function storeLicense(licenseData) {
    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    
    const query = `
        INSERT INTO licenses (
            license_key,
            user_email,
            product_tier,
            purchase_date,
            stripe_payment_id,
            status,
            usage_count,
            max_usage
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
    `;
    
    const values = [
        licenseData.licenseKey,
        licenseData.userEmail,
        licenseData.productTier,
        licenseData.purchaseDate,
        licenseData.stripePaymentId,
        'active',
        0,
        licenseData.productTier === 'enterprise' ? 10 : 1
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0].id;
}

// Webhook handler for Stripe payment completion
async function handleStripeWebhook(req, res) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    
    try {
        const sig = req.headers['stripe-signature'];
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log('Webhook signature verification failed:', err.message);
        return res.status(400).send('Webhook signature verification failed');
    }
    
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        // Extract product tier from price_id or metadata
        const productTier = getProductTierFromSession(session);
        const userEmail = session.customer_details.email;
        const purchaseDate = new Date().toISOString();
        
        // Generate license key
        const licenseKey = generateLicenseKey(productTier, userEmail, purchaseDate);
        
        // Store in database
        await storeLicense({
            licenseKey,
            userEmail,
            productTier,
            purchaseDate,
            stripePaymentId: session.payment_intent
        });
        
        // Send license key via email
        await sendLicenseEmail(userEmail, licenseKey, productTier);
        
        // Grant access to customer portal
        await grantPortalAccess(userEmail, productTier, licenseKey);
        
        console.log('License generated and sent:', licenseKey);
    }
    
    res.json({ received: true });
}

// Determine product tier from Stripe session
function getProductTierFromSession(session) {
    const priceIdMap = {
        'price_foundation_39': 'foundation',
        'price_professional_149': 'professional',
        'price_enterprise_299': 'enterprise'
    };
    
    // Check line items for price_id
    if (session.line_items && session.line_items.data[0]) {
        const priceId = session.line_items.data[0].price.id;
        return priceIdMap[priceId] || 'foundation';
    }
    
    // Fallback to metadata
    return session.metadata.product_tier || 'foundation';
}

// Send license key via email
async function sendLicenseEmail(userEmail, licenseKey, productTier) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const templates = {
        foundation: {
            subject: 'Your ReviPrompt Lab Foundation Pack License Key',
            html: generateFoundationEmailHTML(licenseKey)
        },
        professional: {
            subject: 'Your ReviPrompt Lab Professional Pack License Key + Video Access',
            html: generateProfessionalEmailHTML(licenseKey)
        },
        enterprise: {
            subject: 'Your ReviPrompt Lab Enterprise Pack License Keys (10 Users)',
            html: generateEnterpriseEmailHTML(licenseKey)
        }
    };
    
    const msg = {
        to: userEmail,
        from: 'support@revipromptlab.com',
        subject: templates[productTier].subject,
        html: templates[productTier].html
    };
    
    await sgMail.send(msg);
}

// Grant customer portal access
async function grantPortalAccess(userEmail, productTier, licenseKey) {
    // Update customer portal database
    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    
    const query = `
        INSERT INTO customer_portal_access (
            email,
            product_tier,
            license_key,
            download_links,
            video_access,
            expires_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (email) DO UPDATE SET
            product_tier = EXCLUDED.product_tier,
            license_key = EXCLUDED.license_key,
            download_links = EXCLUDED.download_links,
            video_access = EXCLUDED.video_access,
            expires_at = EXCLUDED.expires_at
    `;
    
    const downloadLinks = getDownloadLinks(productTier);
    const videoAccess = productTier !== 'foundation';
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
    
    await pool.query(query, [
        userEmail,
        productTier,
        licenseKey,
        JSON.stringify(downloadLinks),
        videoAccess,
        expiresAt
    ]);
}

// Get download links for product tier
function getDownloadLinks(productTier) {
    const baseLinks = {
        foundation: [
            'https://secure.revipromptlab.com/downloads/foundation-pack.zip',
            'https://secure.revipromptlab.com/downloads/dynamo-graphs-foundation.zip'
        ],
        professional: [
            'https://secure.revipromptlab.com/downloads/professional-pack.zip',
            'https://secure.revipromptlab.com/downloads/dynamo-graphs-professional.zip',
            'https://secure.revipromptlab.com/downloads/video-tutorials.zip'
        ],
        enterprise: [
            'https://secure.revipromptlab.com/downloads/enterprise-pack.zip',
            'https://secure.revipromptlab.com/downloads/dynamo-graphs-enterprise.zip',
            'https://secure.revipromptlab.com/downloads/video-tutorials.zip',
            'https://secure.revipromptlab.com/downloads/mep-structural-prompts.zip'
        ]
    };
    
    return baseLinks[productTier] || baseLinks.foundation;
}

// Email templates
function generateFoundationEmailHTML(licenseKey) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .license-key { background: #f0f8ff; padding: 15px; border-radius: 5px; font-size: 18px; font-weight: bold; text-align: center; }
                .download-btn { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>🎉 Welcome to ReviPrompt Lab Foundation Pack!</h2>
                <p>Your license key is ready:</p>
                <div class="license-key">${licenseKey}</div>
                <p>Click below to access your downloads:</p>
                <a href="https://portal.revipromptlab.com/login" class="download-btn">Access Customer Portal</a>
                <h3>What's Included:</h3>
                <ul>
                    <li>25 Essential AI Prompts</li>
                    <li>25 Dynamo Graph Backups</li>
                    <li>Quick Start Guide</li>
                    <li>6 Months of Updates</li>
                </ul>
                <p>Questions? Reply to this email or visit our support center.</p>
            </div>
        </body>
        </html>
    `;
}

function generateProfessionalEmailHTML(licenseKey) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .license-key { background: #f0f8ff; padding: 15px; border-radius: 5px; font-size: 18px; font-weight: bold; text-align: center; }
                .download-btn { background: #6f42c1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>🚀 Welcome to ReviPrompt Lab Professional Pack!</h2>
                <p>Your license key is ready:</p>
                <div class="license-key">${licenseKey}</div>
                <p>Click below to access your downloads and video tutorials:</p>
                <a href="https://portal.revipromptlab.com/login" class="download-btn">Access Customer Portal</a>
                <h3>What's Included:</h3>
                <ul>
                    <li>75 Total AI Prompts</li>
                    <li>75 Dynamo Graph Backups</li>
                    <li>10 Video Tutorials</li>
                    <li>Priority Support</li>
                    <li>1 Year of Updates</li>
                </ul>
                <p>🎬 Your video tutorials are now available in the customer portal!</p>
            </div>
        </body>
        </html>
    `;
}

function generateEnterpriseEmailHTML(licenseKey) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .license-key { background: #f0f8ff; padding: 15px; border-radius: 5px; font-size: 18px; font-weight: bold; text-align: center; }
                .download-btn { background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>🏢 Welcome to ReviPrompt Lab Enterprise Pack!</h2>
                <p>Your master license key is ready:</p>
                <div class="license-key">${licenseKey}</div>
                <p>This license covers up to 10 users in your organization.</p>
                <a href="https://portal.revipromptlab.com/login" class="download-btn">Access Enterprise Portal</a>
                <h3>What's Included:</h3>
                <ul>
                    <li>150+ Complete AI Prompt Library</li>
                    <li>MEP & Structural Specializations</li>
                    <li>10 User License</li>
                    <li>All Video Tutorials</li>
                    <li>Custom Development Options</li>
                    <li>Priority Support</li>
                </ul>
                <p>🎯 Want custom prompts for your specific workflows? Reply to schedule a consultation.</p>
            </div>
        </body>
        </html>
    `;
}

// Database schema for PostgreSQL
const DATABASE_SCHEMA = `
CREATE TABLE IF NOT EXISTS licenses (
    id SERIAL PRIMARY KEY,
    license_key VARCHAR(30) UNIQUE NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    product_tier VARCHAR(20) NOT NULL,
    purchase_date TIMESTAMP NOT NULL,
    stripe_payment_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    usage_count INTEGER DEFAULT 0,
    max_usage INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customer_portal_access (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    product_tier VARCHAR(20) NOT NULL,
    license_key VARCHAR(30) NOT NULL,
    download_links JSON,
    video_access BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_licenses_key ON licenses(license_key);
CREATE INDEX idx_portal_email ON customer_portal_access(email);
`;

module.exports = {
    generateLicenseKey,
    validateLicenseKey,
    handleStripeWebhook,
    storeLicense,
    grantPortalAccess,
    DATABASE_SCHEMA
};