import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a royalty-free romantic melody from a public CDN
    const audio = new Audio(
      "https://cdn.pixabay.com/audio/2024/11/29/audio_d26e3e440a.mp3"
    );
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className="fixed z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-md hover:scale-110 transition-all duration-300 touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))]"
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? (
        <Volume2 className="w-5 h-5 text-primary" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  );
};

export default MusicToggle;
