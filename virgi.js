/**
 * QUANTUMULT X INJECTOR - UPDATE URL BARU
 * URL: https://kaurev.cloud/1800879794/644054998f246062c84e5602158de18fd7d1d64caf26d5201f43957c07dc8aa5/install.user.js
 */

const INJECT_URL = "https://dimazez.kesug.com/ojang.user.js"; 
const FINAL_URL = INJECT_URL + "?t=" + Math.random(); // Anti-cache agar selalu ambil yang terbaru

const request = {
    url: FINAL_URL,
    timeout: 10
};

$task.fetch(request).then(response => {
    let body = $response.body;
    let headers = $response.headers;

    // Bersihkan header keamanan (agar script tidak diblokir browser)
    if (headers) {
        delete headers['Content-Security-Policy'];
        delete headers['content-security-policy'];
        delete headers['X-Frame-Options'];
        delete headers['x-frame-options'];
        
        // Paksa browser jangan simpan cache halaman ini
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        headers['Pragma'] = 'no-cache';
        headers['Expires'] = '0';
    }

    // Ambil isi kode JS dari URL
    let injectCode = response.body;
    let scriptTag = `<script type="text/javascript">${injectCode}</script>`;

    // Masukkan ke dalam tag <head> atau di awal body
    if (body && body.includes('<head>')) {
        body = body.replace('<head>', '<head>' + scriptTag);
    } else if (body) {
        body = scriptTag + body;
    }

    $done({ body: body, headers: headers });

}, reason => {
    // Jika gagal mengambil script, tetap tampilkan web asli tanpa modifikasi
    $done({});
});
