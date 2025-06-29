# Product Delivery System Setup Guide

## Overview
Professional automated delivery system using Cloudflare R2 for secure file storage and Stripe webhooks for automated delivery.

## Total Cost: ~$3/month
- Cloudflare R2: Free tier (10GB storage) then $0.015/GB
- Resend Email: Free tier (100 emails/day) then $0.001/email
- Vercel/Cloudflare Workers: Free tier

## Setup Steps

### 1. Cloudflare R2 Setup (10 minutes)

1. **Create Cloudflare Account** (if needed)
   - Go to https://dash.cloudflare.com
   - Sign up for free account

2. **Enable R2 Storage**
   - Go to R2 in sidebar
   - Create new bucket named `reviprompt-products`
   - Settings: Private bucket (not public)

3. **Get R2 Credentials**
   - Go to R2 > Manage R2 API Tokens
   - Create new token with Object Read permissions
   - Save:
     - Account ID
     - Access Key ID  
     - Secret Access Key
     - Bucket name

4. **Upload Your Products**
   ```
   reviprompt-products/
   ├── products/
   │   ├── sheet-setup-starter-v1.0.zip
   │   ├── mep-power-tools-v1.0.zip
   │   ├── qc-professional-suite-v1.0.zip
   │   ├── foundation-pack-v1.0.zip
   │   └── professional-pack-v1.0.zip
   ```

### 2. Email Service Setup (5 minutes)

**Recommended: Resend (Easiest)**
1. Sign up at https://resend.com
2. Verify your domain (revipromptlab.com)
3. Get API key
4. Free tier: 100 emails/day

**Alternative: SendGrid**
1. Sign up at https://sendgrid.com
2. More complex setup but higher limits

### 3. Deploy Webhook Handler (15 minutes)

**Option A: Vercel (Recommended)**
1. Install Vercel CLI: `npm i -g vercel`
2. Create `/api` folder in your project
3. Deploy: `vercel --prod`
4. Set environment variables in Vercel dashboard

**Option B: Cloudflare Workers**
1. Use Wrangler CLI
2. Deploy as edge function
3. Integrated with R2

### 4. Stripe Webhook Configuration (5 minutes)

1. **In Stripe Dashboard:**
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/stripe-webhook`
   - Select event: `checkout.session.completed`
   - Copy webhook signing secret

2. **Update Product IDs:**
   - Go to Products in Stripe
   - Copy each product ID
   - Update the PRODUCTS mapping in webhook handler

### 5. Environment Variables

Set these in your deployment platform:

```env
# Stripe
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# Cloudflare R2
CLOUDFLARE_R2_ACCESS_KEY_ID=xxxxx
CLOUDFLARE_R2_SECRET_ACCESS_KEY=xxxxx
CLOUDFLARE_ACCOUNT_ID=xxxxx
R2_BUCKET_NAME=reviprompt-products

# Email (choose one)
RESEND_API_KEY=re_xxxxx
# OR
SENDGRID_API_KEY=SG.xxxxx
```

### 6. Customer Download Portal

The `/download` page is already created. To make it work:

1. **Create API endpoint** `/api/get-downloads`:
   ```javascript
   export default async function handler(req, res) {
     const { orderInfo } = req.body;
     
     // Look up order in KV store
     const order = await getOrderByIdOrEmail(orderInfo);
     
     if (!order) {
       return res.status(404).json({ error: 'Order not found' });
     }
     
     // Generate fresh signed URLs
     const products = await refreshDownloadLinks(order.products);
     
     return res.json({ products });
   }
   ```

2. **Deploy API** with your webhook handler

## File Organization

```
your-products/
├── sheet-setup-starter-v1.0.zip
│   ├── ReviPromptLab.SheetSetup.dll
│   ├── ReviPromptLab.SheetSetup.addin
│   ├── Source/
│   ├── Documentation/
│   └── README.pdf
├── mep-power-tools-v1.0.zip
│   └── [similar structure]
└── [other products...]
```

## Testing Checklist

- [ ] Upload test file to R2
- [ ] Generate signed URL manually
- [ ] Test email sending
- [ ] Make test purchase with Stripe test mode
- [ ] Verify webhook receives event
- [ ] Check email delivery
- [ ] Test download links
- [ ] Verify link expiration

## Security Best Practices

1. **Never expose R2 credentials** in client code
2. **Use signed URLs** with expiration (7 days recommended)
3. **Verify Stripe webhooks** with signature
4. **Rate limit** download endpoint
5. **Log all downloads** for abuse detection

## Monthly Costs Breakdown

- R2 Storage (5GB): $0.08
- R2 Requests: ~$0.50
- Email (500/month): $0.50
- Hosting: $0 (free tier)
- **Total: ~$1-3/month**

## Support & Monitoring

1. **Set up alerts** for failed webhooks
2. **Monitor** R2 bandwidth usage
3. **Track** email delivery rates
4. **Log** all transactions

## Quick Start Commands

```bash
# Clone and setup
git clone your-repo
cd your-repo
npm install

# Deploy to Vercel
vercel --prod

# Set environment variables
vercel env add STRIPE_WEBHOOK_SECRET
# ... add all other env vars

# Test webhook locally
vercel dev
# Use Stripe CLI to forward webhooks
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Need Help?

- Cloudflare R2 Docs: https://developers.cloudflare.com/r2/
- Stripe Webhooks: https://stripe.com/docs/webhooks
- Resend Docs: https://resend.com/docs
- Vercel Docs: https://vercel.com/docs