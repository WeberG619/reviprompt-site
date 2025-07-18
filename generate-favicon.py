#!/usr/bin/env python3
"""
Generate ReviPromptLab favicons in multiple sizes
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_favicon(size, output_path):
    """Create a favicon with the ReviPromptLab rocket design"""
    
    # Create image with transparency
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Create gradient background (blue gradient)
    for y in range(size):
        # Blue gradient from #3B82F6 to #1E40AF
        r1, g1, b1 = 59, 130, 246   # Blue-500
        r2, g2, b2 = 30, 64, 175    # Blue-700
        
        ratio = y / size
        r = int(r1 + (r2 - r1) * ratio)
        g = int(g1 + (g2 - g1) * ratio)
        b = int(b1 + (b2 - b1) * ratio)
        
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))
    
    # Add rounded corners
    radius = int(size * 0.15)
    if radius > 0:
        # Create mask for rounded corners
        mask = Image.new('L', (size, size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([(0, 0), (size-1, size-1)], radius=radius, fill=255)
        
        # Apply mask
        img.putalpha(mask)
    
    # Add rocket icon (simplified geometric design)
    center_x, center_y = size // 2, size // 2
    
    # Rocket body (white rounded rectangle)
    body_width = int(size * 0.25)
    body_height = int(size * 0.5)
    body_x1 = center_x - body_width // 2
    body_y1 = center_y - body_height // 2
    body_x2 = center_x + body_width // 2
    body_y2 = center_y + body_height // 2
    
    draw.rounded_rectangle([(body_x1, body_y1), (body_x2, body_y2)], 
                          radius=int(body_width * 0.3), fill='white')
    
    # Rocket tip (triangle)
    tip_height = int(size * 0.15)
    tip_points = [
        (center_x, body_y1 - tip_height),  # Top point
        (body_x1, body_y1),                # Bottom left
        (body_x2, body_y1)                 # Bottom right
    ]
    draw.polygon(tip_points, fill='white')
    
    # Rocket flames (small triangles at bottom)
    flame_height = int(size * 0.1)
    flame_width = int(body_width * 0.3)
    
    # Left flame
    left_flame = [
        (body_x1 + flame_width, body_y2),
        (body_x1, body_y2 + flame_height),
        (body_x1 + flame_width * 2, body_y2)
    ]
    draw.polygon(left_flame, fill='#FEF3C7')  # Light yellow
    
    # Right flame
    right_flame = [
        (body_x2 - flame_width, body_y2),
        (body_x2, body_y2 + flame_height),
        (body_x2 - flame_width * 2, body_y2)
    ]
    draw.polygon(right_flame, fill='#FEF3C7')  # Light yellow
    
    # Add window (small circle)
    window_radius = int(size * 0.08)
    window_y = center_y - int(body_height * 0.2)
    draw.ellipse([
        (center_x - window_radius, window_y - window_radius),
        (center_x + window_radius, window_y + window_radius)
    ], fill='#3B82F6')  # Blue window
    
    # Save the image
    img.save(output_path, format='PNG')
    print(f"Created favicon: {output_path} ({size}x{size})")

def main():
    # Create public directory if it doesn't exist
    public_dir = "/mnt/d/ReviPromptLab/public"
    os.makedirs(public_dir, exist_ok=True)
    
    # Generate favicons in different sizes
    sizes = [
        (16, "favicon-16x16.png"),
        (32, "favicon-32x32.png"),
        (48, "favicon-48x48.png"),
        (180, "apple-touch-icon.png"),
        (192, "android-chrome-192x192.png"),
        (512, "android-chrome-512x512.png")
    ]
    
    for size, filename in sizes:
        output_path = os.path.join(public_dir, filename)
        create_favicon(size, output_path)
    
    # Create ICO file (multi-size)
    ico_path = os.path.join(public_dir, "favicon.ico")
    
    # Load the 32x32 PNG for ICO conversion
    png_32_path = os.path.join(public_dir, "favicon-32x32.png")
    if os.path.exists(png_32_path):
        img = Image.open(png_32_path)
        img.save(ico_path, format='ICO', sizes=[(32, 32), (16, 16)])
        print(f"Created ICO favicon: {ico_path}")
    
    print("\n✅ All favicons generated successfully!")
    print("\nFiles created:")
    for size, filename in sizes:
        print(f"  📁 /public/{filename}")
    print(f"  📁 /public/favicon.ico")
    
    print("\n🚀 Next steps:")
    print("1. The favicon files are now in your /public/ folder")
    print("2. Deploy your site to see the new favicon")
    print("3. Clear browser cache (Ctrl+F5) to see changes")

if __name__ == "__main__":
    main()