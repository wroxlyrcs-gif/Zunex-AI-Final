# Zunex AI

Tarayıcıda **tamamen yerel** çalışan Türkçe asistan. API anahtarı, sunucu, abonelik veya internet bağlantısı gerekmez. Yazdıkların hiçbir yere gönderilmez.

## Dürüst bir not
Zunex AI büyük bir yapay zekâ modeli **değildir**. Kurallar, küçük bir bilgi tabanı ve bir hesap motoruyla çalışır. Bilmediği şeyi bilmediğini söyler; tahmin yürütmez. Fotoğrafların içeriğini göremez (yalnızca boyut bilgisini verir).

## 1.1 notları
- Dört dil: Azerbaycan Türkçesi, Türkiye Türkçesi, İngilizce, Rusça. Dil her mesajda yazıdan algılanır; cevap o dilde verilir.
- Matematik: kelimeli işlemler (4 dilde), yüzde, kesir (+ − ×), tek bilinmeyenli 1. ve 2. derece denklem, daire/kare/dikdörtgen/üçgen alan-çevre. Bunlar gerçek hesaplamadır; hazır cevap değildir.
- Bilgi bankası bu sürümde **başlangıç düzeyindedir** (tüm konular için tam kapsam yoktur). Çok dilli kayıtlar: Azerbaycan Halk Cumhuriyeti, Osmanlı, II. Dünya Savaşı, suyun formülü, futbol, gezegenler, Nizami; 10 ülkenin başkenti 4 dilde. Eski kayıtlar yalnızca Türkçedir ve başka dilde sorulursa bu belirtilir.
- Bilgi bankasında olmayan sorulara “bilmiyorum / offline bilgi bankasında yok” denir.
- Dosya özetleri şimdilik yalnızca Türkçedir.

## 1.2 notları
- **Dünya saatleri**: 20 şehir/ülke için gerçek saat dilimi hesabı (“Tokyo’da saat kaç?”, “dünya saatleri”, “saat dilimi nedir”). Cihaz saatinden hesaplanır, internet gerekmez.
- **Çeviri**: “…” İngilizceye/Rusçaya/Azerbaycancaya/Türkçeye çevir. Yerel söz-cümle defteri (selamlaşma, atasözü, günlük ifadeler) ve ~55 kelimelik sözlük; kapsamı sınırlıdır, olmayanı bilmediğini söyler.
- **Matematik**: polinom türev/integral eklendi (“türev x^3+2x”).
- **Azerbaycan tarihi**: genel bakış, Şirvanşahlar/Atropatena, Sovyet dönemi–bağımsızlık–Karabağ (4 dilde).

## 1.3 notları
- **Ülke coğrafyası:** 40 ülke için yüzölçümü, yaklaşık nüfus, kıta (+ bazılarında en yüksek nokta), 4 dilde. Örnek: “Japonya hangi kıtada?”, “Brezilya’nın yüzölçümü”, “Azerbaycan coğrafyası”. Nüfuslar yuvarlaktır ve güncel olmayabilir.

## 1.4 notları (tamamen çevrimdışı)
- **Notlar:** “Not al: …”, “notlarım”, “notu sil 2”, “notları sil”. Cihazda saklanır, “Sohbeti temizle” notları silmez.
- **Zamanlayıcı / hatırlatıcı:** “10 dakika zamanlayıcı”, “saat 18:30’da hatırlat: toplantı”, “zamanlayıcıyı iptal et”. Ses + titreşim + bildirim; uygulama kapalıyken dolarsa açılışta hatırlatır.
- **Tarih:** kaç gün kaldı/geçti, iki tarih arası, yaş hesabı, haftanın günü, “100 gün sonra”, artık yıl.
- **Gelişmiş birim çevirici:** uzunluk, ağırlık, hacim, alan (dönüm, hektar), hız, veri (KB–TB), süre, sıcaklık; bileşik değerler (“2 saat 30 dakika kaç dakika”).
- **Para:** indirim, KDV/ƏDV/VAT/НДС ekleme-çıkarma, kredi taksiti (yıllık/aylık faiz).
- **VKİ**, **şifre / PIN üretici** (cihazın güvenli rastgele sayı üreteciyle), **sayı tabanları**, **Roma rakamları**, **sayıyı yazıya çevirme** (4 dil).
- **Metin araçları:** kelime say, büyük/küçük harf, ters çevir, palindrom, sırala (“komut: metin”).
- **Oyunlar:** başkentler yarışması ve matematik testi (10 soru, skor).
- **Bilgi bankası:** 58 → 90 konu; eski Türkçe-only kayıtlar 4 dile çevrildi; Nevruz, Muğam, İçerişehir, Gobustan, Hazar, Füzuli, Nesimi, Üzeyir Hacıbeyli, bilim ve teknoloji konuları eklendi.
- **Arayüz:** cihaz diline göre (tr/az/en/ru), tema düğmesi (otomatik/koyu/açık), mesaj kopyalama, sesli okuma, sohbeti .txt olarak dışa aktarma, temizlemeden önce onay.
- **Gizlilik:** `privacy.html` (Google Play için gizlilik politikası sayfası). Ağ çağrısı yok, API anahtarı yok, veri toplanmaz.

## Google Play için
1. Bu dosyaları GitHub deposuna yükle (eski dosyaların üzerine yaz) ve GitHub Pages’in güncellenmesini bekle.
2. PWABuilder’da Android paketini **yeniden** oluştur. **Yeni bir imzalama anahtarı** kullan; eski paketteki anahtar ve parolalar paylaşıldığı için güvensiz sayılmalı.
3. `assetlinks.json` dosyasını yeni anahtarın parmak iziyle `https://KULLANICI.github.io/.well-known/assetlinks.json` adresine koy (kullanıcı sitesi deposu gerekir), yoksa uygulamada adres çubuğu görünür.
4. Play Console’a **.aab** yükle. Gizlilik politikası adresi: `https://KULLANICI.github.io/Zunex-Ai-/privacy.html`. Veri güvenliği formunda “veri toplanmıyor / paylaşılmıyor” seçilebilir.
5. Anahtar dosyalarını (`*.keystore`, `signing-key-info.txt`) asla depoya koyma; `.gitignore` bunu engeller.

## Neler yapar
- Hesap: `(12+8)*3`, `karekök 144`, `2^10`, `7!`, `sin(30)`, `200’ün yüzde 15’i`, `10 bölü 4`
- Birim çevirme: °C↔°F, km↔mil, kg↔lb, m↔ft
- `29 asal mı?`, saat, tarih (cihaz saatine göre), zar, yazı-tura, rastgele sayı
- Ülke başkentleri ve “peki ya Japonya?” gibi takip soruları
- Bilgi tabanı: Atatürk, gezegenler, ışık hızı, DNA, HTML/CSS/JS/Python vb. (“Neler biliyorsun?” yaz)
- Hafıza: sohbet geçmişi ve adın tarayıcıda (localStorage) saklanır; “Sohbeti temizle” hepsini siler
- Dosya: .txt/.md/.csv/.json/kod dosyaları için satır, kelime, sık kelimeler, JSON/CSV yapısı; fotoğraf için boyut bilgisi

## GitHub Pages'te yayınlama
1. GitHub'da yeni bir depo aç (ör. `zunex-ai`).
2. Bu klasördeki **tüm dosyaları** deponun köküne yükle (`index.html`, `assistant.js`, `knowledge.js`, `manifest.json`, `sw.js`, `icon.svg`, `.nojekyll`).
3. Depoda **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` ve `/ (root)` → Save.
4. Bir dakika sonra `https://KULLANICI.github.io/zunex-ai/` adresinde açılır. Tüm yollar göreli olduğu için alt klasör adresinde de çalışır.

Yerelde denemek: `index.html` dosyasını çift tıkla ya da `python3 -m http.server` çalıştır.

## Bilgi eklemek
`knowledge.js` içindeki `facts` listesine `{ t: "Başlık", k: ["!anahtar"], a: "Cevap" }` ekle. Anahtarlar küçük harf ve Türkçe karaktersiz yazılır (`ğ→g`, `ı→i`…). `!` önekli anahtar tek başına eşleşme sağlar.

## Test
`node test.js` (Node 18+) motoru ve dosyaları denetler (1.4: 254 test): hesap, bilgi, dosya özeti, yasak ifade (API/proxy) ve ağ çağrısı kontrolleri.

## Android uygulaması (APK)
GitHub Pages'e yükledikten sonra https://www.pwabuilder.com adresine site adresini yaz ve Android paketini indir.
