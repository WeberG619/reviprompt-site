// Stripe Webhook Handler for Automated Product Delivery
// Deploy this as a Cloudflare Worker or Vercel Edge Function

import crypto from 'crypto';

// Environment variables needed:
// STRIPE_WEBHOOK_SECRET - From Stripe Dashboard
// CLOUDFLARE_R2_ACCESS_KEY_ID - From Cloudflare R2
// CLOUDFLARE_R2_SECRET_ACCESS_KEY - From Cloudflare R2
// CLOUDFLARE_ACCOUNT_ID - Your Cloudflare account ID
// R2_BUCKET_NAME - Your R2 bucket name
// SENDGRID_API_KEY or RESEND_API_KEY - For sending emails

// Product mapping
const PRODUCTS = {
  'prod_sheet_setup_starter': {
    name: 'Sheet Setup Starter',
    files: ['sheet-setup-starter-v1.0.zip'],
    price: 29
  },
  'prod_mep_power_tools': {
    name: 'MEP Power Tools',
    files: ['mep-power-tools-v1.0.zip'],
    price: 39
  },
  'prod_qc_professional': {
    name: 'QC Professional Suite', 
    files: ['qc-professional-suite-v1.0.zip'],
    price: 39
  },
  'prod_mini_pack_bundle': {
    name: 'Mini-Packs Bundle',
    files: [
      'sheet-setup-starter-v1.0.zip',
      'mep-power-tools-v1.0.zip',
      'qc-professional-suite-v1.0.zip'
    ],
    price: 89
  },
  'prod_foundation_pack': {
    name: 'Foundation Pack',
    files: ['foundation-pack-v1.0.zip'],
    price: 39
  },
  'prod_professional_pack': {
    name: 'Professional Pack',
    files: ['professional-pack-v1.0.zip'],
    price: 149
  }
};

export async function handleStripeWebhook(request) {
  // Verify webhook signature
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Get customer email and purchased products
    const customerEmail = session.customer_email;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    
    // Generate secure download links for each product
    const downloadLinks = [];
    
    for (const item of lineItems.data) {
      const productId = item.price.product;
      const product = PRODUCTS[productId];
      
      if (product) {
        // Generate time-limited signed URLs (7 days)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        
        for (const file of product.files) {
          const signedUrl = await generateR2SignedUrl(file, expiresAt);
          downloadLinks.push({
            name: product.name,
            file: file,
            url: signedUrl,
            expiresAt: expiresAt.toISOString()
          });
        }
      }
    }
    
    // Store order in database (optional - for customer portal)
    await storeOrder({
      orderId: session.id,
      customerEmail: customerEmail,
      products: downloadLinks,
      createdAt: new Date().toISOString()
    });
    
    // Send email with download links
    await sendDownloadEmail(customerEmail, downloadLinks, session.id);
  }

  return new Response('Webhook processed', { status: 200 });
}

// Generate signed URL for R2
async function generateR2SignedUrl(fileName, expiresAt) {
  // Implementation depends on your R2 setup
  // This creates a time-limited signed URL
  const baseUrl = `https://${process.env.R2_BUCKET_NAME}.r2.cloudflarestorage.com`;
  
  // Use AWS SDK v3 for R2 (compatible)
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: `products/${fileName}`,
  });
  
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: Math.floor((expiresAt - new Date()) / 1000),
  });
  
  return signedUrl;
}

// Send email with download links
async function sendDownloadEmail(email, downloadLinks, orderId) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #323130; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0078d4; color: white; padding: 30px; text-align: center; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #edebe9; }
        .download-box { background: #f3f9ff; border: 1px solid #0078d4; padding: 20px; margin: 20px 0; }
        .button { background: #0078d4; color: white; padding: 12px 24px; text-decoration: none; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your ReviPrompt Lab Downloads Are Ready!</h1>
        </div>
        <div class="content">
          <p>Thank you for your purchase! Your professional Revit automation tools are ready to download.</p>
          
          <p><strong>Order ID:</strong> ${orderId}</p>
          
          ${downloadLinks.map(link => `
            <div class="download-box">
              <h3>${link.name}</h3>
              <p>File: ${link.file}</p>
              <a href="${link.url}" class="button">Download Now</a>
              <p style="font-size: 12px; color: #605e5c;">
                Download expires: ${new Date(link.expiresAt).toLocaleDateString()}
              </p>
            </div>
          `).join('')}
          
          <h3>Installation Instructions:</h3>
          <ol>
            <li>Download all files to your computer</li>
            <li>Extract the ZIP files to a folder</li>
            <li>Run the installer as Administrator</li>
            <li>Follow the setup wizard</li>
            <li>Find your new tools in Revit's Add-ins tab</li>
          </ol>
          
          <p>Need help? Contact us at support@revipromptlab.com</p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #605e5c;">
            These download links will expire in 7 days. Please download your files promptly.
            You can always access your downloads again at https://revipromptlab.com/download
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send via SendGrid or Resend
  if (process.env.SENDGRID_API_KEY) {
    // SendGrid implementation
    await sendgrid.send({
      to: email,
      from: 'hello@revipromptlab.com',
      subject: 'Your ReviPrompt Lab Downloads Are Ready!',
      html: emailHtml
    });
  } else if (process.env.RESEND_API_KEY) {
    // Resend implementation (recommended - easier setup)
    await resend.emails.send({
      from: 'ReviPrompt Lab <hello@revipromptlab.com>',
      to: email,
      subject: 'Your ReviPrompt Lab Downloads Are Ready!',
      html: emailHtml
    });
  }
}

// Optional: Store order for customer portal access
async function storeOrder(orderData) {
  // Store in Cloudflare KV or D1 database
  // This allows customers to retrieve downloads later
  await ORDERS_KV.put(
    `order:${orderData.orderId}`,
    JSON.stringify(orderData),
    { expirationTtl: 30 * 24 * 60 * 60 } // 30 days
  );
  
  // Also index by email for easy lookup
  await ORDERS_KV.put(
    `email:${orderData.customerEmail}:${orderData.orderId}`,
    orderData.orderId,
    { expirationTtl: 30 * 24 * 60 * 60 }
  );
}