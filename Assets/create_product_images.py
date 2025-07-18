#!/usr/bin/env python3
"""
This script would generate PNG images for your products.
However, it requires the PIL/Pillow library to be installed.

To use this script:
1. Install Pillow: pip install Pillow
2. Run: python create_product_images.py
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    
    # Create product images
    products = [
        {"name": "FREE Sampler", "price": "$0", "color": "#22c55e"},
        {"name": "Foundation Pack", "price": "$39", "color": "#3b82f6"},
        {"name": "Professional Pack", "price": "$149", "color": "#9333ea"},
        {"name": "Enterprise Pack", "price": "$299", "color": "#475569"}
    ]
    
    for product in products:
        # Create 600x600 image
        img = Image.new('RGB', (600, 600), color='white')
        draw = ImageDraw.Draw(img)
        
        # Add border
        draw.rectangle([0, 0, 599, 599], outline=product["color"], width=3)
        
        # Add text (requires font file)
        # draw.text((300, 200), product["name"], fill=product["color"], anchor="mm")
        # draw.text((300, 300), product["price"], fill=product["color"], anchor="mm")
        
        # Save image
        filename = f"reviprompt_{product['name'].lower().replace(' ', '_')}_600x600.png"
        img.save(filename)
        print(f"Created {filename}")
        
except ImportError:
    print("This script requires the Pillow library to create PNG images.")
    print("Install it with: pip install Pillow")
    print("\nAlternatively, use one of these online tools:")
    print("- Canva.com (free)")
    print("- Figma.com (free)")
    print("- Or convert the HTML files using htmlcsstoimage.com")