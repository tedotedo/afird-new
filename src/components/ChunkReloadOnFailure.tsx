'use client';

import { useEffect } from 'react';

const RELOAD_KEY = 'rsc_chunk_error_reloaded_v1';

function shouldReloadForErrorMessage(message: string): boolean {
  const lower = message.toLowerCase();

  // Common stale-chunk / dynamic import failures
  if (lower.includes('chunkloaderror')) return true;
  if (lower.includes('loading chunk')) return true;
  if (lower.includes('failed to fetch dynamically imported module')) return true;

  // Seen with Next.js App Router when a deployed bundle changes underneath a cached runtime.
  if (lower.includes("cannot read properties of undefined") && lower.includes("reading 'call'")) return true;

  return false;
}

function alreadyReloaded(): boolean {
  try {
    return sessionStorage.getItem(RELOAD_KEY) === 'true';
  } catch {
    return false;
  }
}

function markReloaded(): void {
  try {
    sessionStorage.setItem(RELOAD_KEY, 'true');
  } catch {
    // ignore
  }
}

export default function ChunkReloadOnFailure() {
  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      const message = event?.message || '';
      if (!message) return;
      if (alreadyReloaded()) return;

      if (shouldReloadForErrorMessage(message)) {
        markReloaded();
        window.location.reload();
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (alreadyReloaded()) return;

      const reason: unknown = event?.reason;
      const message =
        typeof reason === 'string'
          ? reason
          : reason && typeof reason === 'object' && 'message' in reason
            ? String((reason as any).message)
            : '';

      if (!message) return;

      if (shouldReloadForErrorMessage(message)) {
        markReloaded();
        window.location.reload();
      }
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
