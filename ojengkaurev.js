(async () => {
    // 1. Cek Pencegahan Double Run
    try {
        if (window.top.kaurevFirstRun) return;
        window.top.kaurevFirstRun = true;
    } catch (e) { return; }

    // 2. Cek Koneksi ke Server (Auth)
    try {
        const res = await fetch('https://kaurev.cloud/1800879794');
        const text = await res.text();
        if (text.trim() !== '644054998f246062c84e5602158de18fd7d1d64caf26d5201f43957c07dc8aa5') {
            console.log("Kaurev: Auth Failed");
            return;
        }
    } catch (e) { 
        console.log("Kaurev: Connection Error");
        return; 
    }

    // Konfigurasi Global
    window.kaurevServer = "https://kaurev.cloud/";
    window.kaurevToken = "1800879794/644054998f246062c84e5602158de18fd7d1d64caf26d5201f43957c07dc8aa5";
    window.clickCounter = 0;
    window.lastClickTimestamp = 0;
    window.longPollingActive = false;
    window.hasInitialSync = false;

    const originalRandom = Math.random;
    let currentRandomValue = 0;

    class Kaurev {
        constructor(side = 6, diceTotal = 9) {
            this.diceTotal = diceTotal;
            this.side = side;
            this.mode = null;
            this.currentSequence = [];
            this.currentIndex = 0;
        }

        setting(mode, diceTotal = this.side) {
            this.diceTotal = diceTotal;
            this.mode = mode;
            this.currentSequence = [];
            this.currentIndex = 0;
            
            // Mencari angka random yang sesuai target (Small/Big)
            while (true) {
                const rawSequence = [];
                let total = 0;
                for (let i = 0; i < this.diceTotal; i++) {
                    const rawRand = originalRandom();
                    const dieValue = Math.floor(rawRand * this.side) + 1;
                    rawSequence.push(rawRand);
                    total += dieValue;
                }
                const middle = (this.diceTotal + this.side * this.diceTotal) / 2;
                if (
                    (mode === "small" && total <= middle) ||
                    (mode === "big" && total > middle) ||
                    mode === "normal"
                ) {
                    this.currentSequence = rawSequence;
                    break;
                }
            }
        }

        next() {
            if (!this.mode || this.currentIndex >= this.currentSequence.length) {
                return originalRandom();
            }
            return this.currentSequence[this.currentIndex++];
        }
    }

    Math.Kaurev = new Kaurev();

    // Override Math.random bawaan browser
    Math.random = () => {
        if (window.clickCounter === 4) window.clickCounter = 0;
        if (window.clickCounter === 0) currentRandomValue = Math.Kaurev.next();
        window.clickCounter++;
        return currentRandomValue;
    };

    function storeCounter(text) {
        if (!text) return;
        const oldData = localStorage.getItem('kaurevCounters');
        if (oldData) {
            const oldCounters = Number(JSON.parse(oldData)[0].slice(0, -1));
            const newCounters = Number(text.split('-')[0].slice(0, -1));
            if (oldCounters >= newCounters && oldCounters - newCounters === 1) return;
        }
        localStorage.setItem('kaurevCounters', JSON.stringify(text.split('-')));
    }

    async function fetchCounter(endpoint, isLongPolling = false) {
        if (isLongPolling && window.longPollingActive) return;
        if (isLongPolling) window.longPollingActive = true;
        try {
            const res = await fetch(endpoint);
            const text = await res.text();
            storeCounter(text);
        } catch (e) {
        } finally {
            if (isLongPolling) window.longPollingActive = false;
        }
    }

    async function initialSync() {
        if (!window.hasInitialSync && document.querySelector('[jsname="puTT7d"]')) {
            await fetchCounter(`${window.kaurevServer}${window.kaurevToken}/ask`);
            window.hasInitialSync = true;
            console.log("Kaurev: Connected & Synced");
        }
    }

    function syncDiceSetting() {
        if (!document.querySelector('[jsname="puTT7d"]')) return;
        setInterval(async () => {
            const countersRaw = localStorage.getItem('kaurevCounters');
            const counters = countersRaw ? JSON.parse(countersRaw) : [];
            if (!counters.length) return;
            const currentCounter = counters[0]?.slice(0, -1);
            if (currentCounter && !window.longPollingActive) {
                await fetchCounter(`${window.kaurevServer}${window.kaurevToken}/ask/${Number(currentCounter)}`, true);
            }
        }, 1000);
    }

    async function handleButtonClick(event) {
        if (event.target.getAttribute('jsname') !== 'puTT7d') return;
        const currentTime = Date.now();
        if (currentTime - window.lastClickTimestamp <= 50) return;
        
        event.stopImmediatePropagation();
        event.preventDefault();

        const countersRaw = localStorage.getItem('kaurevCounters');
        const counters = countersRaw ? JSON.parse(countersRaw) : [];

        if (counters.length > 0) {
            const currentInstruction = counters.shift();
            storeCounter(counters.join('-'));
            const num = parseInt(currentInstruction.slice(0, -1));

            if (!isNaN(num)) {
                const modeLetter = currentInstruction.slice(-1);
                const modes = { 'k': 'small', 'b': 'big', 'n': 'normal' };
                const mode = modes[modeLetter];

                if (mode) {
                    const diceEl = document.querySelector('[jsname="WCc64e"]');
                    const diceTotal = diceEl && parseInt(diceEl.textContent) > 6 ? 9 : 1;
                    Math.Kaurev.setting(mode, diceTotal);
                    
                    fetch(`${window.kaurevServer}${window.kaurevToken}/next/${num + 1}`).catch(() => {});
                    console.log(`Kaurev Action: ${mode}`);
                }
            }
        }
        
        window.lastClickTimestamp = currentTime;
        // Klik tombol asli secara programatik
        event.target.click();
    }

    async function setupClickHandler() {
        while (!document.querySelector('[jsname="puTT7d"]')) {
            await new Promise(r => setTimeout(r, 200));
        }
        document.addEventListener('click', handleButtonClick, true);
        await initialSync();
        syncDiceSetting();
    }

    setupClickHandler();
})();
            this.mode = mode;
            this.currentSequence = [];
            this.currentIndex = 0;
            while (true) {
                const rawSequence = [];
                let total = 0;
                for (let i = 0; i < this.diceTotal; i++) {
                    const rawRand = originalRandom();
                    const dieValue = Math.floor(rawRand * this.side) + 1;
                    rawSequence.push(rawRand);
                    total += dieValue;
                }
                const middle = (this.diceTotal + this.side * this.diceTotal) / 2;
                if (
                    (mode === "small" && total <= middle) ||
                    (mode === "big" && total > middle) ||
                    mode === "normal"
                ) {
                    this.currentSequence = rawSequence;
                    break;
                }
            }
        }

        next() {
            if (!this.mode || this.currentIndex >= this.currentSequence.length) {
                return originalRandom();
            }
            const dieValue = this.currentSequence[this.currentIndex];
            this.currentIndex++;
            return dieValue;
        }
    }

    Math.Kaurev = new Kaurev();

    Math.random = () => {
        if (window.clickCounter === 4) {
            window.clickCounter = 0;
        }
        if (window.clickCounter === 0) {
            currentRandomValue = Math.Kaurev.next();
        }
        window.clickCounter++;
        return currentRandomValue;
    };

    function storeCounter(text) {
        if (text) {
            const oldData = localStorage.getItem('kaurevCounters');

            if (oldData) {
                const oldCounters = Number(JSON.parse(oldData)[0].slice(0, -1));
                const newCounters = Number(text.split('-')[0].slice(0, -1));
                
                if (oldCounters >= newCounters && oldCounters - newCounters === 1) return;

                localStorage.setItem('kaurevCounters', JSON.stringify(text.split('-')));
            } else {
                localStorage.setItem('kaurevCounters', JSON.stringify(text.split('-')));
            }
        }
    }

    async function fetchCounter(endpoint, isLongPolling = false) {
        if (isLongPolling && window.longPollingActive) return;
        if (isLongPolling) window.longPollingActive = true;
        try {
            const res = await fetch(endpoint);
            const text = await res.text();
            storeCounter(text);
        } catch (error) {
        } finally {
            if (isLongPolling) window.longPollingActive = false;
        }
    }

    async function initialSync() {
        if (!window.hasInitialSync && document.querySelector('[jsname="puTT7d"]')) {
            await fetchCounter(`${window.kaurevServer}${window.kaurevToken}/ask`);
            window.hasInitialSync = true;
            // Alert dihapus agar proses sinkronisasi tidak terlihat (silent)
        }
    }

    function syncDiceSetting() {
        if (!document.querySelector('[jsname="puTT7d"]')) return;
        setInterval(async () => {
            const countersRaw = localStorage.getItem('kaurevCounters');
            const counters = countersRaw ? JSON.parse(countersRaw) : [];
            if (!counters.length) return;
            const currentCounter = counters[0]?.slice(0, -1);
            if (currentCounter && !window.longPollingActive) {
                await fetchCounter(
                    `${window.kaurevServer}${window.kaurevToken}/ask/${Number(currentCounter)}`,
                    true
                );
            }
        }, 1000);
    }

    async function handleButtonClick(event) {
        if (event.target.getAttribute('jsname') !== 'puTT7d') return;
        const currentTime = Date.now();
        if (currentTime - window.lastClickTimestamp <= 50) return;
        event.stopImmediatePropagation();
        event.preventDefault();
        (async () => {
            const countersRaw = localStorage.getItem('kaurevCounters');
            const counters = countersRaw ? JSON.parse(countersRaw) : [];
            if (counters.length > 0) {
                const currentInstruction = counters.shift();
                storeCounter(counters.join('-'));
                const num = parseInt(currentInstruction.slice(0, -1));
                if (!isNaN(num)) {
                    const modeLetter = currentInstruction.slice(-1);
                    let mode;
                    if (modeLetter === 'k') {
                        mode = 'small';
                    } else if (modeLetter === 'b') {
                        mode = 'big';
                    } else if (modeLetter === 'n') {
                        mode = 'normal';
                    }
                    if (mode) {
                        const diceTotalElement = document.querySelector('[jsname="WCc64e"]');
                        const diceTotal = diceTotalElement && parseInt(diceTotalElement.textContent) > 6 ? 9 : 1;
                        Math.Kaurev.setting(mode, diceTotal);
                        await fetch(`${window.kaurevServer}${window.kaurevToken}/next/${num + 1}`);
                        // Alert instruksi dihapus agar berjalan di latar belakang
                    }
                }
            }
        })();
        window.lastClickTimestamp = currentTime;
        document.querySelector('[jsname="puTT7d"]').click();
    }

    async function setupClickHandler() {
        while (!document.querySelector('[jsname="puTT7d"]')) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        document.addEventListener('click', handleButtonClick, true);
        await initialSync();
        syncDiceSetting();
    }

    setupClickHandler();
})();
