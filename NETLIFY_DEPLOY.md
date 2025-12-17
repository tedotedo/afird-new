# Deploying to Netlify

This guide will walk you through deploying your Next.js app to Netlify.

## Prerequisites

1. A GitHub account (or GitLab/Bitbucket)
2. Your code pushed to a Git repository
3. A Netlify account (free tier works)

## Step-by-Step Deployment

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Sign up/Login to Netlify**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Sign up or log in (you can use GitHub to sign in)

3. **Create a New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Netlify to access your repositories
   - Select your repository (`AFIRD-new`)

4. **Configure Build Settings**
   Netlify should auto-detect Next.js, but verify:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18` (or latest LTS)

5. **Set Environment Variables**
   Before deploying, click "Show advanced" → "New variable" and add:
   
   **Required Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ADMIN_API_KEY=your_admin_api_key
   ```

   **Important Notes:**
   - `NEXT_PUBLIC_*` variables are exposed to the browser
   - `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_API_KEY` are server-side only
   - Never commit these to Git!

6. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (usually 2-5 minutes)
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify in your project**
   ```bash
   netlify init
   ```
   - Follow the prompts to link your site
   - Choose "Create & configure a new site"
   - Select your team
   - Choose a site name

4. **Set Environment Variables**
   ```bash
   # Set each variable
   netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_supabase_url"
   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_supabase_anon_key"
   netlify env:set SUPABASE_SERVICE_ROLE_KEY "your_service_role_key"
   netlify env:set NEXT_PUBLIC_GEMINI_API_KEY "your_gemini_api_key"
   netlify env:set ADMIN_API_KEY "your_admin_api_key"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Post-Deployment

### 1. Update Supabase Settings

After deployment, you need to update your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Netlify URL to **Redirect URLs**:
   ```
   https://your-site-name.netlify.app
   https://your-site-name.netlify.app/**
   ```

### 2. Test Your Deployment

Visit your Netlify URL and test:
- ✅ Login/Signup functionality
- ✅ Food entry creation
- ✅ Image uploads
- ✅ Daily summaries
- ✅ Admin statistics (if applicable)

### 3. Custom Domain (Optional)

1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow the DNS configuration instructions

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Environment variable not found"**
- Double-check all environment variables are set in Netlify
- Variables must match exactly (case-sensitive)

**Error: "Build timeout"**
- Free tier has 15-minute build limit
- Check for infinite loops or large dependencies

### Runtime Errors

**Error: "Supabase connection failed"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check Supabase project is active

**Error: "CORS errors"**
- Update Supabase allowed origins in dashboard
- Add your Netlify URL to allowed domains

**Error: "Image upload fails"**
- Check Supabase Storage bucket policies
- Verify storage bucket is public or has correct RLS policies

### Performance Issues

- Enable Netlify's Edge Functions for better performance
- Use Netlify's Image CDN for optimized images
- Enable caching headers in `netlify.toml` if needed

## Continuous Deployment

Once connected to Git, Netlify will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show build status in your Git provider

## Monitoring

- Check **Deploys** tab for build logs
- Use **Functions** tab to monitor API routes
- Check **Analytics** for site performance (paid feature)

## Security Checklist

- ✅ All sensitive keys are in environment variables (not in code)
- ✅ `.env.local` is in `.gitignore`
- ✅ `SUPABASE_SERVICE_ROLE_KEY` is server-side only
- ✅ `ADMIN_API_KEY` is server-side only
- ✅ Supabase RLS policies are enabled
- ✅ Storage bucket policies are configured

## Need Help?

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Netlify Community](https://answers.netlify.com/)

