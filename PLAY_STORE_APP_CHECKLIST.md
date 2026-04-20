# 🚀 Google Play Store — WebView App Checklist

**Standard template for every Android WebView app before creating AAB/APK.**
Use this as a mandatory pre-flight checklist. Every item must be ✅ before building a release.

---

## 1. AndroidManifest.xml

- [ ] `<uses-permission android:name="android.permission.INTERNET"/>` present
- [ ] `<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>` present
- [ ] `android:usesCleartextTraffic="true"` on `<application>` tag
- [ ] `android:configChanges="orientation|screenSize|keyboardHidden"` on main Activity (prevents WebView reload on rotation)
- [ ] Theme set to a no-action-bar theme (e.g. `@style/Theme.Material3.DayNight.NoActionBar`)
- [ ] All Activities registered (main + any overlay like PaperViewer)
- [ ] `android:exported="true"` on launcher Activity
- [ ] App label uses `@string/app_name` (not hardcoded)

---

## 2. build.gradle.kts (Module: app)

- [ ] `namespace` matches your package (e.g. `com.yourapp.name`)
- [ ] `applicationId` matches namespace
- [ ] `minSdk = 23` or higher (covers 99%+ devices, required by many libraries)
- [ ] `targetSdk` = latest stable (currently 36)
- [ ] `compileSdk` = latest stable (currently 36)
- [ ] `versionCode` incremented from last Play Store upload (Play rejects same or lower)
- [ ] `versionName` updated to match
- [ ] `implementation(libs.androidx.browser)` included (for Chrome Custom Tabs / OAuth)
- [ ] Compose dependencies present if using Jetpack Compose
- [ ] No broken `compileSdk` syntax (use `compileSdk = 36`, not block syntax)

---

## 3. Package Name Consistency

- [ ] `build.gradle.kts` namespace = applicationId
- [ ] `AndroidManifest.xml` activity name resolves to correct package
- [ ] `MainActivity.kt` package declaration matches namespace
- [ ] All other `.kt` files have correct package declaration
- [ ] Test files (`src/test/`, `src/androidTest/`) use correct package
- [ ] No leftover `com.example.*` references anywhere in source (check with grep)
- [ ] Old package directories deleted (e.g. `com/example/` folders)

---

## 4. WebView Configuration (MainActivity.kt)

### Core Settings (ALL required)
- [ ] `settings.javaScriptEnabled = true`
- [ ] `settings.domStorageEnabled = true`
- [ ] `settings.databaseEnabled = true`
- [ ] `settings.setSupportZoom(true)`
- [ ] `settings.builtInZoomControls = true`
- [ ] `settings.displayZoomControls = false` (hide ugly zoom buttons)
- [ ] `settings.loadWithOverviewMode = true`
- [ ] `settings.useWideViewPort = true`
- [ ] `settings.javaScriptCanOpenWindowsAutomatically = true`
- [ ] `settings.setSupportMultipleWindows(true)` (required for target=_blank links)
- [ ] `settings.mixedContentMode = MIXED_CONTENT_COMPATIBILITY_MODE`
- [ ] `settings.allowFileAccess = false` (security)
- [ ] `settings.allowContentAccess = false` (security)

### Performance
- [ ] `setLayerType(LAYER_TYPE_HARDWARE, null)` for GPU acceleration
- [ ] Cache mode: `LOAD_DEFAULT` when online, `LOAD_CACHE_ELSE_NETWORK` when offline
- [ ] Background color matches app theme (prevents white flash)

### WebViewClient (ALL required)
- [ ] `shouldOverrideUrlLoading` implemented
- [ ] OAuth URLs detected and opened in Chrome Custom Tabs (not WebView)
- [ ] `mailto:`, `tel:`, `intent:` links opened externally
- [ ] Same-domain links stay inside WebView
- [ ] `onPageStarted` / `onPageFinished` for loading state
- [ ] `onReceivedError` with main-frame check for error handling

### WebChromeClient (ALL required for target=_blank)
- [ ] `onCreateWindow` implemented to handle `target="_blank"` links
- [ ] `onProgressChanged` for load progress tracking
- [ ] target=_blank links routed to PaperViewer or same WebView (NOT external browser)

---

## 5. OAuth / Google Sign-In Handling

- [ ] OAuth URL patterns detected: `accounts.google.com`, `oauth2/auth`, etc.
- [ ] OAuth URLs opened in Chrome Custom Tabs (prevents `403: disallowed_useragent`)
- [ ] `androidx.browser` dependency added for CustomTabsIntent
- [ ] Fallback to `Intent.ACTION_VIEW` if Custom Tabs unavailable
- [ ] Custom Tab toolbar color matches app theme
- [ ] `onNewIntent` handles deep link callback after OAuth

---

## 6. Navigation & Back Button

- [ ] `onBackPressed` checks `webView.canGoBack()` before exiting
- [ ] WebView back history preserved (no unnecessary reloads)
- [ ] Tab/panel switching preserves WebView state (show/hide, not destroy/recreate)
- [ ] External content (papers, docs) opens in overlay Activity, not replacing main WebView
- [ ] PaperViewerActivity (or equivalent) has its own back navigation

---

## 7. Loading UX

- [ ] Loading skeleton or spinner shown while page loads
- [ ] Progress bar showing actual load percentage
- [ ] Loading overlay fades out smoothly (AnimatedVisibility)
- [ ] No white flash on app launch (background color set before WebView loads)

---

## 8. Offline Handling

- [ ] Network connectivity check on launch (`ConnectivityManager`)
- [ ] Dedicated offline screen with retry button
- [ ] WebView errors (`ERR_INTERNET_DISCONNECTED`, `ERR_NAME_NOT_RESOLVED`) detected
- [ ] Retry button checks connectivity before reloading
- [ ] Cache mode falls back to `LOAD_CACHE_ELSE_NETWORK` when offline

---

## 9. Error Handling

- [ ] Generic error screen for non-offline failures
- [ ] Error message displayed to user
- [ ] Retry button available
- [ ] App never crashes on error (all error paths handled gracefully)
- [ ] No unhandled exceptions in WebViewClient callbacks

---

## 10. URL Configuration

- [ ] Using PRODUCTION Vercel URL (not preview/branch deployment)
- [ ] Preview URLs (`...-hash-username.vercel.app`) have Vercel auth → causes 403 in WebView
- [ ] Production URL format: `https://project-name.vercel.app/`
- [ ] URL points to correct page (e.g. `/waterloo-math-contests.html` or `/index.html`)
- [ ] URL is HTTPS (not HTTP)

---

## 11. Theme & Branding

- [ ] `strings.xml`: `app_name` set to your app name (not default template name)
- [ ] `themes.xml`: window/status/nav bar colors match your app
- [ ] App icon set in `mipmap` folders (all sizes: 72, 96, 128, 144, 152, 192, 384, 512)
- [ ] Round icon variant provided
- [ ] Splash/loading screen colors match app theme

---

## 12. Web App Fixes (Before Wrapping in WebView)

- [ ] Practice test timer works continuously (not reset by DOM changes)
- [ ] Selected answers persist when navigating between questions
- [ ] MathJax typeset doesn't strip CSS classes (call `restoreSelections()` after typeset)
- [ ] `target="_blank"` links work (handled by WebView's `onCreateWindow`)
- [ ] localStorage works for saving progress
- [ ] Service worker registered for offline caching
- [ ] Privacy policy page exists and is accessible

---

## 13. Play Store Listing Requirements

### Store Listing
- [ ] App name (max 30 chars)
- [ ] Short description (max 80 chars)
- [ ] Full description (max 4000 chars)
- [ ] App icon: 512×512 PNG
- [ ] Feature graphic: 1024×500 PNG or JPEG
- [ ] Phone screenshots: 2-8 images, 9:16 ratio, min 1080px per side
- [ ] 7-inch tablet screenshots: 2-8 images (if targeting tablets)
- [ ] 10-inch tablet screenshots: 2-8 images (if targeting tablets)

### App Content (required before review)
- [ ] Privacy Policy URL set (must be publicly accessible)
- [ ] Content Rating questionnaire completed
- [ ] Target Audience declaration completed
- [ ] Data Safety form completed (declare "no data collected" if applicable)
- [ ] App category selected (e.g. Education)

### Testing
- [ ] Closed testing track created
- [ ] AAB uploaded to closed testing
- [ ] 12+ testers added (Gmail addresses)
- [ ] Opt-in link shared with all testers
- [ ] Testers have accepted and installed
- [ ] 14-day closed testing period completed (for new developer accounts)

---

## 14. Pre-Build Final Checks

- [ ] `git status` clean (all changes committed)
- [ ] Build → Clean Project (clears stale cache)
- [ ] Build → Rebuild Project (0 errors)
- [ ] Run on real device — app loads, no crash
- [ ] Test: timer works in practice test
- [ ] Test: answers persist between questions
- [ ] Test: paper links open in overlay (not external browser)
- [ ] Test: back button navigates within app
- [ ] Test: offline screen shows when disconnected
- [ ] Generate Signed App Bundle (release variant)
- [ ] Verify versionCode is higher than last upload

---

## Quick Reference: Common Crashes & Fixes

| Crash | Fix |
|-------|-----|
| App crashes on launch | Missing INTERNET permission in AndroidManifest.xml |
| Blank white screen | Wrong URL or missing `javaScriptEnabled = true` |
| `403: disallowed_useragent` | Using preview Vercel URL, or OAuth in WebView (use Custom Tabs) |
| `Manifest merger failed: minSdk` | Bump `minSdk` to match library requirement (usually 23) |
| Links open in external browser | Missing `shouldOverrideUrlLoading` or `onCreateWindow` |
| Timer resets / answers lost | MathJax stripping DOM classes — call `restoreSelections()` after typeset |
| "Can't download" on Play Store | Tester hasn't opted in, or release still processing (wait 1-3 hours) |
| Build fails: unresolved reference | Missing import statement in Kotlin file |

---

## Prompt Template for New App

Copy this when starting a new WebView app project:

```
Create an Android WebView app with these requirements:
- Package name: com.yourcompany.appname
- Target URL: https://your-site.vercel.app
- minSdk: 23, targetSdk: 36
- INTERNET + ACCESS_NETWORK_STATE permissions
- WebView with: JS enabled, DOM storage, zoom, hardware acceleration
- OAuth detection → Chrome Custom Tabs (not WebView)
- target="_blank" handling via onCreateWindow → overlay Activity
- Back button: webView.canGoBack() before exit
- Loading skeleton matching app theme
- Offline detection with retry screen
- Error screen with retry button
- Dark theme matching web app colors
- PaperViewerActivity for external content overlay
- localStorage persistence for app state
- versionCode: 1, versionName: "1.0"
- Ready for signed release AAB generation
```

---

*Last updated: April 2026*
*Based on lessons learned from MathArena – Waterloo Prep Play Store submission*
