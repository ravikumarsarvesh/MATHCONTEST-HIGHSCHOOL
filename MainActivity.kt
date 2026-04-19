package com.matharena.waterlooprep

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.Uri
import android.os.Bundle
import android.os.Message
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.browser.customtabs.CustomTabColorSchemeParams
import androidx.browser.customtabs.CustomTabsIntent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView

// ═══════════════════════════════════════════════════════════
// Theme colors
// ═══════════════════════════════════════════════════════════
private val Dark = Color(0xFF1A1A2E)
private val Mid = Color(0xFF16213E)
private val Accent = Color(0xFF0F3460)
private val Highlight = Color(0xFFE94560)
private val Gold = Color(0xFFFFD700)
private val CardBg = Color(0xFF1E2A45)
private val TextSecondary = Color(0xFFA0AEC0)

class MainActivity : ComponentActivity() {

    private var webView: WebView? = null

    companion object {
        private const val SITE_URL =
            "https://mathcontest-highschool.vercel.app/waterloo-math-contests.html"

        private val OAUTH_PATTERNS = listOf(
            "accounts.google.com", "accounts.youtube.com",
            "oauth2/auth", "oauth2/v2/auth", "signin/oauth",
            "login.microsoftonline.com", "appleid.apple.com",
            "github.com/login/oauth", "facebook.com/dialog/oauth",
            "api.twitter.com/oauth", "discord.com/oauth2",
            "auth0.com", "cognito-idp.", "login.live.com"
        )

        /** URLs that should open in the PaperViewer overlay */
        fun isPaperUrl(url: String): Boolean {
            val lower = url.lowercase()
            return lower.contains("cemc.uwaterloo.ca") ||
                    lower.contains("uwaterloo.ca/") ||
                    lower.contains("creativecommons.org")
        }

        fun isOAuthUrl(url: String): Boolean {
            val lower = url.lowercase()
            return OAUTH_PATTERNS.any { lower.contains(it) }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MaterialTheme {
                WebViewScreen(
                    url = SITE_URL,
                    onWebViewCreated = { webView = it }
                )
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        intent.data?.let { webView?.loadUrl(it.toString()) }
    }

    @Deprecated("Use OnBackPressedDispatcher")
    override fun onBackPressed() {
        if (webView?.canGoBack() == true) webView?.goBack()
        else @Suppress("DEPRECATION") super.onBackPressed()
    }
}

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════

fun isOnline(context: Context): Boolean {
    val cm = context.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager
        ?: return false
    val net = cm.activeNetwork ?: return false
    val caps = cm.getNetworkCapabilities(net) ?: return false
    return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
}

fun openInCustomTab(context: Context, url: String) {
    try {
        val colors = CustomTabColorSchemeParams.Builder()
            .setToolbarColor(0xFF1A1A2E.toInt())
            .setNavigationBarColor(0xFF1A1A2E.toInt())
            .build()
        CustomTabsIntent.Builder()
            .setDefaultColorSchemeParams(colors)
            .setShowTitle(true)
            .build()
            .launchUrl(context, Uri.parse(url))
    } catch (_: Exception) {
        try { context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url))) }
        catch (_: Exception) { }
    }
}

/** Open a URL in the PaperViewer overlay Activity */
fun openPaperViewer(context: Context, url: String) {
    try {
        val intent = Intent(context, PaperViewerActivity::class.java)
        intent.putExtra(PaperViewerActivity.EXTRA_URL, url)
        context.startActivity(intent)
    } catch (_: Exception) {
        // Fallback: load in same WebView
    }
}

// ═══════════════════════════════════════════════════════════
// Main WebView Screen
// ═══════════════════════════════════════════════════════════

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebViewScreen(url: String, onWebViewCreated: (WebView) -> Unit) {
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(true) }
    var hasError by remember { mutableStateOf(false) }
    var isOffline by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf("") }
    var currentWebView by remember { mutableStateOf<WebView?>(null) }
    var loadProgress by remember { mutableStateOf(0) }

    if (!isOnline(context) && isLoading && currentWebView == null) {
        isOffline = true
        isLoading = false
    }

    Box(modifier = Modifier.fillMaxSize().background(Dark)) {

        if (!isOffline || currentWebView != null) {
            AndroidView(
                modifier = Modifier.fillMaxSize(),
                factory = { ctx ->
                    WebView(ctx).apply {
                        settings.javaScriptEnabled = true
                        settings.domStorageEnabled = true
                        settings.databaseEnabled = true
                        settings.cacheMode = if (isOnline(ctx))
                            WebSettings.LOAD_DEFAULT
                        else
                            WebSettings.LOAD_CACHE_ELSE_NETWORK
                        settings.allowFileAccess = false
                        settings.allowContentAccess = false
                        settings.setSupportZoom(true)
                        settings.builtInZoomControls = true
                        settings.displayZoomControls = false
                        settings.loadWithOverviewMode = true
                        settings.useWideViewPort = true
                        settings.mediaPlaybackRequiresUserGesture = false
                        settings.javaScriptCanOpenWindowsAutomatically = true
                        settings.setSupportMultipleWindows(true) // needed for target=_blank
                        settings.mixedContentMode =
                            WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
                        setLayerType(android.view.View.LAYER_TYPE_HARDWARE, null)

                        webViewClient = object : WebViewClient() {
                            override fun onPageStarted(
                                view: WebView?, pageUrl: String?, favicon: Bitmap?
                            ) {
                                isLoading = true
                                hasError = false
                                isOffline = false
                                loadProgress = 10
                            }

                            override fun onPageFinished(view: WebView?, pageUrl: String?) {
                                isLoading = false
                                loadProgress = 100
                            }

                            override fun onReceivedError(
                                view: WebView?,
                                request: WebResourceRequest?,
                                error: WebResourceError?
                            ) {
                                if (request?.isForMainFrame == true) {
                                    isLoading = false
                                    val desc = error?.description?.toString() ?: ""
                                    if (desc.contains("ERR_INTERNET_DISCONNECTED", true) ||
                                        desc.contains("ERR_NAME_NOT_RESOLVED", true) ||
                                        desc.contains("ERR_ADDRESS_UNREACHABLE", true) ||
                                        !isOnline(ctx)
                                    ) {
                                        isOffline = true
                                        errorMessage = "No internet connection"
                                    } else {
                                        hasError = true
                                        errorMessage = desc.ifEmpty { "Failed to load page" }
                                    }
                                }
                            }

                            override fun shouldOverrideUrlLoading(
                                view: WebView?, request: WebResourceRequest?
                            ): Boolean {
                                val reqUrl = request?.url?.toString() ?: return false

                                // OAuth → Chrome Custom Tab
                                if (MainActivity.isOAuthUrl(reqUrl)) {
                                    openInCustomTab(ctx, reqUrl)
                                    return true
                                }

                                // CEMC papers / external educational links → PaperViewer overlay
                                if (MainActivity.isPaperUrl(reqUrl)) {
                                    openPaperViewer(ctx, reqUrl)
                                    return true
                                }

                                // mailto / tel → external
                                if (reqUrl.startsWith("mailto:") ||
                                    reqUrl.startsWith("tel:") ||
                                    reqUrl.startsWith("intent:")
                                ) {
                                    try {
                                        ctx.startActivity(
                                            Intent(Intent.ACTION_VIEW, Uri.parse(reqUrl))
                                        )
                                    } catch (_: Exception) { }
                                    return true
                                }

                                // Everything else (vercel.app, cdn, etc.) → stay in WebView
                                return false
                            }
                        }

                        // ── Handle target="_blank" links ──
                        // This is the KEY fix: when JS does window.open() or
                        // a link has target="_blank", WebView calls onCreateWindow.
                        // We intercept it and route to PaperViewer.
                        webChromeClient = object : WebChromeClient() {
                            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                                loadProgress = newProgress
                            }

                            override fun onCreateWindow(
                                view: WebView?,
                                isDialog: Boolean,
                                isUserGesture: Boolean,
                                resultMsg: Message?
                            ): Boolean {
                                // Extract the URL from the hit test result
                                val hitResult = view?.hitTestResult
                                val targetUrl = hitResult?.extra

                                if (targetUrl != null) {
                                    // Route to appropriate handler
                                    if (MainActivity.isOAuthUrl(targetUrl)) {
                                        openInCustomTab(ctx, targetUrl)
                                    } else if (MainActivity.isPaperUrl(targetUrl)) {
                                        openPaperViewer(ctx, targetUrl)
                                    } else {
                                        // Unknown target=_blank → open in PaperViewer
                                        // to keep user inside the app
                                        openPaperViewer(ctx, targetUrl)
                                    }
                                    return false // we handled it ourselves
                                }

                                // Fallback: create a temporary WebView to capture the URL
                                val transport = resultMsg?.obj as? WebView.WebViewTransport
                                if (transport != null) {
                                    val tempView = WebView(ctx)
                                    tempView.webViewClient = object : WebViewClient() {
                                        override fun shouldOverrideUrlLoading(
                                            v: WebView?, req: WebResourceRequest?
                                        ): Boolean {
                                            val u = req?.url?.toString() ?: return false
                                            if (MainActivity.isOAuthUrl(u)) {
                                                openInCustomTab(ctx, u)
                                            } else {
                                                openPaperViewer(ctx, u)
                                            }
                                            tempView.destroy()
                                            return true
                                        }
                                    }
                                    transport.webView = tempView
                                    resultMsg.sendToTarget()
                                    return true
                                }

                                return false
                            }
                        }

                        setBackgroundColor(0xFF1A1A2E.toInt())
                        loadUrl(url)
                        onWebViewCreated(this)
                        currentWebView = this
                    }
                }
            )
        }

        // Loading skeleton
        AnimatedVisibility(
            visible = isLoading && !hasError && !isOffline,
            enter = fadeIn(), exit = fadeOut()
        ) { LoadingSkeleton(loadProgress) }

        // Offline
        if (isOffline) {
            OfflineScreen(onRetry = {
                if (isOnline(context)) {
                    isOffline = false; isLoading = true
                    currentWebView?.reload() ?: run { isOffline = false }
                }
            })
        }

        // Error
        if (hasError && !isOffline) {
            ErrorScreen(message = errorMessage, onRetry = {
                hasError = false; isLoading = true
                currentWebView?.loadUrl(url)
            })
        }
    }
}

// ═══════════════════════════════════════════════════════════
// Loading skeleton
// ═══════════════════════════════════════════════════════════
@Composable
fun LoadingSkeleton(progress: Int) {
    val shimmer = rememberInfiniteTransition(label = "shimmer")
    val translateAnim by shimmer.animateFloat(
        initialValue = 0f, targetValue = 1000f,
        animationSpec = infiniteRepeatable(
            tween(1200, easing = LinearEasing), RepeatMode.Restart
        ), label = "shimmer"
    )
    val shimmerBrush = Brush.linearGradient(
        colors = listOf(CardBg, Color(0xFF2A3A55), CardBg),
        start = Offset(translateAnim - 200, 0f),
        end = Offset(translateAnim + 200, 0f)
    )

    Column(modifier = Modifier.fillMaxSize().background(Dark)) {
        // Progress bar
        Box(Modifier.fillMaxWidth().height(3.dp).background(Color(0xFF111825))) {
            Box(Modifier.fillMaxWidth(progress / 100f).height(3.dp)
                .background(Brush.horizontalGradient(listOf(Gold, Highlight))))
        }
        // Header
        Box(Modifier.fillMaxWidth().height(100.dp)
            .background(Brush.horizontalGradient(listOf(Accent, Highlight))),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("🏆", fontSize = 22.sp)
                Spacer(Modifier.height(4.dp))
                Box(Modifier.width(200.dp).height(18.dp).clip(RoundedCornerShape(4.dp)).background(shimmerBrush))
            }
        }
        // Tabs
        Row(Modifier.fillMaxWidth().background(Mid).padding(horizontal = 8.dp, vertical = 12.dp),
            horizontalArrangement = Arrangement.SpaceEvenly) {
            repeat(5) {
                Box(Modifier.width(if (it == 0) 70.dp else 56.dp).height(14.dp)
                    .clip(RoundedCornerShape(4.dp))
                    .background(if (it == 0) Brush.linearGradient(listOf(Gold.copy(alpha = 0.3f), Gold.copy(alpha = 0.3f))) else shimmerBrush))
            }
        }
        Spacer(Modifier.height(20.dp))
        // Cards
        Column(Modifier.padding(horizontal = 20.dp)) {
            repeat(3) { i ->
                val bc = when (i) { 0 -> Color(0xFF4CAF50); 1 -> Color(0xFF2196F3); else -> Color(0xFFFF9800) }
                Box(Modifier.fillMaxWidth().height(100.dp).padding(bottom = 12.dp)
                    .clip(RoundedCornerShape(12.dp)).background(CardBg).padding(16.dp),
                    contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Box(Modifier.width(70.dp).height(14.dp).clip(RoundedCornerShape(10.dp)).background(bc.copy(alpha = 0.4f)))
                        Spacer(Modifier.height(10.dp))
                        Box(Modifier.width(100.dp).height(18.dp).clip(RoundedCornerShape(4.dp)).background(shimmerBrush))
                        Spacer(Modifier.height(8.dp))
                        Box(Modifier.width(140.dp).height(12.dp).clip(RoundedCornerShape(4.dp)).background(shimmerBrush))
                    }
                }
            }
        }
        Spacer(Modifier.weight(1f))
        Column(Modifier.fillMaxWidth().padding(bottom = 40.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            CircularProgressIndicator(Modifier.size(28.dp), color = Gold, strokeWidth = 2.5.dp)
            Spacer(Modifier.height(8.dp))
            Text("Loading MathArena…", color = TextSecondary, fontSize = 13.sp)
        }
    }
}

// ═══════════════════════════════════════════════════════════
// Offline screen
// ═══════════════════════════════════════════════════════════
@Composable
fun OfflineScreen(onRetry: () -> Unit) {
    Box(Modifier.fillMaxSize().background(Dark), contentAlignment = Alignment.Center) {
        Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.padding(40.dp)) {
            Box(Modifier.size(80.dp).clip(CircleShape).background(CardBg), contentAlignment = Alignment.Center) {
                Text("📡", fontSize = 36.sp)
            }
            Spacer(Modifier.height(24.dp))
            Text("You're Offline", color = Color.White, fontSize = 22.sp, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(8.dp))
            Text("MathArena needs an internet connection\nto load contest materials.",
                color = TextSecondary, fontSize = 14.sp, textAlign = TextAlign.Center, lineHeight = 22.sp)
            Spacer(Modifier.height(32.dp))
            Button(onClick = onRetry, colors = ButtonDefaults.buttonColors(containerColor = Highlight),
                shape = RoundedCornerShape(10.dp), modifier = Modifier.fillMaxWidth(0.6f).height(48.dp)) {
                Text("Retry", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            }
            Spacer(Modifier.height(16.dp))
            Text("🏆 MathArena – Waterloo Prep", color = TextSecondary.copy(alpha = 0.4f), fontSize = 12.sp)
        }
    }
}

// ═══════════════════════════════════════════════════════════
// Error screen
// ═══════════════════════════════════════════════════════════
@Composable
fun ErrorScreen(message: String, onRetry: () -> Unit) {
    Box(Modifier.fillMaxSize().background(Dark), contentAlignment = Alignment.Center) {
        Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.padding(40.dp)) {
            Text("⚠️", fontSize = 48.sp)
            Spacer(Modifier.height(16.dp))
            Text("Something went wrong", color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(8.dp))
            Text(message, color = TextSecondary, fontSize = 13.sp, textAlign = TextAlign.Center)
            Spacer(Modifier.height(24.dp))
            Button(onClick = onRetry, colors = ButtonDefaults.buttonColors(containerColor = Highlight),
                shape = RoundedCornerShape(10.dp)) {
                Text("Retry", fontWeight = FontWeight.Bold)
            }
        }
    }
}
