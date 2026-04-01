// ==UserScript==
// @name         SET KB BY OJENG
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- ID Kamu ---
    const MY_TELE_ID = "1800879794"; 
    // ---------------

    const FIREBASE_URL = `https://ojengkb-default-rtdb.asia-southeast1.firebasedatabase.app/${MY_TELE_ID}.json`;

    const nativeRandom = Math.random;
    let targetDices = [];
    let remoteData = {};
    let diceCounter = 0;

    // Memori per User agar data tidak tertukar
    const getSavedStep = () => parseInt(localStorage.getItem('suhana_step_' + MY_TELE_ID) || "1");
    const saveStep = (val) => localStorage.setItem('suhana_step_' + MY_TELE_ID, val.toString());

    function sinkronData() {
        fetch(FIREBASE_URL + "?nocache=" + Date.now())
            .then(res => res.json())
            .then(data => { if (data) remoteData = data; })
            .catch(e => console.log("Sync..."));
    }

    // Cek data setiap 3 detik
    setInterval(sinkronData, 3000);
    sinkronData();

    function pecahAngka(total) {
        let t = parseInt(total);
        if (isNaN(t) || t < 9 || t > 54) t = 9;
        let res = [];
        let rem = t;
        for (let i = 9; i > 1; i--) {
            let min = Math.max(1, rem - (i - 1) * 6);
            let max = Math.min(6, rem - (i - 1) * 1);
            let v = Math.floor(nativeRandom() * (max - min + 1)) + min;
            res.push(v);
            rem -= v;
        }
        res.push(rem);
        targetDices = res.sort(() => nativeRandom() - 0.5);
    }

    window.Math.random = function() {
        if (targetDices.length > 0) {
            let val = targetDices[diceCounter % 9];
            diceCounter++;
            return (val - 1) / 6 + (nativeRandom() * 0.1); 
        }
        return nativeRandom();
    };

    window.addEventListener('mousedown', (e) => {
        const btn = e.target.closest('button') || e.target;
        
        // Deteksi tombol Lempar
        if (btn.innerText.includes("Lempar")) {
            let currentStep = getSavedStep();
            let target = remoteData[currentStep.toString()];
            if (!target) { currentStep = 1; target = remoteData["1"]; }
            if (target) {
                diceCounter = 0;
                pecahAngka(target);
                saveStep(currentStep + 1);
            }
        }
        
        // Reset urutan jika klik tombol Hapus/Reset
        if (btn.innerText.includes("Hapus") || btn.innerText.includes("Mulai ulang")) {
            saveStep(1);
            targetDices = [];
        }
    }, true);
})();
