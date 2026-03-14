/**
 * QUANTUMULT X INJECTOR - ULTRA FAST LOAD
 * Memasukkan script yang sudah ter-cache secara lokal
 */

let body = $response.body;
let headers = $response.headers;

// Hapus proteksi keamanan agar script tidak diblokir
if (headers) {
    delete headers['Content-Security-Policy'];
    delete headers['content-security-policy'];
    delete headers['X-Frame-Options'];
    delete headers['x-frame-options'];
}

// URL Script utama Anda (Gunakan format tag script src)
const injectCode = '<script src="https://kaurev.cloud/1800879794/644054998f246062c84e5602158de18fd7d1d64caf26d5201f43957c07dc8aa5/install.user.js"></script>';

// Injeksi instan
if (body && body.includes('<head>')) {
    $done({ body: body.replace('<head>', '<head>' + injectCode), headers: headers });
} else {
    $done({ body: injectCode + body, headers: headers });
}        body = body.replace('<head>', '<head>' + scriptTag);
    } else if (body) {
        body = scriptTag + body;
    }

    $done({ body: body, headers: headers });

}, reason => {
    // Jika gagal mengambil script, tetap tampilkan web asli tanpa modifikasi
    $done({});
});
