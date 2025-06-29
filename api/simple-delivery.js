// Simpler Alternative: GitHub Private Releases + Stripe
// This version uses GitHub for file storage (easier but less scalable)

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'WeberG619';
const GITHUB_REPO = 'reviprompt-products'; // Private repo for products

// Product to GitHub Release mapping
const PRODUCT_RELEASES = {
  'prod_sheet_setup_starter': {
    name: 'Sheet Setup Starter',
    releaseTag: 'sheet-setup-v1.0',
    assetName: 'sheet-setup-starter.zip'
  },
  'prod_mep_power_tools': {
    name: 'MEP Power Tools',
    releaseTag: 'mep-tools-v1.0',
    assetName: 'mep-power-tools.zip'
  },
  'prod_qc_professional': {
    name: 'QC Professional Suite',
    releaseTag: 'qc-suite-v1.0',
    assetName: 'qc-professional-suite.zip'
  },
  'prod_mini_pack_bundle': {
    name: 'Mini-Packs Bundle',
    releaseTag: 'bundle-v1.0',
    assetName: 'mini-packs-bundle.zip'
  },
  'prod_foundation_pack': {
    name: 'Foundation Pack',
    releaseTag: 'foundation-v1.0',
    assetName: 'foundation-pack.zip'
  },
  'prod_professional_pack': {
    name: 'Professional Pack',
    releaseTag: 'professional-v1.0',
    assetName: 'professional-pack.zip'
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify Stripe webhook
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_email;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    
    // Generate temporary download tokens
    const downloadLinks = [];
    
    for (const item of lineItems.data) {
      const productId = item.price.product;
      const product = PRODUCT_RELEASES[productId];
      
      if (product) {
        // Create temporary access token (expires in 7 days)
        const downloadToken = await createDownloadToken({
          email: customerEmail,
          productId: productId,
          orderId: session.id,
          expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
        });
        
        downloadLinks.push({
          name: product.name,
          downloadUrl: `https://revipromptlab.com/api/download?token=${downloadToken}`,
          expiresAt: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
        });
      }
    }
    
    // Send email
    await sendEmail(customerEmail, downloadLinks, session.id);
    
    return res.json({ success: true });
  }

  res.json({ received: true });
}

// Create secure download token
async function createDownloadToken(data) {
  const token = crypto.randomBytes(32).toString('hex');
  
  // Store in your database or KV store
  await storeToken(token, data);
  
  return token;
}

// Download endpoint
export async function handleDownload(req, res) {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }
  
  // Verify token
  const tokenData = await getToken(token);
  
  if (!tokenData || tokenData.expiresAt < Date.now()) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
  
  // Get product info
  const product = PRODUCT_RELEASES[tokenData.productId];
  
  // Get download URL from GitHub
  const releaseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tags/${product.releaseTag}`;
  
  const response = await fetch(releaseUrl, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  const release = await response.json();
  const asset = release.assets.find(a => a.name === product.assetName);
  
  if (!asset) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // Redirect to GitHub's download URL
  res.redirect(asset.browser_download_url);
}

// Simple email template
async function sendEmail(email, downloadLinks, orderId) {
  const html = `
    <h2>Your ReviPrompt Lab Downloads</h2>
    <p>Thank you for your purchase! Order ID: ${orderId}</p>
    
    <h3>Your Products:</h3>
    ${downloadLinks.map(link => `
      <div style="margin: 20px 0; padding: 20px; background: #f0f0f0;">
        <h4>${link.name}</h4>
        <a href="${link.downloadUrl}" style="background: #0078d4; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">
          Download Now
        </a>
        <p style="font-size: 12px; color: #666;">
          Link expires: ${link.expiresAt.toLocaleDateString()}
        </p>
      </div>
    `).join('')}
    
    <p>Need help? Contact support@revipromptlab.com</p>
  `;
  
  // Use your preferred email service
  await sendEmailWithResend(email, html);
}