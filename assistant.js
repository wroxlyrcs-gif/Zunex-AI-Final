(function (root, factory) {
  var KB = typeof module === "object" && module.exports ? require("./knowledge.js") : root.ZunexKB;
  var api = factory(KB);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.ZunexAssistant = api;
})(typeof self !== "undefined" ? self : this, function (KB) {
  "use strict";

  function norm(s) {
    return String(s).replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase()
      .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u")
      .replace(/ö/g, "o").replace(/ç/g, "c").replace(/ə/g, "e").replace(/ё/g, "е").replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
  }
  function toks(s) { var n = norm(s).replace(/[^a-z0-9\u0430-\u044f]+/g, " ").trim(); return n ? n.split(" ") : []; }
  function joined(s) { return toks(s).join(" "); }
  function cap(w) { return w.charAt(0).toLocaleUpperCase("tr-TR") + w.slice(1).toLocaleLowerCase("tr-TR"); }
  function fmt(n) {
    var s = String(+n.toPrecision(12)), th = cur === "en" ? "," : cur === "ru" ? "\u00a0" : ".", dc = cur === "en" ? "." : ",";
    if (/e/.test(s)) return s.replace(".", dc);
    var p = s.split("."), i = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, th);
    return p[1] ? i + dc + p[1] : i;
  }
  function num(s) { return parseFloat(String(s).replace(",", ".")); }
  var DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  var MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Matematik ---------- */
  var FN = {
    cbrt: Math.cbrt,
    sqrt: function (x) { if (x < 0) throw { math: L(["Negatif bir sayının karekökü gerçek sayı değildir.", "Mənfi ədədin kvadrat kökü həqiqi ədəd deyil.", "The square root of a negative number is not a real number.", "Квадратный корень из отрицательного числа не является действительным."]) }; return Math.sqrt(x); },
    abs: Math.abs,
    sin: function (x) { return Math.round(Math.sin(x * Math.PI / 180) * 1e12) / 1e12; },
    cos: function (x) { return Math.round(Math.cos(x * Math.PI / 180) * 1e12) / 1e12; },
    tan: function (x) { return Math.round(Math.tan(x * Math.PI / 180) * 1e12) / 1e12; },
    log: function (x) { if (x <= 0) throw { math: L(["Logaritma yalnızca pozitif sayılar için tanımlıdır.", "Loqarifm yalnız müsbət ədədlər üçün təyin olunub.", "The logarithm is defined only for positive numbers.", "Логарифм определён только для положительных чисел."]) }; return Math.log10(x); },
    ln: function (x) { if (x <= 0) throw { math: L(["Logaritma yalnızca pozitif sayılar için tanımlıdır.", "Loqarifm yalnız müsbət ədədlər üçün təyin olunub.", "The logarithm is defined only for positive numbers.", "Логарифм определён только для положительных чисел."]) }; return Math.log(x); }
  };
  function fact(n) {
    if (n < 0 || n !== Math.floor(n) || n > 170) throw { math: L(["Faktöriyel için 0–170 arası bir tam sayı gerekir.", "Faktorial üçün 0–170 arası tam ədəd lazımdır.", "Factorial needs an integer from 0 to 170.", "Для факториала нужно целое число от 0 до 170."]) };
    var r = 1; for (var i = 2; i <= n; i++) r *= i; return r;
  }
  function rw(s, w, r) { return s.replace(new RegExp("(\\s)(?:" + w + ")(?=\\s)", "g"), "$1" + r); }
  function pre(t) {
    var SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
    t = String(t).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, function (m) { return "^" + m.split("").map(function (c) { return c === "⁻" ? "-" : SUP.indexOf(c); }).join(""); });
    t = t.replace(/[×∙·⋅]/g, "*").replace(/÷/g, "/").replace(/[−–]/g, "-").replace(/π/g, " pi ").replace(/√/g, " sqrt ");
    if (/\)\s*:|:\s*\(|\s:\s/.test(t) || (/^[\d\s.,()+\-*\/:]+$/.test(t.trim()) && !/^\d{1,2}:\d{2}$/.test(t.trim()))) t = t.replace(/:/g, "/");
    return t;
  }
  function pw(s) {
    return s.replace(/kvadrat\s+kok/g, " sqrt ").replace(/квадратн\w*\s+корень/g, " sqrt ")
      .replace(/(?:[-'’\s]+(?:nin|nun|in|un))?\s*(?:kvadrat\w*|karesi\w*|squared|в квадрате)/g, " ^2 ")
      .replace(/(?:[-'’\s]+(?:nin|nun|in|un))?\s*(?:kupu\w*|kubu\w*|cubed|в кубе)/g, " ^3 ");
  }
  function mathText(t) {
    var s = " " + pw(norm(pre(t))).replace(/(\d),(\d)/g, "$1.$2").replace(/[=?]/g, " ").replace(/(\d)\s*x\s*(\d)/g, "$1*$2").replace(/([-+*\/^()!%])/g, " $1 ").replace(/\s+/g, " ") + " ";
    s = rw(s, "what is|whats|how much is|how much|calculate|compute|equals|please|kac eder|kac yapar|kactir|kac|eder|yapar|hesapla|hesaplar misin|hesap|sonucu|sonuc|nedir|ne kadar|bul|islem|lutfen|bana|nece edir|nece olar|necedir|nece|hesabla|что такое|сколько будет|сколько|будет|вычисли|посчитай|чему равно|равно|результат", " ");
    s = rw(s, "arti|plus|ustegel|плюс", "+"); s = rw(s, "eksi|minus|cixsa|минус", "-");
    s = rw(s, "carpi|kere|times|multiplied by|vur|defe|умножить на|умножить|помножить на", "*");
    s = rw(s, "bolu|divided by|over|bol|bolunsun|разделить на|делить на", "/");
    s = rw(s, "uzeri|ussu|to the power of|power|в степени|степени", "^"); s = rw(s, "mod", "%");
    s = rw(s, "kupkok|kup kok|kubkok|kub kok|cube root of|cube root|кубический корень из|кубический корень", "cbrt");
    s = rw(s, "karekok|kok|square root of|square root|sqrt|корень из|корень", "sqrt");
    return s.trim();
  }
  // null: matematik ifadesi değil. {text}: sonuç. Hesap hatası: {text: hata mesajı}
  function evalMath(src) {
    var s = mathText(src), tk = [], pos = 0, m, re = /\s*(\d+(?:\.\d+)?|[a-z]+|[-+*\/^%()!])/y;
    if (!s) return null;
    while (pos < s.length) {
      re.lastIndex = pos; m = re.exec(s);
      if (!m) { if (/^\s*$/.test(s.slice(pos))) break; return null; }
      tk.push(m[1]); pos = re.lastIndex;
    }
    var okId = { cbrt: 1, pi: 1, e: 1, sqrt: 1, abs: 1, sin: 1, cos: 1, tan: 1, log: 1, ln: 1 };
    for (var i = 0; i < tk.length; i++) if (/^[a-z]+$/.test(tk[i]) && !okId[tk[i]]) return null;
    var hasVal = tk.some(function (x) { return /^\d/.test(x) || x === "pi" || x === "e"; });
    var hasOp = tk.some(function (x) { return /^[-+*\/^%!]$/.test(x) || FN[x]; });
    if (!hasVal || !(hasOp || (tk.length > 1 && tk.indexOf("pi") >= 0))) return null;
    var p = 0, SYN = { syn: 1 };
    function peek() { return tk[p]; }
    function next() { return tk[p++]; }
    function expr() { var v = term(); while (peek() === "+" || peek() === "-") { var o = next(), r = term(); v = o === "+" ? v + r : v - r; } return v; }
    function term() {
      var v = unary();
      while (peek() === "*" || peek() === "/" || peek() === "%" || peek() === "(" || peek() === "pi" || peek() === "e" || FN[peek()]) {
        var imp = peek() !== "*" && peek() !== "/" && peek() !== "%", o = imp ? "*" : next(), r = unary();
        if (o === "*") v *= r; else { if (r === 0) throw { math: L(["Sıfıra bölünemez.", "Sıfıra bölmək olmaz.", "Cannot divide by zero.", "На ноль делить нельзя."]) }; v = o === "/" ? v / r : v % r; }
      }
      return v;
    }
    function unary() { if (peek() === "-") { next(); return -unary(); } if (peek() === "+") { next(); return unary(); } return pow(); }
    function pow() { var b = post(); if (peek() === "^") { next(); return Math.pow(b, unary()); } return b; }
    function post() { var v = atom(); while (peek() === "!") { next(); v = fact(v); } return v; }
    function atom() {
      var t = next();
      if (t === undefined) throw SYN;
      if (/^\d/.test(t)) return parseFloat(t);
      if (t === "(") { var v = expr(); if (next() !== ")") throw SYN; return v; }
      if (t === "pi") return Math.PI;
      if (t === "e") return Math.E;
      if (FN[t]) {
        var a;
        if (peek() === "(") { next(); a = expr(); if (next() !== ")") throw SYN; } else a = unary();
        return FN[t](a);
      }
      throw SYN;
    }
    try {
      var v = expr();
      if (p < tk.length) return null;
      if (!isFinite(v)) return { text: L(["Sonuç çok büyük ya da tanımsız.", "Nəticə çox böyük və ya təyin olunmayıb.", "The result is too large or undefined.", "Результат слишком велик или не определён."]) };
      var hasTrig = /\b(sin|cos|tan)\b/.test(s);
      return { text: fmt(v) + (hasTrig ? L(["  (açılar derece cinsinden)", "  (bucaqlar dərəcə ilə)", "  (angles in degrees)", "  (углы в градусах)"]) : ""), v: v };
    } catch (e) {
      if (e && e.math) return { text: e.math };
      return null;
    }
  }

  var UNITS = { celsius: "c", santigrat: "c", fahrenheit: "f", km: "km", kilometre: "km", mil: "mi", mile: "mi", kg: "kg", kilo: "kg", kilogram: "kg", lb: "lb", pound: "lb", libre: "lb", metre: "m", metres: "m", meters: "m", miles: "mi", kilometers: "km", kilometres: "km", kilograms: "kg", pounds: "lb", m: "m", ft: "ft", feet: "ft", ayak: "ft" };
  var CONV = {
    "c>f": function (v) { return v * 9 / 5 + 32; }, "f>c": function (v) { return (v - 32) * 5 / 9; },
    "km>mi": function (v) { return v * 0.621371; }, "mi>km": function (v) { return v * 1.609344; },
    "kg>lb": function (v) { return v * 2.2046226; }, "lb>kg": function (v) { return v * 0.45359237; },
    "m>ft": function (v) { return v * 3.280839895; }, "ft>m": function (v) { return v * 0.3048; }
  };
  var UNAME = { c: "°C", f: "°F", km: "km", mi: "mil", kg: "kg", lb: "lb", m: "m", ft: "ft" };
  function unitConvert(t) {
    var n = norm(t), nm = n.match(/-?\d+(?:[.,]\d+)?/);
    if (!nm) return null;
    var u = toks(t).filter(function (x) { return UNITS[x]; }).map(function (x) { return UNITS[x]; });
    if (/how many/.test(n) && / in /.test(n)) u.reverse();
    if (u.length < 2 || u[0] === u[1] || !CONV[u[0] + ">" + u[1]]) return null;
    var v = num(nm[0]);
    return fmt(v) + " " + UNAME[u[0]] + " = " + fmt(CONV[u[0] + ">" + u[1]](v)) + " " + UNAME[u[1]];
  }
  function percent(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), N = "(\\d+(?:\\.\\d+)?)", a, b, m;
    if ((m = s.match(new RegExp(N + "\\W*[a-z]{0,4}\\s+yuzde\\s+" + N)))) { a = m[1]; b = m[2]; }
    else if ((m = s.match(new RegExp(N + "\\s*(?:%|percent|процент\\w*)\\s*(?:of|от)\\s+" + N)))) { a = m[2]; b = m[1]; }
    else if ((m = s.match(new RegExp(N + "\\D{0,6}" + N + "\\s*faiz")))) { a = m[1]; b = m[2]; }
    else return null;
    a = +a; b = +b; var v = fmt(a * b / 100);
    return L([fmt(a) + " sayısının %" + fmt(b) + "’i = " + v, fmt(a) + " ədədinin " + fmt(b) + "%-i = " + v, fmt(b) + "% of " + fmt(a) + " = " + v, fmt(b) + "% от " + fmt(a) + " = " + v]);
  }
  function primeCheck(t) {
    var s = norm(t), m = s.match(/(\d+)\s*(?:sayisi\s*|ededi\s*)?asal\s*(?:mi|midir)/) || s.match(/(\d+)\s*sade\s*eded/) || s.match(/is\s+(\d+)\s+(?:a\s+)?prime|(\d+)\s+is\s+(?:a\s+)?prime/) || s.match(/(\d+)\s*(?:это\s*)?прост/);
    if (!m) return null;
    var n = parseInt(m[1] || m[2], 10);
    if (n > 1e12) return L(["Bu kadar büyük sayılara bakamıyorum (en fazla 1 trilyon).", "Bu qədər böyük ədədlərə baxa bilmirəm (ən çoxu 1 trilyon).", "Numbers that large are beyond me (max 1 trillion).", "Такие большие числа мне не по силам (максимум 1 триллион)."]);
    if (n < 2) return L([n + " asal değildir (asal sayılar 2’den başlar).", n + " sade ədəd deyil (sadə ədədlər 2-dən başlayır).", n + " is not prime (primes start at 2).", n + " не простое (простые числа начинаются с 2)."]);
    for (var d = 2; d * d <= n; d++) if (n % d === 0) return L([n + " asal değildir; " + d + " ile bölünür.", n + " sade ədəd deyil; " + d + "-ə bölünür.", n + " is not prime; it is divisible by " + d + ".", n + " не простое; делится на " + d + "."]);
    return L([n + " asal bir sayıdır.", n + " sade ədəddir.", n + " is prime.", n + " — простое число."]);
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function fraction(t) {
    var s = mathText(t).replace(/\s+/g, ""), m = s.match(/^(\d+)\/(\d+)([-+*\/])(\d+)\/(\d+)$/);
    if (!m) return null;
    var a = +m[1], b = +m[2], c = +m[4], d = +m[5], o = m[3], nu, de;
    if (o === "/" && !/(bolu|bolunsun|divided by|разделить на|делить на)/.test(norm(t))) return null;
    if (!b || !d) return L(["Sıfıra bölünemez.", "Sıfıra bölmək olmaz.", "Cannot divide by zero.", "На ноль делить нельзя."]);
    if (o === "/") { if (!c) return L(["Sıfıra bölünemez.", "Sıfıra bölmək olmaz.", "Cannot divide by zero.", "На ноль делить нельзя."]); nu = a * d; de = b * c; }
    else if (o === "*") { nu = a * c; de = b * d; } else { nu = o === "+" ? a * d + c * b : a * d - c * b; de = b * d; }
    var g = gcd(nu, de) || 1; nu /= g; de /= g;
    return de === 1 ? fmt(nu) : nu + "/" + de + "  (≈ " + fmt(nu / de) + ")";
  }
  function ints(s) { return (s.match(/\d+/g) || []).map(Number); }
  function factq(t) {
    var s = norm(t), m = s.match(/(?:factorial|faktoriyel|faktorial|факториал)\w*\D{0,8}(\d+)/) || s.match(/(\d+)\D{0,6}(?:factorial|faktoriyel|faktorial|факториал)/);
    if (!m) return null;
    try { return m[1] + "! = " + fmt(fact(+m[1])); } catch (e) { return e.math || null; }
  }
  function gcdlcm(t) {
    var s = norm(t), nums = ints(s);
    var g = /(^|[^a-z])(ebob|obeb|gcd|hcf)([^a-z]|$)|(^|[^а-я])нод([^а-я]|$)|greatest common|en buyuk ortak|наибольш\w* общ/.test(s);
    var l = /(^|[^a-z])(ekok|okek|ekob|lcm)([^a-z]|$)|(^|[^а-я])нок([^а-я]|$)|least common|lowest common|en kucuk ortak|наименьш\w* общ/.test(s);
    if ((!g && !l) || nums.length < 2 || nums.length > 10 || nums.some(function (x) { return x < 1 || x > 1e12; })) return null;
    var out = [], v;
    if (g) { v = nums.reduce(gcd); out.push(L(["EBOB", "ƏBOB", "GCD", "НОД"]) + "(" + nums.join(", ") + ") = " + fmt(v)); }
    if (l) { v = nums.reduce(function (a, b) { return a / gcd(a, b) * b; }); out.push(v > 1e15 ? L(["Sonuç çok büyük.", "Nəticə çox böyükdür.", "The result is too large.", "Результат слишком велик."]) : L(["EKOK", "ƏKOB", "LCM", "НОК"]) + "(" + nums.join(", ") + ") = " + fmt(v)); }
    return out.join("\n");
  }
  function factorize(t) {
    var s = norm(t), m = s.match(/\d+/);
    if (!/carpan|vuruq|factor(?!ial)|разлож|множител/.test(s) || !m) return null;
    var n = +m[0], out = [], e, d, sup = "⁰¹²³⁴⁵⁶⁷⁸⁹";
    if (n < 2 || n > 1e12) return L(["2 ile 1 trilyon arası bir sayı ver.", "2 ilə 1 trilyon arası ədəd ver.", "Give a number between 2 and 1 trillion.", "Укажи число от 2 до 1 триллиона."]);
    for (d = 2; d * d <= n; d++) { e = 0; while (n % d === 0) { n /= d; e++; } if (e) out.push(d + (e > 1 ? String(e).split("").map(function (c) { return sup.charAt(c); }).join("") : "")); }
    if (n > 1) out.push(String(n));
    return m[0] + " = " + out.join(" × ");
  }
  function comb(t) {
    var s = norm(t), m = s.match(/(?:^|[^a-z])([cp])\s*\(\s*(\d+)\s*[,;]\s*(\d+)\s*\)/), n, k, r = 1, i, nm;
    if (m) { nm = m[1]; n = +m[2]; k = +m[3]; }
    else if ((m = s.match(/(\d+)\s+choose\s+(\d+)/))) { nm = "c"; n = +m[1]; k = +m[2]; }
    else return null;
    if (k > n) return L(["k, n’den büyük olamaz.", "k n-dən böyük ola bilməz.", "k cannot exceed n.", "k не может быть больше n."]);
    if (n > 60) return L(["n en fazla 60 olabilir.", "n ən çoxu 60 ola bilər.", "n can be at most 60.", "n не может быть больше 60."]);
    for (i = 1; i <= k; i++) r = nm === "c" ? r * (n - k + i) / i : r * (n - i + 1);
    return nm.toUpperCase() + "(" + n + "," + k + ") = " + fmt(Math.round(r));
  }
  function pctOf(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number), a, b;
    if (nums.length !== 2 || !/yuzde kac|nece faiz|what percent|сколько процентов|какой процент/.test(s)) return null;
    a = nums[0]; b = nums[1];
    if (/what percent(age)? of/.test(s)) { a = nums[1]; b = nums[0]; }
    if (!b) return L(["Sıfıra bölünemez.", "Sıfıra bölmək olmaz.", "Cannot divide by zero.", "На ноль делить нельзя."]);
    var v = fmt(a / b * 100);
    return fmt(a) + " / " + fmt(b) + " = " + L(["%" + v, "%" + v, v + "%", v + "%"]);
  }
  function stats(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/-?\d+(?:\.\d+)?/g) || []).map(Number), out = [];
    var mean = /ortalama|(^| )orta( |$)|mean|average|средн/.test(s), med = /medyan|median|медиан/.test(s);
    if ((!mean && !med) || nums.length < 2) return null;
    if (mean) out.push(L(["Ortalama", "Ortalama", "Mean", "Среднее"]) + " = " + fmt(nums.reduce(function (a, b) { return a + b; }, 0) / nums.length));
    if (med) { var q = nums.slice().sort(function (a, b) { return a - b; }), h = q.length >> 1; out.push(L(["Medyan", "Median", "Median", "Медиана"]) + " = " + fmt(q.length % 2 ? q[h] : (q[h - 1] + q[h]) / 2)); }
    return out.join("\n");
  }
  function volume(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number), a = nums[0], b = nums[1], v, f, sh;
    if (!/hacim|hacm|hecm|volume|объем/.test(s) || !nums.length) return null;
    sh = /kure|sphere|(^| )шар/.test(s) ? "sp" : /silindir|cylinder|цилиндр/.test(s) ? "cy" : /(^| )kup|(^| )kub|cube|(^| )куб/.test(s) ? "cu" : null;
    if (!sh) return null;
    if (sh === "cu") { v = a * a * a; f = fmt(a) + "³"; }
    else {
      if (!/yaricap|radius|радиус/.test(s) && /(^| )cap|diameter|диаметр/.test(s)) a /= 2;
      if (sh === "sp") { v = 4 / 3 * Math.PI * a * a * a; f = "4/3 × π × " + fmt(a) + "³"; }
      else { if (b === undefined) return null; v = Math.PI * a * a * b; f = "π × " + fmt(a) + "² × " + fmt(b); }
    }
    return { sp: ["Küre", "Kürə", "Sphere", "Шар"], cy: ["Silindir", "Silindr", "Cylinder", "Цилиндр"], cu: ["Küp", "Kub", "Cube", "Куб"] }[sh][LI[cur]] + " " + L(["hacmi", "həcmi", "volume", "объём"]) + " = " + f + " = " + fmt(v);
  }
  function hyp(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number);
    if (!/hipotenu|hypotenuse|гипотенуз/.test(s) || nums.length < 2) return null;
    return "c = √(" + fmt(nums[0]) + "² + " + fmt(nums[1]) + "²) = " + fmt(Math.sqrt(nums[0] * nums[0] + nums[1] * nums[1]));
  }
  function solveSys(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), ms = s.match(/[0-9xy+\-*\/^().\s]+=[0-9xy+\-*\/^().\s]+/g), j = ms ? ms.join("") : "";
    if (!ms || ms.length < 2 || j.indexOf("x") < 0 || j.indexOf("y") < 0) return null;
    var E = ms.slice(0, 2).map(function (m) { var p = m.split("="); return ("(" + p[0] + ")-(" + p[1] + ")").replace(/(\d)\s*([xy])/g, "$1*$2"); }), tol = 1e-9;
    var bad = L(["Bu denklem sistemini çözemiyorum (yalnızca x ve y’li iki doğrusal denklem).", "Bu tənliklər sistemini həll edə bilmirəm (yalnız x və y-li iki xətti tənlik).", "I can't solve this system (only two linear equations in x and y).", "Я не могу решить эту систему (только два линейных уравнения с x и y)."]);
    function f(e, x, y) { var r = evalMath(e.replace(/x/g, "(" + x + ")").replace(/y/g, "(" + y + ")")); if (!r || r.v === undefined) throw 0; return r.v; }
    var R = function (x) { return fmt(Math.round(x * 1e9) / 1e9); };
    try {
      var co = E.map(function (e) { var c = f(e, 0, 0), a = f(e, 1, 0) - c, b = f(e, 0, 1) - c; if (Math.abs(f(e, 2, 3) - (2 * a + 3 * b + c)) > tol || Math.abs(f(e, 1, 1) - (a + b + c)) > tol) throw 0; return [a, b, -c]; });
      var d = co[0][0] * co[1][1] - co[1][0] * co[0][1];
      if (Math.abs(d) < tol) return L(["Tek bir çözüm yok (çözümsüz ya da sonsuz çözüm).", "Yeganə həll yoxdur (həllsiz və ya sonsuz həll).", "No unique solution (none or infinitely many).", "Единственного решения нет (нет решений или бесконечно много)."]);
      return "x = " + R((co[0][2] * co[1][1] - co[1][2] * co[0][1]) / d) + ",  y = " + R((co[0][0] * co[1][2] - co[1][0] * co[0][2]) / d);
    } catch (e) { return bad; }
  }

  function solveEq(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), m = s.match(/[0-9x+\-*\/^().\s]+=[0-9x+\-*\/^().\s]+/);
    if (!m || m[0].indexOf("x") < 0 || /\d\s*x\s*\d/.test(m[0])) return null;
    var p = m[0].split("="), E = ("(" + p[0] + ")-(" + p[1] + ")").replace(/(\d)\s*x/g, "$1*x"), bad = L(["Bu denklemi çözemiyorum (yalnızca birinci ve ikinci dereceden, tek bilinmeyenli x denklemleri).", "Bu tənliyi həll edə bilmirəm (yalnız bir məchullu x-li, birinci və ikinci dərəcəli tənliklər).", "I can't solve this equation (only first- and second-degree equations in x).", "Я не могу решить это уравнение (только уравнения 1-й и 2-й степени с одной переменной x)."]);
    var f = function (v) { var r = evalMath(E.replace(/x/g, "(" + v + ")")); if (!r || r.v === undefined) throw 0; return r.v; };
    var R = function (x) { return fmt(Math.round(x * 1e9) / 1e9); }, tol = 1e-9;
    try {
      var f0 = f(0), f1 = f(1), fm = f(-1), A = (f1 + fm) / 2 - f0, B = (f1 - fm) / 2;
      if (Math.abs(f(2) - (4 * A + 2 * B + f0)) > tol || Math.abs(f(3) - (9 * A + 3 * B + f0)) > tol) return bad;
      if (Math.abs(A) < tol) {
        if (Math.abs(B) < tol) return Math.abs(f0) < tol ? L(["Sonsuz çözüm var (her x için doğru).", "Sonsuz sayda həll var (hər x üçün doğrudur).", "Infinitely many solutions (true for every x).", "Бесконечно много решений (верно для любого x)."]) : L(["Çözüm yok.", "Həll yoxdur.", "No solution.", "Решений нет."]);
        return "x = " + R(-f0 / B);
      }
      var D = B * B - 4 * A * f0;
      if (D < -tol) return L(["Gerçek kök yok (diskriminant < 0).", "Həqiqi kök yoxdur (diskriminant < 0).", "No real roots (discriminant < 0).", "Действительных корней нет (дискриминант < 0)."]);
      if (D <= tol) return "x = " + R(-B / (2 * A));
      var q = Math.sqrt(D), x1 = (-B - q) / (2 * A), x2 = (-B + q) / (2 * A);
      return "x₁ = " + R(Math.min(x1, x2)) + ",  x₂ = " + R(Math.max(x1, x2));
    } catch (e) { return bad; }
  }
  function geometry(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number), sh = null;
    var SHP = [["circle", /daire|circle|круг|окружност/], ["square", /(^| )kare( |$)|kvadrat|square|квадрат/], ["rect", /dikdortgen|duzbucaqli|rectangle|прямоугольник/], ["tri", /ucgen|ucbucaq|triangle|треугольник/]];
    var NM = { circle: ["Daire", "Dairə", "Circle", "Круг"], square: ["Kare", "Kvadrat", "Square", "Квадрат"], rect: ["Dikdörtgen", "Düzbucaqlı", "Rectangle", "Прямоугольник"], tri: ["Üçgen", "Üçbucaq", "Triangle", "Треугольник"] };
    var area = /(^| )alan|sahe|area|площад/.test(s), per = /cevre|perimet|периметр|длина окружност/.test(s);
    SHP.forEach(function (x) { if (!sh && x[1].test(s)) sh = x[0]; });
    if (!sh || !nums.length || (!area && !per)) return null;
    var a = nums[0], b = nums[1], c = nums[2], v, f, P = Math.PI;
    if (sh === "circle") {
      if (!/yaricap|radius|радиус/.test(s) && /(^| )cap|diameter|диаметр/.test(s)) a /= 2;
      v = area ? P * a * a : 2 * P * a; f = area ? "π × " + fmt(a) + "²" : "2 × π × " + fmt(a);
    } else if (sh === "square") { v = area ? a * a : 4 * a; f = area ? fmt(a) + "²" : "4 × " + fmt(a); }
    else if (sh === "rect") { if (b === undefined) return null; v = area ? a * b : 2 * (a + b); f = area ? fmt(a) + " × " + fmt(b) : "2 × (" + fmt(a) + " + " + fmt(b) + ")"; }
    else if (area && c !== undefined) {
      var h = (a + b + c) / 2, q = h * (h - a) * (h - b) * (h - c);
      if (q <= 0) return L(["Bu kenar uzunluklarıyla üçgen oluşmaz.", "Bu tərəf uzunluqları ilə üçbucaq olmur.", "No triangle exists with these side lengths.", "Треугольника с такими сторонами не существует."]);
      v = Math.sqrt(q); f = L(["Heron formülü", "Heron düsturu", "Heron's formula", "формула Герона"]);
    } else if (area && b !== undefined) { v = a * b / 2; f = fmt(a) + " × " + fmt(b) + " / 2"; }
    else if (!area && c !== undefined) { v = a + b + c; f = fmt(a) + " + " + fmt(b) + " + " + fmt(c); }
    else return null;
    return NM[sh][LI[cur]] + " " + (area ? L(["alanı", "sahəsi", "area", "площадь"]) : L(["çevresi", "perimetri", "perimeter", "периметр"])) + " = " + f + " = " + fmt(v);
  }

  /* ---------- Bilgi tabanı ---------- */
  function lev(a, b) {
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 1; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
    return d[a.length][b.length];
  }
  // Jeton, anahtarla başlıyorsa ya da (uzun anahtarlarda, aynı ilk harfle) 1-2 harf hatayla benziyorsa eşleşir.
  function near(x, k) {
    if (x.indexOf(k) === 0) return true;
    if (k.length < 6 || x.length < (k.length >= 7 ? k.length - 1 : k.length) || x.charAt(0) !== k.charAt(0)) return false;
    var tol = k.length >= 9 ? 2 : 1;
    return Math.min(lev(x.slice(0, k.length), k), lev(x.slice(0, k.length + 1), k)) <= tol;
  }
  function findCountry(t) {
    var tn = " " + joined(t) + " ", keys = Object.keys(KB.capitals).sort(function (a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i++) if (tn.indexOf(" " + keys[i]) >= 0) return KB.capitals[keys[i]];
    var tk = toks(t);
    for (i = 0; i < keys.length; i++) if (keys[i].indexOf(" ") < 0 && keys[i].length >= 6 && tk.some(function (x) { return near(x, keys[i]); })) return KB.capitals[keys[i]];
    return null;
  }
  function matchFact(t) {
    var tk = toks(t), n = " " + tk.join(" ") + " ", best = null, bs = 0;
    KB.facts.forEach(function (f) {
      var sc = 0;
      f.k.forEach(function (k) {
        var w = 1; if (k.charAt(0) === "!") { w = 2; k = k.slice(1); }
        if (k.indexOf(" ") >= 0) { if (n.indexOf(" " + k) >= 0) sc += w + 1; return; }
        var ex = tk.some(function (x) { return k.length <= 3 ? x === k : x.indexOf(k) === 0; });
        if (ex) sc += w; else if (k.length > 3 && tk.some(function (x) { return near(x, k); })) sc += w * 0.75;
      });
      if (sc > bs) { bs = sc; best = f; }
    });
    return { f: best, s: bs };
  }

  /* ---------- Dosyalar ---------- */
  var STOP = "bir bu ve ile icin gibi daha cok olan olarak kadar sonra ancak fakat ama the and for that with this from have are".split(" ");
  function summarizeFile(f) {
    var kb = (f.size / 1024).toFixed(1).replace(".", ",") + " KB";
    if (f.kind === "image") return "📷 " + f.name + ": görüntü dosyası" + (f.width ? ", " + f.width + "×" + f.height + " piksel" : "") + ", " + kb + ". Fotoğrafın içeriğini yorumlayamam: görüntü tanıyan bir modelim yok, yalnızca boyut bilgisini verebilirim.";
    if (f.kind !== "text") return "📦 " + f.name + ": " + kb + ". Bu dosya türünün içeriğini okuyamıyorum.";
    var t = f.text || "", lines = t.split(/\r?\n/), ne = lines.filter(function (l) { return l.trim(); });
    var words = (t.match(/\S+/g) || []).length;
    var out = "📄 " + f.name + ": " + lines.length + " satır (" + ne.length + " dolu), " + words + " kelime, " + t.length + " karakter, " + kb + ".";
    if (f.truncated) out += " (Yalnızca ilk 30.000 karakter okundu.)";
    if (/\.json$/i.test(f.name)) {
      try { var j = JSON.parse(t); out += " Geçerli JSON (" + (Array.isArray(j) ? "dizi, " + j.length + " öğe" : typeof j === "object" && j ? "nesne, " + Object.keys(j).length + " anahtar" : "değer") + ")."; }
      catch (e) { out += " JSON olarak okunamadı."; }
    }
    if (/\.csv$/i.test(f.name)) out += " Tahmini tablo: " + ne.length + " satır × " + (ne[0] || "").split(/[;,\t]/).length + " sütun.";
    var freq = {}; toks(t).forEach(function (w) { if (w.length >= 4 && STOP.indexOf(w) < 0) freq[w] = (freq[w] || 0) + 1; });
    var top = Object.keys(freq).sort(function (a, b) { return freq[b] - freq[a] || (a < b ? -1 : 1); }).slice(0, 5);
    if (top.length) out += "\nEn sık geçen kelimeler: " + top.map(function (w) { return w + " (" + freq[w] + ")"; }).join(", ") + ".";
    if (ne.length) out += "\nİlk satırlar:\n" + ne.slice(0, 2).map(function (l) { return "› " + (l.length > 80 ? l.slice(0, 80) + "…" : l); }).join("\n");
    return out;
  }


  /* ---------- 1.2: Dünya saatleri ---------- */
  var TZ = [
    ["istanbul|ankara|turkiye|стамбул|турци", "Europe/Istanbul", "İstanbul"], ["baku|baki|баку", "Asia/Baku", "Bakı"],
    ["london|londra|лондон|ingiltere", "Europe/London", "London"], ["berlin|берлин|almanya", "Europe/Berlin", "Berlin"],
    ["paris|париж|fransa|france", "Europe/Paris", "Paris"], ["moskova|moskva|moscow|москв|rusya|russia", "Europe/Moscow", "Moskva"],
    ["tokyo|tokio|токио|japon|япони", "Asia/Tokyo", "Tokyo"], ["new york|nyu york|нью йорк", "America/New_York", "New York"],
    ["los angeles|лос анджелес", "America/Los_Angeles", "Los Angeles"], ["dubai|dubay|дубай", "Asia/Dubai", "Dubai"],
    ["pekin|beijing|пекин", "Asia/Shanghai", "Pekin"], ["delhi|дели|hindistan|india", "Asia/Kolkata", "Delhi"],
    ["sydney|sidney|сидней|avustralya", "Australia/Sydney", "Sydney"], ["kahire|cairo|каир|misir|egypt", "Africa/Cairo", "Kahire"],
    ["tiflis|tbilisi|тбилиси|gurcistan", "Asia/Tbilisi", "Tbilisi"], ["taskent|tashkent|ташкент", "Asia/Tashkent", "Taşkent"],
    ["tahran|tehran|тегеран", "Asia/Tehran", "Tehran"], ["seul|seoul|сеул", "Asia/Seoul", "Seul"],
    ["singapur|singapore|сингапур", "Asia/Singapore", "Singapur"], ["brezilya|brazil|бразил|sao paulo", "America/Sao_Paulo", "São Paulo"]
  ];
  function zoneInfo(z, now) {
    var p = {}, f = new Intl.DateTimeFormat("en-US", { timeZone: z, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
    f.formatToParts(now).forEach(function (x) { p[x.type] = +x.value; });
    var u = Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute), off = Math.round((u - Math.floor(now.getTime() / 60000) * 60000) / 60000), d = new Date(u), a = Math.abs(off);
    return { h: pad(p.hour % 24) + ":" + pad(p.minute), d: d.getUTCDate() + " " + DT[cur][0][d.getUTCMonth()] + " " + d.getUTCFullYear() + ", " + DT[cur][1][d.getUTCDay()], u: "UTC" + (off < 0 ? "-" : "+") + Math.floor(a / 60) + (a % 60 ? ":" + pad(a % 60) : "") };
  }
  function worldTime(t, now) {
    var n = " " + joined(t), hit = null, i, k;
    if (!/ saat| time( |$)|clock| час| время/.test(n)) return null;
    try {
      if (/ dunya| world| мировое| часовые|butun/.test(n) && !/ ev( |$)/.test(n)) {
        var rows = [1, 0, 2, 3, 5, 7, 9, 6, 12].map(function (j) { var r = zoneInfo(TZ[j][1], now); return "🕒 " + TZ[j][2] + ": " + r.h + "  (" + r.u + ")"; });
        return rows.join("\n") + "\n\n" + L(["Dünya 24 saat dilimine ayrılır; saatler UTC’ye göre +/- farkla hesaplanır. Bakü UTC+4, Türkiye UTC+3 (yaz/kış değişmez). Bir şehri sor: “Tokyo’da saat kaç?”", "Dünya 24 saat qurşağına bölünür; saatlar UTC-yə görə +/- fərqlə hesablanır. Bakı UTC+4, Türkiyə UTC+3. Şəhər soruş: “Tokioda saat neçədir?”", "The world has 24 time zones, each an offset from UTC. Baku is UTC+4, Türkiye UTC+3 (no daylight saving). Ask about a city: “What time is it in Tokyo?”", "Мир делится на 24 часовых пояса относительно UTC. Баку — UTC+4, Турция — UTC+3. Спроси про город: «Который час в Токио?»"]);
      }
      for (i = 0; i < TZ.length && !hit; i++) TZ[i][0].split("|").forEach(function (k) { if (n.indexOf(" " + k) >= 0) hit = TZ[i]; });
      if (!hit) return null;
      var r = zoneInfo(hit[1], now);
      return "🕒 " + hit[2] + ": " + r.h + "\n" + r.d + " (" + r.u + ")";
    } catch (e) { return null; }
  }

  /* ---------- 1.2: Çeviri (yerel söz/cümle defteri + sözlük) ---------- */
  var PB = [
    ["Merhaba", "Salam", "Hello", "Привет"], ["Günaydın", "Sabahınız xeyir", "Good morning", "Доброе утро"], ["İyi akşamlar", "Axşamınız xeyir", "Good evening", "Добрый вечер"],
    ["İyi geceler", "Gecəniz xeyirli olsun", "Good night", "Спокойной ночи"], ["Nasılsın?", "Necəsən?", "How are you?", "Как дела?"], ["Teşekkür ederim", "Təşəkkür edirəm", "Thank you", "Спасибо"],
    ["Rica ederim", "Buyurun", "You are welcome", "Пожалуйста"], ["Lütfen", "Zəhmət olmasa", "Please", "Пожалуйста"], ["Evet", "Bəli", "Yes", "Да"], ["Hayır", "Xeyr", "No", "Нет"],
    ["Özür dilerim", "Üzr istəyirəm", "I am sorry", "Извините"], ["Seni seviyorum", "Səni sevirəm", "I love you", "Я тебя люблю"], ["Adın ne?", "Adın nədir?", "What is your name?", "Как тебя зовут?"],
    ["Görüşürüz", "Görüşərik", "See you later", "Увидимся"], ["Hoş geldin", "Xoş gəlmisən", "Welcome", "Добро пожаловать"], ["Anlamıyorum", "Başa düşmürəm", "I do not understand", "Я не понимаю"],
    ["Bana yardım eder misin?", "Mənə kömək edə bilərsənmi?", "Can you help me?", "Можешь мне помочь?"], ["Bu ne kadar?", "Bu neçəyədir?", "How much is this?", "Сколько это стоит?"],
    ["Tuvalet nerede?", "Tualet haradadır?", "Where is the toilet?", "Где туалет?"], ["Hayat güzeldir", "Həyat gözəldir", "Life is beautiful", "Жизнь прекрасна"],
    ["Bilgi güçtür", "Bilik gücdür", "Knowledge is power", "Знание — сила"], ["Damlaya damlaya göl olur", "Damla-damla göl olar", "Many a little makes a mickle", "Капля по капле — море"],
    ["Ne ekersen onu biçersin", "Nə əkərsən onu biçərsən", "You reap what you sow", "Что посеешь, то и пожнёшь"], ["Birlikten kuvvet doğar", "Birlikdən qüvvət doğar", "Unity is strength", "В единстве — сила"],
    ["Seni özledim", "Səni darıxdım", "I miss you", "Я скучаю по тебе"], ["Doğum günün kutlu olsun", "Ad günün mübarək", "Happy birthday", "С днём рождения"]
  ];
  var WD = [
    ["ev", "ev", "house", "дом"], ["su", "su", "water", "вода"], ["ekmek", "çörək", "bread", "хлеб"], ["kitap", "kitab", "book", "книга"], ["okul", "məktəb", "school", "школа"],
    ["arkadaş", "dost", "friend", "друг"], ["sevgi", "sevgi", "love", "любовь"], ["güzel", "gözəl", "beautiful", "красивый"], ["büyük", "böyük", "big", "большой"], ["küçük", "kiçik", "small", "маленький"],
    ["gün", "gün", "day", "день"], ["gece", "gecə", "night", "ночь"], ["bugün", "bu gün", "today", "сегодня"], ["yarın", "sabah", "tomorrow", "завтра"], ["dün", "dünən", "yesterday", "вчера"],
    ["ben", "mən", "I", "я"], ["sen", "sən", "you", "ты"], ["biz", "biz", "we", "мы"], ["anne", "ana", "mother", "мама"], ["baba", "ata", "father", "папа"], ["kardeş", "qardaş", "brother", "брат"],
    ["çocuk", "uşaq", "child", "ребёнок"], ["insan", "insan", "person", "человек"], ["şehir", "şəhər", "city", "город"], ["ülke", "ölkə", "country", "страна"], ["dünya", "dünya", "world", "мир"],
    ["zaman", "zaman", "time", "время"], ["para", "pul", "money", "деньги"], ["iş", "iş", "work", "работа"], ["yemek", "yemək", "food", "еда"], ["çay", "çay", "tea", "чай"], ["kahve", "qəhvə", "coffee", "кофе"],
    ["araba", "maşın", "car", "машина"], ["yol", "yol", "road", "дорога"], ["deniz", "dəniz", "sea", "море"], ["dağ", "dağ", "mountain", "гора"], ["güneş", "günəş", "sun", "солнце"], ["ay", "ay", "moon", "луна"],
    ["iyi", "yaxşı", "good", "хороший"], ["kötü", "pis", "bad", "плохой"], ["hızlı", "sürətli", "fast", "быстрый"], ["yeni", "yeni", "new", "новый"], ["eski", "köhnə", "old", "старый"],
    ["ve", "və", "and", "и"], ["ile", "ilə", "with", "с"], ["için", "üçün", "for", "для"], ["çok", "çox", "very", "очень"], ["sevmek", "sevmək", "to love", "любить"], ["gitmek", "getmək", "to go", "идти"],
    ["gelmek", "gəlmək", "to come", "приходить"], ["yazmak", "yazmaq", "to write", "писать"], ["okumak", "oxumaq", "to read", "читать"], ["Azerbaycan", "Azərbaycan", "Azerbaijan", "Азербайджан"],
    ["Bakü", "Bakı", "Baku", "Баку"], ["Türkiye", "Türkiyə", "Turkey", "Турция"], ["Rusya", "Rusiya", "Russia", "Россия"], ["anavatan", "ana vətən", "motherland", "родина"], ["vatan", "vətən", "homeland", "отечество"]
  ];
  var LNG = { tr: /turkc|turkish|турецк|turk dil/, az: /azerbaycanc|azerice|azeri|azerbaijani|азербайджанск/, en: /ingilizc|ingilis|english|английск/, ru: /rusc|russian|русск|rus dil/ };
  function translate(t) {
    var q = t.match(/[“"«„](.+?)[”"»“]/), rest = q ? t.replace(q[0], " ") : t, n = joined(rest), tg = null, best = -1, src, i, c, tk, cnt = [0, 0, 0, 0], out = [], miss = 0;
    if (!/(cevir|tercume|translate|переведи|перевод)/.test(n)) return null;
    Object.keys(LNG).forEach(function (k) { var m = n.search(LNG[k]); if (m > best) { best = m; tg = k; } });
    if (!tg) return null;
    if (q) src = joined(q[1]);
    else src = n.replace(/(ingilizc|ingilis|english|английск|rusc|russian|русск|rus dil|azerbaycanc|azerice|azeri|azerbaijani|азербайджанск|turkc|turkish|турецк|turk dil|cevir|tercume|translate|переведи|перевод)\w*/g, " ")
      .replace(/(^| )(yi|yu|ni|nu|ya|ye|den|dan|ten|tan|from|to|into|et|eder misin|the|sentence|word|phrase|cumleyi|cumle|kelimeyi|soz|sozu|sozleri|lutfen|please)(?= |$)/g, " ").replace(/\s+/g, " ").trim();
    var T = LI[tg], bad = L(["Bunu çeviremedim: yerel söz defterimde ve sözlüğümde yok. Kısa söz/cümleleri (selamlaşma, atasözü, günlük ifade) ve temel kelimeleri çevirebiliyorum. Tırnak içinde yaz: “Merhaba” İngilizceye çevir.", "Bunu tərcümə edə bilmədim: yerli söz dəftərimdə və lüğətimdə yoxdur. Qısa söz/cümlələri və əsas sözləri tərcümə edə bilirəm. Dırnaq içində yaz: “Salam” rusca tərcümə et.", "I couldn't translate that: it isn't in my local phrasebook or dictionary. I can translate short phrases, sayings and basic words. Put it in quotes: translate “Hello” to Russian.", "Не смог перевести: этого нет в моём разговорнике и словаре. Я перевожу короткие фразы, поговорки и базовые слова. Напиши в кавычках: переведи «Привет» на английский."]);
    if (!src) return bad;
    for (i = 0; i < PB.length; i++) for (c = 0; c < 4; c++) if (joined(PB[i][c]) === src) return PB[i][T];
    tk = src.split(" ");
    function look(w, col) { for (var j = 0; j < WD.length; j++) { var k = joined(WD[j][col]); if (w === k || (k.length >= 2 && w.length > k.length && w.indexOf(k) === 0 && w.length - k.length <= 3)) return WD[j]; } return null; }
    for (c = 0; c < 4; c++) tk.forEach(function (w) { if (look(w, c)) cnt[c]++; });
    c = cnt.indexOf(Math.max.apply(null, cnt));
    if (!cnt[c]) return bad;
    tk.forEach(function (w) { var e = look(w, c); if (e) out.push(e[T]); else { out.push("?"); miss++; } });
    return out.join(" ") + L(["\n(Kelime kelime çeviri; ek ve dil bilgisi uyarlanmaz, bu yüzden tam doğru olmayabilir.)", "\n(Söz-söz tərcümə; şəkilçilər uyğunlaşdırılmır, tam dəqiq olmaya bilər.)", "\n(Word-by-word translation; grammar isn't adapted, so it may not be exact.)", "\n(Пословный перевод; грамматика не адаптируется, поэтому может быть неточным.)"]);
  }

  /* ---------- 1.2: Türev ve integral (polinom) ---------- */
  function calculus(t) {
    var s = norm(t).replace(/(\d)\s*x/g, "$1x"), d = /turev|derivative|производн/.test(s), g = /integral|inteqral|интеграл/.test(s);
    if (!d && !g) return null;
    var m = s.match(/[0-9x][0-9x+\-*^.]*(?:\s*[+\-]\s*[0-9x][0-9x*^.]*)*/);
    if (!m) return null;
    var c = {}, ok = true, parts = m[0].replace(/\s+/g, "").split(/(?=[+-])/);
    parts.forEach(function (p) {
      var x = p.match(/^([+-]?)(\d*\.?\d*)\*?(x)?(?:\^(\d+))?$/);
      if (!x || (x[2] === "" && !x[3])) { ok = false; return; }
      var v = (x[2] === "" ? 1 : parseFloat(x[2])) * (x[1] === "-" ? -1 : 1), e = x[3] ? (x[4] ? +x[4] : 1) : 0;
      c[e] = (c[e] || 0) + v;
    });
    if (!ok) return null;
    var r = {};
    Object.keys(c).forEach(function (e) { e = +e; if (d) { if (e > 0) r[e - 1] = c[e] * e; } else r[e + 1] = c[e] / (e + 1); });
    var ks = Object.keys(r).map(Number).filter(function (e) { return Math.abs(r[e]) > 1e-12; }).sort(function (a, b) { return b - a; });
    var str = ks.map(function (e, i) {
      var v = r[e], a = Math.abs(v), body = (a === 1 && e > 0 ? "" : fmt(a)) + (e === 0 ? "" : "x" + (e > 1 ? "^" + e : ""));
      return (v < 0 ? (i ? " − " : "−") : (i ? " + " : "")) + body;
    }).join("") || "0";
    return (d ? "f′(x) = " : "∫ f(x) dx = ") + str + (g ? " + C" : "");
  }


  /* ---------- 1.3: Ülke coğrafyası ---------- */
  var HP = function (a, m) { return [a, m]; };
  var GEO = [
    ["turkiye|turkey|турци", "Türkiye|Türkiyə|Türkiye|Турция", 783562, 85, "X", HP("Ağrı Dağı|Ağrı dağı|Mount Ararat|Арарат", 5137)],
    ["azerbaycan|azerbaijan|азербайджан", "Azerbaycan|Azərbaycan|Azerbaijan|Азербайджан", 86600, 10.1, "X", HP("Bazardüzü|Bazardüzü|Bazardüzü|Базардюзю", 4466)],
    ["almanya|germany|almaniya|герман", "Almanya|Almaniya|Germany|Германия", 357600, 84, "E"],
    ["fransa|france|франц", "Fransa|Fransa|France|Франция", 551700, 68, "E", HP("Mont Blanc|Mont Blan|Mont Blanc|Монблан", 4806)],
    ["italya|italy|italiya|итал", "İtalya|İtaliya|Italy|Италия", 301340, 59, "E"],
    ["ispanya|spain|ispaniya|испан", "İspanya|İspaniya|Spain|Испания", 505990, 48, "E"],
    ["birlesik krallik|ingiltere|england|united kingdom|великобритан", "Birleşik Krallık|Birləşmiş Krallıq|United Kingdom|Великобритания", 243610, 68, "E"],
    ["rusya|russia|rusiya|росси", "Rusya|Rusiya|Russia|Россия", 17098242, 144, "X", HP("Elbrus|Elbrus|Mount Elbrus|Эльбрус", 5642)],
    ["polonya|poland|polsa|польш", "Polonya|Polşa|Poland|Польша", 312700, 37.5, "E"],
    ["yunanistan|greece|yunanistan|греци", "Yunanistan|Yunanıstan|Greece|Греция", 131957, 10.4, "E"],
    ["gurcistan|georgia|gurcustan|грузи", "Gürcistan|Gürcüstan|Georgia|Грузия", 69700, 3.7, "X"],
    ["ermenistan|armenia|ermenistan|армени", "Ermenistan|Ermənistan|Armenia|Армения", 29743, 3, "X"],
    ["iran|иран", "İran|İran|Iran|Иран", 1648195, 89, "A"],
    ["irak|iraq|ирак", "Irak|İraq|Iraq|Ирак", 438317, 45, "A"],
    ["suudi arabistan|saudi arabia|seudiyye|саудовск", "Suudi Arabistan|Səudiyyə Ərəbistanı|Saudi Arabia|Саудовская Аравия", 2149690, 35, "A"],
    ["misir|egypt|египет", "Mısır|Misir|Egypt|Египет", 1002450, 114, "F"],
    ["abd|abs|usa|united states|сша|соединенные штаты", "ABD|ABŞ|United States|США", 9833517, 335, "N", HP("Denali|Denali|Denali|Денали", 6190)],
    ["kanada|canada|канад", "Kanada|Kanada|Canada|Канада", 9984670, 40, "N"],
    ["meksika|mexico|мексик", "Meksika|Meksika|Mexico|Мексика", 1964375, 129, "N"],
    ["brezilya|brazil|braziliya|бразил", "Brezilya|Braziliya|Brazil|Бразилия", 8515767, 212, "S"],
    ["arjantin|argentina|аргентин", "Arjantin|Argentina|Argentina|Аргентина", 2780400, 46, "S", HP("Aconcagua|Akonkaqua|Aconcagua|Аконкагуа", 6961)],
    ["sili|chile|cili|чили", "Şili|Çili|Chile|Чили", 756102, 19.6, "S"],
    ["japonya|japan|yaponiya|япони", "Japonya|Yaponiya|Japan|Япония", 377975, 124, "A", HP("Fuji Dağı|Fuji dağı|Mount Fuji|Фудзи", 3776)],
    ["cin|china|chin|китай", "Çin|Çin|China|Китай", 9596961, 1410, "A"],
    ["hindistan|india|indiya|инди", "Hindistan|Hindistan|India|Индия", 3287263, 1430, "A"],
    ["guney kore|south korea|cenubi koreya|южная корея", "Güney Kore|Cənubi Koreya|South Korea|Южная Корея", 100363, 51.7, "A"],
    ["avustralya|australia|avstraliya|австрали", "Avustralya|Avstraliya|Australia|Австралия", 7692024, 27, "O"],
    ["yeni zelanda|new zealand|yeni zelandiya|новая зеландия", "Yeni Zelanda|Yeni Zelandiya|New Zealand|Новая Зеландия", 268021, 5.2, "O"],
    ["kazakistan|kazakhstan|qazaxistan|казахстан", "Kazakistan|Qazaxıstan|Kazakhstan|Казахстан", 2724900, 20, "X"],
    ["ozbekistan|uzbekistan|узбекистан", "Özbekistan|Özbəkistan|Uzbekistan|Узбекистан", 448978, 36, "A"],
    ["nijerya|nigeria|nigeriya|нигери", "Nijerya|Nigeriya|Nigeria|Нигерия", 923768, 224, "F"],
    ["kenya|кения", "Kenya|Keniya|Kenya|Кения", 580367, 55, "F"],
    ["pakistan|пакистан", "Pakistan|Pakistan|Pakistan|Пакистан", 881913, 240, "A"],
    ["isvec|sweden|швеци", "İsveç|İsveç|Sweden|Швеция", 450295, 10.5, "E"],
    ["norvec|norway|норвег", "Norveç|Norveç|Norway|Норвегия", 385207, 5.5, "E"],
    ["finlandiya|finland|финлянд", "Finlandiya|Finlandiya|Finland|Финляндия", 338145, 5.6, "E"],
    ["hollanda|netherlands|niderland|нидерланд|голланд", "Hollanda|Niderland|Netherlands|Нидерланды", 41850, 17.9, "E"],
    ["isvicre|switzerland|isvecre|швейцар", "İsviçre|İsveçrə|Switzerland|Швейцария", 41285, 8.8, "E"],
    ["avusturya|austria|avstriya|австри", "Avusturya|Avstriya|Austria|Австрия", 83879, 9.1, "E"],
    ["portekiz|portugal|portuqaliya|португал", "Portekiz|Portuqaliya|Portugal|Португалия", 92090, 10.4, "E"]
  ];
  var CT = { A: ["Asya", "Asiya", "Asia", "Азия"], E: ["Avrupa", "Avropa", "Europe", "Европа"], F: ["Afrika", "Afrika", "Africa", "Африка"], N: ["Kuzey Amerika", "Şimali Amerika", "North America", "Северная Америка"],
    S: ["Güney Amerika", "Cənubi Amerika", "South America", "Южная Америка"], O: ["Okyanusya", "Okeaniya", "Oceania", "Океания"], X: ["Asya ve Avrupa (Avrasya)", "Asiya və Avropa (Avrasiya)", "Asia and Europe (Eurasia)", "Азия и Европа (Евразия)"] };
  function geoHit(tk, n, k) {
    if (k.indexOf(" ") >= 0) return (" " + n).indexOf(" " + k) >= 0;
    return tk.some(function (x) { return x === k || (k.length >= 5 ? x.indexOf(k) === 0 : x.indexOf(k) === 0 && x.length <= k.length + 2); });
  }
  function geoQ(t) {
    var n = joined(t), tk = n.split(" "), a = /yuzolcum|buyukluk|(^| )alan(i|in|ini)?( |$)|sahesi|(^| )area|how big|площад/.test(n), p = /nufus|ehali|population|населен/.test(n),
      c = /(^| )kita|qite|continent|континент/.test(n), g = /cograf|geograph|географ/.test(n), best = null, bl = 0;
    if (!(a || p || c || g)) return null;
    GEO.forEach(function (r) { r[0].split("|").forEach(function (k) { if (k.length > bl && geoHit(tk, n, k)) { best = r; bl = k.length; } }); });
    if (!best) return null;
    var nm = best[1].split("|")[LI[cur]], all = !(a || p || c), o = [], cn = CT[best[4]][LI[cur]], hp = best[5];
    if (a || all) o.push(L(["yüzölçümü yaklaşık " + fmt(best[2]) + " km²", "sahəsi təxminən " + fmt(best[2]) + " km²", "area about " + fmt(best[2]) + " km²", "площадь около " + fmt(best[2]) + " км²"]));
    if (p || all) o.push(L(["nüfusu yaklaşık " + fmt(best[3]) + " milyon", "əhalisi təxminən " + fmt(best[3]) + " milyon", "population about " + fmt(best[3]) + " million", "население около " + fmt(best[3]) + " млн"]));
    if (c || all) o.push(L(["kıta: ", "qitə: ", "continent: ", "континент: "]) + cn);
    if (hp && all) o.push(L(["en yüksek nokta: ", "ən hündür nöqtə: ", "highest point: ", "высшая точка: "]) + hp[0].split("|")[LI[cur]] + " (" + fmt(hp[1]) + " m)");
    return nm + ": " + o.join("; ") + "." + ((p || all) ? L(["\n(Rakamlar yaklaşık, yuvarlak ve güncel olmayabilir.)", "\n(Rəqəmlər təxmini və yuvarlaqdır, köhnə ola bilər.)", "\n(Figures are approximate and may be out of date.)", "\n(Цифры приблизительные и могут быть устаревшими.)"]) : "");
  }

  /* ---------- Dil katmanı (tr, az, en, ru) ---------- */
  var LI = { tr: 0, az: 1, en: 2, ru: 3 }, cur = "tr";
  function L(a) { return a[LI[cur]]; }
  function detect(t, st) {
    var s = t.toLowerCase(), n = " " + joined(t) + " ";
    if (/[а-яё]/.test(s)) return "ru";
    if (/ə/.test(s) || /\b(salam|paytaxt\w*|nece\w*|hansi|haqqinda|sahe|ededdir|komek|sagol|prezident\w*|olke\w*|tarix\w*|yaranib|qurulub|bilirsen|edirem|deyilem|yaponiya|almaniya|fransa|rusiya|italiya|ispaniya|qeyd\w*|xatirlat\w*|deqiqe\w*|parol|endirim\w*|kredit\w*|sozle\w*|boyuk|kicik|herf\w*|qalib|qalir|hefte\w*|taymer|viktorina|metrdir|olar)\b/.test(n)) return "az";
    if (/\b(what|who|how|tell|hello|hi|hey|the|of|is|are|capital|plus|minus|times|divided|solve|area|perimeter|please|thanks|thank|you|your|why|when|where|which|many|much|time|day|date|history|empire|war|union|theorem|world|dynasty|kingdom|republic|european|derivative|equation|fraction|volume|cube|root|prime|percent|roman|history|password|generate|create|note|notes|timer|remind|reminder|minutes|minute|seconds|hours|days|until|born|discount|loan|monthly|binary|hexadecimal|decimal|octal|numerals|words|quiz|convert|uppercase|lowercase|reverse|delete|show|between|since|ago|weeks|height|weight|meters|miles|strong|new|year|old|cancel)\b/.test(n)) return "en";
    if (/(merhaba|selam|baskent|neresi|nasil|kac|yuzde|karekok|kimdir|nedir|neler|saat|bugun|(^| )alan|cevre)/.test(n)) return "tr";
    if (/\b(dakika\w*|saniye\w*|zamanlayici\w*|hatirlat\w*|sifre\w*|parola\w*|olustur\w*|indirim\w*|kredi|faiz\w*|kdv|dahil|yasinda\w*|dogum\w*|kaldi|sonra|once|hafta\w*|ikilik\w*|onluk\w*|onaltilik\w*|yaziyla|kelime\w*|karakter\w*|harf\w*|notlarim|notu|boyum|kilom|yarisma\w*|metre\w*|litre\w*|donum|galon|rakam\w*|artik|haneli|buyuk|kucuk|ters|sirala|palindrom|yil\w*|not al)\b/.test(n)) return "tr";
    if (/\b(hakkinda|bilgi\w*|anlat\w*|hangi|nerede|ne zaman|nedir|kimdir)\b/.test(n)) return "tr";
    var prev = st.lang || st.uiLang || "tr";
    if (prev === "ru" && /[a-z]/i.test(t)) return st.uiLang && st.uiLang !== "ru" ? st.uiLang : "tr";
    if (prev === "en" && /[şğıçöüİ]/.test(t)) return /[əƏ]/.test(t) ? "az" : "tr";
    return prev;
  }
  var DT = {
    tr: [MONTHS, DAYS],
    az: ["yanvar|fevral|mart|aprel|may|iyun|iyul|avqust|sentyabr|oktyabr|noyabr|dekabr".split("|"), "Bazar|Bazar ertəsi|Çərşənbə axşamı|Çərşənbə|Cümə axşamı|Cümə|Şənbə".split("|")],
    en: ["January|February|March|April|May|June|July|August|September|October|November|December".split("|"), "Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday".split("|")],
    ru: ["января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря".split("|"), "воскресенье|понедельник|вторник|среда|четверг|пятница|суббота".split("|")]
  };
  var UNKNOWN = [
    "Bunu bilmiyorum. Ben internete bağlı olmayan, sınırlı bir yerel bilgi tabanıyla çalışan bir asistanım; tahmin yürütüp yanlış bilgi vermek istemem.\n\nŞunlarda yardımcı olabilirim: hesaplamalar, denklemler, geometri, birim çevirme, saat ve tarih, ülke başkentleri, bilim–tarih–programlamadan temel bilgiler ve dosya istatistikleri. “Neler biliyorsun?” yazarak konu listesini görebilirsin.",
    "Bunu bilmirəm. Mən internetə qoşulmayan, məhdud yerli bilik bazası ilə işləyən köməkçiyəm; təxmin edib yanlış məlumat vermək istəmirəm. Bu məlumat oflayn bilik bazamda yoxdur.\n\nHesablamalar, tənliklər, həndəsə, vahid çevirmə, saat və tarix, paytaxtlar və bəzi əsas biliklər üzrə kömək edə bilərəm. “Nələr bilirsən?” yaza bilərsən.",
    "I don't know that. It isn't in my offline knowledge base, and I'd rather not guess and give you wrong information.\n\nI can help with calculations, equations, geometry, unit conversion, time and date, capitals and some basic facts. Type “What do you know?” to see the topics.",
    "Я этого не знаю. Этого нет в моей офлайн-базе знаний, и я не хочу гадать и давать неверную информацию.\n\nМогу помочь с вычислениями, уравнениями, геометрией, единицами измерения, временем и датой, столицами и базовыми фактами. Напиши «Что ты знаешь?», чтобы увидеть темы."
  ];
  var YES = /^(evet|olur|tamam|aynen|dogru|he|beli|yes|yeah|yep|ok|да|ага|конечно)$/;
  var FOLLOW = /^(peki|ya|bir de|bes|and|what about|how about|а|а как|а если)(\s|$)/;

  function ans(f) {
    var a = f.a;
    if (typeof a === "string") return (cur === "tr" ? "" : L(["", "(Cavab yalnız türk dilində var.)\n", "(This answer is only available in Turkish.)\n", "(Ответ есть только на турецком.)\n"])) + a;
    return a[cur] || a.tr;
  }
  function capOut(c) {
    var i = { tr: 0, az: 6, en: 2, ru: 4 }[cur]; if (c.length <= i) i = 0;
    return L(["%1 için başkent: %2.", "%1 üçün paytaxt: %2.", "Capital of %1: %2.", "Столица (%1): %2."]).replace("%1", c[i]).replace("%2", c[i + 1]);
  }

  /* ---------- 1.4: Çevrimdışı araçlar ---------- */
  // Rakamları ondalıklarıyla birlikte koruyan jetonlayıcı ("1,5 saat" -> ["1.5", "saat"]).
  function numTok(t) {
    return (norm(t).replace(/[²]/g, "2").replace(/[³]/g, "3").replace(/(\d),(\d)/g, "$1.$2").match(/\d+(?:\.\d+)?|[a-z\u0430-\u044f0-9]+/g) || []);
  }
  function sig(v, p) { return +(+v).toPrecision(p || 6); }
  function pctStr(v) { return cur === "tr" ? "%" + fmt(v) : fmt(v) + "%"; }

  /* Notlar */
  var NOTE_ADD = /^\s*(?:bunu\s+not\s+al|not\s+(?:al|et|ekle|yaz|kaydet)|qeyd\s+(?:et|elə|ele|yaz)|add\s+(?:a\s+)?note|take\s+(?:a\s+)?note|note\s+down|new\s+note|note|добавь\s+заметку|новая\s+заметка|запиши(?:\s+заметку)?|заметка)\s*[:：\-–—]?\s+([\s\S]+)$/i;
  function noteCmd(t, st) {
    var n = joined(t), m, list = st.notes || (st.notes = []);
    if ((m = t.match(NOTE_ADD)) && m[1].trim()) {
      if (list.length >= 200) return L(["En fazla 200 not saklayabilirim. Önce birkaçını sil (“notu sil 3”).", "Ən çoxu 200 qeyd saxlaya bilərəm. Əvvəlcə bəzilərini sil (“qeydi sil 3”).", "I can keep up to 200 notes. Delete a few first (“delete note 3”).", "Я храню не больше 200 заметок. Сначала удали несколько («удали заметку 3»)."]);
      list.push({ t: m[1].trim().slice(0, 1000), d: Date.now() });
      return "📝 " + L(["Not kaydedildi (#", "Qeyd saxlanıldı (#", "Note saved (#", "Заметка сохранена (#"]) + list.length + L(["). Hepsini görmek için “notlarım” yaz.", "). Hamısına baxmaq üçün “qeydlərim” yaz.", "). Type “my notes” to see them all.", "). Напиши «мои заметки», чтобы увидеть все."]);
    }
    if (/^(notlarim|notlarimi goster|notlari goster|notlari listele|notlar|qeydlerim|qeydlerimi goster|qeydleri goster|qeydler|my notes|show notes|show my notes|list notes|notes|мои заметки|заметки|покажи заметки)$/.test(n)) {
      if (!list.length) return L(["Henüz notun yok. Örnek: “Not al: Yarın 10’da toplantı”.", "Hələ qeydin yoxdur. Məsələn: “Qeyd et: Sabah saat 10-da görüş”.", "You have no notes yet. Example: “Note: meeting tomorrow at 10”.", "Заметок пока нет. Пример: «Заметка: встреча завтра в 10»."]);
      return "📝 " + L(["Notların", "Qeydlərin", "Your notes", "Твои заметки"]) + " (" + list.length + "):\n" + list.map(function (x, i) { return (i + 1) + ". " + x.t; }).join("\n") +
        L(["\n\nSilmek için: “notu sil 2”", "\n\nSilmək üçün: “qeydi sil 2”", "\n\nTo delete: “delete note 2”", "\n\nЧтобы удалить: «удали заметку 2»"]);
    }
    if ((m = n.match(/(?:notu sil|not sil|notunu sil|qeydi sil|qeyd sil|delete note|remove note|удали заметку|удалить заметку)\s*(\d+)/))) {
      var i = +m[1];
      if (i < 1 || i > list.length) return L(["Bu numarada not yok.", "Bu nömrədə qeyd yoxdur.", "There's no note with that number.", "Заметки с таким номером нет."]);
      return "🗑 " + L(["Silindi: ", "Silindi: ", "Deleted: ", "Удалено: "]) + list.splice(i - 1, 1)[0].t;
    }
    if (/^(notlari (sil|temizle)|tum notlari (sil|temizle)|butun notlari sil|qeydleri sil|butun qeydleri sil|clear notes|clear all notes|delete all notes|удали все заметки|очисти заметки)$/.test(n)) {
      var c = list.length; list.length = 0;
      return "🗑 " + L([c + " not silindi.", c + " qeyd silindi.", c + " notes deleted.", "Удалено заметок: " + c + "."]);
    }
    return null;
  }

  /* Zamanlayıcı ve hatırlatıcı */
  var TU = [[/^(sn|san|saniye\w*|sec|secs|second\w*|секунд[\u0430-\u044f\w]*|сек)$/, 1e3], [/^(dk|dak|dakika\w*|deqiqe\w*|min|mins|minute\w*|минут[\u0430-\u044f\w]*|мин)$/, 6e4], [/^(sa|saat\w*|hour\w*|hr|hrs|час[\u0430-\u044f\w]*|ч)$/, 36e5]];
  function durStr(ms) {
    var h = Math.floor(ms / 36e5), m = Math.floor(ms % 36e5 / 6e4), s = Math.round(ms % 6e4 / 1e3), U = L([["sa", "dk", "sn"], ["saat", "dəq", "san"], ["h", "min", "s"], ["ч", "мин", "сек"]]), o = [];
    if (h) o.push(h + " " + U[0]); if (m) o.push(m + " " + U[1]); if (s) o.push(s + " " + U[2]);
    return o.join(" ") || "0 " + U[2];
  }
  function timerCmd(t, st, now) {
    var n = joined(t);
    if (!/(zamanlayici|geri sayim|alarm|hatirlat|xatirlat|taymer|timer|countdown|remind|напомни|таймер|будильник)/.test(n)) return null;
    if (/(iptal|durdur|kapat|legv|dayandir|(^| )sil( |$)|cancel|stop|clear|delete|отмени|отмена|останови|удали|сбрось)/.test(n)) {
      st.timerCancel = true;
      return "⏹ " + L(["Tüm zamanlayıcılar iptal edildi.", "Bütün taymerlər ləğv edildi.", "All timers cancelled.", "Все таймеры отменены."]);
    }
    var tk = numTok(t), ms = 0, i, j, due, label = "";
    for (i = 0; i < tk.length - 1; i++) if (/^\d/.test(tk[i])) for (j = 0; j < TU.length; j++) if (TU[j][0].test(tk[i + 1])) { ms += parseFloat(tk[i]) * TU[j][1]; break; }
    if (!ms && /(yarim saat|yarim saatlik|half an hour|half hour|полчаса)/.test(n)) ms = 18e5;
    var lm = t.match(/[:：]\s*([^\d\s][\s\S]*)$/) || t.match(/remind me to\s+(.+?)(?:\s+in\s+\d[\s\S]*)?$/i);
    if (lm) label = lm[1].trim().slice(0, 200);
    if (ms) {
      if (ms > 864e5) return L(["En fazla 24 saatlik zamanlayıcı kurabilirim.", "Ən çoxu 24 saatlıq taymer qura bilərəm.", "I can set timers up to 24 hours.", "Я ставлю таймеры максимум на 24 часа."]);
      if (ms < 1e3) ms = 1e3;
      due = now.getTime() + ms;
    } else {
      var am = t.match(/(\d{1,2})[:.](\d{2})(?!\d)/);
      if (!am || +am[1] > 23 || +am[2] > 59) return L(["Ne kadar süre? Örnek: “10 dakika zamanlayıcı” ya da “saat 18:30’da hatırlat: toplantı”.", "Nə qədər vaxt? Məsələn: “10 dəqiqə taymer” və ya “saat 18:30-da xatırlat: görüş”.", "For how long? Example: “10 minute timer” or “remind me at 18:30: meeting”.", "На сколько? Пример: «таймер на 10 минут» или «напомни в 18:30: встреча»."]);
      var d = new Date(now.getTime()); d.setHours(+am[1], +am[2], 0, 0);
      if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 1);
      due = d.getTime(); ms = due - now.getTime();
    }
    st.timer = { due: due, label: label };
    var at = new Date(due), hm = pad(at.getHours()) + ":" + pad(at.getMinutes());
    return "⏰ " + L(["Zamanlayıcı kuruldu: ", "Taymer quruldu: ", "Timer set: ", "Таймер поставлен: "]) + durStr(ms) + " → " + hm + (label ? " · " + label : "") +
      L(["\nZunex açıkken haber veririm. Uygulama kapalıyken dolarsa, tekrar açtığında hatırlatırım. İptal: “zamanlayıcıyı iptal et”.", "\nZunex açıq olanda xəbər verəcəyəm. Tətbiq bağlı ikən vaxt dolsa, yenidən açanda xatırladacağam. Ləğv: “taymeri ləğv et”.", "\nI'll alert you while Zunex is open. If it ends while the app is closed, I'll remind you when you reopen it. Cancel: “cancel timer”.", "\nЯ сообщу, пока Zunex открыт. Если время выйдет, когда приложение закрыто, напомню при следующем открытии. Отмена: «отмени таймер»."]);
  }

  /* Şifre / PIN üretici */
  function rint(n) {
    var c = (typeof crypto !== "undefined" && crypto && crypto.getRandomValues) ? crypto : null;
    if (!c) return Math.floor(Math.random() * n);
    var a = new Uint32Array(1), lim = Math.floor(4294967296 / n) * n;
    do { c.getRandomValues(a); } while (a[0] >= lim);
    return a[0] % n;
  }
  function password(t) {
    var n = joined(t), pin = /(^| )pin( |$)|pin kod/.test(n);
    if (!(/(sifre|parola|parol|password|passcode|пароль)/.test(n) || pin)) return null;
    if (!/(olustur|uret|yarat|ver|oner|generate|create|make|new|random|give|suggest|yeni|guclu|strong|rastgele|сгенерир|созда|придума|случайн|дай|новый|надежн)/.test(n)) return null;
    var nm = n.match(/\d+/), len = nm ? +nm[0] : (pin ? 4 : 16), out = [], i;
    if (pin) {
      len = Math.max(4, Math.min(12, len));
      for (i = 0; i < len; i++) out.push(String(rint(10)));
      return "🔢 PIN: " + out.join("") + L(["\nCihazında üretildi. Doğum tarihi gibi tahmin edilebilir PIN’lerden kaçın.", "\nCihazında yaradıldı. Doğum tarixi kimi təxmin edilə bilən PIN-lərdən qaç.", "\nGenerated on your device. Avoid guessable PINs like birthdays.", "\nСоздан на устройстве. Избегай предсказуемых PIN-кодов вроде даты рождения."]);
    }
    len = Math.max(8, Math.min(64, len));
    var G = ["ABCDEFGHJKLMNPQRSTUVWXYZ", "abcdefghijkmnopqrstuvwxyz", "23456789"];
    if (!/(sembolsuz|simvolsuz|without symbols|no symbols|без символов)/.test(n)) G.push("!@#$%&*?-_+=");
    var all = G.join("");
    G.forEach(function (g) { out.push(g.charAt(rint(g.length))); });
    while (out.length < len) out.push(all.charAt(rint(all.length)));
    for (i = out.length - 1; i > 0; i--) { var j = rint(i + 1), x = out[i]; out[i] = out[j]; out[j] = x; }
    var bits = Math.round(len * Math.log(all.length) / Math.LN2);
    return "🔐 " + out.join("") + "\n" + L([len + " karakter, yaklaşık " + bits + " bit güç. Cihazında üretildi ve hiçbir yere gönderilmedi; sohbet geçmişinde durur, istersen sohbeti temizle.", len + " simvol, təxminən " + bits + " bit güc. Cihazında yaradıldı və heç yerə göndərilmədi; söhbət tarixçəsində qalır, istəsən söhbəti təmizlə.", len + " characters, about " + bits + " bits of strength. Generated on your device and never sent anywhere; it stays in the chat history, so clear the chat if you like.", len + " символов, около " + bits + " бит стойкости. Создан на устройстве и никуда не отправлен; он остаётся в истории чата, при желании очисти её."]);
  }

  /* Tarih hesapları */
  var MONP = [["oca", "yanvar", "january", "январ"], ["subat", "fevral", "february", "феврал"], ["mart", "march", "март"], ["nisan", "aprel", "april", "апрел"], ["mayis", "may", "ма"], ["haziran", "iyun", "june", "июн"],
    ["temmuz", "iyul", "july", "июл"], ["agustos", "avqust", "august", "август"], ["eylul", "sentyabr", "september", "сентябр"], ["ekim", "oktyabr", "october", "октябр"], ["kasim", "noyabr", "november", "ноябр"], ["aral", "dekabr", "december", "декабр"]];
  var MONS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  function monthOf(w) {
    if (!w) return 0;
    if (MONS.indexOf(w) >= 0) return MONS.indexOf(w) + 1;
    if (w === "ма" || /^ма[яй]$/.test(w)) return 5;
    for (var i = 0; i < 12; i++) for (var j = 0; j < MONP[i].length; j++) { var p = MONP[i][j]; if (p !== "ма" && p.length >= 3 && w.indexOf(p) === 0) return i + 1; }
    return 0;
  }
  function mkDate(y, m, d) { var x = new Date(Date.UTC(y, m - 1, d)); return x.getUTCFullYear() === y && x.getUTCMonth() === m - 1 && x.getUTCDate() === d ? { y: y, m: m, d: d, n: Math.round(x.getTime() / 864e5) } : null; }
  function dayNum(now) { return Math.round(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 864e5); }
  function fromNum(k) { var x = new Date(k * 864e5); return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), n: k, w: x.getUTCDay() }; }
  function dateStr(o) {
    var D = DT[cur], w = new Date(o.n * 864e5).getUTCDay();
    return (cur === "en" ? D[0][o.m - 1] + " " + o.d + ", " + o.y : o.d + " " + D[0][o.m - 1] + " " + o.y) + ", " + D[1][w];
  }
  function findDates(t, now) {
    var s = norm(t), out = [], m, R = /(\d{4})[-.\/](\d{1,2})[-.\/](\d{1,2})|(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4})|(\d{1,2})(?:-?(?:ci|cu|th|st|nd|rd|го|е))?\s+([a-z\u0430-\u044f]+)(?:\s+(\d{4}))?|([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,?(?:\s+(\d{4}))?/g;
    while ((m = R.exec(s))) {
      var o = null, mo;
      if (m[1]) o = mkDate(+m[1], +m[2], +m[3]);
      else if (m[4]) o = mkDate(+m[6], +m[5], +m[4]);
      else if (m[7] && (mo = monthOf(m[8]))) { o = mkDate(m[9] ? +m[9] : now.getFullYear(), mo, +m[7]); if (o && !m[9]) o.noYear = true; }
      else if (m[10] && (mo = monthOf(m[10]))) { o = mkDate(m[12] ? +m[12] : now.getFullYear(), mo, +m[11]); if (o && !m[12]) o.noYear = true; }
      if (o) out.push(o); else R.lastIndex = m.index + 1;
    }
    return out;
  }
  function dateTool(t, now) {
    var n = joined(t), s = norm(t), today = dayNum(now), ds = findDates(t, now), m, k;
    // Artık yıl
    if (/(artik yil|leap year|uzun il|високосн)/.test(n) && (m = n.match(/\b(\d{4})\b/))) {
      var y = +m[1], lp = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      return lp ? L([y + " artık yıldır (366 gün).", y + " uzun ildir (366 gün).", y + " is a leap year (366 days).", y + " — високосный год (366 дней)."]) : L([y + " artık yıl değildir (365 gün).", y + " uzun il deyil (365 gün).", y + " is not a leap year (365 days).", y + " — не високосный год (365 дней)."]);
    }
    // Yılbaşı
    if (!ds.length && /(yilbasi|yeni yil|yeni il|new year|нов[\u0430-\u044f\w]* год|новогод)/.test(n)) { var ny = mkDate(now.getFullYear() + 1, 1, 1); ds = [ny]; }
    // N gün sonra / önce
    var add = s.match(/(\d+)\s*(gun\w*|days?|день|дня|дней|дн|hafta\w*|hefte\w*|weeks?|недел[\u0430-\u044f\w]*)\s*(?:\S+\s+)?(sonra|once|evvel|later|after|from now|from today|ago|before|спустя|назад|после)/), ru = s.match(/через\s+(\d+)\s*(день|дня|дней|дн|недел[\u0430-\u044f\w]*)/);
    if (add || ru) {
      var a = add || ru, cnt = +a[1] * (/(hafta|hefte|week|недел)/.test(a[2]) ? 7 : 1), neg = add && /(once|evvel|ago|before|назад)/.test(a[3]);
      if (cnt > 365000) return null;
      var base = ds.length ? ds[0].n : today, r = fromNum(base + (neg ? -cnt : cnt));
      return "📅 " + dateStr(r);
    }
    if (!ds.length) return null;
    var d0 = ds[0];
    // Yaş
    if (/(yasim|yasindayim|kac yasinda|yas hesapla|dogum|dogdum|dogumlu|nece yas|yasim var|how old|my age|born|birthday|сколько мне лет|возраст|родил)/.test(n)) {
      if (d0.n > today) return L(["Bu tarih henüz gelmedi.", "Bu tarix hələ gəlməyib.", "That date hasn't happened yet.", "Эта дата ещё не наступила."]);
      var tn = fromNum(today), yy = tn.y - d0.y, mm = tn.m - d0.m, dd = tn.d - d0.d;
      if (dd < 0) { mm--; dd += new Date(Date.UTC(tn.y, tn.m - 1, 0)).getUTCDate(); }
      if (mm < 0) { yy--; mm += 12; }
      var nb = mkDate(tn.y, d0.m, d0.d) || mkDate(tn.y, 3, 1); if (nb.n < today) nb = mkDate(tn.y + 1, d0.m, d0.d) || mkDate(tn.y + 1, 3, 1);
      var left = nb.n - today, lived = today - d0.n;
      return "🎂 " + L([yy + " yaş, " + mm + " ay, " + dd + " gün.\nYaşanan gün: " + fmt(lived) + (left ? "\nSonraki doğum gününe " + left + " gün var." : "\nBugün doğum günün, kutlu olsun!"),
        yy + " yaş, " + mm + " ay, " + dd + " gün.\nYaşanan gün: " + fmt(lived) + (left ? "\nNövbəti ad gününə " + left + " gün qalıb." : "\nBu gün ad günündür, mübarək olsun!"),
        yy + " years, " + mm + " months, " + dd + " days.\nDays lived: " + fmt(lived) + (left ? "\nNext birthday in " + left + " days." : "\nIt's your birthday today. Happy birthday!"),
        yy + " лет, " + mm + " мес., " + dd + " дн.\nПрожито дней: " + fmt(lived) + (left ? "\nДо следующего дня рождения: " + left + " дн." : "\nСегодня твой день рождения, поздравляю!")]);
    }
    // İki tarih arası
    if (ds.length >= 2) {
      k = Math.abs(ds[1].n - d0.n);
      return "📅 " + L([k + " gün", k + " gün", k + " days", k + " дн."]) + (k >= 14 ? " (≈ " + fmt(sig(k / 7, 3)) + L([" hafta)", " həftə)", " weeks)", " нед.)"]) : "");
    }
    // Haftanın günü
    if (/(hangi gun|ne gunu|gunlerden|haftanin|hansi gun|heftenin|what day|which day|day of the week|weekday|какой день|день недели)/.test(n)) return "📅 " + dateStr(d0);
    // Kaç gün kaldı / geçti
    if (/(kac gun|kaldi|gun var|ne zaman|nece gun|qalib|qalir|kecib|gecti|days until|days left|how many days|how long until|until|days since|since|сколько дней|осталось|прошло|до )/.test(n + " ")) {
      if (d0.noYear && d0.n < today) d0 = mkDate(d0.y + 1, d0.m, d0.d) || d0;
      k = d0.n - today;
      if (k === 0) return L(["Bu tarih bugün: ", "Bu tarix bu gündür: ", "That's today: ", "Это сегодня: "]) + dateStr(d0);
      return "📅 " + dateStr(d0) + "\n" + (k > 0 ? L([k + " gün kaldı.", k + " gün qalıb.", k + " days to go.", "Осталось " + k + " дн."]) : L([(-k) + " gün geçti.", (-k) + " gün keçib.", (-k) + " days ago.", "Прошло " + (-k) + " дн."]));
    }
    return null;
  }

  /* Gelişmiş birim çevirici */
  var U2 = [
    // [regex, birim, boyut, taban çarpanı, gösterim]
    [/^(m2|metrekare\w*|square meters?|square metres?|квадратн[\u0430-\u044f\w]*)$/, "m2", "area", 1, "m²"], [/^(km2|kilometrekare\w*)$/, "km2", "area", 1e6, "km²"], [/^(cm2|santimetrekare\w*)$/, "cm2", "area", 1e-4, "cm²"],
    [/^(hektar\w*|hectares?|ha|гектар[\u0430-\u044f\w]*)$/, "ha", "area", 1e4, "ha"], [/^(donum\w*|dekar\w*)$/, "donum", "area", 1000, ["dönüm", "dönüm", "dunam", "дунам"]], [/^(acres?|akr\w*|акр[\u0430-\u044f\w]*)$/, "acre", "area", 4046.8564224, ["akre", "akr", "acre", "акр"]],
    [/^(m3|metrekup\w*|cubic meters?|кубометр[\u0430-\u044f\w]*)$/, "m3", "vol", 1000, "m³"],
    [/^(mm|milimetre\w*|millimet\w*|миллиметр[\u0430-\u044f\w]*|мм)$/, "mm", "len", .001, "mm"], [/^(cm|santimetre\w*|santim\w*|santimetr\w*|sm|centimet\w*|сантиметр[\u0430-\u044f\w]*|см)$/, "cm", "len", .01, "cm"],
    [/^(km|kilomet\w*|километр[\u0430-\u044f\w]*|км)$/, "km", "len", 1000, "km"], [/^(m|metre\w*|metr\w*|meters?|metres?|метр[\u0430-\u044f\w]*|м)$/, "m", "len", 1, "m"],
    [/^(inch\w*|duym\w*|дюйм[\u0430-\u044f\w]*|inc)$/, "in", "len", .0254, ["inç", "düym", "in", "дюйм"]], [/^(ft|feet|foot|ayak|fut|фут[\u0430-\u044f\w]*)$/, "ft", "len", .3048, "ft"], [/^(yards?|yarda|yd|ярд[\u0430-\u044f\w]*)$/, "yd", "len", .9144, ["yarda", "yard", "yd", "ярд"]],
    [/^(nmi)$/, "nmi", "len", 1852, ["deniz mili", "dəniz mili", "nmi", "морск. миля"]], [/^(mil|mile|miles|mill|миля|миль|мили)$/, "mi", "len", 1609.344, ["mil", "mil", "mi", "миля"]],
    [/^(mg|miligram\w*|milligram\w*|миллиграмм[\u0430-\u044f\w]*|мг)$/, "mg", "mass", 1e-6, "mg"], [/^(g|gr|gram|grams|gramm\w*|qram\w*|грамм[\u0430-\u044f\w]*|г)$/, "g", "mass", .001, "g"],
    [/^(kg|kilo|kilogram\w*|kiloqram\w*|килограмм[\u0430-\u044f\w]*|кг)$/, "kg", "mass", 1, "kg"], [/^(ton|tons|tonne\w*|тонн[\u0430-\u044f\w]*)$/, "t", "mass", 1000, ["ton", "ton", "t", "т"]],
    [/^(oz|ons|ounces?|унци[\u0430-\u044f\w]*)$/, "oz", "mass", .028349523125, "oz"], [/^(lb|lbs|pounds?|libre|paund\w*|фунт[\u0430-\u044f\w]*)$/, "lb", "mass", .45359237, "lb"],
    [/^(ml|mililitre\w*|millilit\w*|миллилитр[\u0430-\u044f\w]*|мл)$/, "ml", "vol", .001, "ml"], [/^(l|lt|litre\w*|litr\w*|liters?|litres?|литр[\u0430-\u044f\w]*|л)$/, "l", "vol", 1, "L"],
    [/^(gallons?|galon\w*|gal|галлон[\u0430-\u044f\w]*)$/, "gal", "vol", 3.785411784, ["galon (ABD)", "qallon (ABŞ)", "gal (US)", "галлон (США)"]], [/^(pints?|pint|пинт[\u0430-\u044f\w]*)$/, "pt", "vol", .473176473, ["pint (ABD)", "pint (ABŞ)", "pint (US)", "пинта (США)"]],
    [/^(kmh|kph)$/, "kmh", "spd", 1 / 3.6, "km/h"], [/^(ms)$/, "ms", "spd", 1, "m/s"], [/^(mph)$/, "mph", "spd", .44704, "mph"], [/^(knots?|knot|dugum|узл[\u0430-\u044f\w]*|узел)$/, "kn", "spd", 1852 / 3600, ["knot", "düyün", "knot", "узел"]],
    [/^(bits?|бит[\u0430-\u044f\w]*)$/, "bit", "data", .125, "bit"], [/^(bytes?|bayt\w*|байт[\u0430-\u044f\w]*)$/, "B", "data", 1, "B"], [/^(kb|kilobyte\w*|kilobayt\w*|кб|килобайт[\u0430-\u044f\w]*)$/, "KB", "data", 1024, "KB"],
    [/^(mb|megabyte\w*|megabayt\w*|мб|мегабайт[\u0430-\u044f\w]*)$/, "MB", "data", 1048576, "MB"], [/^(gb|gigabyte\w*|gigabayt\w*|гб|гигабайт[\u0430-\u044f\w]*)$/, "GB", "data", 1073741824, "GB"], [/^(tb|terabyte\w*|terabayt\w*|тб|терабайт[\u0430-\u044f\w]*)$/, "TB", "data", 1099511627776, "TB"],
    [/^(saniye\w*|san|sn|seconds?|secs?|секунд[\u0430-\u044f\w]*|сек)$/, "s", "time", 1, ["sn", "san", "s", "сек"]], [/^(dakika\w*|dk|deqiqe\w*|minutes?|mins?|минут[\u0430-\u044f\w]*|мин)$/, "min", "time", 60, ["dk", "dəq", "min", "мин"]],
    [/^(saat\w*|hours?|hrs?|час[\u0430-\u044f\w]*)$/, "h", "time", 3600, ["saat", "saat", "h", "ч"]], [/^(gun\w*|days?|день|дня|дней|сут[\u0430-\u044f\w]*)$/, "d", "time", 86400, ["gün", "gün", "days", "дн."]],
    [/^(hafta\w*|hefte\w*|weeks?|недел[\u0430-\u044f\w]*)$/, "w", "time", 604800, ["hafta", "həftə", "weeks", "нед."]], [/^(yil\w*|il|years?|год|года|лет)$/, "y", "time", 31536000, ["yıl", "il", "years", "г."]],
    [/^(c|celsius|santigrat|selsi\w*|цельси[\u0430-\u044f\w]*)$/, "C", "temp", 0, "°C"], [/^(f|fahrenheit|fahrenhayt|фаренгейт[\u0430-\u044f\w]*)$/, "F", "temp", 0, "°F"], [/^(k|kelvin\w*|кельвин[\u0430-\u044f\w]*)$/, "K", "temp", 0, "K"]
  ];
  function unitOf(w) { for (var i = 0; i < U2.length; i++) if (U2[i][0].test(w)) return U2[i]; return null; }
  function toK(v, u) { return u === "C" ? v + 273.15 : u === "F" ? (v - 32) * 5 / 9 + 273.15 : v; }
  function fromK(v, u) { return u === "C" ? v - 273.15 : u === "F" ? (v - 273.15) * 9 / 5 + 32 : v; }
  function unitConvert2(t) {
    var s = " " + norm(t).replace(/[²]/g, "2").replace(/[³]/g, "3").replace(/(\d),(\d)/g, "$1.$2") + " ";
    s = s.replace(/km\s*\/\s*(h|sa\w*)|km\s*\/\s*ч|км\s*\/\s*ч|kilometre\s*\/\s*saat/g, " kmh ").replace(/(\d|\s)m\s*\/\s*(s|sn|san)(?![a-z])|м\s*\/\s*с/g, function (x, a) { return (a || "") + " ms "; })
      .replace(/deniz mil\w*|nautical miles?|морск[\u0430-\u044f\w]* мил[\u0430-\u044f\w]*/g, " nmi ").replace(/kvadrat metr\w*|square kilomet\w*/g, function (x) { return /kilo/.test(x) ? " km2 " : " m2 "; })
      .replace(/kub metr\w*|cubic met\w*/g, " m3 ").replace(/°\s*c(?![a-z])/g, " c ").replace(/°\s*f(?![a-z])/g, " f ");
    var tk = s.match(/(?<![a-z0-9.])-?\d+(?:\.\d+)?|[a-z\u0430-\u044f0-9]+/g) || [], pairs = [], bare = [], firstNum = -1, i, u;
    for (i = 0; i < tk.length; i++) {
      if (/^-?\d/.test(tk[i])) { if (firstNum < 0) firstNum = i; u = unitOf(tk[i + 1] || ""); if (u) { pairs.push({ v: parseFloat(tk[i]), u: u, w: tk[i + 1] }); i++; } continue; }
      u = unitOf(tk[i]); if (u) bare.push({ u: u, w: tk[i], i: i });
    }
    if (!pairs.length || !bare.length) return null;
    var dim = pairs[0].u[2];
    if (pairs.some(function (p) { return p.u[2] !== dim; })) return null;
    var pre = bare.filter(function (b) { return b.i < firstNum; }), dst = (pre.length ? pre[0] : bare[bare.length - 1]);
    if (dst.u[2] !== dim || (pairs.length === 1 && dst.u[1] === pairs[0].u[1])) return null;
    if (dim === "temp" && pairs.length > 1) return null;
    var ctx = " " + joined(t) + " ";
    if ((dst.w.length <= 1 || pairs.some(function (p) { return p.w.length <= 1; })) && !/ (kac|nece|how|convert|to|in|into|cevir|ne kadar|сколько|в|is|eder|edir|olur) /.test(ctx) && !/=/.test(t)) return null;
    function nm(x) { return typeof x[4] === "string" ? x[4] : L(x[4]); }
    var r;
    if (dim === "temp") r = fromK(toK(pairs[0].v, pairs[0].u[1]), dst.u[1]);
    else r = pairs.reduce(function (a, p) { return a + p.v * p.u[3]; }, 0) / dst.u[3];
    var left = pairs.map(function (p) { return fmt(sig(p.v, 10)) + " " + nm(p.u); }).join(" ");
    var note = dim === "data" ? L(["  (1 KB = 1024 bayt)", "  (1 KB = 1024 bayt)", "  (1 KB = 1024 bytes)", "  (1 КБ = 1024 байта)"]) : "";
    return left + " = " + fmt(sig(r, 6)) + " " + nm(dst.u) + note;
  }

  /* Vücut kitle indeksi */
  function bmi(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), n = joined(t);
    var kw = /(vki|bmi|bki|beden kitle|beden kutle|kutle indeks|имт|индекс массы)/.test(n), hw = /(^| )(boy|boyum|boyu|boyunuz|height|tall|рост)( |$)/.test(n) && /(^| )(kilo|kilom|kilosu|kg|weight|weigh|weighs|cekim|ceki|cekisi|вес|кг)( |$)/.test(n);
    if (!kw && !hw) return null;
    var nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number);
    if (nums.length < 2) return L(["Boy ve kilonu yaz: “boyum 175 kilom 70” ya da “VKİ 175 70”.", "Boyunu və çəkini yaz: “boyum 175 çəkim 70”.", "Give your height and weight: “BMI 175 cm 70 kg”.", "Укажи рост и вес: «ИМТ рост 175 вес 70»."]);
    var hm = s.match(/(?:boy\w*|height|tall|рост)\D{0,8}(\d+(?:\.\d+)?)/) || s.match(/(\d+(?:\.\d+)?)\s*(?:cm|см|sm)\b/), wm = s.match(/(?:kilo\w*|weight|weigh\w*|ceki\w*|вес)\D{0,8}(\d+(?:\.\d+)?)/) || s.match(/(\d+(?:\.\d+)?)\s*(?:kg|кг|kilo)/);
    var h = hm ? +hm[1] : null, w = wm ? +wm[1] : null;
    if (h === null || w === null || h === w) { var a = nums[0], b = nums[1]; if ((a >= 1 && a <= 2.5) || (a >= 100 && a <= 250 && !(b >= 100 && b <= 250 && b > a))) { h = a; w = b; } else { h = b; w = a; } }
    if (h > 3) h /= 100;
    if (h < 1 || h > 2.5 || w < 20 || w > 400) return L(["Bu değerler gerçekçi görünmüyor. Boyu cm, kiloyu kg olarak yaz.", "Bu dəyərlər real görünmür. Boyu sm, çəkini kq ilə yaz.", "Those values don't look realistic. Use cm for height and kg for weight.", "Значения выглядят нереалистично. Рост в см, вес в кг."]);
    var v = w / (h * h), c = v < 18.5 ? 0 : v < 25 ? 1 : v < 30 ? 2 : 3;
    var CAT = [["Zayıf", "Normal", "Fazla kilolu", "Obez"], ["Arıq", "Normal", "Artıq çəki", "Piylənmə"], ["Underweight", "Normal", "Overweight", "Obese"], ["Недостаточный вес", "Норма", "Избыточный вес", "Ожирение"]][LI[cur]];
    var lo = Math.round(18.5 * h * h), hi = Math.round(24.9 * h * h);
    return "⚖️ " + L(["VKİ", "BKİ", "BMI", "ИМТ"]) + " = " + fmt(sig(v, 3)) + " → " + CAT[c] + "\n" +
      L(["Bu boy için normal aralık: " + lo + "–" + hi + " kg.\nYetişkinler için genel bir ölçüdür; tıbbi tavsiye değildir.", "Bu boy üçün normal aralıq: " + lo + "–" + hi + " kq.\nBöyüklər üçün ümumi göstəricidir; tibbi məsləhət deyil.", "Normal range for this height: " + lo + "–" + hi + " kg.\nA general measure for adults, not medical advice.", "Норма для этого роста: " + lo + "–" + hi + " кг.\nОбщий показатель для взрослых, не медицинская рекомендация."]);
  }

  /* İndirim ve KDV */
  function moneyNums(t) {
    var s = norm(t).replace(/(\d)\.(\d{3})(?!\d)/g, "$1$2").replace(/(\d),(\d)/g, "$1.$2"), out = [], m, R = /(%\s*|yuzde\s*)?(\d+(?:\.\d+)?)(%|\s*(?:percent|faiz\w*|процент[\u0430-\u044f\w]*))?/g;
    while ((m = R.exec(s))) { if (!m[2]) { R.lastIndex++; continue; } out.push({ v: +m[2], p: !!(m[1] || m[3]) }); }
    return { s: s, nums: out };
  }
  function money(t) {
    var n = joined(t), disc = /(indirim|endirim|discount|скидк)/.test(n) || /\d\s*%\s*off\b/.test(norm(t)), vat = /(kdv|edv|vat|ндс)/.test(n);
    if (!disc && !vat) return null;
    var x = moneyNums(t), p = null, b = null;
    x.nums.forEach(function (o) { if (o.p && p === null) p = o.v; else if (!o.p && b === null) b = o.v; });
    if (p === null || b === null) return null;
    if (disc) {
      var cut = b * p / 100;
      return "🏷 " + fmt(b) + " − " + pctStr(p) + " = " + fmt(sig(b - cut, 10)) + L(["  (indirim: ", "  (endirim: ", "  (you save ", "  (скидка: "]) + fmt(sig(cut, 10)) + ")";
    }
    if (/(dahil|daxil|including|incl|inclusive|включ|с ндс|icinde)/.test(n)) {
      var net = b / (1 + p / 100);
      return "🧾 " + L(["KDV dahil ", "ƏDV daxil ", "Incl. VAT ", "С НДС "]) + fmt(b) + " → " + L(["net ", "xalis ", "net ", "без НДС "]) + fmt(sig(net, 10)) + " + " + L(["KDV ", "ƏDV ", "VAT ", "НДС "]) + fmt(sig(b - net, 10)) + " (" + pctStr(p) + ")";
    }
    return "🧾 " + fmt(b) + " + " + L(["KDV ", "ƏDV ", "VAT ", "НДС "]) + pctStr(p) + " (" + fmt(sig(b * p / 100, 10)) + ") = " + fmt(sig(b * (1 + p / 100), 10));
  }

  /* Kredi taksiti */
  function loan(t) {
    var n = joined(t);
    if (!/(kredi|kredit|loan|mortgage|кредит|ипотек|taksit|installment)/.test(n)) return null;
    var x = moneyNums(t), s = x.s, rate = null, months = null, P = null, mm;
    x.nums.forEach(function (o) { if (o.p && rate === null) rate = o.v; });
    if (rate === null && (mm = s.match(/(?:faiz\w*|interest|rate|ставк[\u0430-\u044f\w]*)\D{0,6}(\d+(?:\.\d+)?)/))) rate = +mm[1];
    var s2 = s.replace(/%\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?%/g, " ");
    if ((mm = s2.match(/(\d+)\s*(?:ay\w*|months?|мес[\u0430-\u044f\w]*)/))) months = +mm[1];
    else if ((mm = s2.match(/(\d+)\s*(?:yil\w*|il\b|illik|years?|год[\u0430-\u044f\w]*|лет)/))) months = +mm[1] * 12;
    x.nums.forEach(function (o) { if (!o.p && o.v !== rate && (months === null || (o.v !== months && o.v * 12 !== months)) && (P === null || o.v > P)) P = o.v; });
    if (P === null || rate === null || !months) return L(["Kredi için tutar, faiz ve vade lazım. Örnek: “100.000 kredi %30 faiz 24 ay”.", "Kredit üçün məbləğ, faiz və müddət lazımdır. Məsələn: “100000 kredit 20% faiz 24 ay”.", "I need amount, rate and term. Example: “loan 10000 at 8% for 36 months”.", "Нужны сумма, ставка и срок. Пример: «кредит 100000 под 15% на 24 месяца»."]);
    if (months > 600) return null;
    var monthly = /(aylik faiz|ayliq faiz|faizi aylik|faiz aylik|aylik %|aylik yuzde|monthly rate|monthly interest|per month|в месяц|месячн[\u0430-\u044f\w]* ставк|ежемесячн[\u0430-\u044f\w]* ставк)/.test(s), r = rate / 100 / (monthly ? 1 : 12);
    var M = r ? P * r / (1 - Math.pow(1 + r, -months)) : P / months, tot = M * months;
    var R2 = function (v) { return fmt(Math.round(v * 100) / 100); };
    return "🏦 " + L(["Aylık taksit: ", "Aylıq ödəniş: ", "Monthly payment: ", "Ежемесячный платёж: "]) + R2(M) + "\n" +
      L(["Toplam ödeme: ", "Ümumi ödəniş: ", "Total paid: ", "Всего выплат: "]) + R2(tot) + "\n" + L(["Toplam faiz: ", "Ümumi faiz: ", "Total interest: ", "Переплата: "]) + R2(tot - P) + "\n" +
      (monthly ? L(["(Aylık %" + fmt(rate) + " faiz, " + months + " ay, eşit taksit.)", "(Aylıq " + fmt(rate) + "% faiz, " + months + " ay, bərabər ödəniş.)", "(" + fmt(rate) + "% monthly, " + months + " months, equal payments.)", "(" + fmt(rate) + "% в месяц, " + months + " мес., аннуитет.)"])
        : L(["(Yıllık %" + fmt(rate) + " faiz kabul edildi, " + months + " ay. Faiz aylıksa “aylık faiz” diye yaz.)", "(İllik " + fmt(rate) + "% faiz qəbul edildi, " + months + " ay. Faiz aylıqdırsa “aylıq faiz” yaz.)", "(Assumed " + fmt(rate) + "% per year, " + months + " months. If the rate is monthly, say “monthly rate”.)", "(Принята годовая ставка " + fmt(rate) + "%, " + months + " мес. Если ставка месячная, напиши «в месяц».)"])) +
      L(["\nVergi ve masraflar hariç tahmindir.", "\nVergi və xərclər daxil deyil, təxminidir.", "\nEstimate, excluding fees and taxes.", "\nОценка без учёта комиссий и налогов."]);
  }

  /* Sayı tabanları */
  function baseConv(t) {
    var s = norm(t), n = joined(t), v = null, m, toks2 = n.split(" ");
    var kw = /(ikilik|binary|двоичн|onaltilik|onaltiliq|on altiliq|hexadecimal|(^| )hex( |$)|шестнадцатеричн|sekizlik|sekkizlik|octal|восьмеричн)/.test(n);
    if ((m = s.match(/(?:^|[^a-z0-9])0x([0-9a-f]+)(?![0-9a-z])/))) v = parseInt(m[1], 16);
    else if ((m = s.match(/(?:^|[^a-z0-9])0b([01]+)(?![0-9a-z])/))) v = parseInt(m[1], 2);
    else if (!kw) return null;
    else if (/(ikilikten|ikilikden|ikilikdan|from binary|binary to|из двоичн|двоичн[\u0430-\u044f\w]* в)/.test(n) && (m = s.match(/(?:^|[^0-9])([01]+)(?![0-9])/))) v = parseInt(m[1], 2);
    else if (/(onaltiliktan|onaltiliqdan|from hex|hex to|hexadecimal to|из шестнадцатеричн|шестнадцатеричн[\u0430-\u044f\w]* в)/.test(n)) {
      var hx = toks2.filter(function (w) { return /^[0-9a-f]+$/.test(w) && /\d/.test(w); })[0] || toks2.filter(function (w) { return /^[0-9a-f]{1,8}$/.test(w) && !/^(be|bad|dead|face|cafe|add|a|ab|ad|de|dec|ef|fed)$/.test(w); })[0];
      if (hx) v = parseInt(hx, 16);
    } else if ((m = s.match(/(?:^|[^0-9])(\d+)(?![0-9])/))) v = +m[1];
    if (v === null || isNaN(v)) return null;
    if (v > 9007199254740991) return L(["Bu sayı çok büyük.", "Bu ədəd çox böyükdür.", "That number is too large.", "Число слишком большое."]);
    var bin = v.toString(2).replace(/\B(?=(\d{4})+(?!\d))/g, " "), N = L([["Onluk", "İkilik", "Onaltılık", "Sekizlik"], ["Onluq", "İkilik", "On altılıq", "Səkkizlik"], ["Decimal", "Binary", "Hex", "Octal"], ["Десятичная", "Двоичная", "Шестнадцатеричная", "Восьмеричная"]]);
    return N[0] + ": " + v + "\n" + N[1] + ": " + bin + "\n" + N[2] + ": " + v.toString(16).toUpperCase() + "\n" + N[3] + ": " + v.toString(8);
  }

  /* Roma rakamları */
  var RN = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  function toRoman(v) { var o = ""; RN.forEach(function (p) { while (v >= p[0]) { o += p[1]; v -= p[0]; } }); return o; }
  function fromRoman(r) {
    var V = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }, s = 0, i;
    for (i = 0; i < r.length; i++) { var a = V[r[i]], b = V[r[i + 1]] || 0; s += a < b ? -a : a; }
    return s > 0 && s < 4000 && toRoman(s) === r ? s : null;
  }
  function roman(t) {
    var n = joined(t), kw = /(roma rakam|romen rakam|rum rakam|rim reqem|roma reqem|roman numeral|in roman|to roman|римск)/.test(n), m, i;
    var rm = t.match(/(^|[^A-Za-z])([MDCLXVI]{2,15})(?![A-Za-z])/g);
    if (rm) for (i = 0; i < rm.length; i++) {
      var c = rm[i].replace(/[^MDCLXVI]/g, ""), val = fromRoman(c);
      var others = toks(t).filter(function (w) { return w !== c.toLowerCase() && !/^(nedir|ne|kac|kactir|demek|nece|nedir|edir|what|is|does|mean|means|что|это|сколько|значит|sayisi|reqemi|rakami|rakam)$/.test(w); });
      if (val && (kw || (c.length >= 3 && !others.length))) return c + " = " + val;
    }
    if (kw && (m = n.match(/(?:^| )(\d+)(?= |$)/))) {
      var v = +m[1];
      if (v < 1 || v > 3999) return L(["Roma rakamıyla 1–3999 arası yazılabilir.", "Roma rəqəmi ilə 1–3999 arası yazıla bilər.", "Roman numerals cover 1–3999.", "Римскими цифрами можно записать 1–3999."]);
      return v + " = " + toRoman(v);
    }
    return null;
  }

  /* Sayıyı yazıya çevir */
  function words(t) {
    var n = joined(t);
    if (!/(yaziyla|yazi ile|harfle|harflerle|okunusu|sozle|sozlerle|herfle|in words|spell|write out|прописью|словами)/.test(n)) return null;
    var m = norm(t).match(/(-?)(\d{1,3}(?:[.\s\u00a0]\d{3})+|\d+)/);
    if (!m) return null;
    var v = +m[2].replace(/[.\s\u00a0]/g, ""), neg = !!m[1];
    if (v >= 1e12) return L(["En fazla 999 milyara kadar yazabilirim.", "Ən çoxu 999 milyarda qədər yaza bilərəm.", "I can spell numbers up to 999 billion.", "Могу записать числа до 999 миллиардов."]);
    var w = cur === "en" ? enWords(v) : cur === "ru" ? ruWords(v) : trazWords(v, cur === "az");
    return fmt(neg ? -v : v) + " → " + (neg ? L(["eksi ", "mənfi ", "minus ", "минус "]) : "") + w;
  }
  function groups(v) { var g = []; do { g.push(v % 1000); v = Math.floor(v / 1000); } while (v); return g; }
  function trazWords(v, az) {
    var O = az ? ["", "bir", "iki", "üç", "dörd", "beş", "altı", "yeddi", "səkkiz", "doqquz"] : ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
    var T = az ? ["", "on", "iyirmi", "otuz", "qırx", "əlli", "altmış", "yetmiş", "səksən", "doxsan"] : ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
    var S = az ? ["", "min", "milyon", "milyard"] : ["", "bin", "milyon", "milyar"], H = "yüz";
    if (!v) return az ? "sıfır" : "sıfır";
    function three(x) { var h = Math.floor(x / 100), r = x % 100, o = []; if (h) o.push((h > 1 ? O[h] + " " : "") + H); if (r >= 10) o.push(T[Math.floor(r / 10)]); if (r % 10) o.push(O[r % 10]); return o.join(" "); }
    var g = groups(v), out = [];
    for (var i = g.length - 1; i >= 0; i--) { if (!g[i]) continue; out.push(i === 1 && g[i] === 1 ? S[1] : three(g[i]) + (S[i] ? " " + S[i] : "")); }
    return out.join(" ");
  }
  function enWords(v) {
    var O = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    var T = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"], S = ["", "thousand", "million", "billion"];
    if (!v) return "zero";
    function two(r) { return r < 20 ? O[r] : T[Math.floor(r / 10)] + (r % 10 ? "-" + O[r % 10] : ""); }
    function three(x) { var h = Math.floor(x / 100), r = x % 100, o = []; if (h) o.push(O[h] + " hundred"); if (r) o.push(two(r)); return o.join(" "); }
    var g = groups(v), out = [];
    for (var i = g.length - 1; i >= 0; i--) if (g[i]) out.push(three(g[i]) + (S[i] ? " " + S[i] : ""));
    return out.join(" ");
  }
  function ruWords(v) {
    var O = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"], OF = ["", "одна", "две"];
    var TN = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
    var T = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
    var H = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
    var S = [null, ["тысяча", "тысячи", "тысяч"], ["миллион", "миллиона", "миллионов"], ["миллиард", "миллиарда", "миллиардов"]];
    if (!v) return "ноль";
    function pl(x) { var a = x % 100, b = x % 10; return a >= 11 && a <= 14 ? 2 : b === 1 ? 0 : b >= 2 && b <= 4 ? 1 : 2; }
    function three(x, fem) { var h = Math.floor(x / 100), r = x % 100, o = []; if (h) o.push(H[h]); if (r >= 10 && r < 20) o.push(TN[r - 10]); else { if (r >= 20) o.push(T[Math.floor(r / 10)]); if (r % 10) o.push(fem && r % 10 < 3 ? OF[r % 10] : O[r % 10]); } return o.join(" "); }
    var g = groups(v), out = [];
    for (var i = g.length - 1; i >= 0; i--) if (g[i]) out.push(three(g[i], i === 1) + (S[i] ? " " + S[i][pl(g[i])] : ""));
    return out.join(" ");
  }

  /* Metin araçları ("komut: metin") */
  function textTool(t) {
    var m = t.match(/^\s*([^:：\n]{2,40})[:：]\s*([\s\S]+)$/);
    if (!m) return null;
    var c = joined(m[1]), x = m[2], loc = cur === "tr" || cur === "az" ? "tr-TR" : undefined;
    if (/^(say|kelime|karakter|harf|soz|sozleri say|count|word count|character count|посчитай|сколько слов|подсчет|подсчитай)/.test(c)) {
      var w = (x.match(/[^\s]+/g) || []).length, ch = Array.from(x).length, nos = Array.from(x.replace(/\s/g, "")).length, ln = x.split(/\r?\n/).length;
      return L([w + " kelime, " + ch + " karakter (boşluksuz " + nos + "), " + ln + " satır.", w + " söz, " + ch + " simvol (boşluqsuz " + nos + "), " + ln + " sətir.", w + " words, " + ch + " characters (" + nos + " without spaces), " + ln + (ln === 1 ? " line." : " lines."), "Слов: " + w + ", символов: " + ch + " (без пробелов " + nos + "), строк: " + ln + "."]);
    }
    if (/^(buyuk harf|buyut|boyuk herf|uppercase|upper|caps|заглавн|прописн|верхн)/.test(c)) return x.toLocaleUpperCase(loc);
    if (/^(kucuk harf|kucult|kicik herf|lowercase|lower|строчн|нижн)/.test(c)) return x.toLocaleLowerCase(loc);
    if (/^(ters|tersine|tersine cevir|reverse|переверни|наоборот)/.test(c)) return Array.from(x).reverse().join("");
    if (/^(palindrom|is palindrome|palindrome|палиндром)/.test(c)) {
      var p = toks(x).join("");
      return p && p === Array.from(p).reverse().join("") ? L(["Evet, palindrom. ✅", "Bəli, palindromdur. ✅", "Yes, it's a palindrome. ✅", "Да, это палиндром. ✅"]) : L(["Hayır, palindrom değil.", "Xeyr, palindrom deyil.", "No, it's not a palindrome.", "Нет, это не палиндром."]);
    }
    if (/^(sirala|alfabetik|sort|отсортируй|сортируй|упорядочь)/.test(c)) {
      var items = /\n/.test(x) ? x.split(/\r?\n/) : x.split(/\s*[,;]\s*|\s+/);
      return items.map(function (y) { return y.trim(); }).filter(Boolean).sort(function (a, b) { return a.localeCompare(b, { tr: "tr", az: "az", en: "en", ru: "ru" }[cur]); }).join(/\n/.test(x) ? "\n" : ", ");
    }
    return null;
  }

  /* Bilgi yarışması (başkentler / matematik) */
  function capList() { var seen = [], out = []; Object.keys(KB.capitals).forEach(function (k) { var a = KB.capitals[k]; if (seen.indexOf(a) < 0 && (cur === "tr" || a.length >= 8)) { seen.push(a); out.push(a); } }); return out; }
  function capNames(a) {
    var res = [];
    [a[1], a[3], a[5], a[7]].filter(Boolean).forEach(function (x) {
      var base = joined(x.replace(/\([^)]*\)/g, " ")); res.push(base);
      var inn = x.match(/\(([^)]*)\)/); if (inn) res.push(joined(inn[1]));
      var fw = base.split(" ")[0]; if (fw.length >= 5) res.push(fw);
    });
    return res;
  }
  function qText(st) {
    var q = st.quiz, h = L(["Soru ", "Sual ", "Question ", "Вопрос "]) + q.i + "/10: ";
    if (q.type === "math") return h + q.q + " = ?";
    var i = { tr: 0, az: 6, en: 2, ru: 4 }[cur]; if (q.c.length <= i) i = 0;
    return h + q.c[i] + L([" — başkenti neresi?", " — paytaxtı haradır?", " — what is the capital?", " — какая столица?"]);
  }
  function nextQ(st) {
    var q = st.quiz; q.i++;
    if (q.type === "math") {
      var op = rint(4), a, b;
      if (op === 0) { a = 10 + rint(90); b = 10 + rint(90); q.q = a + " + " + b; q.a = a + b; }
      else if (op === 1) { a = 20 + rint(80); b = rint(a); q.q = a + " − " + b; q.a = a - b; }
      else if (op === 2) { a = 2 + rint(11); b = 2 + rint(11); q.q = a + " × " + b; q.a = a * b; }
      else { b = 2 + rint(11); a = b * (1 + rint(12)); q.q = a + " ÷ " + b; q.a = a / b; }
    } else {
      var L2 = capList(), c; do { c = L2[rint(L2.length)]; } while (c === q.c && L2.length > 1); q.c = c;
    }
  }
  function quizTurn(t, st) {
    var n = joined(t), q = st.quiz;
    if (q && q.lang) cur = q.lang;
    if (!q) {
      var math = /(matematik (testi|oyunu|yarismasi|sorusu)|riyaziyyat (testi|oyunu|viktorina)|math quiz|math game|математическ[\u0430-\u044f\w]* (викторин|игр))/.test(n);
      if (!math && !/(bilgi yarismasi|yarisma baslat|yarisma yap|baskent oyunu|baskent yarismasi|quiz|viktorina|bilik yarisi|paytaxt oyunu|capital quiz|trivia|викторин)/.test(n)) return null;
      st.quiz = { type: math ? "math" : "cap", i: 0, ok: 0, lang: cur }; nextQ(st);
      return "🎯 " + (math ? L(["Matematik yarışması!", "Riyaziyyat viktorinası!", "Math quiz!", "Математическая викторина!"]) : L(["Başkentler yarışması!", "Paytaxtlar viktorinası!", "Capitals quiz!", "Викторина о столицах!"])) +
        L([" 10 soru. Bilmezsen “pas”, bitirmek için “bitir” yaz.", " 10 sual. Bilmirsənsə “keç”, bitirmək üçün “bitir” yaz.", " 10 questions. Say “skip” to pass or “stop” to end.", " 10 вопросов. «Пропуск» — пропустить, «стоп» — закончить."]) + "\n\n" + qText(st);
    }
    if (n.split(" ").length > 5 || /^(sen kimsin|yardim|help|помощь)/.test(n)) { st.quiz = null; return null; }
    if (/^(bitir|bitti|dur|yeter|cik|stop|quit|exit|end|enough|хватит|стоп|выход|закончи[\u0430-\u044f\w]*|dayan)$/.test(n)) {
      var fin = "🏁 " + L(["Yarışma bitti.", "Viktorina bitdi.", "Quiz over.", "Викторина окончена."]) + (q.i > 1 ? " " + L(["Skor: ", "Xal: ", "Score: ", "Счёт: "]) + q.ok + "/" + (q.i - 1) : "");
      st.quiz = null; return fin;
    }
    var sol = q.type === "math" ? fmt(q.a) : q.c[{ tr: 1, az: 7, en: 3, ru: 5 }[cur]] || q.c[1], msg, right = false;
    if (/^(pas|gec|bilmiyorum|bilmirem|kec|skip|pass|next|dont know|i dont know|не знаю|пропуск|пропусти|дальше)$/.test(n)) msg = "⏭ " + L(["Cevap: ", "Cavab: ", "Answer: ", "Ответ: "]) + sol + ".";
    else {
      if (q.type === "math") { var nm = norm(t).replace(",", ".").match(/-?\d+(?:\.\d+)?/); right = !!nm && Math.abs(+nm[0] - q.a) < 1e-9; }
      else {
        var a = n.replace(/^(bence|cevap|cavab|answer|it s|its|the answer is|это|ответ)\s+/, "");
        right = capNames(q.c).some(function (c) { return a === c || (c.length >= 4 && a.indexOf(c) >= 0) || (a.length >= 4 && lev(a, c) <= (c.length >= 7 ? 2 : 1)); });
      }
      if (right) q.ok++;
      msg = right ? "✅ " + L(["Doğru!", "Düzdür!", "Correct!", "Верно!"]) : "❌ " + L(["Yanlış. Doğru cevap: ", "Səhvdir. Düzgün cavab: ", "Wrong. The answer is ", "Неверно. Правильный ответ: "]) + sol + ".";
    }
    msg += " " + L(["(Skor: ", "(Xal: ", "(Score: ", "(Счёт: "]) + q.ok + "/" + q.i + ")";
    if (q.i >= 10) {
      var pc = q.ok / 10, pr = pc >= .8 ? L(["Harika! 🏆", "Əla! 🏆", "Excellent! 🏆", "Отлично! 🏆"]) : pc >= .5 ? L(["İyi iş! 👍", "Yaxşı nəticə! 👍", "Nice work! 👍", "Хорошо! 👍"]) : L(["Tekrar dene, gelişirsin! 💪", "Yenidən cəhd et! 💪", "Try again, you'll improve! 💪", "Попробуй ещё раз! 💪"]);
      st.quiz = null;
      return msg + "\n\n🏁 " + L(["Bitti! Sonuç: ", "Bitdi! Nəticə: ", "Done! Result: ", "Готово! Результат: "]) + q.ok + "/10. " + pr;
    }
    nextQ(st);
    return msg + "\n\n" + qText(st);
  }

  /* ---------- Yönlendirme ---------- */
  function route(t, st, now) {
    var n = joined(t), s = norm(t), r;
    function ok(x, last) { st.last = last || ""; st.pending = null; return { text: x, known: true }; }

    if ((r = quizTurn(t, st))) return ok(r);
    if (st.pending && YES.test(n)) { var f = st.pending; return ok(ans(f)); }
    st.pending = null;
    if ((r = noteCmd(t, st)) || (r = timerCmd(t, st, now)) || (r = textTool(t))) return ok(r);
    if ((r = translate(t))) return ok(r);

    // Ad hafızası
    if (/(adim ne|adimi biliyor|ben kimim|adimi hatirl|what s my name|what is my name|who am i|do you know my name|как меня зовут|ты знаешь мое имя)/.test(n))
      return ok(st.name ? L(["Adın ", "Adın ", "Your name is ", "Тебя зовут "]) + st.name + "." : L(["Henüz adını bilmiyorum. “Adım …” yazarsan hatırlarım.", "Hələ adını bilmirəm. “Mənim adım …” yazsan, yadda saxlayaram.", "I don't know your name yet. Say “My name is …” and I'll remember it.", "Я пока не знаю твоего имени. Напиши «Меня зовут …», и я запомню."]));
    var nm = t.match(/(?:adım|adim|ismim|my name is|call me|меня зовут)\s+([^\s.,!?;:]+)/i);
    if (nm && !/^(ne|neydi|nedir|nece|necedir)$/.test(norm(nm[1]))) { st.name = cap(nm[1]); return ok(L(["Memnun oldum " + st.name + "! Adını bu cihazda hatırlayacağım.", "Tanış olduğumuza şadam, " + st.name + "! Adını bu cihazda yadda saxlayacağam.", "Nice to meet you, " + st.name + "! I'll remember your name on this device.", "Приятно познакомиться, " + st.name + "! Я запомню твоё имя на этом устройстве."])); }

    // Sohbet
    if (/(sen kimsin|^kimsin|adin ne|ismin ne|nesin|kendini tanit|yapay zeka misin|gercek misin|insan misin|sen kimsen|kimsen|who are you|what are you|кто ты|ты кто)/.test(n))
      return ok(L(["Ben Zunex AI’ım: tarayıcında yerel çalışan bir asistanım. Büyük bir yapay zekâ modeli değilim; yerleşik bilgi tabanı, hesap makinesi ve kurallarla cevap veririm. Bilmediğim şeyi bilmediğimi söylerim.", "Mən Zunex AI-yam: brauzerində yerli işləyən köməkçiyəm. Böyük süni intellekt modeli deyiləm; daxili bilik bazası, kalkulyator və qaydalarla cavab verirəm. Bilmədiyim şeyi bilmədiyimi deyirəm.", "I'm Zunex AI, an assistant that runs locally on your device. I'm not a large AI model; I answer with a built-in knowledge base, a calculator and rules. When I don't know something, I say so.", "Я Zunex AI — ассистент, работающий локально на твоём устройстве. Я не большая ИИ-модель: отвечаю с помощью встроенной базы знаний, калькулятора и правил. Если чего-то не знаю, говорю об этом."]));
    if (/(internet|интернет)/.test(n) && /(bagli|baglan|var mi|online|connect|calis|подключ|онлайн|работ)/.test(n))
      return ok(L(["Hayır, internete bağlı değilim. Her şey senin tarayıcında, yerel olarak çalışır; yazdıkların hiçbir sunucuya gönderilmez.", "Xeyr, internetə qoşulu deyiləm. Hər şey brauzerində yerli işləyir; yazdıqların heç bir serverə göndərilmir.", "No, I'm not connected to the internet. Everything runs locally on your device; nothing you type is sent to any server.", "Нет, я не подключён к интернету. Всё работает локально на твоём устройстве; ничего из написанного не отправляется на сервер."]));
    if (/(neler yapabilirsin|ne yapabilirsin|yardim|neler biliyorsun|ne biliyorsun|konular|nasil kullan|neler ede|nele?r bilirsen|what can you do|what do you know|help|что ты умеешь|что ты знаешь|помощь)/.test(n))
      return ok(L(["Şunları çevrimdışı yapabilirim:\n• Hesap ve denklem: “(12+8)*3”, “2x+5=15”, “türev x^3+2x”\n• Birim çevirme: “5 km kaç metre”, “2 saat 30 dakika kaç dakika”, “1 GB kaç MB”, “100 km/h kaç m/s”\n• Notlar: “Not al: süt al”, “notlarım”, “notu sil 2”\n• Zamanlayıcı: “10 dakika zamanlayıcı”, “saat 18:30’da hatırlat: toplantı”\n• Tarih: “Yılbaşına kaç gün kaldı?”, “15.03.1995 doğumluyum kaç yaşındayım”, “100 gün sonra”, “15.07.2016 hangi gün”\n• Para: “250’ye %20 indirim”, “1000 + %20 KDV”, “100.000 kredi %30 faiz 24 ay”\n• Sağlık: “boyum 180 kilom 75” (VKİ)\n• Güvenlik: “güçlü şifre oluştur”, “4 haneli PIN oluştur”\n• Sayılar: “255 ikilik”, “2026 roma rakamıyla”, “1234 yazıyla”, “29 asal mı?”\n• Metin: “kelime say: …”, “büyük harf: …”, “ters çevir: …”, “sırala: …”\n• Oyun: “bilgi yarışması”, “matematik testi”\n• Başkentler, ülke coğrafyası, dünya saatleri, çeviri, dosya istatistikleri\n\nBilgi tabanı konuları: " + KB.facts.map(function (x) { return x.t; }).filter(function (x, i, a) { return a.indexOf(x) === i; }).join(", ") + ".",
        "Bunları oflayn edə bilərəm:\n• Hesab və tənlik: “(12+8)*3”, “2x+5=15”\n• Vahid çevirmə: “5 km neçə metrdir”, “1 GB neçə MB”\n• Qeydlər: “Qeyd et: çörək al”, “qeydlərim”, “qeydi sil 2”\n• Taymer: “10 dəqiqə taymer”, “saat 18:30-da xatırlat: görüş”\n• Tarix: “Yeni ilə neçə gün qalıb?”, “15.03.1995 doğum, neçə yaşım var”, “100 gün sonra”\n• Pul: “250-yə 20% endirim”, “1000 + 18% ƏDV”, “10000 kredit 20% faiz 24 ay”\n• BKİ: “boyum 180 çəkim 75”\n• Təhlükəsizlik: “güclü parol yarat”\n• Ədədlər: “255 ikilik”, “2026 roma rəqəmi”, “1234 sözlə”\n• Mətn: “sözləri say: …”, “böyük hərf: …”\n• Oyun: “viktorina”, “riyaziyyat testi”\n• Paytaxtlar, coğrafiya, dünya saatları, tərcümə və " + KB.facts.length + " mövzuluq bilik bazası",
        "Here's what I can do offline:\n• Math and equations: “(12+8)*3”, “solve 2x+5=15”, “derivative of x^2”\n• Unit conversion: “how many meters in 5 km”, “1 GB to MB”, “100 km/h to m/s”\n• Notes: “Note: buy milk”, “my notes”, “delete note 2”\n• Timers: “set a 10 minute timer”, “remind me at 18:30: meeting”\n• Dates: “How many days until New Year?”, “born 1990-05-20, how old am I”, “100 days from today”\n• Money: “20% off 250”, “1000 + 20% VAT”, “loan 10000 at 8% for 36 months”\n• BMI: “BMI 175 cm 70 kg”\n• Security: “generate a strong password”\n• Numbers: “255 to binary”, “2026 in roman numerals”, “1234 in words”, “is 29 prime?”\n• Text: “count words: …”, “uppercase: …”, “reverse: …”, “sort: …”\n• Games: “start a quiz”, “math quiz”\n• Capitals, geography, world clock, translation and a " + KB.facts.length + "-topic knowledge base",
        "Вот что я умею офлайн:\n• Вычисления и уравнения: «(12+8)*3», «2x+5=15»\n• Единицы: «сколько метров в 5 км», «1 ГБ в МБ», «100 км/ч в м/с»\n• Заметки: «Заметка: купить хлеб», «мои заметки», «удали заметку 2»\n• Таймеры: «таймер на 10 минут», «напомни в 18:30: встреча»\n• Даты: «сколько дней до Нового года?», «через 100 дней»\n• Деньги: «скидка 20% на 250», «1000 + НДС 20%», «кредит 100000 под 15% на 24 месяца»\n• ИМТ: «рост 170 вес 60»\n• Безопасность: «сгенерируй надёжный пароль»\n• Числа: «255 в двоичную», «2026 римскими цифрами», «1234 прописью»\n• Текст: «посчитай слова: …», «заглавные: …»\n• Игры: «викторина», «математическая викторина»\n• Столицы, география, мировое время, перевод и база знаний (" + KB.facts.length + " тем)"]));
    if (/(hatirliyor musun|hafiza|unutur musun|konustuklarimizi)/.test(n)) return ok("Evet, sohbet geçmişin bu tarayıcıda kayıtlı ve adını da hatırlarım. “Sohbeti temizle” ile hepsi silinir.");
    if (/^(tesekkur|tesekkurler|sag ol|eyvallah|saol|cok sag ol|sagol|cox sagol|thanks|thank you|спасибо)/.test(n)) return ok(L(["Rica ederim! Başka bir şey lazım olursa buradayım.", "Buyurun! Başqa sualın olsa, buradayam.", "You're welcome! Ask me anything else.", "Пожалуйста! Спрашивай, если нужно что-то ещё."]));
    if (/^(gorusuruz|hosca kal|bye|bay bay|iyi gunler dilerim|goodbye|see you|до свидания|пока|saq ol)(\s|$)/.test(n)) return ok(L(["Görüşmek üzere!", "Görüşənədək!", "Goodbye!", "До свидания!"]));
    if (/^((merhaba|selam)\w*|hey|alo|gunaydin|iyi gunler|iyi aksamlar|iyi geceler|naber|ne haber|nasilsin|nasil gidiyor|salam|sabahiniz xeyir|necesen|hello|hi|good morning|good evening|how are you|привет|здравствуй\w*|добрый|как дела)(\s|$)/.test(n)) {
      var who = st.name ? " " + st.name : "";
      if (/nasil|naber|haber|necesen|how are|как дела/.test(n)) return ok(L(["İyiyim" + who + ", teşekkürler! (Bir programım ama sorduğun için sağ ol.) Sana nasıl yardımcı olabilirim?", "Yaxşıyam" + who + ", sağ ol! (Proqramam, amma soruşduğuna görə təşəkkür.) Sənə necə kömək edə bilərəm?", "I'm doing well" + who + ", thanks! (I'm a program, but thanks for asking.) How can I help?", "Хорошо" + who + ", спасибо! (Я программа, но приятно, что спросил.) Чем могу помочь?"]));
      return ok(L(["Merhaba" + who + "! Ben Zunex AI. Hesaplama, bilgi soruları ve dosya istatistikleri konusunda yardımcı olabilirim.", "Salam" + who + "! Mən Zunex AI-yam. Hesablama və əsas bilik sualları ilə kömək edə bilərəm.", "Hello" + who + "! I'm Zunex AI. I can help with calculations and basic knowledge questions.", "Привет" + who + "! Я Zunex AI. Могу помочь с вычислениями и базовыми вопросами."]));
    }

    // 1.4 araçları (saat/tarih kalıplarından önce çalışmalı)
    if ((r = dateTool(t, now)) || (r = password(t)) || (r = bmi(t)) || (r = loan(t)) || (r = money(t)) || (r = baseConv(t)) || (r = roman(t)) || (r = words(t))) return ok(r);
    if ((r = unitConvert(t)) || (r = unitConvert2(t))) return ok(r);

    // Saat, tarih, rastgele
    if ((r = worldTime(t, now))) return ok(r);
    if (/saat kac|saati soyle|su an saat|saat nece|what time|time is it|current time|который час|сколько времени/.test(n)) return ok(L(["Şu an saat ", "İndi saat ", "The time is ", "Сейчас "]) + pad(now.getHours()) + ":" + pad(now.getMinutes()) + L([" (cihazının saatine göre).", " (cihazının saatına görə).", " (by your device clock).", " (по часам устройства)."]));
    if (/(bugun.*(gun|tarih)|tarih ne|gunlerden ne|hangi gun|bugunun tarihi|ayin kaci|hangi yil|bu gun hansi|tarix nece|what day|today s date|the date|current date|какое сегодня число|какое число|какой сегодня день)/.test(n)) {
      var D = DT[cur];
      return ok(L(["Bugün ", "Bu gün ", "Today is ", "Сегодня "]) + now.getDate() + " " + D[0][now.getMonth()] + " " + now.getFullYear() + ", " + D[1][now.getDay()] + L([" (cihazının tarihine göre).", " (cihazının tarixinə görə).", " (by your device date).", " (по дате устройства)."]));
    }
    if (/zar at|roll a dice|roll dice|брось кубик/.test(n)) return ok("🎲 " + (Math.floor(Math.random() * 6) + 1));
    if (/yazi tura|flip a coin|heads or tails|орел или решка/.test(n)) return ok(Math.random() < 0.5 ? L(["Yazı", "Yazı", "Heads", "Орёл"]) : L(["Tura", "Tura", "Tails", "Решка"]));
    if (/rastgele sayi|random number|случайное число/.test(n)) {
      var ns = (n.match(/\d+/g) || []).map(Number), lo = 1, hi = 100;
      if (ns.length >= 2) { lo = Math.min(ns[0], ns[1]); hi = Math.max(ns[0], ns[1]); }
      return ok(String(lo + Math.floor(Math.random() * (hi - lo + 1))));
    }

    // Hesap
    if ((r = primeCheck(t))) return ok(r);
    if ((r = factq(t)) || (r = gcdlcm(t)) || (r = factorize(t)) || (r = comb(t)) || (r = pctOf(t)) || (r = stats(t))) return ok(r);
    if ((r = percent(t))) return ok(r);
    if ((r = unitConvert(t))) return ok(r);
    if ((r = calculus(t)) || (r = solveSys(t)) || (r = solveEq(t))) return ok(r);
    if ((r = fraction(t))) return ok(r);
    if ((r = geometry(t)) || (r = hyp(t)) || (r = volume(t))) return ok(r);
    var mr = evalMath(t);
    if (mr) return ok(mr.text);

    if ((r = geoQ(t))) return ok(r);

    // Başkent (+ takip soruları)
    var asksCap = /baskent|paytaxt|capital|столиц/.test(s) || toks(t).some(function (x) { return ["baskent", "paytaxt", "capital", "столиц"].some(function (k) { return near(x, k); }); }) || (st.last === "capital" && FOLLOW.test(n));
    if (asksCap) {
      var c = findCountry(t);
      if (c) return ok(capOut(c), "capital");
      return ok(L(["Hangi ülkeyi sorduğunu anlayamadım ya da o ülke bilgi tabanımda yok.", "Hansı ölkəni soruşduğunu anlamadım ya da o ölkə bilik bazamda yoxdur.", "I couldn't tell which country you mean, or it isn't in my knowledge base.", "Я не понял, о какой стране речь, либо её нет в моей базе знаний."]), "capital");
    }

    // Bilgi tabanı
    var m = matchFact(t);
    if (m.f && m.s >= 1.5) return ok(ans(m.f));
    if (m.f && m.s >= 0.75) { st.pending = m.f; st.last = ""; return { text: L(["Tam emin olamadım. Şunu mu kastettin: “" + m.f.t + "”? “Evet” dersen cevaplarım.", "Tam əmin olmadım. Bunu nəzərdə tutdun: “" + m.f.t + "”? “Bəli” desən cavablayaram.", "I'm not sure. Did you mean: “" + m.f.t + "”? Say “yes” and I'll answer.", "Я не уверен. Ты имел в виду: «" + m.f.t + "»? Скажи «да», и я отвечу."]), known: true }; }

    st.last = "";
    return { text: L(UNKNOWN), known: false };
  }

  function reply(text, opts) {
    opts = opts || {};
    var st = opts.state || (opts.state = {}), files = opts.files || [], t = String(text || "").trim(), parts = [];
    if (st.name === undefined) st.name = "";
    cur = t ? detect(t, st) : (st.lang || "tr"); st.lang = cur;
    if (files.length) parts.push(files.map(summarizeFile).join("\n\n"));
    if (t) { var r = route(t, st, opts.now || new Date()); if (r.known || !files.length) parts.push(r.text); }
    else if (!files.length) parts.push(L(["Bir şey yazar mısın?", "Bir şey yazarsan?", "Could you type something?", "Напиши что-нибудь."]));
    return parts.join("\n\n");
  }

  return { reply: reply, evalMath: evalMath, norm: norm };
});
