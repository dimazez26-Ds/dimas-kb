/*
 * Kaurev Offline Bypass for Quantumult X
 * Deskripsi: Memodifikasi Math.random secara lokal tanpa token/server.
 */

let body = $response.body;

// Kode ini akan disisipkan ke bagian paling atas halaman HTML
const injectCode = `
<script>
(function() {
    console.log("Kaurev Offline Bypass Loaded via QuanX");
    window.kaurevCurrentMode = "normal";
    const originalRandom = Math.random;
    let currentRandomValue = 0;
    let clickCounter = 0;

    class KaurevEngine {
        constructor(side = 6) {
            this.side = side;
            this.currentSequence = [];
            this.currentIndex = 0;
        }
        prepare(mode, diceTotal = 1) {
            this.currentIndex = 0;
            this.currentSequence = [];
            while (true) {
                const rawSequence = [];
                let total = 0;
                for (let i = 0; i < diceTotal; i++) {
                    const rawRand = originalRandom();
                    const dieValue = Math.floor(rawRand * this.side) + 1;
                    rawSequence.push(rawRand);
                    total += dieValue;
                }
                const middle = (diceTotal + this.side * diceTotal) / 2;
                if ((mode === "small" && total <= middle) || (mode === "big" && total > middle) || mode === "normal") {
                    this.currentSequence = rawSequence;
                    break;
                }
            }
        }
        next() {
            if (this.currentIndex >= this.currentSequence.length) return originalRandom();
            return this.currentSequence[this.currentIndex++];
        }
    }

    const engine = new KaurevEngine();
    Math.random = () => {
        if (clickCounter === 4) clickCounter = 0;
        if (clickCounter === 0) currentRandomValue = engine.next();
        clickCounter++;
        return currentRandomValue;
    };

    // UI Controller
    const ui = document.createElement('div');
    ui.style = "position:fixed;top:50px;left:10px;z-index:99999;background:#222;color:#fff;padding:8px;border-radius:5px;font-size:10px;border:1px solid #444;";
    ui.innerHTML = \`
        <b>CTRL</b><br>
        <button onclick="window.kaurevCurrentMode='small';alert('Mode: Small')">S</button>
        <button onclick="window.kaurevCurrentMode='big';alert('Mode: Big')">B</button>
        <button onclick="window.kaurevCurrentMode='normal';alert('Mode: Norm')">N</button>
    \`;
    document.documentElement.appendChild(ui);

    document.addEventListener('click', (e) => {
        if (e.target.getAttribute('jsname') === 'puTT7d') {
            const diceEl = document.querySelector('[jsname="WCc64e"]');
            const diceTotal = diceEl && parseInt(diceEl.textContent) > 6 ? 9 : 1;
            engine.prepare(window.kaurevCurrentMode, diceTotal);
        }
    }, true);
})();
</script>
`;

// Memasukkan script ke dalam tag <head> atau sebelum <html>
body = body.replace('<head>', '<head>' + injectCode);

$done({ body });
