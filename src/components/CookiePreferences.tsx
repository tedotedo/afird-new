'use client';

export default function CookiePreferences() {
  return (
    <button
      type="button"
      className="underline decoration-white/30 underline-offset-2 hover:text-white"
      onClick={() => {
        try { window.localStorage.removeItem('aw-cookie-consent'); } catch {}
        window.location.reload();
      }}
    >
      Cookie preferences
    </button>
  );
}
