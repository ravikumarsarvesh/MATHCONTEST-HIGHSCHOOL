package com.matharena.waterlooprep

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.os.Bundle
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
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
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView

/**
 * Separate Activity for viewing CEMC papers and external content.
 * Opens as an overlay — user presses back or close to return to main app.
 * Main WebView state is fully preserved.
 */
class PaperViewerActivity : ComponentActivity() {

    private var webView: WebView? = null

    companion object {
        const val EXTRA_URL = "extra_url"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val url = intent.getStringExtra(EXTRA_URL) ?: run {
            finish(); return
        }
        enableEdgeToEdge()
        setContent {
            MaterialTheme {
                PaperViewerScreen(
                    url = url,
                    onClose = { finish() },
                    onWebViewCreated = { webView = it }
                )
            }
        }
    }

    @Deprecated("Use OnBackPressedDispatcher")
    override fun onBackPressed() {
        if (webView?.canGoBack() == true) {
            webView?.goBack()
        } else {
            @Suppress("DEPRECATION")
            super.onBackPressed()
        }
    }
}

private val Dark = Color(0xFF1A1A2E)
private val Mid = Color(0xFF16213E)
private val Gold = Color(0xFFFFD700)
private val TextSec = Color(0xFFA0AEC0)

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun PaperViewerScreen(
    url: String,
    onClose: () -> Unit,
    onWebViewCreated: (WebView) -> Unit
) {
    var isLoading by remember { mutableStateOf(true) }
    var pageTitle by remember { mutableStateOf("Loading…") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Dark)
    ) {
        // ── Top bar with close button and title ──
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Mid)
                .padding(horizontal = 8.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onClose) {
                Text("✕", color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Bold)
            }
            Spacer(Modifier.width(4.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = pageTitle,
                    color = Color.White,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = "cemc.uwaterloo.ca",
                    color = TextSec,
                    fontSize = 11.sp,
                    maxLines = 1
                )
            }
            if (isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(20.dp),
                    color = Gold,
                    strokeWidth = 2.dp
                )
                Spacer(Modifier.width(12.dp))
            }
        }

        // ── Loading bar ──
        if (isLoading) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(2.dp)
                    .background(Gold.copy(alpha = 0.6f))
            )
        }

        // ── WebView ──
        AndroidView(
            modifier = Modifier.fillMaxSize(),
            factory = { ctx ->
                WebView(ctx).apply {
                    settings.javaScriptEnabled = true
                    settings.domStorageEnabled = true
                    settings.databaseEnabled = true
                    settings.cacheMode = WebSettings.LOAD_DEFAULT
                    settings.setSupportZoom(true)
                    settings.builtInZoomControls = true
                    settings.displayZoomControls = false
                    settings.loadWithOverviewMode = true
                    settings.useWideViewPort = true
                    settings.mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
                    setLayerType(android.view.View.LAYER_TYPE_HARDWARE, null)

                    webViewClient = object : WebViewClient() {
                        override fun onPageStarted(view: WebView?, u: String?, fav: Bitmap?) {
                            isLoading = true
                        }

                        override fun onPageFinished(view: WebView?, u: String?) {
                            isLoading = false
                            pageTitle = view?.title ?: "Paper"
                        }

                        override fun onReceivedError(
                            view: WebView?, req: WebResourceRequest?, err: WebResourceError?
                        ) {
                            if (req?.isForMainFrame == true) isLoading = false
                        }

                        // Keep all navigation inside this viewer
                        override fun shouldOverrideUrlLoading(
                            view: WebView?, request: WebResourceRequest?
                        ): Boolean = false
                    }

                    setBackgroundColor(0xFFFFFFFF.toInt()) // papers have white bg
                    loadUrl(url)
                    onWebViewCreated(this)
                }
            }
        )
    }
}
