let currentCount = parseInt(localStorage.getItem('wannarSteps')) || 0;
let timeLeft = 1500;
let timerActive = false;
let interval;

window.onload = () => {
    // رسم المربعات السابقة عند التحميل
    for (let i = 0; i < currentCount; i++) {
        drawBlock(i);
    }
    updateUI();
};

document.getElementById('buildBtn').onclick = () => {
    if (currentCount < 25) { // شبكة 5x5
        drawBlock(currentCount);
        currentCount++;
        localStorage.setItem('wannarSteps', currentCount);
        updateUI();
    }
};

function drawBlock(index) {
    const plane = document.getElementById('plane');
    const block = document.createElement('div');
    block.className = 'iso-block';
    
    // حساب الموقع بدقة في شبكة 5x5 (Grid System)
    const gap = 75; // المسافة بين المربعات
    const col = index % 5;
    const row = Math.floor(index / 5);

    block.style.left = (col * gap) + 'px';
    block.style.top = (row * gap) + 'px';
    block.innerText = index + 1;

    plane.appendChild(block);
}

function updateUI() {
    let p = Math.floor((currentCount / 25) * 100);
    document.getElementById('bar').style.width = p + "%";
    document.getElementById('percent').innerText = p + "% مكتمل";
}

// مؤقت التركيز
document.getElementById('startTimer').onclick = function() {
    if (!timerActive) {
        interval = setInterval(timerLogic, 1000);
        this.innerText = "توقف";
        timerActive = true;
    } else {
        clearInterval(interval);
        this.innerText = "استمرار";
        timerActive = false;
    }
};

function timerLogic() {
    if (timeLeft <= 0) {
        clearInterval(interval);
        alert("كفو! تم فتح منطقة جديدة في مخططك.");
        document.getElementById('buildBtn').click();
        timeLeft = 1500;
    }
    timeLeft--;
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    document.getElementById('clock').innerText = `${m}:${s < 10 ? '0'+s : s}`;
}

function resetAll() {
    if(confirm("مسح المخطط؟")) {
        localStorage.clear();
        location.reload();
    }
}
