# Netlify Deployment Guide for SWEDANA

## Quick Deploy (Recommended)

### Option 1: Deploy via Netlify CLI

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**:
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Select your team
   - Enter site name (e.g., `swedana`)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

---

### Option 2: Deploy via Netlify Dashboard (Git Integration)

1. **Go to Netlify Dashboard**: https://app.netlify.com/

2. **Click "Add new site" → "Import an existing project"**

3. **Connect to GitHub**:
   - Select your GitHub repository
   - Authorize Netlify

4. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch to deploy**: `main`

5. **Click "Deploy site"**

6. **Configure Custom Domain** (Optional):
   - Go to Site settings → Domain management
   - Add your custom domain (e.g., `swedana.in`)

---

## Important: Environment Variables

If you add any environment variables in the future, add them in:
- Netlify Dashboard → Site settings → Environment variables

---

## Post-Deployment Checklist

- [ ] Verify all 11 routes work correctly
- [ ] Test navigation links
- [ ] Check SEO metadata (view page source)
- [ ] Test on mobile devices
- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`

---

## Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show build logs and errors

---

## Custom Domain Setup

1. In Netlify Dashboard → Domain settings
2. Add custom domain
3. Update DNS records at your domain registrar:
   - Add A record pointing to Netlify's load balancer
   - Or add CNAME record pointing to your Netlify subdomain

---

## Troubleshooting

**404 on page refresh?**
- The `netlify.toml` file handles this with SPA redirects

**Build fails?**
- Check build logs in Netlify dashboard
- Ensure `package.json` has all dependencies
- Node version: Netlify uses Node 18 by default

**Slow builds?**
- Enable build cache in Netlify settings
- Consider using Netlify's build plugins
