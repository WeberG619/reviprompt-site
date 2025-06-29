/**
 * Download Link Generator for ReviPrompt Lab
 * 
 * This system generates secure, unique download links for customers
 * and sends confirmation emails after successful purchases.
 */

// Simple implementation for generating download links
// In production, this would be a proper backend service

const crypto = require('crypto');

class DownloadLinkGenerator {
    constructor() {
        // In production, use environment variables
        this.baseUrl = 'https://revipromptlab.com';
        this.secretKey = 'your-secret-key-here'; // Change this in production
    }

    /**
     * Generate secure download link for customer
     * @param {Object} orderData - Customer order information
     * @returns {string} - Secure download URL
     */
    generateDownloadLink(orderData) {
        const {
            orderId,
            customerEmail,
            products,
            purchaseDate,
            amount
        } = orderData;

        // Create unique identifier
        const timestamp = Date.now();
        const hash = crypto
            .createHmac('sha256', this.secretKey)
            .update(`${orderId}-${customerEmail}-${timestamp}`)
            .digest('hex')
            .substring(0, 16);

        // Encode order information
        const encodedProducts = products.join(',');
        const encodedEmail = encodeURIComponent(customerEmail);

        // Generate secure URL
        const downloadUrl = `${this.baseUrl}/download.html?` +
            `order=${orderId}&` +
            `email=${encodedEmail}&` +
            `products=${encodedProducts}&` +
            `token=${hash}&` +
            `ts=${timestamp}`;

        return downloadUrl;
    }

    /**
     * Validate download link
     * @param {string} url - Download URL to validate
     * @returns {boolean} - Whether link is valid
     */
    validateDownloadLink(url) {
        try {
            const urlObj = new URL(url);
            const params = urlObj.searchParams;
            
            const orderId = params.get('order');
            const email = params.get('email');
            const token = params.get('token');
            const timestamp = params.get('ts');

            if (!orderId || !email || !token || !timestamp) {
                return false;
            }

            // Check if link is expired (24 hours for security)
            const linkAge = Date.now() - parseInt(timestamp);
            const maxAge = 24 * 60 * 60 * 1000; // 24 hours
            
            if (linkAge > maxAge) {
                console.log('Link expired');
                return false;
            }

            // Validate token
            const expectedHash = crypto
                .createHmac('sha256', this.secretKey)
                .update(`${orderId}-${decodeURIComponent(email)}-${timestamp}`)
                .digest('hex')
                .substring(0, 16);

            return token === expectedHash;
        } catch (error) {
            console.error('Error validating download link:', error);
            return false;
        }
    }

    /**
     * Process Stripe webhook and send download email
     * @param {Object} stripeEvent - Stripe webhook event
     */
    async processStripeWebhook(stripeEvent) {
        if (stripeEvent.type !== 'checkout.session.completed') {
            return;
        }

        const session = stripeEvent.data.object;
        
        // Extract order information
        const orderData = {
            orderId: session.id,
            customerEmail: session.customer_details.email,
            customerName: session.customer_details.name,
            amount: (session.amount_total / 100).toFixed(2), // Convert from cents
            currency: session.currency.toUpperCase(),
            purchaseDate: new Date().toLocaleDateString(),
            products: this.extractProductsFromSession(session)
        };

        // Generate download link
        const downloadLink = this.generateDownloadLink(orderData);

        // Send confirmation email
        await this.sendConfirmationEmail(orderData, downloadLink);

        console.log(`Download link generated for order: ${orderData.orderId}`);
    }

    /**
     * Extract purchased products from Stripe session
     * @param {Object} session - Stripe checkout session
     * @returns {Array} - Array of product IDs
     */
    extractProductsFromSession(session) {
        // Map Stripe line items to our product IDs
        const productMapping = {
            'price_sheet_setup_starter': 'sheet-setup-starter',
            'price_mep_power_tools': 'mep-power-tools',
            'price_qc_professional': 'qc-professional-suite',
            'price_foundation_pack': 'foundation-pack',
            'price_professional_pack': 'professional-pack',
            'price_enterprise_pack': 'enterprise-pack'
        };

        // In real implementation, you'd get this from session.line_items
        // For now, return based on session metadata or amount
        const amount = session.amount_total / 100;
        
        if (amount === 29) return ['sheet-setup-starter'];
        if (amount === 39) return ['mep-power-tools']; // or qc-professional or foundation
        if (amount === 149) return ['professional-pack'];
        if (amount === 299) return ['enterprise-pack'];
        
        // Default fallback
        return ['foundation-pack'];
    }

    /**
     * Send confirmation email with download link
     * @param {Object} orderData - Order information
     * @param {string} downloadLink - Secure download URL
     */
    async sendConfirmationEmail(orderData, downloadLink) {
        // In production, use a service like SendGrid, AWS SES, or similar
        console.log('Sending confirmation email to:', orderData.customerEmail);
        console.log('Download link:', downloadLink);

        // Email template variables
        const emailVars = {
            CUSTOMER_NAME: orderData.customerName || 'Valued Customer',
            CUSTOMER_EMAIL: orderData.customerEmail,
            ORDER_ID: orderData.orderId,
            PURCHASE_DATE: orderData.purchaseDate,
            PRODUCT_NAMES: this.getProductNames(orderData.products).join(', '),
            TOTAL_AMOUNT: `$${orderData.amount}`,
            DOWNLOAD_LINK: downloadLink
        };

        // In production, load template and send email
        console.log('Email would be sent with variables:', emailVars);
    }

    /**
     * Get friendly product names
     * @param {Array} productIds - Array of product IDs
     * @returns {Array} - Array of product names
     */
    getProductNames(productIds) {
        const names = {
            'sheet-setup-starter': 'Sheet Setup Starter',
            'mep-power-tools': 'MEP Power Tools',
            'qc-professional-suite': 'QC Professional Suite',
            'foundation-pack': 'Foundation Pack',
            'professional-pack': 'Professional Pack',
            'enterprise-pack': 'Enterprise Pack'
        };

        return productIds.map(id => names[id] || id);
    }
}

// Example usage for testing
if (require.main === module) {
    const generator = new DownloadLinkGenerator();
    
    // Test order
    const testOrder = {
        orderId: 'cs_test_123456789',
        customerEmail: 'customer@example.com',
        customerName: 'John Doe',
        products: ['professional-pack'],
        purchaseDate: new Date().toLocaleDateString(),
        amount: '149.00'
    };

    const downloadLink = generator.generateDownloadLink(testOrder);
    console.log('Generated download link:', downloadLink);
    console.log('Link is valid:', generator.validateDownloadLink(downloadLink));
}

module.exports = DownloadLinkGenerator;