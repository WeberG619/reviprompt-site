# Stripe Integration Setup Instructions

## Overview
Your RevitPromptLab website now has complete Stripe payment integration implemented. Follow these steps to configure it with your actual Stripe account.

## Step 1: Create Stripe Products and Prices

### 1.1 Login to Stripe Dashboard
- Go to [dashboard.stripe.com](https://dashboard.stripe.com)
- Make sure you're in **Test mode** initially for testing

### 1.2 Create Products
Navigate to **Products** and create these 4 products:

#### Product 1: Starter Plan
- **Name**: RevitPromptLab Starter
- **Description**: Basic AI prompts for Revit automation
- **Create recurring prices**:
  - Monthly: $0.00
  - Annual: $0.00

#### Product 2: Professional Plan  
- **Name**: RevitPromptLab Professional
- **Description**: Professional AI prompts and automation tools
- **Create recurring prices**:
  - Monthly: $49.00
  - Annual: $39.00 (20% discount)

#### Product 3: AEC Professional Plan
- **Name**: RevitPromptLab AEC Professional  
- **Description**: Advanced AEC-specific prompts and workflows
- **Create recurring prices**:
  - Monthly: $79.00
  - Annual: $69.00

#### Product 4: Enterprise Plan
- **Name**: RevitPromptLab Enterprise
- **Description**: Full access with custom integrations
- **Create recurring prices**:
  - Monthly: $149.00  
  - Annual: $119.00

### 1.3 Copy Price IDs
After creating each product, copy the **Price ID** (starts with `price_`) for each plan/billing period combination.

## Step 2: Configure Environment Variables

### 2.1 Create .env.local file
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

### 2.2 Update Stripe Configuration
Replace the placeholder values in `.env.local`:

```env
# Stripe Configuration  
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_from_step3

# Stripe Product Price IDs (Replace with your actual price IDs)
STRIPE_PRICE_STARTER_MONTHLY=price_your_starter_monthly_id
STRIPE_PRICE_STARTER_ANNUAL=price_your_starter_annual_id
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_your_professional_monthly_id
STRIPE_PRICE_PROFESSIONAL_ANNUAL=price_your_professional_annual_id
STRIPE_PRICE_AEC_PROFESSIONAL_MONTHLY=price_your_aec_monthly_id
STRIPE_PRICE_AEC_PROFESSIONAL_ANNUAL=price_your_aec_annual_id
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_your_enterprise_monthly_id
STRIPE_PRICE_ENTERPRISE_ANNUAL=price_your_enterprise_annual_id

# Application URLs (Update for production)
NEXT_PUBLIC_APP_URL=https://revipromptlab.com
NEXTAUTH_URL=https://revipromptlab.com
```

## Step 3: Configure Webhook

### 3.1 Create Webhook Endpoint
In Stripe Dashboard:
1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Set endpoint URL: `https://revipromptlab.com/api/webhooks/stripe`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated` 
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### 3.2 Copy Webhook Secret
After creating the webhook, copy the **Signing secret** (starts with `whsec_`) and add it to your `.env.local` file.

## Step 4: Test the Integration

### 4.1 Local Testing
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Visit `http://localhost:3000/pricing`
4. Try purchasing a plan with Stripe test card: `4242 4242 4242 4242`

### 4.2 Test Card Numbers
Use these test cards:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

### 4.3 Monitor Webhook Events
In Stripe Dashboard → **Developers** → **Webhooks**, you can see webhook delivery attempts and debug any issues.

## Step 5: Deploy to Production

### 5.1 Update Environment Variables
In your hosting platform (Vercel, Netlify, etc.), add all the environment variables from `.env.local`.

### 5.2 Switch to Live Mode
1. In Stripe Dashboard, toggle to **Live mode**
2. Update your `.env.local` (or hosting environment variables) with live keys:
   - Replace `pk_test_` with `pk_live_`
   - Replace `sk_test_` with `sk_live_`
3. Update webhook endpoint URL to production domain
4. Copy new live webhook secret

### 5.3 Test Live Payments
Use real credit cards for final testing (small amounts recommended).

## Step 6: Additional Setup (Optional)

### 6.1 Database Setup
Currently using console logging. For production, set up a database:
```env
DATABASE_URL=postgresql://username:password@host:5432/revipromptlab
```

### 6.2 Email Service
Configure SendGrid for email notifications:
```env
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=support@revipromptlab.com
```

## Verification Checklist

- [ ] All 8 Stripe price IDs configured in environment variables
- [ ] Webhook endpoint created and secret configured  
- [ ] Test purchases work end-to-end
- [ ] Success page displays real payment data
- [ ] Webhook events are processed successfully
- [ ] License keys are generated correctly
- [ ] Production environment variables configured
- [ ] Live mode testing completed

## Support

If you encounter issues:
1. Check Stripe Dashboard → **Logs** for API errors
2. Check webhook delivery attempts in Dashboard → **Webhooks**
3. Review Next.js console logs for application errors
4. Test with Stripe CLI for local webhook testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

Your Stripe integration is now complete and ready for production use!