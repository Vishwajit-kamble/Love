interface SurpriseModalProps {
  open: boolean;
  onClose: () => void;
}

const SurpriseModal = ({ open, onClose }: SurpriseModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl p-8 md:p-10 max-w-md w-full animate-celebration-pop border border-border">
        <div className="text-center space-y-5">
          <p className="text-5xl">💌</p>
          <h3 className="font-cursive text-3xl md:text-4xl text-gradient-love">
            A Little Surprise...
          </h3>
          <p className="font-body text-foreground text-base md:text-lg leading-relaxed">
            You are the reason I smile every single day. Thank you for being mine.
            Here's my perfect date idea for us:
          </p>
          <div className="bg-secondary/60 rounded-xl p-4 border border-border">
            <p className="font-cursive text-xl md:text-2xl text-foreground">
              Pani-Puri + Ice cream + Café ☕️  🍦🚶‍♀️
            </p>
          </div>
          <p className="font-body text-muted-foreground text-sm">
            ...because every moment with you is an adventure 💫
          </p>
          <button
            onClick={onClose}
            className="mt-2 px-6 py-3 bg-primary text-primary-foreground font-body font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            I love it! 💖
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurpriseModal;
