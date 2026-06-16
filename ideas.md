# Türkçe Tiyatro Davetiye Sitesi — Tasarım Fikirleri

## Genel Bağlam
Orijinal site; kırmızı kadife perde açılışı, kazıma (scratch) etkileşimi, geri sayım sayacı, menü, kıyafet kodu, hediye ve ulaşım bölümleri ile RSVP formu içeren bir düğün davetiyesidir. Tüm animasyonlar (Framer Motion) korunacak, içerikler Türkçeye çevrilecektir.

---

<response>
<probability>0.07</probability>
<text>

## Fikir 1 — "Kadife Gece" (Opulent Baroque Revival)

**Design Movement:** Neo-Baroque / Opulent Theatre Aesthetic  
**Core Principles:**
1. Derin kırmızı ve altın renk paleti — tiyatro sahnesinin özgün renkleri
2. Serif tipografi ağırlıklı, el yazısı aksanları ile zenginleştirilmiş
3. Simetrik düzen, merkezi odak noktaları
4. Yoğun doku ve derinlik — kadife, altın varak efektleri

**Color Philosophy:** Koyu bordo (#6B0F1A), derin kırmızı (#8B1A1A), altın (#C9A84C), krem (#F5EDD6). Tiyatronun sahne ışıklarını ve kadife perdelerini çağrıştıran sıcak, lüks bir palet.

**Layout Paradigm:** Tam ekran dikey kaydırma; her bölüm kendi sahnesini oluşturur. Perde açılışı giriş animasyonu, ardından bölümler arası yumuşak geçişler.

**Signature Elements:**
- Altın çizgi dekoratif ayırıcılar
- Perde dokusu arka planlar
- Oval çerçeveli görseller

**Interaction Philosophy:** Her tıklama bir sahne geçişi gibi hissettirir. Kazıma etkileşimi altın folyo efektiyle.

**Animation:** Framer Motion ile perde açılışı (scaleY), bölüm girişlerinde fadeIn + slideUp (0.6s ease-out), sayaç rakamları için flip animasyonu.

**Typography System:** Cormorant Garamond (başlıklar, 48-72px) + Lato (gövde metni, 16px). Başlıklarda letter-spacing: 0.05em.

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Fikir 2 — "Modern Sahne" (Contemporary Minimalist Theatre)

**Design Movement:** Contemporary Minimalism with Theatrical Accents  
**Core Principles:**
1. Siyah-beyaz kontrastı, tek renk aksanı (altın/kırmızı)
2. Bol beyaz alan, nefes alan düzen
3. Güçlü tipografik hiyerarşi
4. Geometrik şekiller ve keskin çizgiler

**Color Philosophy:** Saf siyah (#0A0A0A), kırık beyaz (#F8F5F0), tek aksant rengi olarak sahne altını (#D4AF37). Minimalist ama dramatik.

**Layout Paradigm:** Asimetrik grid, metinler sola hizalı, görseller sağda büyük. Her bölüm farklı bir sahne konfigürasyonu.

**Signature Elements:**
- İnce yatay çizgiler (1px altın)
- Büyük rakam tipografisi (geri sayım)
- Negatif alan kullanımı

**Interaction Philosophy:** Hover efektleri minimal ama kesin. Kazıma etkileşimi siyah-beyaz kontrast ile.

**Animation:** Hızlı, keskin geçişler (0.3s). Bölüm girişlerinde clip-path reveal animasyonları.

**Typography System:** Playfair Display (başlıklar) + Source Sans Pro (gövde). Kontrast ağırlık kullanımı.

</text>
</response>

<response>
<probability>0.08</probability>
<text>

## Fikir 3 — "Altın Perde" (Gilded Art Deco)

**Design Movement:** Art Deco / 1920s Theatre Glamour  
**Core Principles:**
1. Art Deco geometrik motifler ve simetri
2. Altın, siyah ve krem renk üçlüsü
3. Dekoratif çerçeveler ve rozet desenleri
4. Lüks ama yapılandırılmış düzen

**Color Philosophy:** Derin siyah (#1A1008), zengin altın (#C8973A), krem (#F2E8D5), aksan kırmızısı (#8B1A1A). 1920'lerin tiyatro afişlerinden ilham alınmış.

**Layout Paradigm:** Merkezi dikey eksen, simetrik bölümler. Her bölüm kendi dekoratif çerçevesi içinde.

**Signature Elements:**
- Art Deco geometrik ayırıcılar
- Altın çerçeve efektleri
- Rozet ve yelpaze motifleri

**Interaction Philosophy:** Her etkileşim zarif ve ağır. Kazıma altın folyo efektiyle.

**Animation:** Yavaş, ağırbaşlı geçişler (0.8s ease-in-out). Bölüm girişlerinde scale + fade kombinasyonu.

**Typography System:** Cinzel Decorative (başlıklar) + EB Garamond (gövde). Büyük harf başlıklar, geniş letter-spacing.

</text>
</response>

---

## Seçilen Yaklaşım: Fikir 1 — "Kadife Gece"

Orijinal sitenin kırmızı kadife perde estetiğine en sadık yaklaşım. Baroque revival, tiyatronun özgün ruhunu yansıtıyor. Framer Motion animasyonları bu estetikle mükemmel uyum sağlıyor.
