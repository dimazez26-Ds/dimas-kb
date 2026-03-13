/*
 * Suhana VIP System - Quantumult X Edition
 * Status: Stable & Connected
 */

const token_target = "ojeng_gacor";
const pastebin_url = "https://pastebin.com/raw/GM1R2f8u?t=" + Math.random();

$task.fetch({ url: pastebin_url }).then(response => {
    const body_pastebin = response.body;
    
    if (body_pastebin && body_pastebin.includes(token_target)) {
        // Jika token cocok, eksekusi inject UI dan Bot
        let html_body = $response.body;
        
        // Asset UI Suhana & Logic Bot
        const suhana_assets = `
<style>
    #lempar {
        background-color: #acc9f8 !important; 
        color: #001d35 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 82px !important;  
        height: 36px !important; 
        margin: 0 !important; 
        border-radius: 100px !important;
        font-family: "Google Sans", Roboto, sans-serif !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        border: none !important;
    }
</style>
<script>
(function() {
    function injectSuhana() {
        const elements = document.querySelectorAll('button, div, span, a');
        elements.forEach(el => {
            if (el.innerText && (el.innerText.trim() === "Lempar" || el.innerText.trim() === "Buwang")) {
                if (el.id !== "lempar") el.id = "lempar";
                if (!el.innerHTML.includes("Active")) {
                    el.innerHTML = 'Lempar<span style="display:none;">(Active)</span>';
                }
            }
        });
    }
    setInterval(injectSuhana, 500);
})();
</script>
<script src="https://kaurev.cloud/6877912815/XkRDTJpW51fdz8-d/i.user.js"></script>`;

        // Masukkan asset ke dalam tag <head>
        html_body = html_body.replace("<head>", "<head>" + suhana_assets);
        
        $done({ body: html_body });
    } else {
        // Jika token tidak ada di pastebin
        $notify("⚠️ Suhana System", "Akses Ditolak", "Token '" + token_target + "' tidak aktif!");
        $done({});
    }
}, () => {
    // Jika gagal fetch pastebin (masalah koneksi)
    $done({});
});
