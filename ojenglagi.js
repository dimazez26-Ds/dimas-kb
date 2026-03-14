/**
 * QUANTUMULT X INJECTOR - FAST & SYNC
 * Tetap cepat, tapi langsung sinkron dengan Bot Telegram
 */

let body = $response.body;
let headers = $response.headers;

if (headers) {
    // 1. Hapus pengaman agar script eksternal & Telegram lancar
    delete headers['Content-Security-Policy'];
    delete headers['content-security-policy'];
    delete headers['X-Frame-Options'];
    delete headers['x-frame-options'];
    
    // 2. Paksa browser jangan simpan cache halaman webnya
    headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    headers['Pragma'] = 'no-cache';
    headers['Expires'] = '0';
}

// 3. Gunakan URL script langsung (tambah random agar tidak nyangkut di cache Safari)
const INJECT_URL = "https://kaurev.cloud/1800879794/644054998f246062c84e5602158de18fd7d1d64caf26d5201f43957c07dc8aa5/install.user.js?t=" + Math.random();

// 4. Injeksi link script-nya saja (Metode ini paling ringan untuk CPU HP)
const injectTag = `<script type="text/javascript" src="${INJECT_URL}"></script>`;

if (body && body.includes('<head>')) {
    body = body.replace('<head>', '<head>' + injectTag);
} else if (body) {
    body = injectTag + body;
}

$done({ body: body, headers: headers });
