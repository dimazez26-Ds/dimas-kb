const U = "https://kaurev.cloud/1800879794/644054998f246062c84e5602158de18fd7d1d64caf26d5201f43957c07dc8aa5/install.user.js";
const K = "my_js";

let c = $prefs.valueForKey(K);
let b = $response.body;
let h = $response.headers;

const f = d => {
    if (!b || !h) return $done({});
    Object.keys(h).forEach(k => {
        if (/content-security-policy|x-frame-options/i.test(k)) delete h[k];
    });
    h['Cache-Control'] = 'no-cache';
    // Identik dengan Surge: replace <head> dengan <head><script>content</script>
    $done({ body: b.replace(/<head>/i, `<head><script>${d}</script>`), headers: h });
};

if (c) {
    f(c);
} else {
    $task.fetch({ url: U }).then(response => {
        if (response.body) {
            $prefs.setValueForKey(response.body, K);
            f(response.body);
        } else {
            $done({});
        }
    }, reason => {
        $done({});
    });
}
