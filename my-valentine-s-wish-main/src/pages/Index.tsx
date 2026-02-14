import { useState, useCallback, useRef } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import PhotoGallery from "@/components/PhotoGallery";
import MusicToggle from "@/components/MusicToggle";
import SurpriseModal from "@/components/SurpriseModal";

// Same memory photos as gallery — from public/memories/ (memory-1.jpg, memory-3.jpg, memory-5.jpg)
const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='200'%3E%3Crect width='160' height='200' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' text-anchor='middle' dy='.3em' font-size='14'%3E?%3C/text%3E%3C/svg%3E";

const MEMORIES_CACHE_BUST = "?v=2";
const photoPreviews = [
  { src: `/memories/memory-1.jpg${MEMORIES_CACHE_BUST}`, rot: "-rotate-6", caption: "Our first spark ✨" },
  { src: `/memories/memory-3.jpg${MEMORIES_CACHE_BUST}`, rot: "rotate-3", caption: "Sunshine days 🌅" },
  { src: `/memories/memory-5.jpg${MEMORIES_CACHE_BUST}`, rot: "-rotate-2", caption: "Coffee & us ☕" },
];

const noMessages = [
  "No 🙈",
  "Are you sure? 🥺",
  "Think again! 💕",
  "Pretty please? 🌹",
  "Don't break my heart 💔",
  "One more chance? 🥹",
  "Really?! 😢",
  "Just say yes! 😍",
];

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [celebrationHearts, setCelebrationHearts] = useState<number[]>([]);
  const [noMsgIndex, setNoMsgIndex] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const noRef = useRef<HTMLButtonElement>(null);

  const handleYes = useCallback(() => {
    setAccepted(true);
    setCelebrationHearts(Array.from({ length: 30 }, (_, i) => i));
    setTimeout(() => setShowSurprise(true), 1200);
  }, []);

  const handleNoHover = useCallback(() => {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 200;
    setNoPos({ x, y });
    setNoMsgIndex((prev) => (prev + 1) % noMessages.length);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <FloatingHearts count={accepted ? 30 : 12} />
      <MusicToggle />
      <SurpriseModal open={showSurprise} onClose={() => setShowSurprise(false)} />

      {/* Celebration burst */}
      {accepted && celebrationHearts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {celebrationHearts.map((i) => (
            <span
              key={i}
              className="absolute text-2xl animate-float-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 40}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {["❤️", "💕", "💖", "💗", "🥰", "✨", "🎉", "🎊"][i % 8]}
            </span>
          ))}
        </div>
      )}

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 gap-8">
        {!accepted ? (
          <>
            {/* Main question section */}
            <div className="text-center space-y-4 animate-slide-up">
              <h1 className="font-cursive text-5xl md:text-7xl lg:text-8xl text-gradient-love animate-pulse-glow leading-tight">
                Will You Be My Valentine? 💖
              </h1>
              <p className="font-cursive text-2xl md:text-3xl text-accent">
                For my favorite person, Sanskrutii 💗
              </p>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto font-body leading-relaxed">
                Every moment with you feels like a beautiful dream I never want to wake up from.
                You make my world brighter just by being in it. 🌸
              </p>
            </div>

            {/* Photo preview with captions */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 my-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              {photoPreviews.map((p, i) => (
                <div key={i} className={`polaroid ${p.rot}`}>
                  <img
                    src={p.src}
                    alt={p.caption}
                    className="w-32 h-40 md:w-40 md:h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMG;
                    }}
                  />
                  <p className="font-cursive text-center text-foreground mt-2 text-sm md:text-base">
                    {p.caption}
                  </p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-6 mt-4 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <button
                onClick={handleYes}
                className="px-8 py-4 bg-primary text-primary-foreground font-body font-bold text-lg md:text-xl rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl active:scale-95"
              >
                Yes 😍
              </button>
              <button
                ref={noRef}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                className="px-8 py-4 bg-muted text-muted-foreground font-body font-bold text-lg md:text-xl rounded-full shadow transition-all duration-200 pointer-events-auto select-none"
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                  transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onClick={(e) => e.preventDefault()}
              >
                {noMessages[noMsgIndex]}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Celebration section */}
            <div className="text-center space-y-6 animate-celebration-pop">
              <h1 className="font-cursive text-5xl md:text-7xl lg:text-8xl text-gradient-love leading-tight">
                Yay! You made my day 💕
              </h1>
              <p className="text-xl md:text-2xl text-foreground font-body max-w-lg mx-auto">
                I love you more than words could ever say. You are my everything. 🥰
              </p>
              <p className="text-6xl animate-pulse-glow">❤️</p>
            </div>

            {/* Full photo gallery */}
            <PhotoGallery visible={accepted} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-6 pt-2 text-center">
        <p className="font-cursive text-base md:text-lg text-muted-foreground">
          Made with love by yours Vishwajit 💌
        </p>
      </footer>
    </div>
  );
};

export default Index;
