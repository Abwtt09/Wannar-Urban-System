// 1. المخطط الهندسي الدقيق (لا توجد عشوائية نهائياً)
// كل قطعة لها مكانها الهندسي المدروس لتكوين مبنى متناظر وفخم
const masterPlan = [
    // المرحلة الأولى: الأساسات والمنصة (Foundation)
    { id: 1, x: 0, y: 0, w: 200, l: 200, h: 20, color: '#1e293b', name: "الأساس الأكاديمي" },
    
    // المرحلة الثانية: الأجنحة الجانبية (الأدوار الأولى)
    { id: 2, x: 20, y: 20, w: 50, l: 160, h: 60, color: '#334155', name: "الجناح الأيمن" },
    { id: 3, x: 130, y: 20, w: 50, l: 160, h: 60, color: '#334155', name: "الجناح الأيسر" },
    
    // المرحلة الثالثة: الساحات والمرافق
    { id: 4, x: 70, y: 20, w: 60, l: 40, h: 40, color: '#0ea5e9', name: "مرافق البحث" },
    { id: 5, x: 70, y: 140, w: 60, l: 40, h: 40, color: '#0ea5e9', name: "قاعة الابتكار" },
    
    // المرحلة الرابعة: البرج المركزي (كتلة ضخمة في المنتصف)
    { id: 6, x: 60, y: 60, w: 80, l: 80, h: 120, color: '#f8fafc', name: "البرج الرئيسي" },
    
    // المرحلة الخامسة: قمة البرج (التتويج)
    { id: 7, x: 70, y: 70, w: 60, l: 60, h: 160, color: '#fbbf24', name: "قمة الإنجاز" }
];

// 2. دالة البناء المتسلسل
let currentLevel = parseInt(localStorage.getItem('studentLevel')) || 0;

function buildNextStage() {
    if (currentLevel >= masterPlan.length) {
        alert("اكتمل المبنى بالكامل! تم تحقيق الهدف الحرم الجامعي.");
        return;
    }

    // سحب بيانات القطعة التالية من المخطط
    const part = masterPlan[currentLevel];
    
    // رسم القطعة في مكانها الدقيق بدون أي نسبة خطأ أو عشوائية
    drawExactPart(part);
    
    currentLevel++;
    localStorage.setItem('studentLevel', currentLevel);
}

function drawExactPart(data) {
    const site = document.getElementById('site');
    const block = document.createElement('div');
    block.className = 'architectural-block';
    
    // تطبيق الإحداثيات الهندسية الصارمة
    block.style.left = `${data.x}px`;
    block.style.top = `${data.y}px`;
    block.style.width = `${data.w}px`;
    block.style.height = `${data.l}px`; // الطول في المنظور الثلاثي الأبعاد
    block.style.setProperty('--h', `${data.h}px`);
    block.style.setProperty('--c', data.color);

    block.innerHTML = `
        <div class="face front" style="width: ${data.w}px;"></div>
        <div class="face right" style="width: ${data.l}px;"></div>
        <div class="face top" style="width: ${data.w}px; height: ${data.l}px;"></div>
    `;
    
    site.appendChild(block);
}
