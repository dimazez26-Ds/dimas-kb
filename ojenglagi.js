/**
 * Quantumult X Script for JS Injection
 */

const U = "https://kaurev.cloud/6877912815/a76e2226e40ed42df1c52fb48857196e4d770086ce0bb67cdb1e78b8fb27cc04/install.user.js";
const K = "my_js";

let cachedJS = $prefs.valueForKey(K);
let { body, headers } = $response;

const finalize = (jsContent) => {
    if (!body || !headers) {
        $done({});
        return;
    }

    // Hapus CSP dan Frame Options agar script bisa jalan
    Object.keys(headers).forEach(k => {
        if (/content-security-policy|x-frame-options/i.test(k)) {
            delete headers[k];
        }
    });

    headers['Cache-Control'] = 'no-cache';

    // Inject script ke dalam tag <head>
    let newBody = body.replace(/<head>/i, `<head><script>${jsContent}</script>`);
    
    $done({ body: newBody, headers: headers });
};

if (cachedJS) {
    finalize(cachedJS);
} else {
    const request = { url: U };
    $task.fetch(request).then(response => {
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
