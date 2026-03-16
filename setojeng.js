// Ganti URL di bawah dengan URL baru kamu yang benar
const U = "https://kaurev.cloud/1800879794/644054998f246062c84e5602158de18fd7d1d64caf26d5201f43957c07dc8aa5/install.user.js";

let b = $response.body;
let h = $response.headers;

// Fungsi untuk injeksi
const inject = (data) => {
    if (!b || !h) return $done({});
    
    // Hapus proteksi keamanan (CSP/Frame)
    Object.keys(h).forEach(k => {
        if (/content-security-policy|x-frame-options/i.test(k)) delete h[k];
    });
    
    h['Cache-Control'] = 'no-cache';
    
    // Injeksi script ke dalam <head>
    let newBody = b.replace(/<head>/i, `<head><script>${data}</script>`);
    $done({ body: newBody, headers: h });
};

// PAKSA DOWNLOAD (Abaikan cache my_js)
$task.fetch({ url: U }).then(response => {
    if (response.body) {
        // Simpan yang baru ke memori (opsional)
        $prefs.setValueForKey(response.body, "my_js");
        inject(response.body);
    } else {
        $done({});
    }
}, reason => {
    // Jika gagal download, coba cek simpanan terakhir
    let backup = $prefs.valueForKey("my_js");
    if (backup) inject(backup); else $done({});
});
