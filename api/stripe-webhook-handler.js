/**
 * Stripe Webhook Handler for ReviPrompt Lab
 * 
 * This handles Stripe payment completion events and triggers
 * the download link generation and email sending process.
 */

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const DownloadLinkGenerator = require('./generate-download-link');

const app = express();
const generator = new DownloadLinkGenerator();

// Middleware to verify Stripe signatures
const verifyStripeSignature = (req, res, next) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        req.stripeEvent = event;
        next();
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

// Stripe webhook endpoint
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), verifyStripeSignature, async (req, res) => {
    const event = req.stripeEvent;
    
    console.log(`Received Stripe event: ${event.type}`);

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutCompleted(event);
                break;
            
            case 'payment_intent.succeeded':
                console.log('Payment succeeded:', event.data.object.id);
                break;
            
            case 'payment_intent.payment_failed':
                console.log('Payment failed:', event.data.object.id);
                break;
            
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Handle successful checkout completion
 * @param {Object} event - Stripe checkout.session.completed event
 */
async function handleCheckoutCompleted(event) {
    const session = event.data.object;
    
    console.log('Processing checkout completion for session:', session.id);
    
    // Extract customer and order information
    const orderData = {
        orderId: session.id,
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
        amount: (session.amount_total / 100).toFixed(2),
        currency: session.currency.toUpperCase(),
        purchaseDate: new Date().toLocaleDateString(),
        products: extractProductsFromSession(session),
        stripeSessionId: session.id
    };

    // Validate required data
    if (!orderData.customerEmail) {
        console.error('No customer email found in session');
        return;
    }

    // Generate secure download link
    const downloadLink = generator.generateDownloadLink(orderData);
    
    // Send confirmation email with download link
    await sendConfirmationEmail(orderData, downloadLink);
    
    // Log successful processing
    console.log(`Successfully processed order ${orderData.orderId} for ${orderData.customerEmail}`);
}

/**
 * Extract purchased products from Stripe session
 * @param {Object} session - Stripe checkout session
 * @returns {Array} - Array of product IDs
 */
function extractProductsFromSession(session) {
    // In production, you'd retrieve line items from the session
    // For now, map based on amount or session metadata
    
    const amount = session.amount_total / 100;
    
    // Map amounts to products (you'll need to adjust based on your actual Stripe setup)
    const productMapping = {
        29: ['sheet-setup-starter'],
        39: ['mep-power-tools'], // Could also be qc-professional or foundation
        89: ['sheet-setup-starter', 'mep-power-tools', 'qc-professional-suite'], // Mini bundle
        149: ['professional-pack'],
        299: ['enterprise-pack']
    };

    // Check session metadata for specific product info
    if (session.metadata && session.metadata.products) {
        return session.metadata.products.split(',');
    }

    // Fallback to amount mapping
    return productMapping[amount] || ['foundation-pack'];
}

/**
 * Send confirmation email using your preferred email service
 * @param {Object} orderData - Order information
 * @param {string} downloadLink - Secure download URL
 */
async function sendConfirmationEmail(orderData, downloadLink) {
    console.log('Sending confirmation email to:', orderData.customerEmail);
    
    // In production, integrate with your email service (SendGrid, AWS SES, etc.)
    // For now, we'll log the email content
    
    const emailContent = {
        to: orderData.customerEmail,
        subject: 'Your ReviPrompt Lab Download is Ready!',
        template: 'purchase-confirmation',
        variables: {
            CUSTOMER_NAME: orderData.customerName || 'Valued Customer',
            CUSTOMER_EMAIL: orderData.customerEmail,
            ORDER_ID: orderData.orderId,
            PURCHASE_DATE: orderData.purchaseDate,
            PRODUCT_NAMES: generator.getProductNames(orderData.products).join(', '),
            TOTAL_AMOUNT: `$${orderData.amount}`,
            DOWNLOAD_LINK: downloadLink
        }
    };

    console.log('Email content to send:', emailContent);
    
    // TODO: Implement actual email sending
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
        to: emailContent.to,
        from: 'noreply@revipromptlab.com',
        subject: emailContent.subject,
        html: populateTemplate(emailContent.template, emailContent.variables)
    });
    */
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'ReviPrompt Lab Webhook Handler' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});

module.exports = app;