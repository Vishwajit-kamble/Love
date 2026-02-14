import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoGalleryProps {
  visible: boolean;
}

// Folder for "Our old memories" photos — add memory-1.jpg … memory-9.jpg in public/memories/
const MEMORIES_BASE = "/memories";
// Cache-bust so browser doesn’t use old cached 404s after fixing filenames
const CACHE_BUST = "?v=8";

// Black placeholder when a photo is missing or fails to load
const BLACK_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23111'/%3E%3C/svg%3E";

const captions = [
  "Us 💖",
  "Together 🥰",
  "Forever 🌅",
  "My love 🌹",
  "Always ☕",
  "More memories coming… 🖤",
  "To be continued… 📸",
  "Our next adventure 🗺️",
  "One more moment 💕",
];

// Folder: memory-1..6.jpg, memory-8.png, memory-9.jpg, memory-10.jpg
// Slot 7 = memory-8.png, slot 8 = memory-9.jpg, slot 9 = memory-10.jpg
const photoSrc = (i: number) => {
  const n = i + 1;
  let path: string;
  if (n <= 6) path = `${MEMORIES_BASE}/memory-${n}.jpg`;
  else if (n === 7) path = `${MEMORIES_BASE}/memory-8.png`;
  else if (n === 8) path = `${MEMORIES_BASE}/memory-9.jpg`;
  else path = `${MEMORIES_BASE}/memory-10.jpg`;
  return path + CACHE_BUST;
};

const photos = captions.map((caption, i) => ({
  src: photoSrc(i),
  caption,
}));

const PhotoGallery = ({ visible }: PhotoGalleryProps) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setCurrent(((i % photos.length) + photos.length) % photos.length);
  }, []);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (!visible || paused) return;
    const id = setInterval(() => goTo(current + 1), 3500);
    return () => clearInterval(id);
  }, [visible, paused, current, goTo]);

  if (!visible) return null;

  return (
    <div className="animate-slide-up w-full max-w-2xl mx-auto px-3 sm:px-4">
      <h2 className="font-cursive text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-4 sm:mb-6">
        Our Moments Together 💫
      </h2>

      {/* Main image with arrows */}
      <div
        className="relative mx-auto overflow-hidden rounded-lg sm:rounded-xl shadow-lg bg-card group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative w-full" style={{ paddingBottom: "75%" }}>
          {photos.map((photo, i) => (
            <img
              key={i}
              src={photo.src}
              alt={photo.caption}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
              onError={(e) => {
                e.currentTarget.src = BLACK_PLACEHOLDER;
              }}
            />
          ))}
        </div>

        {/* Caption overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-3 sm:p-4">
          <p className="font-cursive text-white text-base sm:text-lg md:text-xl text-center drop-shadow">
            {photos[current].caption}
          </p>
        </div>

        {/* Left arrow — always visible on touch, hover on desktop */}
        <button
          onClick={prev}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-2.5 sm:p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-md opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 hover:bg-card z-10 touch-manipulation"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-foreground shrink-0" />
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-2.5 sm:p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-md opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 hover:bg-card z-10 touch-manipulation"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-foreground shrink-0" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-12 sm:bottom-14 inset-x-0 flex justify-center gap-1.5 sm:gap-2 z-10">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2.5 bg-primary-foreground shadow-md"
                  : "w-2.5 h-2.5 bg-primary-foreground/50 hover:bg-primary-foreground/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails — scroll on small screens if needed */}
      <div className="flex justify-start sm:justify-center gap-1.5 sm:gap-2 md:gap-3 mt-3 sm:mt-4 overflow-x-auto overflow-y-hidden pb-1 -mx-1 px-1 md:flex-wrap md:overflow-visible">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 touch-manipulation min-w-[44px] min-h-[44px] ${
              i === current
                ? "border-primary scale-105 sm:scale-110 shadow-md shadow-primary/20"
                : "border-transparent opacity-60 hover:opacity-100 hover:border-border"
            }`}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-cover"
              onError={(e) => {
                e.currentTarget.src = BLACK_PLACEHOLDER;
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
