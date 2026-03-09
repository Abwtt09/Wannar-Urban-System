const totalSteps = 20; // خريطة من 20 خطوة
let currentProgress = parseInt(localStorage.getItem('wannar2dProgress')) || 0;
let timeLeft = 1500;
let timerRunning = false;
let timerInterval;

window.onload = () => {
    initGrid();
    updateUI();
};

function initGrid() {
    const grid = document.getElementById('achievementMap');
    grid.innerHTML = '';
    for (let i = 1; i <= totalSteps; i++) {
        const box = document.createElement('div');
        box.className = 'step-box';
        box.id = `step-${i}`;
        box.innerText = i;
        grid.appendChild(box);
    }
}

document.getElementById('addStepBtn').onclick = () => {
    if (currentProgress < totalSteps) {
        currentProgress++;
        localStorage.setItem('wannar2dProgress', currentProgress);
        updateUI();
    }
};

function updateUI() {
    for (let i = 1; i <= totalSteps; i++) {
        const box = document.getElementById(`step-${i}`);
        if (i <= currentProgress) {
            box.classList.add('active');
            box.innerHTML = '✔';
        } else {
            box.classList.remove('active');
            box.innerHTML = i;
        }
    }
    let percent = Math.floor((currentProgress / totalSteps) * 100);
    document.getElementById('progressBar').style.width = percent + "%";
    document.getElementById('progressText').innerText = percent + "% مكتمل";
}

// نظام المؤقت البسيط
document.getElementById('timerBtn').onclick = function() {
    if (!timerRunning) {
        timerInterval = setInterval(runTimer, 1000);
        this.innerText = "إيقاف";
        timerRunning = true;
    } else {
        clearInterval(timerInterval);
        this.innerText = "استمرار";
        timerRunning = false;
    }
};

function runTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("إنجاز رائع! تم فتح خطوة جديدة في خريطتك.");
        document.getElementById('addStepBtn').click();
        timeLeft = 1500;
    }
    timeLeft--;
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    document.getElementById('timerDisplay').innerText = `${m}:${s < 10 ? '0'+s : s}`;
}

function resetData() {
    if(confirm("هل تريد البدء من جديد؟")) {
        localStorage.clear();
        location.reload();
    }
}
