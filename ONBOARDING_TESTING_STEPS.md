# Quick Testing Guide - Onboarding Variations

## Setup (Do This Once)

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

---

## Testing Each Variation (Repeat 4 Times)

### Step 1: Select Variation

Open `src/app/page.tsx` and change line 10:

**For Simple:**
```typescript
const ONBOARDING_VARIATION = 'simple' as const;
```

**For Walkthrough:**
```typescript
const ONBOARDING_VARIATION = 'walkthrough' as const;
```

**For Interactive:**
```typescript
const ONBOARDING_VARIATION = 'interactive' as const;
```

**For Minimal:**
```typescript
const ONBOARDING_VARIATION = 'minimal' as const;
```

### Step 2: Reset Onboarding

In your browser console (F12), run:
```javascript
localStorage.clear();
```

### Step 3: Refresh & Experience

1. Refresh the page (Cmd/Ctrl + R)
2. Go through the entire onboarding flow
3. Time how long it takes
4. Note your impressions

### Step 4: Record Feedback

Use this template:

```
VARIATION: [name]
TIME: [X seconds]
LIKES:
- 
- 

DISLIKES:
- 
- 

RATING: [1-10]
```

---

## Quick Comparison Test

If you want to see all 4 back-to-back quickly:

1. **Simple** → Time it → Clear localStorage → Note impressions
2. Change to **Walkthrough** → Time it → Clear localStorage → Note impressions  
3. Change to **Interactive** → Time it → Clear localStorage → Note impressions
4. Change to **Minimal** → Time it → Clear localStorage → Note impressions

Total test time: ~15 minutes

---

## Mobile Testing

### On iPhone:

1. Find your computer's local IP:
   ```bash
   ifconfig | grep "inet "
   ```

2. On your iPhone, go to: `http://[YOUR-IP]:3000`

3. Test each variation on mobile

4. Note any issues with:
   - Touch targets too small?
   - Text readable?
   - Layout broken?
   - Buttons too close to screen edge?

---

## Decision Time

After testing all 4, ask yourself:

1. Which felt **fastest**? (Probably Minimal)
2. Which felt **most informative**? (Probably Walkthrough)
3. Which felt **most engaging**? (Probably Interactive)
4. Which felt **just right**? (Probably Simple)

Choose the one that fits your users best!

---

## After Choosing

1. Note your choice
2. Keep that variation's file
3. I'll help you clean up the others when you're ready
4. Then we can push to GitHub

---

## Troubleshooting

**Onboarding won't show again?**
```javascript
localStorage.removeItem('hasSeenOnboarding');
```

**Page is blank?**
- Check browser console for errors
- Make sure variation name is spelled correctly
- Try hard refresh (Cmd+Shift+R or Ctrl+Shift+F5)

**Changes not appearing?**
- Save the file
- Wait for Next.js to rebuild (watch terminal)
- Refresh browser

---

## Need Help?

If you see errors or issues, let me know which variation and what the error message says!


