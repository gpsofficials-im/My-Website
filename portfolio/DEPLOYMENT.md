# GP'S Officials HIM Portfolio - Deployment Guide

## 📋 Table of Contents
1. [Local Setup](#local-setup)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Custom Domain Setup](#custom-domain-setup)
4. [Performance Optimization](#performance-optimization)
5. [SEO Optimization](#seo-optimization)
6. [Troubleshooting](#troubleshooting)

---

## Local Setup

### Prerequisites
- Git installed
- A code editor (VS Code recommended)
- Node.js (optional, for local server)

### Installation Steps

1. **Clone or download the repository**
```bash
git clone https://github.com/yourusername/gpsofficialhim.git
cd gpsofficialhim
```

2. **Open in a local server** (optional but recommended)
```bash
# Using Python 3
python -m http.server 8000

# OR using Python 2
python -m SimpleHTTPServer 8000

# OR using Node.js (install http-server first)
npx http-server
```

3. **View in browser**
- Open `http://localhost:8000` in your browser

---

## GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Create a new repository: `gpsofficialhim` or `username.github.io`
3. Initialize with a README (optional)

### Step 2: Push Code to GitHub

```bash
# Navigate to your project folder
cd portfolio

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio commit"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/gpsofficialhim.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Scroll to "GitHub Pages" section
3. Select branch: `main`
4. Select folder: `/ (root)`
5. Save

Your site will be available at: `https://yourusername.github.io/gpsofficialhim`

---

## Custom Domain Setup

### DNS Configuration

1. **Buy a domain** (e.g., gpsofficialhim.com from GoDaddy, Namecheap, etc.)

2. **Configure DNS Records**

For Namecheap/GoDaddy:
```
Type: A Record
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A Record
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A Record
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A Record
Name: @
Value: 185.199.111.153
TTL: 3600

Type: CNAME Record
Name: www
Value: yourusername.github.io
TTL: 3600
```

3. **GitHub Pages Setup**

- Go to repository Settings → Pages
- Under "Custom domain", enter: `gpsofficialhim.com`
- Check "Enforce HTTPS"
- Save

4. **Verify DNS**

```bash
# Check DNS propagation
nslookup gpsofficialhim.com

# Or use dig command
dig gpsofficialhim.com
```

---

## Performance Optimization

### 1. Image Optimization
- Compress images using tools like:
  - [TinyPNG](https://tinypng.com)
  - [ImageOptim](https://imageoptim.com)
  - [Squoosh](https://squoosh.app)

### 2. Minification
```bash
# Install UglifyJS and CleanCSS
npm install -g uglify-js clean-css-cli

# Minify CSS
cleancss -o css/styles.min.css css/styles.css

# Minify JavaScript
uglifyjs js/main.js -o js/main.min.js -c -m
```

### 3. Update HTML to use minified files
```html
<!-- In index.html, change to: -->
<link rel="stylesheet" href="css/styles.min.css">
<script src="js/main.min.js"></script>
```

### 4. WebP Image Format
Convert images to WebP for better compression:
```bash
# Using cwebp
cwebp input.jpg -o output.webp
```

### 5. Lazy Loading
Images already support lazy loading with `data-src` attribute.

---

## SEO Optimization

### 1. Meta Tags (Already Included)
✅ Open Graph tags
✅ Twitter Card tags
✅ Description tags
✅ Viewport meta tag

### 2. Sitemap Generation

Create `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.gpsofficialhim.com/</loc>
        <lastmod>2026-04-21</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.gpsofficialhim.com/#about</loc>
        <lastmod>2026-04-21</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://www.gpsofficialhim.com/#portfolio</loc>
        <lastmod>2026-04-21</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
```

### 3. Submit to Search Engines

- **Google Search Console**: https://search.google.com/search-console
- **Bing Webmaster Tools**: https://www.bing.com/webmasters
- **Yandex Webmaster**: https://webmaster.yandex.com

Submit your `sitemap.xml` to all services.

### 4. Structured Data

Add JSON-LD schema markup to your HTML:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "GP'S Officials HIM",
  "url": "https://www.gpsofficialhim.com",
  "sameAs": [
    "https://instagram.com/yourusername",
    "https://github.com/yourusername",
    "https://facebook.com/yourusername"
  ],
  "jobTitle": "Creative Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "GP'S Officials HIM"
  }
}
</script>
```

---

## Performance Testing

### Google PageSpeed Insights
- Visit: https://pagespeed.web.dev
- Enter your domain
- Follow recommendations

### Lighthouse Audit
- Use built-in Chrome DevTools Lighthouse
- Target scores: 90+

### Web Vitals
Monitor:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## Email Integration (Optional)

### Using Formspree
1. Go to [Formspree.io](https://formspree.io)
2. Create account and add your domain
3. Update form action in HTML:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Using EmailJS
```javascript
// Include script
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3.10.0/dist/index.min.js"></script>

// Initialize
emailjs.init('YOUR_PUBLIC_KEY');

// Inside contact form handler
emailjs.send('service_id', 'template_id', {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
}).then(() => {
    // Success
});
```

---

## Google Analytics Setup

Add to `<head>` of index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Troubleshooting

### GitHub Pages not updating
```bash
# Clear git cache
git rm -r --cached .

# Re-add all files
git add .

# Commit and push
git commit -m "Update site"
git push origin main
```

### HTTPS not working
- Wait 24-48 hours for SSL certificate to be issued
- Go to Settings → Pages → Check "Enforce HTTPS"

### Custom domain not resolving
- Verify DNS records at your domain registrar
- Use `nslookup` or `dig` to check propagation
- Clear browser cache (Ctrl+Shift+Delete)

### Form not submitting
- Check browser console for errors (F12)
- Verify form action URL
- Check email service credentials

### Slow performance
- Run Google PageSpeed Insights
- Optimize images
- Minify CSS/JS
- Enable GZIP compression
- Use CDN for external resources

---

## Maintenance Checklist

- [ ] Update portfolio projects quarterly
- [ ] Check and fix broken links monthly
- [ ] Monitor Google Search Console
- [ ] Update social media links
- [ ] Refresh SSL certificate (if needed)
- [ ] Backup repository regularly
- [ ] Update contact information

---

## Advanced Features to Add

1. **Blog Section**
   - Add Jekyll for blogging
   - Create `_posts` folder

2. **Dark/Light Mode Toggle**
   - Already set up in JS (uncomment)
   - Add localStorage for preference

3. **Resume/CV Download**
   - Add PDF file to assets
   - Link from About section

4. **Comments Section**
   - Use Disqus or Utterances
   - Integrate with blog posts

5. **Analytics Dashboard**
   - Set up Google Analytics
   - Monitor traffic and behavior

---

## Support & Resources

- **GitHub Pages Docs**: https://pages.github.com
- **MDN Web Docs**: https://developer.mozilla.org
- **CSS-Tricks**: https://css-tricks.com
- **Web.dev**: https://web.dev
- **Stack Overflow**: https://stackoverflow.com

---

## License

This portfolio template is free to use and modify for personal use.

---

## Contact

For issues or questions:
- Email: gpsofficialhim@gmail.com
- Instagram: @gpsofficialhim
- GitHub: github.com/yourusername

---

**Last Updated**: April 21, 2026
