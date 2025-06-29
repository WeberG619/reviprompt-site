# ReviPrompt Lab Product Delivery System Setup

This document explains how to set up the complete product delivery system for automatic customer downloads after purchase.

## 🏗️ System Architecture

```
Customer Purchase → Stripe Payment → Webhook → Email with Download Link → Customer Portal → Secure Downloads
```

## 📁 Files Created

### 1. Customer Download Portal
- **File**: `/docs/download.html`
- **Purpose**: Secure portal where customers access their purchased products
- **Features**:
  - Product verification based on URL parameters
  - Professional UI with dark theme support
  - Download tracking and file management
  - Installation help and support links

### 2. Email Templates
- **File**: `/email-templates/purchase-confirmation.html`
- **Purpose**: Professional confirmation email sent after purchase
- **Features**:
  - Order details and download link
  - Quick start installation guide
  - Support information and next steps

### 3. Download Link Generator
- **File**: `/api/generate-download-link.js`
- **Purpose**: Creates secure, unique download URLs for customers
- **Features**:
  - HMAC-based security tokens
  - Time-based link expiration
  - Product-specific access control

### 4. Stripe Webhook Handler
- **File**: `/api/stripe-webhook-handler.js`
- **Purpose**: Processes Stripe payment webhooks and triggers delivery
- **Features**:
  - Webhook signature verification
  - Automatic email sending
  - Order processing and logging

## 🚀 Setup Instructions

### Step 1: Prepare Product Files

1. **Create product file structure**:
   ```
   /products/
   ├── sheet-setup-starter/
   │   ├── SheetRenamer-Revit2024.msi
   │   ├── SheetRenamer-Revit2025.msi
   │   ├── SheetRenamer-Revit2026.msi
   │   ├── User-Guide.pdf
   │   └── Sample-Templates.zip
   ├── mep-power-tools/
   ├── qc-professional-suite/
   ├── foundation-pack/
   ├── professional-pack/
   └── enterprise-pack/
   ```

2. **Upload files to secure hosting** (recommended options):
   - **Cloudflare R2**: Cost-effective, global CDN
   - **AWS S3**: Enterprise-grade, highly secure
   - **Private server**: Full control, custom security

### Step 2: Configure Environment Variables

Create a `.env` file with:
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Service (choose one)
SENDGRID_API_KEY=your_sendgrid_api_key
# OR
AWS_SES_ACCESS_KEY=your_aws_access_key
AWS_SES_SECRET_KEY=your_aws_secret_key

# Security
DOWNLOAD_SECRET_KEY=your_random_secret_key_here
BASE_URL=https://revipromptlab.com

# File Storage
STORAGE_PROVIDER=cloudflare_r2  # or aws_s3, local
STORAGE_BUCKET=reviprompt-products
STORAGE_ACCESS_KEY=your_storage_access_key
STORAGE_SECRET_KEY=your_storage_secret_key
```

### Step 3: Set Up Email Service

#### Option A: SendGrid (Recommended)
```bash
npm install @sendgrid/mail
```

#### Option B: AWS SES
```bash
npm install aws-sdk
```

### Step 4: Deploy Webhook Handler

#### Option A: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`
3. Configure environment variables in Vercel dashboard

#### Option B: Heroku
1. Create Heroku app: `heroku create reviprompt-webhooks`
2. Set environment variables: `heroku config:set STRIPE_SECRET_KEY=...`
3. Deploy: `git push heroku main`

### Step 5: Configure Stripe Webhooks

1. **Go to Stripe Dashboard** → Developers → Webhooks
2. **Add endpoint**: `https://your-domain.com/api/stripe-webhook-handler`
3. **Select events**:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. **Copy webhook secret** and add to environment variables

### Step 6: Update Stripe Payment Links

In your Stripe Dashboard, for each Payment Link:
1. **Add metadata** with product information:
   ```
   products: sheet-setup-starter
   # or for bundles:
   products: sheet-setup-starter,mep-power-tools
   ```

## 🔧 Testing the System

### Test Download Link Generation
```bash
node api/generate-download-link.js
```

### Test Webhook Locally
```bash
# Install Stripe CLI
stripe login
stripe listen --forward-to localhost:3000/webhook/stripe

# In another terminal
node api/stripe-webhook-handler.js
```

### Test Complete Flow
1. Create a Stripe test payment link
2. Complete a test purchase
3. Verify webhook receives event
4. Check email sending works
5. Test download portal with generated link

## 📧 Email Integration Examples

### SendGrid Integration
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: customerEmail,
    from: 'noreply@revipromptlab.com',
    subject: 'Your ReviPrompt Lab Download is Ready!',
    html: emailContent
};

await sgMail.send(msg);
```

### AWS SES Integration
```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

const params = {
    Source: 'noreply@revipromptlab.com',
    Destination: { ToAddresses: [customerEmail] },
    Message: {
        Subject: { Data: 'Your ReviPrompt Lab Download is Ready!' },
        Body: { Html: { Data: emailContent } }
    }
};

await ses.sendEmail(params).promise();
```

## 🔒 Security Features

### Download Link Security
- **HMAC tokens**: Prevent link tampering
- **Time expiration**: Links expire after 24 hours
- **Single-use tokens**: Optional one-time download links
- **IP validation**: Optional IP address restrictions

### File Access Control
- **Signed URLs**: Time-limited access to files
- **User verification**: Cross-reference with purchase records
- **Download logging**: Track all file access attempts

## 📊 Analytics & Monitoring

### Key Metrics to Track
- Download link generation rate
- Email delivery success rate
- Customer download completion rate
- Support ticket volume
- File access patterns

### Monitoring Setup
```javascript
// Add to webhook handler
console.log('Analytics:', {
    event: 'download_link_generated',
    orderId: orderData.orderId,
    products: orderData.products,
    customerEmail: orderData.customerEmail,
    timestamp: new Date().toISOString()
});
```

## 🚀 Going Live Checklist

- [ ] Product files uploaded and accessible
- [ ] Environment variables configured
- [ ] Webhook handler deployed
- [ ] Stripe webhooks configured
- [ ] Email service tested
- [ ] Download portal tested
- [ ] SSL certificates installed
- [ ] Error logging configured
- [ ] Customer support process documented

## 🆘 Troubleshooting

### Common Issues

**Webhook not receiving events**:
- Check Stripe webhook URL is correct
- Verify webhook secret matches
- Check server logs for errors

**Emails not sending**:
- Verify email service API keys
- Check sender domain is verified
- Review email service logs

**Download links not working**:
- Check URL parameter encoding
- Verify HMAC secret key matches
- Test link expiration logic

**Files not downloading**:
- Verify file storage permissions
- Check signed URL generation
- Test file accessibility

## 📞 Support Process

When customers need help:
1. **Check order in Stripe dashboard**
2. **Verify email delivery logs**
3. **Regenerate download link if needed**
4. **Provide direct support via email**

## 🔄 Future Enhancements

- **Customer portal with login**: Account-based access
- **Download analytics**: Track usage patterns
- **Automatic updates**: Notify customers of new versions
- **License management**: Enterprise seat tracking
- **API access**: Programmatic file downloads