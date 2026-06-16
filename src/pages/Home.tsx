/**
 * TASARIM: "Kadife Gece" — Neo-Baroque Theatre
 * Renk: Bordo (#6B0F1A), Kırmızı (#8B1A1A), Altın (#C9A84C), Krem (#F5EDD6)
 * Tipografi: Cormorant Garamond (başlık) + Lato (gövde)
 * Animasyon: Framer Motion — perde açılışı, kazıma, geri sayım, scroll reveal
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Varlık URL'leri ──────────────────────────────────────────────────────────
const ASSETS = {
  curtainClosed: "/manus-storage/curtain-closed-Bpkadld4_932d5ea4.jpg",
  curtainOpen: "/manus-storage/curtain-open-C9MqdT6G_d6b7288c.jpg",
  curtainVideo: "/manus-storage/curtain-video-BAKLj3Y5_d490087e.mp4",
  venueIllustration: "/manus-storage/venue-illustration-DebdGS8I_12bf673d.png",
  menuFrame: "/manus-storage/menu-frame-BFE5kCs7_1cc80025.png",
  dresscode: "/manus-storage/dresscode-illustration-BT5yPEQh_2dc1a716.png",
  giftIcon: "/manus-storage/gift-icon-BssCdzah_0a8b67be.png",
  scratchGold: "/manus-storage/scratch-gold-DQrdz0lH_363992f9.png",
  watermark: "/manus-storage/watermark-CS4rvcxG_8e93809a.png",
};

// ─── Türkçe Metinler ──────────────────────────────────────────────────────────
const TR = {
  intro: {
    tapToContinue: "Devam etmek için dokunun",
  },
  reveal: {
    title: "Keşfet",
    subtitle: "Tarihi öğrenmek için kazıyın",
    scratchHint: "Devam etmek için üç daireyi de kazıyın",
    weddingAnnouncement: "Evleniyoruz!",
  },
  countdown: {
    title: "Geri Sayım",
    days: "Gün",
    hours: "Saat",
    minutes: "Dak",
    seconds: "Sn",
    forTheBigDay: "büyük güne kalan",
  },
  saveTheDate: {
    celebrationAt: "Kutlama şu adreste gerçekleşecektir",
    extraBadge: "Ekstra: mekanınızın özel illüstrasyonu",
    receptionToFollow: "Ardından Resepsiyon",
  },
  menu: {
    winesTitle: "Tenuta Şarapları",
    courses: [
      { name: "Aperitif", desc1: "Toskana antipasti seçkisi", desc2: "Bruschetta, crostini & affettati misti" },
      { name: "Birinci Yemek", desc1: "Norcia siyah trüflü risotto", desc2: "24 aylık parmigiano reggiano ile" },
      { name: "Ana Yemek", desc1: "Izgara dana fileto", desc2: "Kırmızı şarap sosu ve mevsim sebzeleri ile" },
      { name: "Tatlı", desc1: "Mascarpone kremalı düğün pastası", desc2: "ve taze orman meyveleri ile" },
    ],
  },
  dressCode: {
    title: "Kıyafet Kodu",
    description: "Bu özel günü bizimle kutlamak için şık ve resmi giyinmenizi rica ediyoruz.",
    formal: "Resmi Kıyafet",
    avoidWhite: "Lütfen beyaz giymekten kaçının",
  },
  gifts: {
    weddingList: "Düğün listesi",
    title: "Hediyeler",
    message: "Varlığınız alabileceğimiz en güzel hediyedir. Ancak yeni hayatımıza katkıda bulunmak isterseniz banka havalesi ile yapabilirsiniz.",
    withLove: "Tüm sevgimizle",
    bankDetails: "Banka bilgileri",
    accountHolder: "HESAP SAHİBİ: SAM & SOFİA",
    iban: "IBAN: TR00 0000 0000 0000 0000 0000 00",
    reference: "AÇIKLAMA: Sam & Sofia Düğünü",
  },
  transport: {
    howToGet: "Nasıl Gelinir",
    title: "Ulaşım",
    description: "Kutlamayı endişesizce yaşayabilmeniz için Floransa merkezinden villaya otobüs düzenledik.",
    departure: "Otobüs kalkışı",
    location: "Piazza della Signoria",
    departureTime: "16:00",
    returnTitle: "Floransa'ya dönüş",
    returnTime: "02:00",
    rsvpNote: "Ulaşıma ihtiyaç duyuyorsanız lütfen RSVP'de belirtin",
  },
  rsvp: {
    title: "Katılımınızı Onaylayın",
    formNote: "Bu form ihtiyaçlarınıza göre tamamen özelleştirilebilir",
    fullName: "Ad Soyad *",
    email: "E-posta (isteğe bağlı)",
    attending: "Katılacak mısınız? *",
    yesButton: "Evet, orada olacağım!",
    noButton: "Hayır, katılamıyorum",
    messageLabel: "Çifte mesajınız (isteğe bağlı)",
    messagePlaceholder: "Birkaç kelime yazın...",
    namePlaceholder: "Adınız",
    submit: "Onayla",
    submitting: "Gönderiliyor...",
    thanks: "Teşekkürler!",
    confirmation: "Onayınızı aldık. Yakında görüşürüz!",
  },
  thankYou: {
    title: "Teşekkürler",
    message: "Bu özel günde bizimle olduğunuz için. Varlığınız alabileceğimiz en güzel hediyedir.",
  },
  venue: {
    name: "Villa Medicea di Artimino",
    address: "Via di Papa Leone X, 28",
    city: "Artimino, Floransa",
    date: "10 Eylül 2027",
  },
  coupleNames: "Sam & Sofia",
};

// ─── Yardımcı: Geri Sayım ────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetRef = useRef(targetDate.getTime());
  
  useEffect(() => {
    const calc = () => {
      const diff = targetRef.current - Date.now();
      if (diff <= 0) { 
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); 
        return; 
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  
  return timeLeft;
}

// ─── Animasyon Varyantları ───────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

// ─── Altın Ayırıcı ────────────────────────────────────────────────────────────
function GoldDivider({ wide = false }: { wide?: boolean }) {
  return (
    <div style={{
      width: wide ? 160 : 80, height: 1,
      background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
      margin: "1rem auto",
    }} />
  );
}

// ─── Kazıma Bileşeni ─────────────────────────────────────────────────────────
function ScratchCard({ revealed, onReveal, index }: { revealed: boolean; onReveal: (i: number) => void; index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const revealedRef = useRef(false);
  const scratchCountRef = useRef(0);
  const dateLabels = ["10", "Eyl", "2027"];
  const fontSizes = [28, 22, 18];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = ASSETS.scratchGold;
    img.onload = () => { 
      try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      } catch (err) {
        ctx.fillStyle = "#C9A84C";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    img.onerror = () => {
      ctx.fillStyle = "#C9A84C";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * (canvas.width / rect.width),
        y: (e.touches[0].clientY - rect.top) * (canvas.height / rect.height),
      };
    }
    return {
      x: ((e as React.MouseEvent<HTMLCanvasElement>).clientX - rect.left) * (canvas.width / rect.width),
      y: ((e as React.MouseEvent<HTMLCanvasElement>).clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching || revealedRef.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    
    scratchCountRef.current++;
    
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] < 128) transparent++;
      }
      const p = (transparent / (canvas.width * canvas.height)) * 100;
      if (p > 55 && !revealedRef.current) {
        revealedRef.current = true;
        onReveal(index);
      }
    } catch (err) {
      if (scratchCountRef.current > 15 && !revealedRef.current) {
        revealedRef.current = true;
        onReveal(index);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-2">
      <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--theatre-cream)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          borderRadius: "50%", border: "2px solid var(--theatre-gold)",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: fontSizes[index], fontWeight: 500,
            color: "var(--theatre-dark-red)", lineHeight: 1,
          }}>
            {dateLabels[index]}
          </span>
        </div>
        {!revealed && (
          <canvas
            ref={canvasRef}
            width={100} height={100}
            className="scratch-canvas"
            style={{ position: "absolute", inset: 0, borderRadius: "50%", cursor: "crosshair", touchAction: "none" }}
            onMouseDown={() => setIsScratching(true)}
            onMouseUp={() => setIsScratching(false)}
            onMouseLeave={() => setIsScratching(false)}
            onMouseMove={scratch}
            onTouchStart={() => setIsScratching(true)}
            onTouchEnd={() => setIsScratching(false)}
            onTouchMove={scratch}
          />
        )}
        {revealed && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid var(--theatre-gold)" }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Perde Girişi ─────────────────────────────────────────────────────────────
function CurtainIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [nearEnd, setNearEnd] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = ASSETS.curtainOpen;
  }, []);

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("playing");
    videoRef.current?.play();
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.duration - v.currentTime <= 4 && !nearEnd) setNearEnd(true);
  };

  const handleEnded = () => {
    setPhase("done");
    onComplete();
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden cursor-pointer"
      onClick={handleClick}
      style={{ background: "#1a0a0a" }}
    >
      {phase === "idle" && (
        <>
          <img src={ASSETS.curtainClosed} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.9, 0.3, 0.9, 0.3, 0] }}
            transition={{ duration: 5, delay: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute rounded-full border-2"
                style={{ width: 64, height: 64, borderColor: "rgba(201,168,76,0.5)" }}
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(201,168,76,0.15)", border: "2px solid rgba(201,168,76,0.5)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                  <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(201,168,76,0.9)", fontSize: 18,
              letterSpacing: "0.2em", marginTop: 20, textTransform: "uppercase",
            }}>
              {TR.intro.tapToContinue}
            </p>
          </motion.div>
        </>
      )}

      <video
        ref={videoRef}
        src={ASSETS.curtainVideo}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: phase !== "idle" ? "block" : "none" }}
      />

      <AnimatePresence>
        {nearEnd && phase === "playing" && (
          <motion.div
            className="absolute inset-0"
            style={{ background: "var(--theatre-bg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Kazıma Bölümü ────────────────────────────────────────────────────────────
function RevealSection({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState([false, false, false]);
  const [allRevealed, setAllRevealed] = useState(false);

  const handleReveal = (i: number) => {
    setRevealed((prev) => {
      const next = [...prev];
      next[i] = true;
      if (next.every(Boolean)) {
        setTimeout(() => {
          setAllRevealed(true);
          setTimeout(onComplete, 800);
        }, 400);
      }
      return next;
    });
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4"
      style={{ background: "var(--theatre-bg)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="text-center" variants={stagger} initial="hidden" animate="visible">
        <motion.h2 className="section-title" variants={fadeInUp} style={{ marginBottom: 8 }}>
          {TR.reveal.title}
        </motion.h2>
        <GoldDivider />
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", color: "var(--theatre-dark-red)",
          letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, marginBottom: 48,
        }}>
          {TR.reveal.subtitle}
        </motion.p>

        <motion.div className="flex gap-8 justify-center mb-8" variants={fadeInUp}>
          {[0, 1, 2].map((i) => (
            <ScratchCard key={i} revealed={revealed[i]} onReveal={handleReveal} index={i} />
          ))}
        </motion.div>

        <AnimatePresence>
          {!allRevealed && (
            <motion.p
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              exit={{ opacity: 0 }}
              style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "var(--theatre-gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              {TR.reveal.scratchHint}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {allRevealed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontStyle: "italic", color: "var(--theatre-dark-red)", letterSpacing: "0.05em" }}
            >
              {TR.reveal.weddingAnnouncement}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

// ─── Geri Sayım ───────────────────────────────────────────────────────────────
function CountdownSection() {
  const target = new Date("2027-09-10T18:00:00");
  const { days, hours, minutes, seconds } = useCountdown(target);
  const units = [
    { value: days, label: TR.countdown.days },
    { value: hours, label: TR.countdown.hours },
    { value: minutes, label: TR.countdown.minutes },
    { value: seconds, label: TR.countdown.seconds },
  ];

  return (
    <motion.section
      className="py-24 px-4"
      style={{ background: "var(--theatre-cream)" }}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2 className="section-title" variants={fadeInUp}>{TR.countdown.title}</motion.h2>
        <GoldDivider />
        <motion.div className="flex justify-center gap-6 mt-10 mb-6" variants={fadeInUp}>
          {units.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)", fontWeight: 300,
                color: "var(--theatre-dark-red)", lineHeight: 1, minWidth: "2ch", textAlign: "center",
              }}>
                {String(value).padStart(2, "0")}
              </div>
              <div style={{
                fontFamily: "'Lato', sans-serif", fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--theatre-gold)", marginTop: 6,
              }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 20, color: "var(--theatre-dark-red)", opacity: 0.7,
        }}>
          {TR.countdown.forTheBigDay}
        </motion.p>
      </div>
    </motion.section>
  );
}

// ─── Mekan ────────────────────────────────────────────────────────────────────
function VenueSection() {
  return (
    <motion.section
      className="py-24 px-4"
      style={{ background: "var(--theatre-bg)" }}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "var(--theatre-gold)", marginBottom: 16,
        }}>
          {TR.saveTheDate.celebrationAt}
        </motion.p>

        <motion.div variants={fadeInUp} style={{ marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--theatre-gold)", color: "var(--theatre-dark-red)",
            padding: "6px 16px", borderRadius: 20, fontSize: 11,
            fontFamily: "'Lato', sans-serif", letterSpacing: "0.08em", marginBottom: 32,
          }}>
            <span>✦</span><span>{TR.saveTheDate.extraBadge}</span>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} style={{ marginBottom: 32 }}>
          <img src={ASSETS.venueIllustration} alt="Mekan İllüstrasyonu"
            style={{ maxWidth: 320, width: "100%", margin: "0 auto", display: "block" }} />
        </motion.div>

        <motion.h2 className="section-title" variants={fadeInUp} style={{ marginBottom: 16 }}>
          {TR.venue.name}
        </motion.h2>
        <GoldDivider />

        <motion.div variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", color: "var(--theatre-dark-red)", opacity: 0.8, lineHeight: 2,
        }}>
          <p>{TR.venue.address}</p>
          <p>{TR.venue.city}</p>
          <p style={{ marginTop: 12, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic" }}>
            {TR.venue.date}
          </p>
        </motion.div>

        <motion.p variants={fadeInUp} style={{
          marginTop: 20, fontFamily: "'Lato', sans-serif", fontSize: 11,
          letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--theatre-gold)",
        }}>
          {TR.saveTheDate.receptionToFollow}
        </motion.p>
      </div>
    </motion.section>
  );
}

// ─── Menü ─────────────────────────────────────────────────────────────────────
function MenuSection() {
  return (
    <motion.section
      className="py-24 px-4"
      style={{ background: "var(--theatre-cream)" }}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div variants={fadeInUp} style={{ position: "relative", marginBottom: 40 }}>
          <img src={ASSETS.menuFrame} alt="" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)", width: "min(340px, 90vw)", opacity: 0.2, pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            {TR.menu.courses.map((course, i) => (
              <motion.div key={i} variants={fadeInUp} style={{ marginBottom: 32 }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500,
                  color: "var(--theatre-dark-red)", letterSpacing: "0.06em", marginBottom: 6,
                }}>
                  {course.name}
                </h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: "var(--theatre-dark-red)", opacity: 0.75 }}>
                  {course.desc1}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, color: "var(--theatre-gold)", fontStyle: "italic" }}>
                  {course.desc2}
                </p>
                {i < TR.menu.courses.length - 1 && <GoldDivider />}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: "var(--theatre-gold)",
        }}>
          {TR.menu.winesTitle}
        </motion.p>
      </div>
    </motion.section>
  );
}

// ─── Kıyafet Kodu ─────────────────────────────────────────────────────────────
function DressCodeSection() {
  return (
    <motion.section
      className="py-24 px-4"
      style={{ background: "var(--theatre-bg)" }}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.h2 className="section-title" variants={fadeInUp}>{TR.dressCode.title}</motion.h2>
        <GoldDivider />
        <motion.div variants={fadeInUp} style={{ margin: "32px 0" }}>
          <img src={ASSETS.dresscode} alt="Kıyafet Kodu İllüstrasyonu"
            style={{ maxWidth: 220, width: "100%", margin: "0 auto", display: "block" }} />
        </motion.div>
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", fontSize: 15, color: "var(--theatre-dark-red)",
          opacity: 0.8, lineHeight: 1.8, marginBottom: 20,
        }}>
          {TR.dressCode.description}
        </motion.p>
        <motion.div variants={fadeInUp} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <div style={{
            border: "1px solid var(--theatre-gold)", padding: "8px 24px",
            fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--theatre-dark-red)",
          }}>
            {TR.dressCode.formal}
          </div>
          <p style={{
            fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.1em",
            color: "var(--theatre-gold)", textTransform: "uppercase",
          }}>
            {TR.dressCode.avoidWhite}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── Hediyeler ────────────────────────────────────────────────────────────────
function GiftsSection() {
  const [open, setOpen] = useState(false);

  return (
    <motion.section
      className="py-24 px-4"
      style={{ background: "var(--theatre-cream)" }}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "var(--theatre-gold)", marginBottom: 16,
        }}>
          {TR.gifts.weddingList}
        </motion.p>
        <motion.div variants={fadeInUp} style={{ marginBottom: 24 }}>
          <img src={ASSETS.giftIcon} alt="Hediye"
            style={{ width: 80, height: 80, objectFit: "contain", margin: "0 auto", display: "block" }} />
        </motion.div>
        <motion.h2 className="section-title" variants={fadeInUp}>{TR.gifts.title}</motion.h2>
        <GoldDivider />
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", fontSize: 15, color: "var(--theatre-dark-red)",
          opacity: 0.8, lineHeight: 1.8, marginBottom: 20,
        }}>
          {TR.gifts.message}
        </motion.p>
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 18, color: "var(--theatre-gold)", marginBottom: 24,
        }}>
          {TR.gifts.withLove}
        </motion.p>
        <motion.button
          variants={fadeInUp}
          onClick={() => setOpen(!open)}
          whileHover={{ backgroundColor: "rgba(201,168,76,0.1)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "var(--theatre-dark-red)",
            border: "1px solid var(--theatre-gold)", padding: "10px 28px",
            background: "transparent", cursor: "pointer",
          }}
        >
          {TR.gifts.bankDetails}
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <div style={{
                marginTop: 20, padding: "20px 24px",
                background: "var(--theatre-bg)", border: "1px solid rgba(201,168,76,0.3)",
                fontFamily: "'Lato', sans-serif", fontSize: 13,
                color: "var(--theatre-dark-red)", lineHeight: 2.2, letterSpacing: "0.05em",
              }}>
                <p>{TR.gifts.accountHolder}</p>
                <p>{TR.gifts.iban}</p>
                <p>{TR.gifts.reference}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

// ─── Ulaşım ───────────────────────────────────────────────────────────────────
function TransportSection() {
  return (
    <motion.section
      className="py-24 px-4"
      style={{ background: "var(--theatre-bg)" }}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "var(--theatre-gold)", marginBottom: 16,
        }}>
          {TR.transport.howToGet}
        </motion.p>
        <motion.h2 className="section-title" variants={fadeInUp}>{TR.transport.title}</motion.h2>
        <GoldDivider />
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", fontSize: 15, color: "var(--theatre-dark-red)",
          opacity: 0.8, lineHeight: 1.8, marginBottom: 32,
        }}>
          {TR.transport.description}
        </motion.p>
        <motion.div variants={fadeInUp} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
          maxWidth: 360, margin: "0 auto 24px",
        }}>
          {[
            { label: TR.transport.departure, place: TR.transport.location, time: TR.transport.departureTime },
            { label: TR.transport.returnTitle, place: "Floransa", time: TR.transport.returnTime },
          ].map((item) => (
            <div key={item.label} style={{
              border: "1px solid rgba(201,168,76,0.4)", padding: "16px 12px", background: "var(--theatre-cream)",
            }}>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--theatre-gold)", marginBottom: 8 }}>
                {item.label}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "var(--theatre-dark-red)", marginBottom: 4 }}>
                {item.place}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500, color: "var(--theatre-dark-red)" }}>
                {item.time}
              </p>
            </div>
          ))}
        </motion.div>
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", fontSize: 12, color: "var(--theatre-gold)",
          letterSpacing: "0.08em", fontStyle: "italic",
        }}>
          {TR.transport.rsvpNote}
        </motion.p>
      </div>
    </motion.section>
  );
}

// ─── RSVP ─────────────────────────────────────────────────────────────────────
function RSVPSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || attending === null) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", background: "transparent",
    border: "1px solid rgba(201,168,76,0.4)", fontFamily: "'Lato', sans-serif",
    fontSize: 14, color: "var(--theatre-dark-red)", outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.15em",
    textTransform: "uppercase" as const, color: "var(--theatre-gold)", display: "block", marginBottom: 6,
  };

  return (
    <motion.section
      className="py-24 px-4"
      style={{ background: "var(--theatre-cream)" }}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}
    >
      <div className="max-w-lg mx-auto text-center">
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "var(--theatre-gold)", marginBottom: 16,
        }}>
          {TR.rsvp.formNote}
        </motion.p>
        <motion.h2 className="section-title" variants={fadeInUp}>{TR.rsvp.title}</motion.h2>
        <GoldDivider />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form" onSubmit={handleSubmit}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20, textAlign: "left" }}
            >
              <div>
                <label style={labelStyle}>{TR.rsvp.fullName}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder={TR.rsvp.namePlaceholder} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>{TR.rsvp.email}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{TR.rsvp.attending}</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {(["yes", "no"] as const).map((val) => (
                    <motion.button key={val} type="button" onClick={() => setAttending(val)}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 1, padding: "12px",
                        border: `1px solid ${attending === val ? "var(--theatre-dark-red)" : "rgba(201,168,76,0.4)"}`,
                        background: attending === val ? "var(--theatre-dark-red)" : "transparent",
                        color: attending === val ? "var(--theatre-cream)" : "var(--theatre-dark-red)",
                        fontFamily: "'Lato', sans-serif", fontSize: 13, letterSpacing: "0.08em",
                        cursor: "pointer", transition: "all 0.25s ease",
                      }}
                    >
                      {val === "yes" ? TR.rsvp.yesButton : TR.rsvp.noButton}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>{TR.rsvp.messageLabel}</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder={TR.rsvp.messagePlaceholder} rows={3}
                  style={{ ...inputStyle, resize: "none" }} />
              </div>
              <motion.button type="submit" disabled={submitting}
                whileHover={{ backgroundColor: "var(--theatre-dark-red)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "14px", background: "var(--theatre-red)",
                  color: "var(--theatre-cream)", fontFamily: "'Lato', sans-serif",
                  fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
                  border: "none", cursor: "pointer", transition: "background 0.25s ease",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? TR.rsvp.submitting : TR.rsvp.submit}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div key="thanks"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ marginTop: 40, textAlign: "center" }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "var(--theatre-dark-red)", marginBottom: 12 }}>
                {TR.rsvp.thanks}
              </p>
              <GoldDivider />
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 15, color: "var(--theatre-dark-red)", opacity: 0.8, marginTop: 16 }}>
                {TR.rsvp.confirmation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

// ─── Teşekkür ─────────────────────────────────────────────────────────────────
function ThankYouSection() {
  return (
    <motion.section
      className="py-32 px-4"
      style={{ background: "var(--theatre-bg)" }}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.h2 className="section-title" variants={fadeInUp}>{TR.thankYou.title}</motion.h2>
        <GoldDivider wide />
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Lato', sans-serif", fontSize: 15, color: "var(--theatre-dark-red)",
          opacity: 0.8, lineHeight: 1.8, marginBottom: 24,
        }}>
          {TR.thankYou.message}
        </motion.p>
        <motion.p variants={fadeInUp} style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 28, color: "var(--theatre-dark-red)", marginBottom: 32,
        }}>
          {TR.coupleNames}
        </motion.p>
        <motion.div variants={fadeInUp}>
          <img src={ASSETS.watermark} alt=""
            style={{ maxWidth: 120, width: "100%", margin: "0 auto", display: "block", opacity: 0.4 }} />
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 24px",
            background: "rgba(247,240,230,0.92)", backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
            letterSpacing: "0.15em", color: "var(--theatre-dark-red)", textTransform: "uppercase",
          }}>
            {TR.coupleNames}
          </div>
          <div style={{
            fontFamily: "'Lato', sans-serif", fontSize: 11,
            letterSpacing: "0.2em", color: "var(--theatre-gold)", textTransform: "uppercase",
          }}>
            {TR.venue.date}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

// ─── Ana Sayfa ────────────────────────────────────────────────────────────────
export default function Home() {
  const [phase, setPhase] = useState<"curtain" | "main">("curtain");

  return (
    <div style={{ minHeight: "100vh", background: "var(--theatre-bg)" }}>
      <Navbar visible={phase === "main"} />

      <AnimatePresence mode="wait">
        {phase === "curtain" && (
          <motion.div key="curtain" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <CurtainIntro onComplete={() => setPhase("main")} />
          </motion.div>
        )}
        {phase === "main" && (
          <motion.div key="main"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CountdownSection />
            <VenueSection />
            <MenuSection />
            <DressCodeSection />
            <GiftsSection />
            <TransportSection />
            <RSVPSection />
            <ThankYouSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
