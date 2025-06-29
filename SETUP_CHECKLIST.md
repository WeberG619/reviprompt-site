# RevitPrompt Site Setup Checklist

## ✅ Completed Improvements

1. **HTML Structure & SEO**
   - Added OpenGraph meta tags for social sharing
   - Added Twitter Card meta tags
   - Added Google Analytics placeholder (needs GA4 ID)
   - Added preconnect for fonts
   - Consolidated all HTML into `/docs/index.html`

2. **Stripe Integration**
   - Created JavaScript configuration object for Stripe links
   - Replaced Ko-fi placeholders with Stripe link placeholders
   - Added data attributes for dynamic link updates

3. **Content Enhancements**
   - Added "About the Creator" section with bio
   - Created legal/license.html page
   - Added footer links to legal pages
   - Improved email capture with localStorage (temporary solution)

## 📋 TODO - High Priority

### 1. Ko-fi Shop Setup ✅
All payment links now point to your Ko-fi shop at `https://ko-fi.com/revipromptlab/shop`
- Customers click "Buy Now" → redirected to Ko-fi → complete purchase there
- Ko-fi handles all payment processing (PayPal/Stripe)
- No additional configuration needed in the code

### 2. Set Up Google Analytics
Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID in the header (line ~24)

### 3. Add Your Photo
Replace the placeholder user icon in the "About the Creator" section with your actual photo

### 4. Configure Email Capture
Choose one of these options:
- **Formspree**: Add `action="https://formspree.io/f/YOUR_FORM_ID"` to the form
- **Netlify Forms**: Add `data-netlify="true"` to the form tag
- **Mailchimp**: Replace form with Mailchimp embed code
- **Custom API**: Point to your `/api/subscribe` endpoint

### 5. Update Contact Information
- Verify email addresses are correct
- Add actual Discord invite link
- Update LinkedIn profile URL

## 🎥 Video Content (Next Steps)

### Required Videos:
1. **60-second demo**: Show Revit automation in action
2. **Installation guide**: How to use the prompts (2-3 min)
3. **Per-pack feature videos**: One for each paid tier

### Video Hosting:
- Upload to YouTube as unlisted
- Embed using `<iframe>` in product cards

## 🚀 Launch Checklist

- [ ] Test all Stripe payment links
- [ ] Verify GA4 is tracking
- [ ] Test email capture flow
- [ ] Upload at least one demo video
- [ ] Create screenshots for social sharing
- [ ] Test on mobile devices
- [ ] Set up custom domain DNS
- [ ] Create first blog post
- [ ] Prepare launch announcement

## 📊 Post-Launch Monitoring

- Set up GA4 conversion tracking for purchases
- Monitor which pricing tier gets most clicks
- Track email signup conversion rate
- Collect customer feedback via email

## 🔧 Technical Notes

- The site uses Vercel's URL rewrite to serve `/docs/index.html` at root
- Email leads are temporarily stored in localStorage (replace with real backend)
- Stripe links open in new tabs for security
- Mobile menu is fully responsive

## 💡 Future Enhancements

- Add testimonial carousel with real customer quotes
- Create comparison table for prompt packs
- Add FAQ section
- Implement live chat support
- Create affiliate program
- Add prompt preview/samples