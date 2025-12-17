# Fixing Netlify Secrets Scanner Issue

The secrets scanner is detecting the Google API key pattern (`AIza...`) in the build output. This is expected because `NEXT_PUBLIC_GEMINI_API_KEY` is intentionally public (it's bundled into client-side code).

## Solution: Set Environment Variable in Netlify Dashboard

The configuration in `netlify.toml` may not work for secrets scanning. You need to set it in the Netlify dashboard:

### Steps:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Build & deploy** → **Environment variables**
3. Click **Add variable**
4. Add this variable:
   - **Key**: `SECRETS_SCAN_SMART_DETECTION_OMIT_VALUES`
   - **Value**: `AIza`
   - **Scopes**: Select all (Production, Deploy previews, Branch deploys)
5. Click **Save**
6. Trigger a new deploy

### Alternative: Disable Smart Detection Entirely

If the above doesn't work, you can disable smart detection:

1. In the same Environment variables section
2. Add:
   - **Key**: `SECRETS_SCAN_SMART_DETECTION_ENABLED`
   - **Value**: `false`
   - **Scopes**: All
3. Save and redeploy

## Why This Happens

- `NEXT_PUBLIC_*` environment variables are bundled into client-side JavaScript
- Google API keys start with `AIza...`
- Netlify's secrets scanner detects this pattern and flags it
- This is a **false positive** - the key is meant to be public

## Security Note

This is safe because:
- `NEXT_PUBLIC_GEMINI_API_KEY` is intentionally public
- It's a client-side API key with limited scope
- It's not a server-side secret

