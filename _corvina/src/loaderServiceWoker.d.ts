export declare function enableDataCaching(enabled: boolean): void;
export declare function keepServiceWorkerAlive(): void;
export declare function stopKeepServiceWorkerAlive(): void;
export declare function setServiceWorkerRealm(realm: string): void;
/**
 * Start a per-tab heartbeat to the SW. Called once per tab from main.ts so the SW
 * can count alive tabs of the site (not just VPN-page tabs) and only fire the VPN
 * stop when the last one closes. The interval lives for the whole tab lifetime;
 * the browser tears it down on unload, so no explicit stop is needed.
 */
export declare function startTabHeartbeat(): void;
export declare function sendTabClosed(): void;
/**
 * Inform the SW about VPN-page-specific state. Called by CompanionAppStatusBar
 * while the user is on the VPN page so the SW knows the local app base URL and
 * whether the VPN was actually connected during the session.
 */
export declare function sendVpnPageInfo(baseURL: string, vpnConnected: boolean): void;
/**
 * Register the service worker and silently apply any update found.
 *
 * Update flow:
 *   - On every page load we force `registration.update()` so the browser
 *     re-fetches `service-worker.js` (no Firefox HTTP cache stalling).
 *   - When a new SW becomes `installed`, we immediately post SKIP_WAITING.
 *   - The new SW activates and calls `clients.claim()` (see service-worker.ts),
 *     so it takes over fetch handling for the current page right away.
 *   - The page itself is NOT auto-reloaded: the user keeps using the current JS
 *     bundle and picks up the new one on their next manual reload/navigation.
 */
export declare function loadServiceWorker(): void;
