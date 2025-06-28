# Deployment Instructions

## Option 1: Stripe Payment Links (Easiest - 5 minutes)

1. **Create Payment Links in Stripe Dashboard:**
   - Go to https://dashboard.stripe.com
   - Products → Add Product (Foundation Pack - $39)
   - Payment Links → Create Link
   - Copy the link: `https://buy.stripe.com/xxxxx`

2. **Update Website:**
   - Replace `REPLACE_WITH_YOUR_LINK` in index.html with actual links
   - Commit and push to GitHub

## Option 2: Vercel Deployment (30 minutes)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel:**
   ```bash
   cd /mnt/d/ReviPromptLab/reviprompt-site
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - STRIPE_SECRET_KEY=sk_live_your_key
   - STRIPE_PUBLISHABLE_KEY=pk_live_your_key

4. **Update DNS:**
   - Point your domain to Vercel
   - Add custom domain in Vercel dashboard

## Security Notes:
- Never commit API keys to Git
- Use test keys for development
- Switch to live keys for production
- Enable webhook signatures for security

## Testing:
- Use Stripe test cards: 4242 4242 4242 4242
- Test all payment flows before going live
- Verify webhooks are working