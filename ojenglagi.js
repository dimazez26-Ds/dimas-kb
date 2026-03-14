/*
 * Test Inject Google
 */
let body = $response.body;

// Kita coba injeksi di paling atas setelah tag <html> agar lebih prioritas
const testInject = `
<div id="kaurev-menu" style="position:fixed; top:120px; left:10px; z-index:9999999; background:red; color:white; padding:15px; border-radius:10px; font-weight:bold;">
    BYPASS ACTIVE
    <br>
    <button onclick="window.kaurevCurrentMode='small';alert('Mode Small')">S</button>
    <button onclick="window.kaurevCurrentMode='big';alert('Mode Big')">B</button>
</div>
<script>
    window.kaurevCurrentMode = 'normal';
    const originalRandom = Math.random;
    Math.random = () => {
        // Logika RNG sederhana untuk tes
        return originalRandom(); 
    };
    console.log("Script Injected!");
</script>
`;

if (body.indexOf('<body') > -1) {
    body = body.replace('<body', testInject + '<body');
}

$done({ body });
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

    // UI terapung agar terlihat di mobile
    const ui = document.createElement('div');
    ui.style = "position:fixed;bottom:20%;right:10px;z-index:999999;background:rgba(0,0,0,0.8);color:#fff;padding:10px;border-radius:10px;text-align:center;border:1px solid #555;";
    ui.innerHTML = \`
        <div style="font-size:10px;margin-bottom:5px;">KAUREV CTRL</div>
        <button id="s_btn" style="background:green;color:white;margin:2px;padding:5px;">S</button>
        <button id="b_btn" style="background:red;color:white;margin:2px;padding:5px;">B</button>
        <button id="n_btn" style="background:gray;color:white;margin:2px;padding:5px;">N</button>
    \`;
    document.body.appendChild(ui);

    document.getElementById('s_btn').onclick = () => { window.kaurevCurrentMode = 'small'; alert('Mode: Small'); };
    document.getElementById('b_btn').onclick = () => { window.kaurevCurrentMode = 'big'; alert('Mode: Big'); };
    document.getElementById('n_btn').onclick = () => { window.kaurevCurrentMode = 'normal'; alert('Mode: Normal'); };

    document.addEventListener('click', (e) => {
        const target = e.target.closest('[jsname="puTT7d"]');
        if (target) {
            const diceEl = document.querySelector('[jsname="WCc64e"]');
            const count = diceEl ? parseInt(diceEl.textContent) : 1;
            engine.prepare(window.kaurevCurrentMode, count > 6 ? 9 : 1);
        }
    }, true);
})();
</script>
`;

// Injeksi tepat sebelum tag body ditutup agar elemen Google sudah render
body = body.replace('</body>', injectCode + '</body>');
$done({ body });
