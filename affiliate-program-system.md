# ReviPromptLab Affiliate Program System

## Program Overview

**Commission Structure:**
- Foundation Pack ($39): **30% = $11.70**
- Professional Pack ($149): **30% = $44.70**
- Enterprise Pack ($299): **30% = $89.70**

**Cookie Duration:** 60 days
**Minimum Payout:** $50
**Payment Schedule:** Monthly via PayPal/Stripe

---

## Target Affiliates

### Tier 1: Revit Professionals
- **Profile**: Architects, engineers, Revit trainers
- **Reach**: 100-2,000 followers
- **Commission**: 30% standard
- **Recruitment**: LinkedIn outreach, Revit forums

### Tier 2: Revit Influencers
- **Profile**: YouTube channels, course creators
- **Reach**: 2,000-50,000 followers
- **Commission**: 35% + bonuses
- **Recruitment**: Direct outreach, partnership proposals

### Tier 3: BIM Consultants
- **Profile**: BIM firms, Revit consultants
- **Reach**: Enterprise clients
- **Commission**: 30% + volume bonuses
- **Recruitment**: Conference networking, cold email

---

## Affiliate Landing Pages

### Page 1: "/affiliate-join"
```html
<!DOCTYPE html>
<html>
<head>
    <title>Join ReviPromptLab Affiliate Program - Earn 30% Commission</title>
    <meta name="description" content="Earn $11-$89 per sale promoting AI prompts for Revit. Join 100+ affiliates making $500-$5,000/month.">
</head>
<body>
    <h1>Earn $500-$5,000/Month Promoting ReviPrompt Lab</h1>
    
    <div class="hero-stats">
        <div>$89.70 Max Commission</div>
        <div>30% Commission Rate</div>
        <div>60-Day Cookie</div>
        <div>Monthly Payouts</div>
    </div>
    
    <div class="benefits">
        <h2>Why Join Our Program?</h2>
        <ul>
            <li>High-Converting Product ($39-$299 price points)</li>
            <li>Professional Marketing Materials Provided</li>
            <li>Real-Time Tracking Dashboard</li>
            <li>Top Affiliates Earn $2,000-$5,000/month</li>
        </ul>
    </div>
    
    <div class="signup-form">
        <h2>Apply to Join (2 minutes)</h2>
        <form id="affiliate-signup">
            <input type="text" placeholder="Full Name" required>
            <input type="email" placeholder="Email Address" required>
            <input type="url" placeholder="Website/LinkedIn Profile" required>
            <select required>
                <option value="">How will you promote us?</option>
                <option value="social">Social Media</option>
                <option value="email">Email List</option>
                <option value="content">Blog/YouTube</option>
                <option value="network">Professional Network</option>
            </select>
            <textarea placeholder="Tell us about your audience (optional)"></textarea>
            <button type="submit">Apply Now - Start Earning Tomorrow</button>
        </form>
    </div>
</body>
</html>
```

### Page 2: "/affiliate-resources"
```html
<!DOCTYPE html>
<html>
<head>
    <title>Affiliate Resources - ReviPromptLab</title>
</head>
<body>
    <h1>Affiliate Marketing Resources</h1>
    
    <div class="resource-grid">
        <div class="resource-card">
            <h3>Email Templates</h3>
            <ul>
                <li><a href="/resources/email-template-1.html">Subject: Save 10 hours per project</a></li>
                <li><a href="/resources/email-template-2.html">Subject: 73% discount expires tonight</a></li>
                <li><a href="/resources/email-template-3.html">Subject: New Revit automation tool</a></li>
            </ul>
        </div>
        
        <div class="resource-card">
            <h3>Social Media Posts</h3>
            <ul>
                <li><a href="/resources/linkedin-post-1.html">LinkedIn: Success story</a></li>
                <li><a href="/resources/facebook-post-1.html">Facebook: Time-saving tips</a></li>
                <li><a href="/resources/twitter-thread-1.html">Twitter: Thread template</a></li>
            </ul>
        </div>
        
        <div class="resource-card">
            <h3>Banner Ads</h3>
            <ul>
                <li><a href="/resources/banner-728x90.jpg">Leaderboard (728x90)</a></li>
                <li><a href="/resources/banner-300x250.jpg">Medium Rectangle (300x250)</a></li>
                <li><a href="/resources/banner-160x600.jpg">Wide Skyscraper (160x600)</a></li>
            </ul>
        </div>
        
        <div class="resource-card">
            <h3>Video Scripts</h3>
            <ul>
                <li><a href="/resources/video-script-demo.pdf">30-second demo script</a></li>
                <li><a href="/resources/video-script-testimonial.pdf">Customer testimonial template</a></li>
                <li><a href="/resources/video-script-tutorial.pdf">Tutorial-style promotion</a></li>
            </ul>
        </div>
    </div>
</body>
</html>
```

---

## Tracking & Attribution System

### JavaScript Tracking Code
```javascript
// affiliate-tracking.js
class AffiliateTracker {
    constructor() {
        this.apiBase = 'https://api.revipromptlab.com';
        this.cookieName = 'rpl_affiliate';
        this.cookieDuration = 60; // days
        this.init();
    }
    
    init() {
        // Check for affiliate parameter
        const urlParams = new URLSearchParams(window.location.search);
        const affiliateId = urlParams.get('ref') || urlParams.get('affiliate');
        
        if (affiliateId) {
            this.setAffiliateCookie(affiliateId);
            this.trackClick(affiliateId);
        }
        
        // Track page views for attributed visitors
        this.trackPageView();
    }
    
    setAffiliateCookie(affiliateId) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (this.cookieDuration * 24 * 60 * 60 * 1000));
        
        document.cookie = `${this.cookieName}=${affiliateId}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
    }
    
    getAffiliateCookie() {
        const name = this.cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }
    
    async trackClick(affiliateId) {
        try {
            await fetch(`${this.apiBase}/affiliate/track-click`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    affiliateId: affiliateId,
                    page: window.location.pathname,
                    referrer: document.referrer,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (error) {
            console.error('Affiliate tracking error:', error);
        }
    }
    
    async trackPageView() {
        const affiliateId = this.getAffiliateCookie();
        if (!affiliateId) return;
        
        try {
            await fetch(`${this.apiBase}/affiliate/track-view`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    affiliateId: affiliateId,
                    page: window.location.pathname,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (error) {
            console.error('Page view tracking error:', error);
        }
    }
    
    async trackPurchase(orderValue, productTier, transactionId) {
        const affiliateId = this.getAffiliateCookie();
        if (!affiliateId) return;
        
        const commission = orderValue * 0.30; // 30% commission
        
        try {
            await fetch(`${this.apiBase}/affiliate/track-purchase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    affiliateId: affiliateId,
                    orderValue: orderValue,
                    productTier: productTier,
                    commission: commission,
                    transactionId: transactionId,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (error) {
            console.error('Purchase tracking error:', error);
        }
    }
}

// Initialize tracker
const affiliateTracker = new AffiliateTracker();
```

---

## Affiliate Dashboard

### Dashboard Features
1. **Real-Time Stats**
   - Clicks today/month
   - Conversions today/month
   - Earnings today/month
   - Conversion rate

2. **Performance Charts**
   - 30-day click/conversion graph
   - Monthly earnings trend
   - Top-performing content

3. **Marketing Tools**
   - Link generator
   - Banner ad downloads
   - Email template library
   - Social media scheduler

4. **Payouts**
   - Current balance
   - Payment history
   - Payout schedule
   - Tax forms (1099)

---

## Recruitment Strategy

### Phase 1: Soft Launch (50 affiliates)
**Target**: Existing customers who love the product
**Approach**: Email invitation to beta program
**Timeline**: 2 weeks

### Phase 2: Influencer Outreach (100 affiliates)
**Target**: Revit YouTubers, LinkedIn influencers
**Approach**: Personalized outreach with special rates
**Timeline**: 1 month

### Phase 3: Scale (500+ affiliates)
**Target**: BIM professionals, Revit communities
**Approach**: Automated recruitment funnels
**Timeline**: 3 months

---

## Email Templates for Recruitment

### Template 1: Customer Invitation
```
Subject: Earn $500-$2,000/month promoting ReviPromptLab

Hi [Name],

Since you're already using ReviPromptLab and saving hours every week, I wanted to invite you to our exclusive affiliate program.

Here's the deal:
• Earn 30% commission on every sale ($11-$89 per sale)
• 60-day cookie duration
• Professional marketing materials provided
• Our top affiliates earn $2,000-$5,000/month

Many of our customers naturally recommend us to colleagues anyway - why not get paid for it?

Interested? Apply here: [link]

Best,
[Your name]
```

### Template 2: Influencer Outreach
```
Subject: Partnership opportunity - $5,000/month potential

Hi [Name],

I've been following your Revit content and love what you're doing. Your audience of [X] Revit professionals is exactly who we serve.

I'd like to propose a partnership:

ReviPromptLab (150+ AI prompts for Revit automation) is looking for content creators to partner with. We pay 35% commission ($13-$104 per sale) with exclusive promotions for your audience.

Our similar creators are earning $2,000-$5,000/month with just 2-3 posts per month.

Would you be interested in a quick 15-minute call to discuss?

Best,
[Your name]
```

---

## Legal & Compliance

### Affiliate Agreement Key Points
1. **Commission Structure**: 30% on all sales
2. **Cookie Duration**: 60 days
3. **Payment Terms**: Monthly, $50 minimum
4. **Prohibited Activities**: 
   - Trademark bidding
   - Spam/unsolicited emails
   - False claims about product
5. **Termination**: Either party, 30-day notice

### Required Disclosures
- Affiliates must disclose relationship
- FTC compliance required
- No false income claims
- Honest product reviews only

---

## Technical Implementation

### Database Schema
```sql
-- Affiliates table
CREATE TABLE affiliates (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    affiliate_id VARCHAR(50) UNIQUE NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 30.00,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Affiliate clicks table
CREATE TABLE affiliate_clicks (
    id SERIAL PRIMARY KEY,
    affiliate_id VARCHAR(50) NOT NULL,
    visitor_ip VARCHAR(45),
    page VARCHAR(255),
    referrer TEXT,
    user_agent TEXT,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Affiliate conversions table
CREATE TABLE affiliate_conversions (
    id SERIAL PRIMARY KEY,
    affiliate_id VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    order_value DECIMAL(10,2) NOT NULL,
    commission DECIMAL(10,2) NOT NULL,
    product_tier VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    converted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Affiliate payouts table
CREATE TABLE affiliate_payouts (
    id SERIAL PRIMARY KEY,
    affiliate_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Expected Results

### Month 1 (Soft Launch)
- **Affiliates**: 25 active
- **Average Monthly Earnings**: $200/affiliate
- **Total Program Revenue**: $5,000
- **Commission Paid**: $1,500

### Month 3 (Scale Phase)
- **Affiliates**: 100 active
- **Average Monthly Earnings**: $350/affiliate
- **Total Program Revenue**: $35,000
- **Commission Paid**: $10,500

### Month 6 (Mature Program)
- **Affiliates**: 250 active
- **Average Monthly Earnings**: $500/affiliate
- **Total Program Revenue**: $125,000
- **Commission Paid**: $37,500

**ROI**: Every $1 paid in commissions generates $2.33 in revenue