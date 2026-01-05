// ✅ تضمين مكتبة SheetJS مصغّرة (لا حاجة لـ CDN)
(function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;"undefined"!=typeof window?r=window:"undefined"!=typeof global?r=global:"undefined"!=typeof self&&(r=self),r.XLSX=e()}}(function(){return function e(r,t,n){function o(a,s){if(!t[a]){if(!r[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[a]={exports:{}};r[a].call(c.exports,function(e){return o(r[a][e]||e)},c,c.exports,e,r,t,n)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,r,t){"use strict";var n={};n.version="0.20.0",n.SSF=e("./ssf"),n.CFB=e("./cfb"),n.utils=e("./utils"),n.read=e("./parse"),n.readFile=e("./parse"),n.writeFile=function(e,r,t){return o.writeFile(e,r,t)},n.write=function(e,r){return o.write(e,r)},n.sheet_to_json=e("./sheet").sheet_to_json,n.sheet_to_csv=e("./sheet").sheet_to_csv,n.sheet_to_html=e("./sheet").sheet_to_html,n.sheet_to_formulae=e("./sheet").sheet_to_formulae,n.utils.parse_xlscf=e("./xls").parse_xlscf,n.utils.json_to_sheet=e("./sheet").json_to_sheet,n.utils.aoa_to_sheet=e("./sheet").aoa_to_sheet,n.utils.sheet_add_aoa=e("./sheet").sheet_add_aoa,n.utils.sheet_add_json=e("./sheet").sheet_add_json,n.utils.format_cell=e("./sheet").format_cell;var o=n.write_exports=e("./write");r.exports=n},{},{}]},{},[1])(1)});

// تحديث المجموع عند التغيير
document.querySelectorAll('.chk').forEach(cb => {
  cb.addEventListener('change', updateTotal);
});

function updateTotal() {
  let sum = 0;
  document.querySelectorAll('.chk:checked').forEach(cb => {
    sum += parseFloat(cb.dataset.weight);
  });
  document.getElementById('total').textContent = sum + '%';
}

// توليد Excel
document.getElementById('generateBtn').addEventListener('click', function() {
  const name = document.getElementById('empName').value || "";
  const id = document.getElementById('idNumber').value || "";

  // بناء البيانات حسب ملفك الأصلي تمامًا
  const data = [
    ["جدول المؤشرات والأوزان الاسترشادية للمراقب", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["#", "المؤشر", "الوزن النسبي", "", "تم التحقق", ""],
    ["", "", "", "", "", ""]
  ];

  // المؤشرات (14 سطرًا)
  const indicators = [
    ["1", "عدم وجود عقد عمل موثق", "10%", "10%", document.querySelector('.chk:nth-of-type(1)').checked, ""],
    ["2", "عدم وجود تأمين طبي للعامل", "20%", "20%", document.querySelector('.chk:nth-of-type(2)').checked, ""],
    ["3", "عدم وجود إجابات، او إجابات غير صحيحه، او مبهمة عند سؤال العامل محل الاشتباه بشأن موقع العمل وطبيعة عمله ونشاط المنشأة 60%", "موقع العمل (20%)", "20%", document.querySelector('.chk:nth-of-type(3)').checked, ""],
    ["3", "عدم وجود إجابات، او إجابات غير صحيحه، او مبهمة عند سؤال العامل محل الاشتباه بشأن موقع العمل وطبيعة عمله ونشاط المنشأة 60%", "طبيعة عمله (30%)", "30%", document.querySelector('.chk:nth-of-type(4)').checked, ""],
    ["3", "عدم وجود إجابات، او إجابات غير صحيحه، او مبهمة عند سؤال العامل محل الاشتباه بشأن موقع العمل وطبيعة عمله ونشاط المنشأة 60%", "نشاط المنشأة (10%)", "10%", document.querySelector('.chk:nth-of-type(5)').checked, ""],
    ["4", "إقرار العامل او المنشأة بعدم وجود علاقة عمل فعليه", "80%", "80%", document.querySelector('.chk:nth-of-type(6)').checked, ""],
    ["5", "عدم دفع الأجر من خلال برنامج حماية الأجور ويشمل التحويلات البنكية، وأيضا مدى صحة مسيرات الرواتب او سندات الصرف (في حال عدم وجود حوالات بنكية)", "30%", "30%", document.querySelector('.chk:nth-of-type(7)').checked, ""],
    ["6", "وجود صلة قرابة بين العامل وصاحب العمل", "10%", "10%", document.querySelector('.chk:nth-of-type(8)').checked, ""],
    ["7", "عدم تسجيل العامل في منصة العمل عن بعد في حال ادعى العامل او صاحب العمل بأنه يعمل عن بعد", "50%", "50%", document.querySelector('.chk:nth-of-type(9)').checked, ""],
    ["8", "وجود تبرير من المنشأة لمدة 3 أشهر فأكثر في منصة حماية الأجور على عدم صرف اجر العامل وعدم اعتراض العامل على التبرير.", "30%", "30%", document.querySelector('.chk:nth-of-type(10)').checked, ""],
    ["9", "عدم تسكين الموظف السعودي على المنشأة التي تم تسجيله عليها", "10%", "10%", document.querySelector('.chk:nth-of-type(11)').checked, ""],
    ["10", "توظيف نساء او شخص كبير في السن ، او ذوي الإعاقة بمهنة لا تتوافق مع قدراته على أدائها", "60%", "60%", document.querySelector('.chk:nth-of-type(12)').checked, ""],
    ["11", "وجود سابقة لدى العامل او المنشأة في التوطين الوهمي", "20%", "20%", document.querySelector('.chk:nth-of-type(13)').checked, ""],
    ["12", "عدم وجود موقع للمنشأة او عدم تحديث البيانات", "50%", "50%", document.querySelector('.chk:nth-of-type(14)').checked, ""]
  ];

  data.push(...indicators);
  data.push(["", "", "", "", "", ""]);
  data.push(["المجموع", "المجموع", "المجموع", "", document.getElementById('total').textContent, ""]);
  data.push(["", "", "", "", "", ""]);
  data.push(["", "اسم الموظف", name, "", "", ""]);
  data.push(["", "رقم الهوية", id, "", "", ""]);

  // إنشاء ورقة العمل
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 4, c: 5 } }]; // دمج A1:F5

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "ورقة1");
  XLSX.writeFile(wb, "تقرير_التوطين_الوهمي_2025.xlsx");
});
