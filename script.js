// 1. المخطط المعماري - إحداثيات ثابتة لبناء "صرح ونار"
const masterPlan = [
    { x: 50,  y: 50,  w: 100, h: 40,  color: '#1e293b' }, // القاعدة
    { x: 150, y: 50,  w: 100, h: 40,  color: '#1e293b' }, // تمدد القاعدة
    { x: 50,  y: 150, w: 100, h: 40,  color: '#1e293b' },
    { x: 150, y: 150, w: 100, h: 40,  color: '#1e293b' },
    { x: 70,  y: 70,  w: 60,  h: 120, color: '#0ea5e9' }, // البرج الأول
    { x: 170, y: 70,  w: 60,  h: 120, color: '#0ea5e9' }, // البرج الثاني
    { x: 120, y: 120, w: 60,  h: 200, color: '#f8fafc' }, // البرج الرئيسي الفخم
    { x: 130, y: 130, w: 40,  h: 240, color: '#fbbf24' }  // قمة الإنجاز
];

let currentStep = parseInt(localStorage.getItem('wannarProgress')) || 0;
let timeLeft = 1500;
let timerInterval;

// تهيئة النظام
window.onload = () => {
    renderExistingBuildings();
    updateUI();
};

function renderExistingBuildings() {
    for (let i = 0; i < currentStep; i++) {
        createBuildingElement(masterPlan[i], i);
    }
}

function createBuildingElement(data, index) {
    const grid = document.getElementById('cityGrid');
    const block = document.createElement('div');
    block.className = 'block visible';
    block.style.left = data.x + 'px';
    block.style.top = data.y + 'px';
    block.style.setProperty('--w', data.w + 'px');
    block.style.setProperty('--h', data.h + 'px');
    block.style.setProperty('--c', data.color);

    block.innerHTML = `
        <div class="face front" style="width:${data.w}px"></div>
        <div class="face right" style="width:${data.w}px"></div>
        <div class="face top" style="width:${data.w}px"></div>
    `;
    grid.appendChild(block);
}

// إضافة إنجاز جديد
document.getElementById('addProgressBtn').onclick = () => {
    if (currentStep < masterPlan.length) {
        createBuildingElement(masterPlan[currentStep], currentStep);
        currentStep++;
        localStorage.setItem('wannarProgress', currentStep);
        updateUI();
    } else {
        alert("مبروك! لقد أتممت بناء الصرح التعليمي بالكامل.");
    }
};

function updateUI() {
    let percentage = Math.floor((currentStep / masterPlan.length) * 100);
    document.getElementById('progressBar').style.width = percentage + "%";
    document.getElementById('progressText').innerText = percentage + "% مكتمل";
}

// نظام المؤقت
document.getElementById('timerBtn').onclick = function() {
    if (this.innerText === "ابدأ جلسة التركيز") {
        this.innerText = "توقف";
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        clearInterval(timerInterval);
        this.innerText = "ابدأ جلسة التركيز";
    }
};

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("انتهى الوقت! قطعة جديدة تضاف لمدينتك.");
        document.getElementById('addProgressBtn').click();
        timeLeft = 1500;
    }
    timeLeft--;
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    document.getElementById('timerDisplay').innerText = `${m}:${s < 10 ? '0'+s : s}`;
}

function resetSystem() {
    if(confirm("سيتم مسح كل تقدمك، هل أنت متأكد؟")) {
        localStorage.clear();
        location.reload();
    }
}
