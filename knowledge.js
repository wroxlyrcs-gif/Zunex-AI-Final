(function (root, factory) {
  var kb = factory();
  if (typeof module === "object" && module.exports) module.exports = kb;
  else root.ZunexKB = kb;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  // Anahtarlar ASCII ve küçük harf. "!" öneki güçlü anahtar (tek başına yeter).
  var KB = {
    capitals: {
      "turkiye": ["Türkiye", "Ankara"], "almanya": ["Almanya", "Berlin"], "fransa": ["Fransa", "Paris"],
      "italya": ["İtalya", "Roma"], "ispanya": ["İspanya", "Madrid"], "ingiltere": ["İngiltere", "Londra"],
      "birlesik krallik": ["Birleşik Krallık", "Londra"], "portekiz": ["Portekiz", "Lizbon"],
      "yunanistan": ["Yunanistan", "Atina"], "bulgaristan": ["Bulgaristan", "Sofya"], "romanya": ["Romanya", "Bükreş"],
      "rusya": ["Rusya", "Moskova"], "ukrayna": ["Ukrayna", "Kiev (Kyiv)"], "polonya": ["Polonya", "Varşova"],
      "hollanda": ["Hollanda", "Amsterdam (hükümet merkezi Lahey)"], "belcika": ["Belçika", "Brüksel"],
      "isvec": ["İsveç", "Stokholm"], "norvec": ["Norveç", "Oslo"], "finlandiya": ["Finlandiya", "Helsinki"],
      "danimarka": ["Danimarka", "Kopenhag"], "isvicre": ["İsviçre", "Bern"], "avusturya": ["Avusturya", "Viyana"],
      "macaristan": ["Macaristan", "Budapeşte"], "cekya": ["Çekya", "Prag"], "abd": ["ABD", "Washington D.C."],
      "amerika": ["ABD", "Washington D.C."], "kanada": ["Kanada", "Ottawa"], "meksika": ["Meksika", "Meksiko (Mexico City)"],
      "brezilya": ["Brezilya", "Brasília"], "arjantin": ["Arjantin", "Buenos Aires"], "sili": ["Şili", "Santiago"],
      "japonya": ["Japonya", "Tokyo"], "cin": ["Çin", "Pekin"], "hindistan": ["Hindistan", "Yeni Delhi"],
      "guney kore": ["Güney Kore", "Seul"], "kuzey kore": ["Kuzey Kore", "Pyongyang"], "azerbaycan": ["Azerbaycan", "Bakü"],
      "gurcistan": ["Gürcistan", "Tiflis"], "ermenistan": ["Ermenistan", "Erivan"], "iran": ["İran", "Tahran"],
      "irak": ["Irak", "Bağdat"], "suriye": ["Suriye", "Şam"], "misir": ["Mısır", "Kahire"],
      "suudi arabistan": ["Suudi Arabistan", "Riyad"], "avustralya": ["Avustralya", "Canberra"],
      "yeni zelanda": ["Yeni Zelanda", "Wellington"], "nijerya": ["Nijerya", "Abuja"], "kenya": ["Kenya", "Nairobi"],
      "pakistan": ["Pakistan", "İslamabad"], "kazakistan": ["Kazakistan", "Astana"], "ozbekistan": ["Özbekistan", "Taşkent"]
    },
    facts: [
      { t: "Azerbaycan tarihi (genel bakış)", k: ["!azerbaycan tarih", "!azerbaycan tarix", "!history of azerbaijan", "!azerbaijan history", "!история азербайджан", "!azerbaycanin tarix", "!azerbaycan in tarih"], a: {
        tr: "Azerbaycan tarihi: MÖ 4. yy’da Atropatena ve Kafkas Arnavutluğu; 7. yy’da Arap fethi, ardından İslamlaşma; 861–1538 Şirvanşahlar Devleti; 11. yy’da Selçuklular, 12. yy’da Atabeyler (Eldenizler) ve Nizami Gencevi’nin dönemi; 1501’de Şah İsmail’in Tebriz’de Safevi devletini kurması. 1813 Gülistan ve 1828 Türkmençay antlaşmalarıyla kuzey kısmı Rusya’ya geçti. 28 Mayıs 1918’de Azerbaycan Halk Cumhuriyeti (Doğu’da ilk parlamenter cumhuriyet) kuruldu; 28 Nisan 1920’de Sovyet yönetimi başladı; 18 Ekim 1991’de bağımsızlık yeniden ilan edildi. Detay için “Azerbaycan Sovyet dönemi”, “Karabağ”, “Haydar Aliyev” veya “Şirvanşahlar” yaz.",
        az: "Azərbaycan tarixi: e.ə. IV əsrdə Atropatena və Qafqaz Albaniyası; VII əsrdə ərəb fəthi və islamın yayılması; 861–1538 Şirvanşahlar dövləti; XI əsrdə səlcuqlar, XII əsrdə Eldəgizlər və Nizami Gəncəvinin dövrü; 1501-də Şah İsmayılın Təbrizdə Səfəvilər dövlətini qurması. 1813 Gülüstan və 1828 Türkmənçay müqavilələri ilə şimal hissə Rusiyaya keçdi. 28 may 1918-də Azərbaycan Xalq Cümhuriyyəti (Şərqdə ilk parlamentli respublika) yarandı; 28 aprel 1920-də sovet hakimiyyəti başladı; 18 oktyabr 1991-də müstəqillik bərpa olundu.",
        en: "History of Azerbaijan: Atropatene and Caucasian Albania (4th c. BC); Arab conquest and Islamisation (7th c.); the Shirvanshahs (861–1538); Seljuks (11th c.) and Eldiguzids (12th c.), the era of the poet Nizami Ganjavi; Shah Ismail I founded the Safavid state in Tabriz in 1501. The treaties of Gulistan (1813) and Turkmenchay (1828) placed the north under Russia. The Azerbaijan Democratic Republic (the first parliamentary republic in the Muslim East) was founded on 28 May 1918; Soviet rule began on 28 April 1920; independence was restored on 18 October 1991.",
        ru: "История Азербайджана: Атропатена и Кавказская Албания (IV в. до н. э.); арабское завоевание и исламизация (VII в.); государство Ширваншахов (861–1538); сельджуки (XI в.), Эльдегизиды (XII в.), эпоха Низами Гянджеви; в 1501 г. Шах Исмаил I основал в Тебризе государство Сефевидов. По Гюлистанскому (1813) и Туркманчайскому (1828) договорам север отошёл к России. 28 мая 1918 г. создана Азербайджанская Демократическая Республика; 28 апреля 1920 г. началась советская власть; 18 октября 1991 г. восстановлена независимость." } },
      { t: "Azerbaycan: Sovyet dönemi, bağımsızlık, Karabağ", k: ["!azerbaycan sovyet", "!sovet", "!azerbaycan bagimsizlik", "!azerbaijan independence", "!soviet azerbaijan", "!karabag", "!qarabag", "!karabakh", "!haydar aliyev", "!heydar aliyev", "!ilham aliyev"], a: {
        tr: "Azerbaycan SSC 1920–1991 arasında SSCB’nin parçasıydı. 20 Ocak 1990’da (Kara Ocak) Sovyet ordusu Bakü’ye girdi. 18 Ekim 1991’de bağımsızlık ilan edildi. 1988–1994 Karabağ savaşı 12 Mayıs 1994’te ateşkesle durdu. Haydar Aliyev (1923–2003) 1993–2003’te cumhurbaşkanıydı; 2003’ten beri İlham Aliyev cumhurbaşkanıdır. 27 Eylül–10 Kasım 2020 İkinci Karabağ Savaşı üçlü bildiriyle sona erdi; Eylül 2023’te Azerbaycan bölgede kontrolü tamamladı. Güncel gelişmeleri bilmiyorum, güvenilir haber kaynaklarına bak.",
        az: "Azərbaycan SSR 1920–1991-ci illərdə SSRİ-nin tərkibində idi. 20 yanvar 1990-da (Qara Yanvar) sovet ordusu Bakıya daxil oldu. 18 oktyabr 1991-də müstəqillik elan edildi. 1988–1994 Qarabağ müharibəsi 12 may 1994-də atəşkəslə dayandı. Heydər Əliyev (1923–2003) 1993–2003-də prezident idi; 2003-dən İlham Əliyev prezidentdir. 27 sentyabr–10 noyabr 2020 İkinci Qarabağ müharibəsi üçtərəfli bəyanatla bitdi; 2023-cü ilin sentyabrında Azərbaycan bölgədə nəzarəti tamamladı.",
        en: "The Azerbaijan SSR was part of the USSR from 1920 to 1991. On 20 January 1990 (Black January) Soviet troops entered Baku. Independence was declared on 18 October 1991. The 1988–1994 Karabakh war ended with a ceasefire on 12 May 1994. Heydar Aliyev (1923–2003) was president in 1993–2003; Ilham Aliyev has been president since 2003. The Second Karabakh War (27 Sep–10 Nov 2020) ended with a trilateral statement; in September 2023 Azerbaijan completed control of the region. I have no live news, so check reliable sources for recent developments." } },
      { t: "Şirvanşahlar ve Atropatena", k: ["!sirvansah", "!shirvanshah", "!ширваншах", "!atropaten", "!kafkas arnavut", "!caucasian albania", "!qafqaz albaniya"], a: {
        tr: "Atropatena (MÖ 4. yy), Kuzey İran’daki Güney Azerbaycan’da kurulan devlettir; Kafkas Arnavutluğu ise Kür nehrinin kuzeyindeki kadim devlettir. Şirvanşahlar (861–1538) Şamahı ve sonra Bakü merkezli devlettir; Bakü’deki Şirvanşahlar Sarayı bu dönemden kalmadır.",
        az: "Atropatena (e.ə. IV əsr) Cənubi Azərbaycanda yaranan dövlətdir; Qafqaz Albaniyası isə Kür çayından şimaldakı qədim dövlətdir. Şirvanşahlar (861–1538) əvvəlcə Şamaxı, sonra Bakı mərkəzli dövlətdir; Bakıdakı Şirvanşahlar Sarayı bu dövrdən qalıb.",
        en: "Atropatene (4th c. BC) arose in what is now Iranian Azerbaijan, while Caucasian Albania lay north of the Kura river. The Shirvanshahs (861–1538) ruled from Shamakhi and later Baku; the Palace of the Shirvanshahs in Baku dates from this era." } },
      { t: "Dünya saatleri ve saat dilimleri", k: ["!saat dilimi", "!saat kusagi", "!saat qursagi", "!time zone", "!timezone", "!utc", "!gmt", "!часовой пояс", "!часовые пояса", "!tarih cizgisi", "!date line"], a: {
        tr: "Dünya 24 ana saat dilimine bölünür; saatler UTC (eşgüdümlü evrensel zaman) üzerinden +/- farkla hesaplanır. Bakü UTC+4, Türkiye UTC+3, Moskova UTC+3, Londra UTC+0 (yazın +1), Tokyo UTC+9, New York UTC−5 (yazın −4). Gün değişim çizgisi Pasifik’te yaklaşık 180° boylamındadır. Bazı ülkelerde yaz saati uygulaması vardır; Azerbaycan 2016’dan beri uygulamaz. Bir şehrin saatini sor: “Tokyo’da saat kaç?” ya da “dünya saatleri”.",
        az: "Dünya 24 əsas saat qurşağına bölünür; saatlar UTC-yə görə +/- fərqlə hesablanır. Bakı UTC+4, Türkiyə UTC+3, Moskva UTC+3, London UTC+0 (yayda +1), Tokio UTC+9, Nyu-York UTC−5 (yayda −4). Tarix xətti Sakit okeanda təxminən 180° uzunluqdadır. Azərbaycan 2016-dan yay vaxtına keçmir. Şəhər soruş: “Tokioda saat neçədir?”",
        en: "The world is split into 24 main time zones, each an offset from UTC. Baku is UTC+4, Türkiye UTC+3, Moscow UTC+3, London UTC+0 (+1 in summer), Tokyo UTC+9, New York UTC−5 (−4 in summer). The International Date Line runs near 180° longitude in the Pacific. Azerbaijan has not used daylight saving time since 2016. Ask: “What time is it in Tokyo?” or “world clocks”.",
        ru: "Мир делится на 24 основных часовых пояса относительно UTC. Баку — UTC+4, Турция — UTC+3, Москва — UTC+3, Лондон — UTC+0 (летом +1), Токио — UTC+9, Нью-Йорк — UTC−5 (летом −4). Линия перемены дат проходит около 180° в Тихом океане. Азербайджан не переходит на летнее время с 2016 года. Спроси: «Который час в Токио?»" } },
      { t: "Atatürk", k: ["!ataturk", "!mustafa kemal"], a: "Mustafa Kemal Atatürk, 1881’de Selanik’te doğdu ve 10 Kasım 1938’de İstanbul’da vefat etti. Türkiye Cumhuriyeti’nin kurucusu ve ilk cumhurbaşkanıdır." },
      { t: "Cumhuriyet’in ilanı", k: ["!cumhuriyet"], a: "Türkiye Cumhuriyeti 29 Ekim 1923’te ilan edildi. İlk cumhurbaşkanı Mustafa Kemal Atatürk oldu." },
      { t: "İstanbul’un fethi", k: ["!fetih", "!fatih"], a: "İstanbul, 29 Mayıs 1453’te Osmanlı Sultanı II. Mehmed (Fatih Sultan Mehmed) tarafından fethedildi." },
      { t: "Işık hızı", k: ["!isik hizi", "!isigin hizi"], a: "Işığın boşluktaki hızı saniyede yaklaşık 299.792 km’dir (kabaca 300.000 km/sn)." },
      { t: "Işık yılı", k: ["!isik yili"], a: "Işık yılı bir süre değil, mesafe birimidir: ışığın bir yılda aldığı yol, yaklaşık 9,46 trilyon km." },
      { t: "Dünya–Güneş mesafesi", k: ["gunes", "uzak", "mesafe", "dunya"], a: "Dünya ile Güneş arasındaki ortalama mesafe yaklaşık 150 milyon km’dir (1 astronomik birim)." },
      { t: "Güneş Sistemi’nin gezegenleri", k: ["!gezegen", "!gunes sistemi"], a: "Güneş Sistemi’nde 8 gezegen vardır: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs ve Neptün. En büyüğü Jüpiter’dir." },
      { t: "Ay", k: ["!uydu", "!ay uydusu"], a: "Dünya’nın tek doğal uydusu Ay’dır; Dünya’ya ortalama yaklaşık 384.400 km uzaktadır." },
      { t: "Kıtalar", k: ["!kita"], a: "Yaygın modele göre 7 kıta vardır: Asya, Afrika, Kuzey Amerika, Güney Amerika, Antarktika, Avrupa ve Avustralya (Okyanusya)." },
      { t: "Okyanuslar", k: ["!okyanus"], a: "5 okyanus vardır: Pasifik (en büyüğü), Atlas, Hint, Güney ve Arktik (Kuzey Buz) Okyanusu." },
      { t: "Everest Dağı", k: ["!everest"], a: "Everest Dağı, deniz seviyesinden yaklaşık 8.849 m yüksekliğiyle dünyanın en yüksek zirvesidir." },
      { t: "Suyun kaynama ve donma noktası", k: ["!kaynama", "!kaynar", "!donma"], a: "Su, deniz seviyesinde 100 °C’de kaynar ve 0 °C’de donar. Yükseldikçe kaynama noktası düşer." },
      { t: "Fotosentez", k: ["!fotosentez"], a: "Fotosentez, bitkilerin ve bazı canlıların ışık enerjisiyle su ve karbondioksitten glikoz üretip oksijen açığa çıkarmasıdır." },
      { t: "DNA", k: ["!dna"], a: "DNA, canlıların kalıtsal bilgisini taşıyan çift sarmallı moleküldür; bilgi A, T, G ve C adlı dört bazın dizilimiyle kodlanır." },
      { t: "Yer çekimi", k: ["!yer cekimi", "!yercekimi"], a: "Dünya yüzeyinde yer çekimi ivmesi yaklaşık 9,81 m/s²’dir. Newton’un evrensel çekim yasasına göre kütleli cisimler birbirini çeker." },
      { t: "Pisagor teoremi", k: ["!pisagor"], a: "Dik üçgende dik kenarların kareleri toplamı hipotenüsün karesine eşittir: a² + b² = c²." },
      { t: "Asal sayılar", k: ["!asal"], a: "Asal sayı, yalnızca 1’e ve kendisine bölünebilen, 1’den büyük doğal sayıdır (2, 3, 5, 7, 11…). Bir sayıyı sorabilirsin: “29 asal mı?”" },
      { t: "Pi sayısı", k: ["!pi sayi"], a: "Pi (π), bir çemberin çevresinin çapına oranıdır: yaklaşık 3,14159265. İrrasyoneldir, yani ondalık gösterimi sonsuza dek tekrarsız sürer." },
      { t: "Fibonacci dizisi", k: ["!fibonacci"], a: "Fibonacci dizisinde her sayı önceki ikisinin toplamıdır: 0, 1, 1, 2, 3, 5, 8, 13, 21…" },
      { t: "Artık yıl", k: ["!artik yil"], a: "Artık yıl 366 gün sürer (Şubat 29 çeker) ve genelde 4’e bölünen yıllardır. İstisna: 100’e bölünen yıllar, 400’e de bölünmedikçe artık değildir." },
      { t: "Türk alfabesi", k: ["!alfabe"], a: "Türk alfabesi 29 harften oluşur: 8 ünlü ve 21 ünsüz." },
      { t: "İnsan iskeleti", k: ["!kemik"], a: "Yetişkin bir insanda 206 kemik bulunur." },
      { t: "Bit ve bayt", k: ["!bayt", "!byte", "!bit"], a: "1 bayt = 8 bittir. Geleneksel olarak 1 KB = 1024 bayt, 1 MB = 1024 KB’dir." },
      { t: "Yapay zekâ", k: ["!yapay zeka"], a: "Yapay zekâ, bilgisayarların öğrenme, çıkarım ve dil anlama gibi insan zekâsıyla ilişkilendirilen işleri yapmasını sağlayan yöntemlerin genel adıdır. Ben bunlardan biri değilim: kural ve bilgi tabanı temelli, tarayıcında çalışan basit bir asistanım." },
      { t: "HTML", k: ["!html"], a: "HTML, web sayfalarının yapısını (başlık, paragraf, bağlantı, görsel vb.) tanımlayan işaretleme dilidir." },
      { t: "CSS", k: ["!css"], a: "CSS, HTML ile yazılmış sayfaların renk, yerleşim ve yazı tipi gibi görünümünü belirleyen stil dilidir." },
      { t: "JavaScript", k: ["!javascript"], a: "JavaScript, web sayfalarına etkileşim kazandıran programlama dilidir; tarayıcıda çalışır." },
      { t: "Python", k: ["!python"], a: "Python, okunaklı söz dizimiyle bilinen genel amaçlı bir programlama dilidir; veri analizi, otomasyon ve web geliştirmede yaygındır." },
      { t: "GitHub Pages", k: ["!github"], a: "GitHub Pages, GitHub depolarındaki statik siteleri (HTML, CSS, JS) ücretsiz yayınlayan bir hizmettir." }
    ]
  };
  function C(keys, arr) { keys.split("|").forEach(function (k) { KB.capitals[k] = arr; }); }
  // [trÜlke, trŞehir, enÜlke, enCity, ruСтрана, ruГород, azÖlkə, azŞəhər]
  C("azerbaycan|azerbaijan|азербайджан", ["Azerbaycan","Bakü","Azerbaijan","Baku","Азербайджан","Баку","Azərbaycan","Bakı"]);
  C("turkiye|turkey|турци", ["Türkiye","Ankara","Turkey","Ankara","Турция","Анкара","Türkiyə","Ankara"]);
  C("almanya|germany|almaniya|герман", ["Almanya","Berlin","Germany","Berlin","Германия","Берлин","Almaniya","Berlin"]);
  C("fransa|france|франци", ["Fransa","Paris","France","Paris","Франция","Париж","Fransa","Paris"]);
  C("japonya|japan|yaponiya|япони", ["Japonya","Tokyo","Japan","Tokyo","Япония","Токио","Yaponiya","Tokio"]);
  C("rusya|russia|rusiya|росси", ["Rusya","Moskova","Russia","Moscow","Россия","Москва","Rusiya","Moskva"]);
  C("italya|italy|italiya|итали", ["İtalya","Roma","Italy","Rome","Италия","Рим","İtaliya","Roma"]);
  C("ispanya|spain|ispaniya|испани", ["İspanya","Madrid","Spain","Madrid","Испания","Мадрид","İspaniya","Madrid"]);
  C("abd|usa|united states|сша", ["ABD","Washington D.C.","United States","Washington, D.C.","США","Вашингтон","ABŞ","Vaşinqton"]);
  C("ingiltere|united kingdom|england|britain|великобритани|britaniya", ["İngiltere","Londra","United Kingdom","London","Великобритания","Лондон","Böyük Britaniya","London"]);
  function F(t, k, tr, az, en, ru) { KB.facts.push({ t: t, k: k, a: { tr: tr, az: az, en: en, ru: ru } }); }
  F("Azerbaycan Halk Cumhuriyeti", ["!azerbaycan xalq cumhuriyyeti", "!azerbaycan halk cumhuriyeti", "!azerbaijan democratic republic", "!adr", "!азербайджанская демократическая"],
    "Azerbaycan Halk Cumhuriyeti 28 Mayıs 1918’de kuruldu; Doğu’nun Müslüman toplumlarında ilk demokratik cumhuriyettir. Nisan 1920’de Sovyet işgaliyle sona erdi.",
    "Azərbaycan Xalq Cümhuriyyəti 28 may 1918-ci ildə yaranıb; Şərqdə ilk demokratik respublikadır. 1920-ci ilin aprelində Sovet işğalı ilə süqut edib.",
    "The Azerbaijan Democratic Republic was founded on 28 May 1918 and was the first democratic republic in the Muslim East. It ended with the Soviet takeover in April 1920.",
    "Азербайджанская Демократическая Республика была провозглашена 28 мая 1918 года — первая демократическая республика на мусульманском Востоке. Пала в апреле 1920 года после советского вторжения.");
  F("Osmanlı Devleti", ["!osmanli", "!ottoman", "!османск"],
    "Osmanlı Devleti yaklaşık 1299’da Osman Bey tarafından kuruldu. 1453’te İstanbul’u fethetti; saltanat 1 Kasım 1922’de kaldırıldı, Türkiye Cumhuriyeti 29 Ekim 1923’te ilan edildi.",
    "Osmanlı dövləti təxminən 1299-cu ildə Osman bəy tərəfindən qurulub. 1453-də İstanbulu fəth edib; sultanlıq 1 noyabr 1922-də ləğv olunub, Türkiyə Cümhuriyyəti 29 oktyabr 1923-də elan edilib.",
    "The Ottoman state was founded around 1299 by Osman I. It conquered Constantinople in 1453; the sultanate was abolished on 1 November 1922 and the Republic of Türkiye was proclaimed on 29 October 1923.",
    "Османское государство основано около 1299 года Осман-беем. В 1453 году оно взяло Константинополь; султанат упразднён 1 ноября 1922 года, а Турецкая Республика провозглашена 29 октября 1923 года.");
  F("İkinci Dünya Savaşı", ["!ikinci dunya", "!world war 2", "!world war ii", "!second world war", "!вторая мировая", "!ww2"],
    "İkinci Dünya Savaşı 1 Eylül 1939’da Almanya’nın Polonya’ya saldırısıyla başladı; Avrupa’da 8 Mayıs 1945’te, Japonya’nın teslimiyle 2 Eylül 1945’te sona erdi.",
    "İkinci Dünya müharibəsi 1939-cu il sentyabrın 1-də Almaniyanın Polşaya hücumu ilə başlayıb; Avropada 8 may 1945-də, Yaponiyanın təslimi ilə 2 sentyabr 1945-də başa çatıb.",
    "World War II began on 1 September 1939 with Germany's invasion of Poland; it ended in Europe on 8 May 1945 and fully on 2 September 1945 with Japan's surrender.",
    "Вторая мировая война началась 1 сентября 1939 года нападением Германии на Польшу; в Европе закончилась 8 мая 1945 года, полностью — 2 сентября 1945 года капитуляцией Японии.");
  F("Suyun formülü", ["!suyun formulu", "!suyun kimyasal", "!formula of water", "!water formula", "!chemical formula of water", "!формула воды"],
    "Suyun kimyasal formülü H₂O’dur: 2 hidrojen ve 1 oksijen atomu.",
    "Suyun kimyəvi formulu H₂O-dur: 2 hidrogen və 1 oksigen atomu.",
    "The chemical formula of water is H₂O: 2 hydrogen atoms and 1 oxygen atom.",
    "Химическая формула воды — H₂O: 2 атома водорода и 1 атом кислорода.");
  F("Futbol", ["!futbol", "!football", "!футбол"],
    "Futbol: her takım sahada 11 oyuncuyla oynar, maç 2×45 dakikadır. İlk FIFA Dünya Kupası 1930’da Uruguay’da oynandı.",
    "Futbol: hər komanda meydanda 11 oyunçu ilə oynayır, oyun 2×45 dəqiqədir. İlk FIFA Dünya Kuboku 1930-cu ildə Uruqvayda keçirilib.",
    "Football (soccer): each team plays with 11 players, and a match lasts 2×45 minutes. The first FIFA World Cup was held in Uruguay in 1930.",
    "Футбол: каждая команда играет в составе 11 игроков, матч длится 2×45 минут. Первый чемпионат мира ФИФА прошёл в 1930 году в Уругвае.");
  F("Gezegenler", ["!planet", "!планет"],
    "Güneş Sistemi’nde 8 gezegen vardır: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün.",
    "Günəş sistemində 8 planet var: Merkuri, Venera, Yer, Mars, Yupiter, Saturn, Uran, Neptun.",
    "The Solar System has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
    "В Солнечной системе 8 планет: Меркурий, Венера, Земля, Марс, Юпитер, Сатурн, Уран, Нептун.");
  F("Nizami Gencevi", ["!nizami", "!низами"],
    "Nizami Gencevi (yaklaşık 1141–1209), Gence doğumlu büyük Azerbaycan şairidir; en ünlü eseri beş destandan oluşan “Hamse”dir.",
    "Nizami Gəncəvi (təxminən 1141–1209) Gəncədə doğulmuş böyük Azərbaycan şairidir; ən məşhur əsəri beş poemadan ibarət “Xəmsə”dir.",
    "Nizami Ganjavi (c. 1141–1209) was a great poet from Ganja, Azerbaijan; his best-known work is the “Khamsa”, a set of five long poems.",
    "Низами Гянджеви (ок. 1141–1209) — великий поэт из Гянджи (Азербайджан); самое известное его произведение — «Хамсе» («Пятерица»), цикл из пяти поэм.");
  F("Safeviler", ["!safevi", "!sefevi", "!safavid", "!сефевид", "!sah ismail", "!sah ismayil", "!shah ismail", "!shah ismael", "!шах исмаил", "!caldiran", "!chaldiran", "!чалдыран"],
    "Safeviler (Safevi Devleti), 1501’de Şah İsmail’in Tebriz’de tahta çıkmasıyla kuruldu; Erdebil’deki Safevi tarikatına dayanır. On iki imam Şiiliği devlet dini oldu. Osmanlı’ya 1514’te Çaldıran’da yenildi. En parlak dönemi Şah Abbas (1588–1629) devrindedir; başkent İsfahan’dı. Devlet 1736’da Nadir Şah’ın yönetimi ele almasıyla sona erdi. Şah İsmail, “Hatayî” mahlasıyla Azerbaycan Türkçesiyle şiirler yazdı.",
    "Səfəvilər dövləti 1501-ci ildə Şah İsmayılın Təbrizdə taxta çıxması ilə yaranıb; Ərdəbildəki Səfəvi təriqətinə əsaslanır. On iki imam şiəliyi dövlət dini olub. 1514-cü ildə Çaldıranda Osmanlıya məğlub olub. Ən parlaq dövrü Şah Abbas (1588–1629) zamanıdır; paytaxt İsfahan idi. Dövlət 1736-cı ildə Nadir şahın hakimiyyəti ələ almasıyla sona çatıb. Şah İsmayıl “Xətai” təxəllüsü ilə Azərbaycan türkcəsində şeirlər yazıb.",
    "The Safavid state was founded in 1501 when Shah Ismail I was crowned in Tabriz; it grew out of the Safavid order of Ardabil. Twelver Shi'ism became the state religion. It lost to the Ottomans at Chaldiran in 1514. Its peak came under Shah Abbas I (1588–1629), with Isfahan as capital. It ended in 1736 when Nader Shah took power. Ismail wrote poetry in Azerbaijani Turkic under the pen name Khatai.",
    "Государство Сефевидов возникло в 1501 году, когда Шах Исмаил I был коронован в Тебризе; оно выросло из суфийского ордена Сефевийя в Ардебиле. Государственной религией стал двунадесятнический шиизм. В 1514 году Сефевиды проиграли османам при Чалдыране. Расцвет пришёлся на правление Шаха Аббаса I (1588–1629), столица — Исфахан. Государство пало в 1736 году, когда власть взял Надир-шах. Исмаил писал стихи на азербайджанском тюркском под псевдонимом Хатаи.");
  var HW = ["tarih", "history", "tarix", "истори"];
  function H(t, c, tr, az, en, ru) { F(t, c.concat(HW), tr, az, en, ru); }
  H("Avrupa tarihi", ["avrupa", "europe", "avropa", "европ"],
    "Avrupa tarihi kısaca: Antik Yunan ve Roma → Orta Çağ (476’dan sonra) → Rönesans ve Reform (1517) → Fransız Devrimi (1789) → 19. yüzyılda ulus devletlerin doğuşu → iki dünya savaşı → 1957’den itibaren Avrupa bütünleşmesi. Tek tek devletler için “Almanya tarihi”, “Fransa tarihi” gibi sorabilirsin.",
    "Avropa tarixi qısaca: Antik Yunan və Roma → Orta əsrlər (476-dan sonra) → İntibah və Reformasiya (1517) → Fransa inqilabı (1789) → XIX əsrdə milli dövlətlərin yaranması → iki dünya müharibəsi → 1957-dən Avropa inteqrasiyası. Ayrı-ayrı dövlətlər üçün “Almaniya tarixi”, “Fransa tarixi” kimi soruşa bilərsən.",
    "European history in brief: ancient Greece and Rome → the Middle Ages (after 476) → Renaissance and Reformation (1517) → the French Revolution (1789) → nation-states in the 19th century → two world wars → European integration from 1957. You can ask about single states, e.g. “history of Germany”.",
    "История Европы кратко: Древняя Греция и Рим → Средневековье (после 476 года) → Возрождение и Реформация (1517) → Французская революция (1789) → национальные государства в XIX веке → две мировые войны → европейская интеграция с 1957 года. Можно спросить о конкретной стране, например «история Германии».");
  H("Almanya", ["almanya", "germany", "almaniya", "герман"],
    "Almanya 18 Ocak 1871’de Prusya önderliğinde (Bismarck) birleşti. II. Dünya Savaşı’ndan sonra 1949’da Batı ve Doğu Almanya olarak ikiye ayrıldı; 3 Ekim 1990’da yeniden birleşti.",
    "Almaniya 18 yanvar 1871-ci ildə Prussiyanın rəhbərliyi ilə (Bismark) birləşdi. İkinci Dünya müharibəsindən sonra 1949-da Qərbi və Şərqi Almaniyaya bölündü; 3 oktyabr 1990-da yenidən birləşdi.",
    "Germany was unified on 18 January 1871 under Prussian leadership (Bismarck). After World War II it split into West and East Germany in 1949 and was reunified on 3 October 1990.",
    "Германия была объединена 18 января 1871 года под руководством Пруссии (Бисмарк). После Второй мировой войны в 1949 году она разделилась на ФРГ и ГДР, а 3 октября 1990 года вновь объединилась.");
  H("Fransa", ["fransa", "france", "франци"],
    "Fransa’da 1789 Devrimi monarşiyi yıktı; Napolyon 1804’te imparator oldu ve 1815’te Waterloo’da kesin yenilgiye uğradı. Bugünkü Beşinci Cumhuriyet 1958’de kuruldu.",
    "Fransada 1789-cu il inqilabı monarxiyanı devirdi; Napoleon 1804-də imperator oldu və 1815-də Vaterloda qəti məğlub oldu. Hazırkı Beşinci Respublika 1958-də qurulub.",
    "In France the 1789 Revolution overthrew the monarchy; Napoleon became emperor in 1804 and was finally defeated at Waterloo in 1815. The current Fifth Republic dates from 1958.",
    "Во Франции революция 1789 года свергла монархию; Наполеон стал императором в 1804 году и был окончательно разбит при Ватерлоо в 1815 году. Нынешняя Пятая республика основана в 1958 году.");
  H("Birleşik Krallık", ["ingiltere", "britain", "england", "britaniya", "великобритани", "birlesik krallik", "united kingdom"],
    "Magna Carta 1215’te imzalandı. İngiltere ve İskoçya 1707’de Büyük Britanya Krallığı’nda birleşti; 1801’de İrlanda’yla Birleşik Krallık kuruldu. İrlanda’nın büyük kısmı 1922’de ayrıldı.",
    "Magna Karta 1215-ci ildə imzalanıb. İngiltərə və Şotlandiya 1707-də Böyük Britaniya Krallığında birləşib; 1801-də İrlandiya ilə Birləşmiş Krallıq yaranıb. İrlandiyanın böyük hissəsi 1922-də ayrılıb.",
    "Magna Carta was sealed in 1215. England and Scotland united as the Kingdom of Great Britain in 1707; the United Kingdom with Ireland was formed in 1801. Most of Ireland left in 1922.",
    "Великая хартия вольностей подписана в 1215 году. Англия и Шотландия объединились в Королевство Великобритания в 1707 году; в 1801 году с Ирландией образовано Соединённое Королевство. Большая часть Ирландии вышла из его состава в 1922 году.");
  H("İtalya", ["italya", "italy", "italiya", "итали"],
    "İtalya Krallığı 1861’de ilan edildi; Roma 1871’de başkent oldu. 1946 referandumuyla monarşi kaldırılıp cumhuriyete geçildi.",
    "İtaliya Krallığı 1861-ci ildə elan edildi; Roma 1871-də paytaxt oldu. 1946-cı il referendumu ilə monarxiya ləğv edilib respublikaya keçildi.",
    "The Kingdom of Italy was proclaimed in 1861 and Rome became the capital in 1871. A 1946 referendum abolished the monarchy and made Italy a republic.",
    "Королевство Италия было провозглашено в 1861 году, Рим стал столицей в 1871 году. Референдум 1946 года упразднил монархию и сделал Италию республикой.");
  H("İspanya", ["ispanya", "spain", "ispaniya", "испани"],
    "Granada’nın düşmesiyle 1492’de Reconquista tamamlandı; aynı yıl Kolomb Amerika’ya ulaştı. İspanya 1936–1939 iç savaşını yaşadı; Franco 1975’te öldü ve ülke demokrasiye geçti.",
    "Qranadanın süqutu ilə 1492-ci ildə Rekonkista başa çatdı; həmin il Kolumb Amerikaya çatdı. İspaniya 1936–1939-cu illərdə vətəndaş müharibəsi yaşadı; Franko 1975-də öldü və ölkə demokratiyaya keçdi.",
    "The Reconquista ended with the fall of Granada in 1492, the year Columbus reached the Americas. Spain had a civil war in 1936–1939; Franco died in 1975 and the country turned to democracy.",
    "Реконкиста завершилась падением Гранады в 1492 году — в год, когда Колумб достиг Америки. В Испании шла гражданская война 1936–1939 годов; Франко умер в 1975 году, и страна перешла к демократии.");
  H("Rusya", ["rusya", "russia", "rusiya", "росси"],
    "Rusya’nın kökeni 9. yüzyıl Kiev Rusu’na dayanır. I. Petro 1721’de imparatorluğu ilan etti. 1917 devrimlerinin ardından 1922’de SSCB kuruldu ve 1991’de dağıldı.",
    "Rusiyanın mənşəyi IX əsr Kiyev Rusuna əsaslanır. I Pyotr 1721-də imperiyanı elan etdi. 1917-ci il inqilablarından sonra 1922-də SSRİ yaradıldı və 1991-də dağıldı.",
    "Russia's roots lie in Kievan Rus' of the 9th century. Peter I proclaimed the empire in 1721. After the 1917 revolutions the USSR was formed in 1922 and dissolved in 1991.",
    "Истоки России — в Киевской Руси IX века. Пётр I провозгласил империю в 1721 году. После революций 1917 года в 1922 году образован СССР, распавшийся в 1991 году.");
  F("Roma İmparatorluğu ve Bizans", ["!roma imparatorlugu", "!roma imperiyasi", "!roman empire", "!римская импери", "!bizans", "!byzantine", "!византи"],
    "Roma İmparatorluğu MÖ 27’de Augustus ile kuruldu. Batı Roma 476’da çöktü; Doğu Roma (Bizans) 1453’te İstanbul’un Osmanlı’ya geçmesine kadar sürdü.",
    "Roma imperiyası e.ə. 27-ci ildə Avqustla qurulub. Qərbi Roma 476-cı ildə süqut edib; Şərqi Roma (Bizans) 1453-də İstanbulun Osmanlı tərəfindən fəthinə qədər davam edib.",
    "The Roman Empire began in 27 BC under Augustus. The Western Empire fell in 476; the Eastern (Byzantine) Empire lasted until Constantinople fell to the Ottomans in 1453.",
    "Римская империя возникла в 27 году до н. э. при Августе. Западная империя пала в 476 году; Восточная (Византия) просуществовала до взятия Константинополя османами в 1453 году.");
  F("Kutsal Roma-Germen İmparatorluğu", ["!kutsal roma", "!muqeddes roma", "!holy roman", "!священная римская"],
    "Kutsal Roma-Germen İmparatorluğu, I. Otto’nun 962’de taç giymesiyle başlatılır (Şarlman 800’de imparator ilan edilmişti). 1806’da Napolyon savaşları sırasında sona erdi.",
    "Müqəddəs Roma imperiyasının başlanğıcı I Ottonun 962-ci ildə tac qoymağı sayılır (Karl 800-cü ildə imperator elan edilmişdi). 1806-cı ildə Napoleon müharibələri dövründə sona çatdı.",
    "The Holy Roman Empire is usually dated from Otto I's coronation in 962 (Charlemagne had been crowned emperor in 800). It ended in 1806 during the Napoleonic Wars.",
    "Священная Римская империя ведёт отсчёт от коронации Оттона I в 962 году (Карл Великий был коронован в 800 году). Она прекратила существование в 1806 году во время наполеоновских войн.");
  F("Birinci Dünya Savaşı", ["!birinci dunya", "!world war 1", "!first world war", "!ww1", "!первая мировая"],
    "Birinci Dünya Savaşı 28 Haziran 1914’teki Saraybosna suikastından sonra başladı; 11 Kasım 1918 ateşkesiyle sona erdi. Savaş yıllarında ve hemen sonrasında Alman, Rus, Avusturya-Macaristan ve Osmanlı imparatorlukları sona erdi.",
    "Birinci Dünya müharibəsi 28 iyun 1914-cü il Sarayevo sui-qəsdindən sonra başlayıb; 11 noyabr 1918-də barışıqla bitib. Müharibə illərində və dərhal sonra Alman, Rusiya, Avstriya-Macarıstan və Osmanlı imperiyaları sona çatıb.",
    "World War I began after the Sarajevo assassination on 28 June 1914 and ended with the armistice of 11 November 1918. The German, Russian, Austro-Hungarian and Ottoman empires ended during or just after the war.",
    "Первая мировая война началась после убийства в Сараево 28 июня 1914 года и закончилась перемирием 11 ноября 1918 года. Во время войны и сразу после неё прекратили существование Германская, Российская, Австро-Венгерская и Османская империи.");
  F("Avrupa Birliği", ["!avrupa birligi", "!avropa ittifaqi", "!european union", "!европейский союз"],
    "Avrupa Ekonomik Topluluğu 1957 Roma Antlaşması’yla kuruldu (1958’de yürürlüğe girdi). Avrupa Birliği adı Maastricht Antlaşması’yla 1993’te doğdu; euro 2002’de banknot ve madeni para olarak dolaşıma girdi.",
    "Avropa İqtisadi Birliyi 1957-ci il Roma müqaviləsi ilə yaradılıb (1958-də qüvvəyə minib). Avropa İttifaqı adı 1993-cü ildə Maastrixt müqaviləsi ilə yaranıb; avro 2002-ci ildə nağd dövriyyəyə çıxıb.",
    "The European Economic Community was founded by the 1957 Treaty of Rome (in force in 1958). The name European Union came with the Maastricht Treaty in 1993; euro notes and coins entered circulation in 2002.",
    "Европейское экономическое сообщество создано Римским договором 1957 года (вступил в силу в 1958 году). Название «Европейский союз» появилось с Маастрихтским договором в 1993 году; банкноты и монеты евро поступили в обращение в 2002 году.");
  F("Pisagor teoremi", ["!pifaqor", "!pythagor", "!пифагор"],
    "Dik üçgende dik kenarların kareleri toplamı hipotenüsün karesine eşittir: a² + b² = c².",
    "Düzbucaqlı üçbucaqda katetlərin kvadratlarının cəmi hipotenuzun kvadratına bərabərdir: a² + b² = c².",
    "In a right triangle, the squares of the two legs add up to the square of the hypotenuse: a² + b² = c².",
    "В прямоугольном треугольнике сумма квадратов катетов равна квадрату гипотенузы: a² + b² = c².");
  F("Üçgenin iç açıları", ["!ucgenin ic acilar", "!ucbucagin daxili", "!angles of a triangle", "!sum of angles", "!сумма углов"],
    "Bir üçgenin iç açıları toplamı her zaman 180°’dir.", "Üçbucağın daxili bucaqlarının cəmi həmişə 180°-dir.", "The interior angles of a triangle always add up to 180°.", "Сумма внутренних углов треугольника всегда равна 180°.");
  F("Pi sayısı", ["!pi ededi", "!value of pi", "!what is pi", "!число пи", "!чему равно пи"],
    "Pi (π), çemberin çevresinin çapına oranıdır: yaklaşık 3,14159265.", "Pi (π) çevrənin uzunluğunun diametrə nisbətidir: təxminən 3,14159265.", "Pi (π) is the ratio of a circle's circumference to its diameter: about 3.14159265.", "Число π — отношение длины окружности к диаметру: примерно 3,14159265.");
  F("Kesir", ["!kesir", "!kesr", "!fraction", "!дроб"],
    "Kesir, bir bütünün eşit parçalarından kaçının alındığını gösterir: payda bütünün kaç parçaya bölündüğünü, pay kaç parça alındığını verir. Örnek: 3/4. “1/2 + 1/3” yazarak toplayabilirsin.",
    "Kəsr bütövün bərabər hissələrindən neçəsinin götürüldüyünü göstərir: məxrəc bütövün neçə hissəyə bölündüyünü, surət neçə hissə götürüldüyünü verir. Məsələn: 3/4. “1/2 + 1/3” yaza bilərsən.",
    "A fraction shows how many equal parts of a whole are taken: the denominator is the number of equal parts, the numerator is how many are taken. Example: 3/4. Try “1/2 + 1/3”.",
    "Дробь показывает, сколько равных частей целого взято: знаменатель — на сколько частей разделено целое, числитель — сколько частей взято. Пример: 3/4. Попробуй «1/2 + 1/3».");
  F("Denklem", ["!denklem", "!tenlik", "!equation", "!уравнен"],
    "Denklem, içinde bilinmeyen bulunan eşitliktir (örn. 2x + 5 = 15). Çözmek, eşitliği sağlayan değeri bulmaktır. Bana “2x+5=15” yazabilirsin.",
    "Tənlik içində məchul olan bərabərlikdir (məs. 2x + 5 = 15). Həll etmək bərabərliyi ödəyən qiyməti tapmaqdır. Mənə “2x+5=15” yaza bilərsən.",
    "An equation is an equality containing an unknown (e.g. 2x + 5 = 15). Solving it means finding the value that makes it true. Try “2x+5=15”.",
    "Уравнение — это равенство с неизвестным (например, 2x + 5 = 15). Решить его — значит найти значение, при котором оно верно. Попробуй «2x+5=15».");
  F("Türev", ["!turev", "!toreme", "!derivative", "!производн"],
    "Türev, bir fonksiyonun bir noktadaki anlık değişim hızıdır; grafikte o noktadaki teğetin eğimidir. Örnek: x² fonksiyonunun türevi 2x’tir. (Ben türev hesaplayamam, yalnızca tanımını verebilirim.)",
    "Törəmə funksiyanın bir nöqtədəki ani dəyişmə sürətidir; qrafikdə həmin nöqtədəki toxunanın bucaq əmsalıdır. Məsələn: x² funksiyasının törəməsi 2x-dir. (Mən törəmə hesablaya bilmirəm, yalnız tərifini verə bilərəm.)",
    "A derivative is the instantaneous rate of change of a function at a point; on a graph it is the slope of the tangent there. Example: the derivative of x² is 2x. (I can't compute derivatives, only give the definition.)",
    "Производная — это мгновенная скорость изменения функции в точке; на графике это угловой коэффициент касательной. Пример: производная x² равна 2x. (Я не умею вычислять производные, могу дать только определение.)");

  /* ---------- 1.4: Eski Türkçe kayıtları 4 dile taşı ---------- */
  function U(t, k, az, en, ru) {
    for (var i = 0; i < KB.facts.length; i++) {
      var f = KB.facts[i];
      if (f.t === t && typeof f.a === "string") { f.a = { tr: f.a, az: az, en: en, ru: ru }; f.k = f.k.concat(k); return; }
    }
  }
  U("Atatürk", ["!ататюрк"],
    "Mustafa Kamal Atatürk 1881-ci ildə Salonikidə doğulub, 10 noyabr 1938-ci ildə İstanbulda vəfat edib. Türkiyə Cümhuriyyətinin qurucusu və ilk prezidentidir.",
    "Mustafa Kemal Atatürk was born in 1881 in Thessaloniki and died on 10 November 1938 in Istanbul. He founded the Republic of Turkey and was its first president.",
    "Мустафа Кемаль Ататюрк родился в 1881 году в Салониках и умер 10 ноября 1938 года в Стамбуле. Основатель и первый президент Турецкой Республики.");
  U("Cumhuriyet’in ilanı", ["!republic of turkey", "!турецкая республика", "!turkiye cumhuriyyetinin"],
    "Türkiyə Cümhuriyyəti 29 oktyabr 1923-cü ildə elan olunub. İlk prezidenti Mustafa Kamal Atatürk olub.",
    "The Republic of Turkey was proclaimed on 29 October 1923; Mustafa Kemal Atatürk became its first president.",
    "Турецкая Республика провозглашена 29 октября 1923 года; первым президентом стал Мустафа Кемаль Ататюрк.");
  U("İstanbul’un fethi", ["!fall of constantinople", "!conquest of constantinople", "!istanbulun feth", "!падение константинопол", "!взятие константинопол"],
    "İstanbul (Konstantinopol) 29 may 1453-cü ildə Osmanlı sultanı II Mehmed (Fateh Sultan Mehmed) tərəfindən fəth edilib.",
    "Istanbul (Constantinople) was conquered on 29 May 1453 by the Ottoman Sultan Mehmed II, known as Mehmed the Conqueror.",
    "Константинополь (Стамбул) был взят 29 мая 1453 года османским султаном Мехмедом II Завоевателем.");
  U("Işık hızı", ["!speed of light", "!isigin sureti", "!isiq sureti", "!скорость света"],
    "İşığın vakuumdakı sürəti saniyədə təxminən 299 792 km-dir (təxminən 300 000 km/san).",
    "The speed of light in a vacuum is about 299,792 km per second (roughly 300,000 km/s).",
    "Скорость света в вакууме — около 299 792 км/с (примерно 300 000 км/с).");
  U("Işık yılı", ["!light year", "!isiq ili", "!световой год"],
    "İşıq ili vaxt yox, məsafə vahididir: işığın bir ildə qət etdiyi yol, təxminən 9,46 trilyon km.",
    "A light-year is a unit of distance, not time: how far light travels in a year, about 9.46 trillion km.",
    "Световой год — единица расстояния, а не времени: путь света за год, около 9,46 трлн км.");
  U("Dünya–Güneş mesafesi", ["!distance to the sun", "!earth sun distance", "!расстояние до солнца", "!gunese qeder mesafe", "!yerden gunese"],
    "Yer ilə Günəş arasındakı orta məsafə təxminən 150 milyon km-dir (1 astronomik vahid).",
    "The average distance between Earth and the Sun is about 150 million km (1 astronomical unit).",
    "Среднее расстояние от Земли до Солнца — около 150 млн км (1 астрономическая единица).");
  U("Güneş Sistemi’nin gezegenleri", ["!solar system", "!солнечная система"],
    "Günəş sistemində 8 planet var: Merkuri, Venera, Yer, Mars, Yupiter, Saturn, Uran və Neptun. Ən böyüyü Yupiterdir.",
    "The Solar System has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. Jupiter is the largest.",
    "В Солнечной системе 8 планет: Меркурий, Венера, Земля, Марс, Юпитер, Сатурн, Уран и Нептун. Самая большая — Юпитер.");
  U("Ay", ["!moon", "!луна", "!луны"],
    "Yerin yeganə təbii peyki Aydır; Yerdən orta hesabla təxminən 384 400 km uzaqdadır.",
    "The Moon is Earth's only natural satellite, about 384,400 km away on average.",
    "Луна — единственный естественный спутник Земли; среднее расстояние до неё около 384 400 км.");
  U("Kıtalar", ["!continent", "!qitel", "!материк", "!континент"],
    "Ən geniş yayılmış modelə görə 7 qitə var: Asiya, Afrika, Şimali Amerika, Cənubi Amerika, Antarktida, Avropa və Avstraliya (Okeaniya).",
    "In the most common model there are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe and Australia (Oceania).",
    "По самой распространённой модели континентов семь: Азия, Африка, Северная Америка, Южная Америка, Антарктида, Европа и Австралия (Океания).");
  U("Okyanuslar", ["!ocean", "!okean", "!океан"],
    "5 okean var: Sakit (ən böyüyü), Atlantik, Hind, Cənub və Şimal Buzlu okeanı.",
    "There are 5 oceans: the Pacific (the largest), Atlantic, Indian, Southern and Arctic.",
    "Океанов пять: Тихий (крупнейший), Атлантический, Индийский, Южный и Северный Ледовитый.");
  U("Everest Dağı", ["!highest mountain", "!en yuksek dag", "!en hundur dag", "!самая высокая гора", "!эверест", "!джомолунгм"],
    "Everest dəniz səviyyəsindən təxminən 8 849 m hündürlüyü ilə dünyanın ən yüksək zirvəsidir.",
    "Mount Everest, about 8,849 m above sea level, is the highest peak on Earth.",
    "Эверест (Джомолунгма) высотой около 8 849 м над уровнем моря — высочайшая вершина Земли.");
  U("Suyun kaynama ve donma noktası", ["!boiling point", "!freezing point", "!qaynama", "!кипени", "!замерзани"],
    "Su dəniz səviyyəsində 100 °C-də qaynayır, 0 °C-də donur. Yüksəkliyə qalxdıqca qaynama temperaturu azalır.",
    "At sea level water boils at 100 °C and freezes at 0 °C. The boiling point drops at higher altitudes.",
    "На уровне моря вода кипит при 100 °C и замерзает при 0 °C. С высотой температура кипения снижается.");
  U("Fotosentez", ["!fotosintez", "!photosynthes", "!фотосинтез"],
    "Fotosintez bitkilərin və bəzi canlıların işıq enerjisi ilə su və karbon qazından qlükoza yaradıb oksigen ayırmasıdır.",
    "Photosynthesis is how plants and some other organisms use light energy to make glucose from water and carbon dioxide, releasing oxygen.",
    "Фотосинтез — процесс, при котором растения и некоторые организмы с помощью света образуют глюкозу из воды и углекислого газа, выделяя кислород.");
  U("DNA", ["!dnt", "!днк"],
    "DNT canlıların irsi məlumatını daşıyan ikiqat spiral molekuldur; məlumat A, T, G və C adlı dörd azotlu əsasın ardıcıllığı ilə kodlanır.",
    "DNA is the double-helix molecule that carries hereditary information, encoded in the order of four bases: A, T, G and C.",
    "ДНК — молекула в форме двойной спирали, хранящая наследственную информацию; она закодирована последовательностью четырёх оснований: A, T, G и C.");
  U("Yer çekimi", ["!gravity", "!gravitasiya", "!cazibe quvves", "!гравитац", "!сила тяжести", "!притяжени"],
    "Yer səthində sərbəst düşmə təcili təxminən 9,81 m/s²-dir. Nyutonun ümumdünya cazibə qanununa görə kütləli cisimlər bir-birini cəzb edir.",
    "Gravitational acceleration at Earth's surface is about 9.81 m/s². By Newton's law of universal gravitation, all masses attract each other.",
    "Ускорение свободного падения у поверхности Земли — около 9,81 м/с². По закону всемирного тяготения Ньютона все тела притягивают друг друга.");
  U("Asal sayılar", ["!prime number", "!sade eded nedir", "!простое число", "!простые числа"],
    "Sadə ədəd yalnız 1-ə və özünə bölünən, 1-dən böyük natural ədəddir (2, 3, 5, 7, 11…). Soruşa bilərsən: “29 sadə ədəddir?”",
    "A prime is a natural number greater than 1 divisible only by 1 and itself (2, 3, 5, 7, 11…). Ask me: “is 29 prime?”",
    "Простое число — натуральное число больше 1, которое делится только на 1 и на себя (2, 3, 5, 7, 11…). Спроси: «29 простое число?»");
  U("Fibonacci dizisi", ["!фибоначчи"],
    "Fibonaççi ardıcıllığında hər ədəd özündən əvvəlki iki ədədin cəmidir: 0, 1, 1, 2, 3, 5, 8, 13, 21…",
    "In the Fibonacci sequence each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21…",
    "В последовательности Фибоначчи каждое число равно сумме двух предыдущих: 0, 1, 1, 2, 3, 5, 8, 13, 21…");
  U("Artık yıl", ["!leap year", "!uzun il", "!високосн"],
    "Uzun il 366 gün davam edir (fevral 29 gün olur) və adətən 4-ə bölünən illərdir. İstisna: 100-ə bölünən illər 400-ə də bölünmürsə, uzun il deyil.",
    "A leap year has 366 days (February has 29) and is usually divisible by 4. Exception: years divisible by 100 aren't leap years unless they're also divisible by 400.",
    "Високосный год длится 366 дней (в феврале 29 дней); обычно это годы, кратные 4. Исключение: годы, кратные 100, не високосные, если не делятся на 400.");
  U("Türk alfabesi", ["!turkish alphabet", "!турецкий алфавит"],
    "Türkiyə türkcəsinin əlifbası 29 hərfdən ibarətdir: 8 sait və 21 samit.",
    "The Turkish alphabet has 29 letters: 8 vowels and 21 consonants.",
    "Турецкий алфавит состоит из 29 букв: 8 гласных и 21 согласной.");
  U("İnsan iskeleti", ["!sumuk", "!bones", "!skeleton", "!skelet", "!костей", "!скелет"],
    "Yetkin insanda 206 sümük var.",
    "An adult human has 206 bones.",
    "У взрослого человека 206 костей.");
  U("Bit ve bayt", ["!байт", "!бит"],
    "1 bayt = 8 bitdir. Ənənəvi olaraq 1 KB = 1024 bayt, 1 MB = 1024 KB.",
    "1 byte = 8 bits. Traditionally 1 KB = 1024 bytes and 1 MB = 1024 KB.",
    "1 байт = 8 бит. Традиционно 1 КБ = 1024 байта, 1 МБ = 1024 КБ.");
  U("Yapay zekâ", ["!artificial intelligence", "!suni intellekt", "!искусственный интеллект"],
    "Süni intellekt kompüterlərin öyrənmə, nəticə çıxarma və dili anlama kimi insan zəkası ilə bağlı işləri görməsinə imkan verən üsulların ümumi adıdır. Mən böyük model deyiləm: qaydalar və bilik bazası ilə cihazında işləyən sadə köməkçiyəm.",
    "Artificial intelligence is the general name for methods that let computers learn, reason and understand language. I'm not a large AI model: I'm a simple assistant that runs on your device with rules and a knowledge base.",
    "Искусственный интеллект — общее название методов, позволяющих компьютерам учиться, рассуждать и понимать язык. Я не большая ИИ-модель: простой ассистент, работающий на устройстве с помощью правил и базы знаний.");
  U("HTML", [], "HTML veb səhifələrin quruluşunu (başlıq, abzas, keçid, şəkil və s.) təyin edən nişanlama dilidir.",
    "HTML is the markup language that defines the structure of web pages (headings, paragraphs, links, images and so on).",
    "HTML — язык разметки, задающий структуру веб-страниц (заголовки, абзацы, ссылки, изображения и т. д.).");
  U("CSS", [], "CSS HTML səhifələrinin rəng, yerləşmə və şrift kimi görünüşünü təyin edən üslub dilidir.",
    "CSS is the style language that controls how HTML pages look: colours, layout and fonts.",
    "CSS — язык стилей, определяющий внешний вид HTML-страниц: цвета, расположение и шрифты.");
  U("JavaScript", [], "JavaScript veb səhifələrə interaktivlik qazandıran proqramlaşdırma dilidir; brauzerdə işləyir.",
    "JavaScript is the programming language that makes web pages interactive; it runs in the browser.",
    "JavaScript — язык программирования, делающий веб-страницы интерактивными; работает в браузере.");
  U("Python", ["!питон"], "Python oxunaqlı sintaksisi ilə tanınan ümumi təyinatlı proqramlaşdırma dilidir; məlumat təhlili, avtomatlaşdırma və veb inkişafında geniş istifadə olunur.",
    "Python is a general-purpose programming language known for its readable syntax; it's popular for data analysis, automation and web development.",
    "Python — язык программирования общего назначения с понятным синтаксисом; популярен в анализе данных, автоматизации и веб-разработке.");
  U("GitHub Pages", [], "GitHub Pages GitHub depolarındakı statik saytları (HTML, CSS, JS) pulsuz dərc edən xidmətdir.",
    "GitHub Pages publishes static sites (HTML, CSS, JS) from GitHub repositories for free.",
    "GitHub Pages — сервис для бесплатной публикации статических сайтов (HTML, CSS, JS) из репозиториев GitHub.");

  /* ---------- 1.4: Yeni konular (4 dil) ---------- */
  F("Nevruz (Novruz)", ["!novruz", "!nevruz", "!nowruz", "!навруз", "!новруз"],
    "Nevruz (Novruz), baharın gelişini kutlayan bayramdır; ilkbahar ekinoksunda, 20–21 Mart civarında kutlanır. Azerbaycan’da semeni, tonqal (ateş) üzerinden atlama, şekerbura ve pahlava gelenekseldir. 2009’dan beri UNESCO somut olmayan kültürel miras listesindedir.",
    "Novruz baharın gəlişini qeyd edən bayramdır; yaz gecə-gündüz bərabərliyində, təxminən 20–21 martda qeyd olunur. Səməni, tonqal üstündən tullanmaq, şəkərbura və paxlava ənənəvidir. 2009-cu ildən UNESCO-nun qeyri-maddi mədəni irs siyahısındadır.",
    "Novruz (Nowruz) celebrates the arrival of spring at the spring equinox, around 20–21 March. In Azerbaijan, traditions include semeni (sprouted wheat), jumping over bonfires, shekerbura and pakhlava. It has been on UNESCO's intangible cultural heritage list since 2009.",
    "Новруз — праздник прихода весны, отмечается в день весеннего равноденствия, около 20–21 марта. В Азербайджане традиционны сямяни (проросшая пшеница), прыжки через костёр, шекербура и пахлава. С 2009 года входит в список нематериального культурного наследия ЮНЕСКО.");
  F("Muğam", ["!mugam", "!mugham", "!мугам"],
    "Muğam, Azerbaycan’ın doğaçlamaya dayalı klasik müzik geleneğidir: hanende gaval çalar, tar ve kamança eşlik eder. 2008’de UNESCO somut olmayan kültürel miras listesine alındı.",
    "Muğam Azərbaycanın improvizasiyaya əsaslanan klassik musiqi ənənəsidir: xanəndə qaval çalır, tar və kamança müşayiət edir. 2008-ci ildə UNESCO-nun qeyri-maddi mədəni irs siyahısına daxil edilib.",
    "Mugham is Azerbaijan's classical music tradition, built on improvisation: the singer plays the gaval (frame drum), accompanied by tar and kamancha. It was inscribed on UNESCO's intangible heritage list in 2008.",
    "Мугам — классическая музыкальная традиция Азербайджана, основанная на импровизации: певец играет на гавале, ему аккомпанируют тар и кяманча. В 2008 году включён в список нематериального наследия ЮНЕСКО.");
  F("Kız Kalesi ve İçerişehir", ["!qiz qalasi", "!kiz kalesi", "!maiden tower", "!девичья башня", "!iceriseher", "!icerisehir", "!old city baku", "!ичеришехер"],
    "Kız Kalesi (Qız Qalası), Bakü’nün tarihî İçerişehir bölgesinin simgesidir. İçerişehir, Şirvanşahlar Sarayı ve Kız Kalesi ile birlikte 2000’de UNESCO Dünya Mirası listesine girdi.",
    "Qız Qalası Bakının tarixi İçərişəhər hissəsinin rəmzidir. İçərişəhər Şirvanşahlar sarayı və Qız Qalası ilə birlikdə 2000-ci ildə UNESCO-nun Dünya İrsi siyahısına salınıb.",
    "The Maiden Tower (Qız Qalası) is the landmark of Baku's historic Old City (İçərişəhər). The Old City, with the Shirvanshahs' Palace and the Maiden Tower, became a UNESCO World Heritage Site in 2000.",
    "Девичья башня (Гыз галасы) — символ исторического Ичеришехера (Старого города) в Баку. Старый город с дворцом Ширваншахов и Девичьей башней внесён в список Всемирного наследия ЮНЕСКО в 2000 году.");
  F("Gobustan (Qobustan)", ["!qobustan", "!gobustan", "!kobustan", "!гобустан"],
    "Gobustan, Bakü’nün güneybatısında, 6.000’den fazla kaya resmiyle bilinen tarihî bir alandır; resimler yaklaşık 40.000 yıllık bir dönemi kapsar. 2007’de UNESCO Dünya Mirası oldu. Bölge çamur volkanlarıyla da ünlüdür.",
    "Qobustan Bakının cənub-qərbində, 6 000-dən çox qayaüstü təsvirlə tanınan tarixi ərazidir; təsvirlər təxminən 40 000 illik dövrü əhatə edir. 2007-ci ildə UNESCO Dünya İrsi olub. Ərazi palçıq vulkanları ilə də məşhurdur.",
    "Gobustan, southwest of Baku, is known for more than 6,000 rock carvings spanning roughly 40,000 years. It became a UNESCO World Heritage Site in 2007 and is also famous for its mud volcanoes.",
    "Гобустан, к юго-западу от Баку, известен более чем 6 000 наскальных изображений, охватывающих около 40 000 лет. В 2007 году внесён в список Всемирного наследия ЮНЕСКО; знаменит также грязевыми вулканами.");
  F("Hazar Denizi", ["!hazar denizi", "!xezer denizi", "!xezer", "!caspian", "!каспийск", "!kaspi"],
    "Hazar Denizi, yaklaşık 371.000 km² ile dünyanın en büyük kapalı su kütlesidir. Kıyıdaş ülkeler: Azerbaycan, Rusya, Kazakistan, Türkmenistan ve İran. Yüzeyi okyanus seviyesinin yaklaşık 28 m altındadır.",
    "Xəzər dənizi təxminən 371 000 km² sahəsi ilə dünyanın ən böyük qapalı su hövzəsidir. Sahilyanı ölkələr: Azərbaycan, Rusiya, Qazaxıstan, Türkmənistan və İran. Səthi okean səviyyəsindən təxminən 28 m aşağıdadır.",
    "The Caspian Sea, about 371,000 km², is the world's largest enclosed body of water. It borders Azerbaijan, Russia, Kazakhstan, Turkmenistan and Iran, and its surface lies about 28 m below ocean level.",
    "Каспийское море площадью около 371 000 км² — крупнейший в мире замкнутый водоём. Его берега принадлежат Азербайджану, России, Казахстану, Туркменистану и Ирану; уровень поверхности примерно на 28 м ниже уровня океана.");
  F("Bakü", ["!baku", "!bakinin", "!baki seher", "!about baku", "!баку"],
    "Bakü, Azerbaycan’ın başkenti ve en büyük şehridir; Hazar kıyısında, Abşeron Yarımadası’ndadır. Deniz seviyesinin yaklaşık 28 m altında olduğundan dünyanın en alçak başkentidir.",
    "Bakı Azərbaycanın paytaxtı və ən böyük şəhəridir; Xəzər sahilində, Abşeron yarımadasında yerləşir. Dəniz səviyyəsindən təxminən 28 m aşağıda olduğu üçün dünyanın ən alçaq paytaxtıdır.",
    "Baku is Azerbaijan's capital and largest city, on the Absheron Peninsula by the Caspian Sea. At about 28 m below sea level, it's the lowest-lying national capital in the world.",
    "Баку — столица и крупнейший город Азербайджана, на Апшеронском полуострове у Каспийского моря. Лежит примерно на 28 м ниже уровня моря и считается самой низкой столицей мира.");
  F("Fuzûlî (Füzuli)", ["!fuzuli", "!fizuli", "!физули", "!фузули"],
    "Fuzûlî (Mehmed Fuzûlî, y. 1494–1556), Azerbaycan Türkçesi, Farsça ve Arapça eserler veren büyük şairdir. En ünlü eseri “Leyla ile Mecnun”dur.",
    "Məhəmməd Füzuli (t. 1494–1556) Azərbaycan türkcəsində, fars və ərəb dillərində yazan böyük şairdir. Ən məşhur əsəri “Leyli və Məcnun”dur.",
    "Fuzuli (Muhammad Fuzuli, c. 1494–1556) was a great poet who wrote in Azerbaijani Turkic, Persian and Arabic. His best-known work is “Leyli and Majnun”.",
    "Физули (Мухаммед Физули, ок. 1494–1556) — великий поэт, писавший на азербайджанском, персидском и арабском языках. Самое известное произведение — «Лейли и Меджнун».");
  F("Nesimi", ["!nesimi", "!nasimi", "!насими"],
    "İmadeddin Nesimi (y. 1369–1417), Azerbaycan Türkçesiyle yazan ilk büyük şairlerdendir ve Hurufilik düşüncesinin temsilcisidir. Halep’te idam edildi.",
    "İmadəddin Nəsimi (t. 1369–1417) Azərbaycan türkcəsində yazan ilk böyük şairlərdəndir və hürufilik təliminin nümayəndəsidir. Hələbdə edam edilib.",
    "Imadaddin Nasimi (c. 1369–1417) was one of the first great poets to write in Azerbaijani Turkic and a follower of the Hurufi movement. He was executed in Aleppo.",
    "Имадеддин Насими (ок. 1369–1417) — один из первых великих поэтов, писавших на азербайджанском языке, последователь хуруфизма. Казнён в Алеппо.");
  F("Üzeyir Hacıbeyli", ["!uzeyir", "!hacibeyli", "!hacibeyov", "!узеир", "!гаджибеков"],
    "Üzeyir Hacıbeyli (1885–1948), Azerbaycanlı bestecidir. 1908’de sahnelenen “Leyli ve Mecnun”, Müslüman Doğu’nun ilk operası kabul edilir. Azerbaycan millî marşının müziği de onundur.",
    "Üzeyir Hacıbəyli (1885–1948) Azərbaycan bəstəkarıdır. 1908-ci ildə səhnəyə qoyulan “Leyli və Məcnun” müsəlman Şərqinin ilk operası sayılır. Azərbaycan Dövlət Himninin musiqisi də onundur.",
    "Uzeyir Hajibeyli (1885–1948) was an Azerbaijani composer. His “Leyli and Majnun” (1908) is considered the first opera of the Muslim East, and he wrote the music of Azerbaijan's national anthem.",
    "Узеир Гаджибеков (1885–1948) — азербайджанский композитор. Его «Лейли и Меджнун» (1908) считается первой оперой мусульманского Востока; он также автор музыки гимна Азербайджана.");
  F("Azerbaycan alfabesi", ["!azerbaycan elifba", "!azerbaycan alfabe", "!azerbaijani alphabet", "!азербайджанский алфавит"],
    "Azerbaycan Latin alfabesi 32 harften oluşur: 9 ünlü ve 23 ünsüz. Latin harflerine 1991’de yeniden geçildi.",
    "Azərbaycan latın əlifbası 32 hərfdən ibarətdir: 9 sait və 23 samit. Latın qrafikasına 1991-ci ildə yenidən keçilib.",
    "The Azerbaijani Latin alphabet has 32 letters: 9 vowels and 23 consonants. Azerbaijan returned to the Latin script in 1991.",
    "Азербайджанский латинский алфавит состоит из 32 букв: 9 гласных и 23 согласных. К латинице Азербайджан вернулся в 1991 году.");
  F("En uzun nehirler", ["!en uzun nehir", "!en uzun irmak", "!en uzun cay", "!longest river", "!самая длинная река", "!nil nehri", "!nile", "!amazon nehri", "!amazon river", "!нил", "!амазонк"],
    "Nil (yaklaşık 6.650 km) genellikle dünyanın en uzun nehri kabul edilir; bazı ölçümler Amazon’u daha uzun bulur. Amazon, taşıdığı su miktarıyla açık ara en büyük nehirdir.",
    "Nil (təxminən 6 650 km) adətən dünyanın ən uzun çayı sayılır; bəzi ölçmələrə görə Amazon daha uzundur. Su həcminə görə isə Amazon açıq-aydın ən böyük çaydır.",
    "The Nile (about 6,650 km) is usually listed as the world's longest river, though some measurements put the Amazon ahead. By volume of water, the Amazon is by far the largest.",
    "Нил (около 6 650 км) обычно считается самой длинной рекой мира, хотя по некоторым измерениям длиннее Амазонка. По объёму стока Амазонка — безусловно крупнейшая.");
  F("Sahra ve çöller", ["!sahra", "!sahara", "!en buyuk col", "!largest desert", "!сахара", "!самая большая пустыня", "!en boyuk sehra"],
    "Sahra, yaklaşık 9 milyon km² ile dünyanın en büyük sıcak çölüdür. Çöl, yağış azlığıyla tanımlandığı için en büyük çöl aslında Antarktika’dır.",
    "Sahara təxminən 9 milyon km² sahəsi ilə dünyanın ən böyük isti səhrasıdır. Səhra yağıntının azlığı ilə müəyyən edildiyi üçün ən böyük səhra əslində Antarktidadır.",
    "The Sahara, about 9 million km², is the world's largest hot desert. Because deserts are defined by low rainfall, the largest desert overall is actually Antarctica.",
    "Сахара площадью около 9 млн км² — крупнейшая жаркая пустыня мира. Поскольку пустыню определяет малое количество осадков, самая большая пустыня — это Антарктида.");
  F("İnsan kalbi", ["!kalp", "!kalbi", "!urek", "!heart", "!сердце"],
    "İnsan kalbi dört odacıklıdır (2 kulakçık, 2 karıncık). Dinlenme hâlinde yetişkinlerde genellikle dakikada 60–100 kez atar ve kanı tüm vücuda pompalar.",
    "İnsan ürəyi dörd kameralıdır (2 qulaqcıq, 2 mədəcik). Sakit vəziyyətdə böyüklərdə adətən dəqiqədə 60–100 dəfə döyünür və qanı bütün bədənə vurur.",
    "The human heart has four chambers (2 atria, 2 ventricles). At rest an adult's heart usually beats 60–100 times a minute, pumping blood around the body.",
    "Сердце человека четырёхкамерное (2 предсердия, 2 желудочка). В покое у взрослого оно обычно бьётся 60–100 раз в минуту, перекачивая кровь по всему телу.");
  F("Kan grupları", ["!kan grup", "!qan qrup", "!blood type", "!blood group", "!группа крови", "!группы крови"],
    "ABO sistemine göre dört kan grubu vardır: A, B, AB ve 0; Rh faktörüyle + ya da − olur. 0 Rh− genel verici (alyuvar için), AB Rh+ genel alıcı kabul edilir.",
    "ABO sisteminə görə dörd qan qrupu var: A, B, AB və 0; Rh faktoruna görə + və ya − olur. 0 Rh− universal donor (eritrositlər üçün), AB Rh+ universal resipiyent sayılır.",
    "In the ABO system there are four blood groups: A, B, AB and O, each Rh+ or Rh−. O− is the universal red-cell donor and AB+ the universal recipient.",
    "По системе AB0 выделяют четыре группы крови: 0, A, B и AB, каждая с резус-фактором + или −. 0(I) Rh− — универсальный донор эритроцитов, AB(IV) Rh+ — универсальный реципиент.");
  F("Periyodik tablo", ["!periyodik", "!periodic table", "!dovri sistem", "!dovri cedvel", "!mendeleyev", "!mendeleev", "!менделеев", "!периодическ"],
    "Periyodik tabloda bugün 118 element vardır. İlk biçimini 1869’da Dmitri Mendeleyev oluşturdu. 1. ve en hafif element hidrojendir (H).",
    "Dövri sistemdə bu gün 118 element var. İlk variantını 1869-cu ildə Dmitri Mendeleyev yaradıb. 1-ci və ən yüngül element hidrogendir (H).",
    "The periodic table has 118 known elements. Dmitri Mendeleev created its first version in 1869. Element number 1, and the lightest, is hydrogen (H).",
    "В периодической таблице сейчас 118 элементов. Первый вариант составил Дмитрий Менделеев в 1869 году. Элемент №1 и самый лёгкий — водород (H).");
  F("Atom", ["!atom", "!атом"],
    "Atom; çekirdekteki protonlar ve nötronlar ile çevresindeki elektronlardan oluşur. Proton sayısı (atom numarası) elementin hangisi olduğunu belirler.",
    "Atom nüvədəki protonlar və neytronlardan, ətrafındakı elektronlardan ibarətdir. Proton sayı (atom nömrəsi) elementin hansı olduğunu müəyyən edir.",
    "An atom is made of protons and neutrons in the nucleus, with electrons around it. The number of protons (the atomic number) decides which element it is.",
    "Атом состоит из ядра (протоны и нейтроны) и электронов вокруг него. Число протонов (атомный номер) определяет, какой это элемент.");
  F("Newton’un hareket yasaları", ["!newton", "!nyuton", "!ньютон", "!laws of motion", "!hareket yasa"],
    "Newton’un 3 hareket yasası: 1) Eylemsizlik: kuvvet uygulanmadıkça cisim durumunu korur. 2) F = m·a. 3) Her etkiye eşit ve zıt bir tepki vardır.",
    "Nyutonun 3 hərəkət qanunu: 1) Ətalət: qüvvə təsir etmədikcə cisim vəziyyətini saxlayır. 2) F = m·a. 3) Hər təsirə bərabər və əks əks-təsir var.",
    "Newton's three laws of motion: 1) Inertia: an object keeps its state unless a force acts on it. 2) F = m·a. 3) Every action has an equal and opposite reaction.",
    "Три закона Ньютона: 1) Инерция: тело сохраняет состояние, пока на него не действует сила. 2) F = m·a. 3) Действие равно противодействию.");
  F("Einstein ve görelilik", ["!einstein", "!eynsteyn", "!эйнштейн", "!gorelilik", "!nisbilik", "!relativity", "!относительност"],
    "Albert Einstein (1879–1955), 1905’te özel, 1915’te genel görelilik kuramını ortaya koydu. En bilinen formülü E = mc²’dir: kütle ile enerji eşdeğerdir. 1921 Nobel Fizik Ödülü’nü fotoelektrik etki çalışması için aldı.",
    "Albert Eynşteyn (1879–1955) 1905-ci ildə xüsusi, 1915-ci ildə ümumi nisbilik nəzəriyyəsini irəli sürüb. Ən məşhur düsturu E = mc²-dir: kütlə və enerji ekvivalentdir. 1921-ci il fizika üzrə Nobel mükafatını fotoeffekt işinə görə alıb.",
    "Albert Einstein (1879–1955) published special relativity in 1905 and general relativity in 1915. His best-known formula is E = mc²: mass and energy are equivalent. He received the 1921 Nobel Prize in Physics for his work on the photoelectric effect.",
    "Альберт Эйнштейн (1879–1955) создал специальную (1905) и общую (1915) теорию относительности. Самая известная формула — E = mc²: масса и энергия эквивалентны. Нобелевскую премию по физике за 1921 год получил за объяснение фотоэффекта.");
  F("Ses hızı", ["!ses hizi", "!sesin hizi", "!sesin sureti", "!speed of sound", "!скорость звука"],
    "Ses, 20 °C’deki havada saniyede yaklaşık 343 m yol alır (≈ 1.235 km/sa). Suda yaklaşık 1.480 m/s ile çok daha hızlıdır.",
    "Səs 20 °C-də havada saniyədə təxminən 343 m yol gedir (≈ 1 235 km/saat). Suda təxminən 1 480 m/san ilə daha sürətlidir.",
    "Sound travels about 343 m per second in air at 20 °C (≈ 1,235 km/h). In water it's much faster, about 1,480 m/s.",
    "Звук в воздухе при 20 °C проходит около 343 м/с (≈ 1 235 км/ч). В воде он гораздо быстрее — около 1 480 м/с.");
  F("Gökkuşağı", ["!gokkusag", "!goy qursag", "!rainbow", "!радуг"],
    "Gökkuşağı, güneş ışığının yağmur damlalarında kırılıp yansımasıyla oluşur. Geleneksel olarak 7 renk sayılır: kırmızı, turuncu, sarı, yeşil, mavi, lacivert ve mor.",
    "Göy qurşağı günəş işığının yağış damcılarında sınıb əks olunması ilə yaranır. Ənənəvi olaraq 7 rəng sayılır: qırmızı, narıncı, sarı, yaşıl, mavi, göy və bənövşəyi.",
    "A rainbow forms when sunlight is refracted and reflected inside raindrops. Traditionally it has 7 colours: red, orange, yellow, green, blue, indigo and violet.",
    "Радуга возникает, когда солнечный свет преломляется и отражается в каплях дождя. Традиционно в ней 7 цветов: красный, оранжевый, жёлтый, зелёный, голубой, синий и фиолетовый.");
  F("Mevsimler", ["!mevsim", "!fesiller", "!ilin fesil", "!seasons", "!времена года"],
    "Mevsimler, Dünya’nın ekseninin yaklaşık 23,4° eğik olmasından oluşur; Güneş’e uzaklığın değişmesinden değil. Kuzey Yarım Küre’de yaz yaşanırken güneyde kış olur.",
    "Fəsillər Yer oxunun təxminən 23,4° maili olmasından yaranır, Günəşə məsafənin dəyişməsindən yox. Şimal yarımkürəsində yay olanda cənubda qış olur.",
    "Seasons happen because Earth's axis is tilted about 23.4°, not because our distance from the Sun changes. When it's summer in the Northern Hemisphere, it's winter in the Southern.",
    "Времена года возникают из-за наклона земной оси примерно на 23,4°, а не из-за изменения расстояния до Солнца. Когда в Северном полушарии лето, в Южном — зима.");
  F("Dünya gezegeni", ["!dunyanin yasi", "!dunya kac yasinda", "!yerin yasi", "!age of the earth", "!planet earth", "!возраст земли", "!dunyanin capi"],
    "Dünya yaklaşık 4,54 milyar yaşındadır. Ortalama yarıçapı yaklaşık 6.371 km’dir; kendi ekseni etrafında yaklaşık 24 saatte, Güneş’in etrafında yaklaşık 365,25 günde döner.",
    "Yer təxminən 4,54 milyard yaşındadır. Orta radiusu təxminən 6 371 km-dir; öz oxu ətrafında təxminən 24 saata, Günəş ətrafında təxminən 365,25 günə fırlanır.",
    "Earth is about 4.54 billion years old. Its mean radius is about 6,371 km; it spins once in about 24 hours and orbits the Sun in about 365.25 days.",
    "Земле около 4,54 млрд лет. Средний радиус — около 6 371 км; оборот вокруг оси занимает около 24 часов, вокруг Солнца — около 365,25 суток.");
  F("Güneş", ["!gunes nedir", "!gunes hakkinda", "!gunes haqqinda", "!the sun", "!about the sun", "!солнце"],
    "Güneş, Güneş Sistemi’nin merkezindeki yıldızdır ve yaklaşık 4,6 milyar yaşındadır. Işığı Dünya’ya yaklaşık 8 dakika 20 saniyede ulaşır. Sistemdeki kütlenin %99’dan fazlası Güneş’tedir.",
    "Günəş Günəş sisteminin mərkəzindəki ulduzdur və təxminən 4,6 milyard yaşındadır. İşığı Yerə təxminən 8 dəqiqə 20 saniyəyə çatır. Sistemdəki kütlənin 99%-dən çoxu Günəşdədir.",
    "The Sun is the star at the centre of the Solar System, about 4.6 billion years old. Its light reaches Earth in about 8 minutes 20 seconds, and it holds more than 99% of the system's mass.",
    "Солнце — звезда в центре Солнечной системы, ему около 4,6 млрд лет. Его свет доходит до Земли примерно за 8 минут 20 секунд; в нём сосредоточено более 99% массы системы.");
  F("Mars", ["!mars gezegen", "!mars planet", "!planet mars", "!kizil gezegen", "!qirmizi planet", "!red planet", "!красная планета", "!планета марс"],
    "Mars, Güneş’e uzaklıkta 4. gezegendir. Yüzeyindeki demir oksit nedeniyle kırmızı görünür, bu yüzden “Kızıl Gezegen” denir. İki küçük uydusu vardır: Phobos ve Deimos. Güneş Sistemi’nin en yüksek yanardağı Olympus Mons buradadır.",
    "Mars Günəşə məsafəyə görə 4-cü planetdir. Səthindəki dəmir oksidi səbəbindən qırmızı görünür, ona görə “Qırmızı planet” adlanır. İki kiçik peyki var: Fobos və Deymos. Günəş sisteminin ən hündür vulkanı Olimp dağı buradadır.",
    "Mars is the 4th planet from the Sun. Iron oxide on its surface makes it look red, hence “the Red Planet”. It has two small moons, Phobos and Deimos, and hosts Olympus Mons, the tallest volcano in the Solar System.",
    "Марс — четвёртая планета от Солнца. Из-за оксида железа на поверхности выглядит красным, поэтому его называют «Красной планетой». У него два маленьких спутника — Фобос и Деймос; здесь находится гора Олимп, самый высокий вулкан Солнечной системы.");
  F("İnternet ve Web", ["!internet nedir", "!what is the internet", "!world wide web", "!www", "!что такое интернет"],
    "İnternet, bilgisayarları dünya çapında birbirine bağlayan ağlar ağıdır. Web (World Wide Web) ise internet üzerinde çalışan bir hizmettir; 1989’da CERN’de Tim Berners-Lee tarafından önerildi.",
    "İnternet kompüterləri bütün dünyada bir-birinə bağlayan şəbəkələr şəbəkəsidir. Veb (World Wide Web) isə internet üzərində işləyən xidmətdir; 1989-cu ildə CERN-də Tim Berners-Li tərəfindən təklif edilib.",
    "The internet is a worldwide network of networks connecting computers. The Web (World Wide Web) is a service that runs on it, proposed by Tim Berners-Lee at CERN in 1989.",
    "Интернет — всемирная сеть сетей, соединяющая компьютеры. Веб (World Wide Web) — служба, работающая поверх него; её предложил Тим Бернерс-Ли в ЦЕРН в 1989 году.");
  F("Algoritma", ["!algoritm", "!alqoritm", "!algorithm", "!алгоритм"],
    "Algoritma, bir problemi çözmek için izlenen sonlu ve açık adımlar dizisidir. Adı, 9. yüzyıl matematikçisi el-Harezmî’den gelir.",
    "Alqoritm problemi həll etmək üçün izlənən sonlu və aydın addımlar ardıcıllığıdır. Adı IX əsr riyaziyyatçısı əl-Xarəzminin adından gəlir.",
    "An algorithm is a finite, clear sequence of steps for solving a problem. The word comes from the 9th-century mathematician al-Khwarizmi.",
    "Алгоритм — конечная и чёткая последовательность шагов для решения задачи. Слово происходит от имени математика IX века аль-Хорезми.");
  F("Bilgisayarın parçaları", ["!islemci", "!cpu", "!ram nedir", "!what is ram", "!processor", "!prosessor", "!процессор", "!оперативн"],
    "İşlemci (CPU) komutları yürütür; RAM, çalışan programların geçici belleğidir ve cihaz kapanınca silinir; depolama (SSD/HDD) dosyaları kalıcı olarak saklar.",
    "Prosessor (CPU) əmrləri yerinə yetirir; RAM işləyən proqramların müvəqqəti yaddaşıdır və cihaz sönəndə silinir; yaddaş qurğusu (SSD/HDD) faylları daimi saxlayır.",
    "The processor (CPU) executes instructions; RAM is short-term memory for running programs and is cleared when the device turns off; storage (SSD/HDD) keeps files permanently.",
    "Процессор (CPU) выполняет команды; оперативная память (RAM) временно хранит данные запущенных программ и очищается при выключении; накопитель (SSD/HDD) хранит файлы постоянно.");
  F("Olimpiyat Oyunları", ["!olimpiya", "!olympic", "!олимпийск", "!олимпиад"],
    "Modern Olimpiyat Oyunları ilk kez 1896’da Atina’da düzenlendi; Pierre de Coubertin öncülük etti. Yaz ve Kış Olimpiyatları her biri dört yılda bir, aralarında iki yıl olacak şekilde yapılır.",
    "Müasir Olimpiya Oyunları ilk dəfə 1896-cı ildə Afinada keçirilib; təşəbbüskarı Pyer de Kuberten olub. Yay və Qış Olimpiadaları hər biri dörd ildən bir, aralarında iki il fərqlə keçirilir.",
    "The modern Olympic Games were first held in Athens in 1896, led by Pierre de Coubertin. The Summer and Winter Games each take place every four years, two years apart.",
    "Современные Олимпийские игры впервые прошли в Афинах в 1896 году по инициативе Пьера де Кубертена. Летние и зимние Игры проводятся раз в четыре года каждые, с разницей в два года.");
  F("Leonardo da Vinci", ["!leonardo", "!da vinci", "!mona lisa", "!леонардо", "!мона лиза", "!джоконд"],
    "Leonardo da Vinci (1452–1519) İtalyan ressam, mucit ve bilim insanıdır. En ünlü eserleri Mona Lisa ve Son Akşam Yemeği’dir.",
    "Leonardo da Vinçi (1452–1519) italyan rəssam, ixtiraçı və alimdir. Ən məşhur əsərləri “Mona Liza” və “Son şam yeməyi”dir.",
    "Leonardo da Vinci (1452–1519) was an Italian painter, inventor and scientist. His most famous works are the Mona Lisa and The Last Supper.",
    "Леонардо да Винчи (1452–1519) — итальянский художник, изобретатель и учёный. Самые известные работы — «Мона Лиза» и «Тайная вечеря».");
  F("Shakespeare", ["!shakespeare", "!sekspir", "!шекспир"],
    "William Shakespeare (1564–1616) İngiliz oyun yazarı ve şairdir; Hamlet, Romeo ve Juliet, Othello ve Macbeth en bilinen eserlerindendir.",
    "Uilyam Şekspir (1564–1616) ingilis dramaturqu və şairidir; “Hamlet”, “Romeo və Cülyetta”, “Otello” və “Makbet” ən məşhur əsərlərindəndir.",
    "William Shakespeare (1564–1616) was an English playwright and poet; Hamlet, Romeo and Juliet, Othello and Macbeth are among his best-known works.",
    "Уильям Шекспир (1564–1616) — английский драматург и поэт; среди самых известных его пьес — «Гамлет», «Ромео и Джульетта», «Отелло» и «Макбет».");
  F("Vitaminler", ["!vitamin", "!витамин"],
    "Vitaminler vücudun az miktarda ihtiyaç duyduğu besin öğeleridir. Örneğin C vitamini (turunçgiller, biber) bağışıklığa, D vitamini (güneş ışığı, balık) kemik sağlığına, A vitamini (havuç) göz sağlığına katkı sağlar.",
    "Vitaminlər orqanizmin az miqdarda ehtiyac duyduğu qida maddələridir. Məsələn, C vitamini (sitrus meyvələri, bibər) immunitetə, D vitamini (günəş işığı, balıq) sümük sağlamlığına, A vitamini (yerkökü) gözə faydalıdır.",
    "Vitamins are nutrients the body needs in small amounts. For example, vitamin C (citrus, peppers) supports immunity, vitamin D (sunlight, fish) supports bones, and vitamin A (carrots) supports eyesight.",
    "Витамины — вещества, нужные организму в небольших количествах. Например, витамин C (цитрусовые, перец) поддерживает иммунитет, витамин D (солнечный свет, рыба) — кости, витамин A (морковь) — зрение.");
  F("Su döngüsü", ["!su dongusu", "!su dovrani", "!water cycle", "!круговорот воды"],
    "Su döngüsü: Güneş’in ısısıyla su buharlaşır, bulut olarak yoğunlaşır, yağmur ya da kar olarak yağar; nehirler, göller, okyanuslar ve yer altı suları yoluyla yeniden toplanır.",
    "Suyun dövranı: Günəşin istisi ilə su buxarlanır, bulud kimi kondensasiya olunur, yağış və ya qar kimi yağır; çaylar, göllər, okeanlar və yeraltı sular vasitəsilə yenidən toplanır.",
    "The water cycle: the Sun's heat evaporates water, it condenses into clouds, falls as rain or snow, and collects again in rivers, lakes, oceans and groundwater.",
    "Круговорот воды: под действием солнечного тепла вода испаряется, конденсируется в облака, выпадает дождём или снегом и снова собирается в реках, озёрах, океанах и подземных водах.");

  return KB;
});
