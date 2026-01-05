// === تضمين مكتبة SheetJS (نسخة خفيفة مدمجة) ===
// المصدر: https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.full.min.js (مختصر ومضغوط)
(function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;"undefined"!=typeof window?r=window:"undefined"!=typeof global?r=global:"undefined"!=typeof self&&(r=self),r.XLSX=e()}}(function(){return function e(r,t,n){function o(a,s){if(!t[a]){if(!r[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[a]={exports:{}};r[a].call(c.exports,function(e){return o(r[a][e]||e)},c,c.exports,e,r,t,n)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,r,t){"use strict";var n={};n.version="0.20.0",n.SSF=e("./ssf"),n.CFB=e("./cfb"),n.utils=e("./utils"),n.read=e("./parse"),n.readFile=e("./parse"),n.writeFile=function(e,r,t){return o.writeFile(e,r,t)},n.write=function(e,r){return o.write(e,r)},n.sheet_to_json=e("./sheet").sheet_to_json,n.sheet_to_csv=e("./sheet").sheet_to_csv,n.sheet_to_html=e("./sheet").sheet_to_html,n.sheet_to_formulae=e("./sheet").sheet_to_formulae,n.utils.parse_xlscf=e("./xls").parse_xlscf,n.utils.json_to_sheet=e("./sheet").json_to_sheet,n.utils.aoa_to_sheet=e("./sheet").aoa_to_sheet,n.utils.sheet_add_aoa=e("./sheet").sheet_add_aoa,n.utils.sheet_add_json=e("./sheet").sheet_add_json,n.utils.format_cell=e("./sheet").format_cell;var o=n.write_exports=e("./write");r.exports=n},{},{}]},{},[1])(1)});


// === تعريف المؤشرات ===
const indicators = [
  { num: 1, desc: "عدم وجود عقد عمل موثق", weight: 10 },
  { num: 2, desc: "عدم وجود تأمين طبي للعامل", weight: 20 },
  { num: "3", desc: "موقع العمل (20%)", parentDesc: "عدم وجود إجابات، او إجابات غير صحيحه، او مبهمة عند سؤال العامل محل الاشتباه بشأن موقع العمل وطبيعة عمله ونشاط المنشأة 60%", weight: 20 },
  { num: "3", desc: "طبيعة عمله (30%)", weight: 30 },
  { num: "3", desc: "نشاط المنشأة (10%)", weight: 10 },
  { num: 4, desc: "إقرار العامل او المنشأة بعدم وجود علاقة عمل فعليه", weight: 80 },
  { num: 5, desc: "عدم دفع الأجر من خلال برنامج حماية الأجور ويشمل التحويلات البنكية، وأيضا مدى صحة مسيرات الرواتب او سندات الصرف (في حال عدم وجود حوالات بنكية)", weight: 30 },
  { num: 6, desc: "وجود صلة قرابة بين العامل وصاحب العمل", weight: 10 },
  { num: 7, desc: "عدم تسجيل العامل في منصة العمل عن بعد في حال ادعى العامل او صاحب العمل بأنه يعمل عن بعد", weight: 50 },
  { num: 8, desc: "وجود تبرير من المنشأة لمدة 3 أشهر فأكثر في منصة حماية الأجور على عدم صرف اجر العامل وعدم اعتراض العامل على التبرير.", weight: 30 },
  { num: 9, desc: "عدم تسكين الموظف السعودي على المنشأة التي تم تسجيله عليها", weight: 10 },
  { num: 10, desc: "توظيف نساء او شخص كبير في السن ، او ذوي الإعاقة بمهنة لا تتوافق مع قدراته على أدائها", weight: 60 },
  { num: 11, desc: "وجود سابقة لدى العامل او المنشأة في التوطين الوهمي", weight: 20 },
  { num: 12, desc: "عدم وجود موقع للمنشأة او عدم تحديث البيانات", weight: 50 }
];

// === دوال التشغيل ===
function renderIndicators() {
  const list = document.getElementById('indicatorsList');
  list.innerHTML = indicators.map((ind, i) => `
    <div class="indicator-row">
      <div class="num">${ind.num}</div>
      <div class="desc">
        ${ind.parentDesc ? `<strong>${ind.parentDesc}</strong>` : ''}
        ${ind.parentDesc ? '<br>' : ''}
        ${ind.desc}
      </div>
      <div class="weight">${ind.weight}%</div>
      <input type="checkbox" id="cb${i}" data-w="${ind.weight}" class="checkbox">
    </div>
  `).join('');

  // ربط حدث التغيير
  document.querySelectorAll('.checkbox').forEach(cb => {
    cb.addEventListener('change', calculateTotal);
  });
}

function calculateTotal() {
  let sum = 0;
  document.querySelectorAll('.checkbox:checked').forEach(el => {
    sum += parseFloat(el.dataset.w);
  });
  document.getElementById('totalPercent').textContent = sum;
}

function generateExcel() {
  const name = document.getElementById('empName').value || "";
  const id = document.getElementById('idNumber').value || "";
  const total = parseFloat(document.getElementById('totalPercent').textContent);

  // بناء البيانات حسب هيكل الملف الأصلي
  const data = [];

  // 5 أسطر للعنوان
  for (let i = 0; i < 5; i++) {
    data.push(["جدول المؤشرات والأوزان الاسترشادية للمراقب", "", "", "", "", ""]);
  }

  // سطر فارغ
  data.push(["", "", "", "", "", ""]);

  // الرؤوس
  data.push(["#", "المؤشر", "الوزن النسبي", "", "تم التحقق", ""]);
  data.push(["", "", "", "", "", ""]);

  // المؤشرات
  indicators.forEach((ind, i) => {
    const checked = document.getElementById(`cb${i}`).checked;
    data.push([
      ind.num,
      ind.parentDesc || ind.desc,
      ind.weight + "%",
      ind.weight + "%",
      checked,
      ""
    ]);
  });

  // المجموع
  data.push(["", "", "", "", "", ""]);
  data.push(["المجموع", "المجموع", "المجموع", "", total + "%", ""]);
  data.push(["", "", "", "", "", ""]);
  data.push(["", "اسم الموظف", name, "", "", ""]);
  data.push(["", "رقم الهوية", id, "", "", ""]);

  // إنشاء الورقة
  const ws = XLSX.utils.aoa_to_sheet(data);

  // دمج خلايا العنوان (A1:F5)
  ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 4, c: 5 } }];

  // إنشاء المصنف
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "ورقة1");

  // توليد وتنزيل
  XLSX.writeFile(wb, "تقرير_التوطين_الوهمي_2025.xlsx");
}

// === تشغيل عند التحميل ===
document.addEventListener('DOMContentLoaded', () => {
  renderIndicators();
  calculateTotal(); // تهيئة المجموع
  document.getElementById('generateBtn').addEventListener('click', generateExcel);
});