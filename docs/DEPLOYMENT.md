# Deployment Guide

## 🚀 Quick Start

This guide covers deploying LogicNomad to production. The project is configured for both GitHub Pages and Vercel deployment.

**Prerequisites:**
- ✅ GitHub repository (for GitHub Pages)
- ✅ Vercel account (optional, for Vercel deployment)
- ✅ All code committed and pushed

---

## 📦 GitHub Pages Deployment

### Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys when you push to the `main` branch.

#### Setup Steps

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to **Actions** tab in your repository
   - Watch the workflow run
   - Deployment typically takes 2-3 minutes

4. **Access your site:**
   - URL: `https://<username>.github.io/LogicNomad/`
   - Example: `https://kyuna0312.github.io/LogicNomad/`

#### Workflow Details

The workflow (`.github/workflows/deploy.yml`) does:
- ✅ Checks out code
- ✅ Sets up Node.js and Yarn
- ✅ Builds engine package
- ✅ Builds web app
- ✅ Deploys to GitHub Pages

### Manual Deployment

If you prefer manual deployment:

1. **Build the project:**
   ```bash
   # Build engine first (required)
   yarn build:engine
   
   # Build web app
   yarn build:web
   ```

2. **Deploy to GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Select source: **GitHub Actions**
   - Or use **gh-pages** branch method (not recommended)

---

## ⚡ Vercel Deployment

Vercel provides faster deployments and better performance.

### Method 1: Vercel Dashboard (Recommended)

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New Project**
   - Import your GitHub repository

2. **Configure Project:**
   - **Root Directory**: Leave empty (or set to project root)
   - **Framework Preset**: Vite
   - **Build Command**: `yarn build:engine && yarn build:web`
   - **Output Directory**: `apps/web/dist`
   - **Install Command**: `yarn install`

3. **Environment Variables:**
   - None required for MVP
   - Add if needed for Phase 2

4. **Deploy:**
   - Click **Deploy**
   - Wait for build to complete
   - Your site will be live automatically

### Method 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # From project root
   vercel
   
   # Or from web app directory
   cd apps/web
   vercel
   ```

4. **Configure (if prompted):**
   - Root directory: `apps/web` (if deploying from root)
   - Build command: `cd ../.. && yarn build:engine && yarn build:web`
   - Output directory: `dist`

### Vercel Configuration File

Create `vercel.json` in project root (optional):

```json
{
  "buildCommand": "yarn build:engine && yarn build:web",
  "outputDirectory": "apps/web/dist",
  "installCommand": "yarn install",
  "framework": "vite"
}
```

---

## 🔧 Build Configuration

### Current Settings

- **Base path**: `/LogicNomad/` (for GitHub Pages)
- **Output**: `apps/web/dist`
- **Static assets**: Automatically handled by Vite
- **Code splitting**: Enabled (vendor chunks)
- **Minification**: ESBuild
- **Source maps**: Disabled in production

### Customizing Base Path

If deploying to a custom domain:

1. **Update `apps/web/vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/', // Change from '/LogicNomad/'
     // ... rest of config
   });
   ```

2. **Rebuild:**
   ```bash
   yarn build:web
   ```

---

## 🌍 Environment Variables

### MVP (No Variables Needed)

The MVP doesn't require any environment variables. All configuration is in code.

### Phase 2 (Future)

When adding backend integration:

```bash
# .env.local (for local development)
VITE_API_URL=http://localhost:3000

# Vercel Environment Variables
# Add in Vercel Dashboard → Settings → Environment Variables
```

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass (when added)
- [ ] Production build succeeds: `yarn build`
- [ ] No console errors in browser
- [ ] All features work correctly
- [ ] Performance is acceptable (Lighthouse score > 80)
- [ ] Mobile responsiveness checked
- [ ] All documentation updated

### Test Production Build Locally

```bash
# Build
yarn build:engine && yarn build:web

# Preview
cd apps/web
yarn preview

# Or with serve
npx serve -s dist -l 3000
```

---

## 🐛 Troubleshooting

### GitHub Pages Issues

**Problem**: 404 errors or blank page
- **Solution**: Check base path in `vite.config.ts` matches repository name
- **Solution**: Ensure GitHub Actions workflow completed successfully
- **Solution**: Clear browser cache

**Problem**: Assets not loading
- **Solution**: Verify base path is correct
- **Solution**: Check that all files are in `dist/` folder
- **Solution**: Ensure relative paths are used

**Problem**: Build fails in GitHub Actions
- **Solution**: Check Node.js version (should be 20+)
- **Solution**: Verify all dependencies are in `package.json`
- **Solution**: Check workflow logs for specific errors

### Vercel Issues

**Problem**: Build fails
- **Solution**: Verify build command is correct
- **Solution**: Check Node.js version in Vercel settings
- **Solution**: Ensure output directory is correct

**Problem**: Routes not working
- **Solution**: Add `vercel.json` with rewrite rules
- **Solution**: Use Vercel's SPA routing configuration

### General Issues

**Problem**: Module not found errors
- **Solution**: Rebuild engine package: `yarn build:engine`
- **Solution**: Clear node_modules and reinstall: `yarn clean:all && yarn install`

**Problem**: Bundle size too large
- **Solution**: Check [OPTIMIZATION.md](./OPTIMIZATION.md) for optimization tips
- **Solution**: Run bundle analyzer: `vite-bundle-visualizer`

---

## 📊 Post-Deployment

### Immediate Actions

1. **Test Live Site:**
   - Verify all features work
   - Test on different browsers
   - Check mobile responsiveness
   - Test all 11 levels

2. **Update README:**
   - Add live demo link
   - Update status badges
   - Add deployment information

3. **Share:**
   - Update social media (build-in-public)
   - Share demo link
   - Collect initial feedback

### Monitoring

1. **Performance:**
   - Run Lighthouse audit
   - Monitor Core Web Vitals
   - Check bundle sizes

2. **Analytics (Optional):**
   - Add Google Analytics
   - Track user engagement
   - Monitor error rates

3. **Feedback:**
   - Collect user feedback
   - Monitor GitHub issues
   - Track feature requests

---

## 🔄 Continuous Deployment

### GitHub Pages

- ✅ Automatic on push to `main`
- ✅ No additional setup needed
- ✅ Free for public repositories

### Vercel

- ✅ Automatic on push to `main`
- ✅ Preview deployments for PRs
- ✅ Free tier available

### Custom Domain

**GitHub Pages:**
1. Add `CNAME` file to repository
2. Configure DNS settings
3. Update base path in `vite.config.ts`

**Vercel:**
1. Add domain in Vercel dashboard
2. Configure DNS as instructed
3. SSL certificate auto-generated

---

## 📚 Related Documentation

- [README.md](./README.md) - Documentation index
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development setup
- [OPTIMIZATION.md](./OPTIMIZATION.md) - Performance optimizations
- [MVP_STATUS.md](./MVP_STATUS.md) - MVP completion status
- [ROADMAP.md](./ROADMAP.md) - Development roadmap

---

## 🎉 Success!

Once deployed, your LogicNomad app will be live and accessible to users!

**Next Steps:**
- Share the demo link
- Collect user feedback
- Plan Phase 2 features
- Continue build-in-public journey
