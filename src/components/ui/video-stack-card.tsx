import * as React from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VideoStackCardProps {
  videos: string[];
  poster: string;
  category: string;
  title: string;
  subtitle: string;
  isActive?: boolean;
  onActivate?: () => void;
  className?: string;
}

const cardVariants = {
  inactive: { scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 22 } },
  active: { scale: 1.03, y: -10, transition: { type: "spring" as const, stiffness: 300, damping: 22 } },
};
const stackVariants = {
  rest: { transition: { staggerChildren: 0.05 } },
  hover: { transition: { staggerChildren: 0.08 } },
  active: { transition: { staggerChildren: 0.08 } },
};
const itemRest = (i: number) => ({ x: 0, y: i * 6, rotate: (i - 1) * 4, scale: 1 - i * 0.04, zIndex: 10 - i });
const itemSpread = (i: number) => ({ x: (i - 1) * 70, y: -10, rotate: (i - 1) * 8, scale: 1.02, zIndex: 10 - i });

function useVideoThumbnail(src: string) {
  const [thumb, setThumb] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!src) return;
    const vid = document.createElement("video");
    vid.src = src;
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "metadata";
    const capture = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = vid.videoWidth || 400;
        canvas.height = vid.videoHeight || 400;
        const ctx = canvas.getContext("2d");
        if (ctx && vid.videoWidth > 0) {
          ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
          setThumb(canvas.toDataURL("image/jpeg", 0.8));
        }
      } catch {}
    };
    vid.addEventListener("loadeddata", () => { vid.currentTime = 0.5; }, { once: true });
    vid.addEventListener("seeked", capture, { once: true });
    vid.load();
    return () => { vid.src = ""; };
  }, [src]);
  return thumb;
}

export const VideoStackCard = React.forwardRef<HTMLDivElement, VideoStackCardProps>(
  ({ className, videos, poster, category, title, subtitle, isActive, onActivate }, ref) => {
    const display = videos.slice(0, 3);
    const [hovered, setHovered] = React.useState(false);
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);
    const [muted, setMuted] = React.useState(true);
    const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

    const thumb0 = useVideoThumbnail(display[0] ?? "");
    const thumb1 = useVideoThumbnail(display[1] ?? "");
    const thumb2 = useVideoThumbnail(display[2] ?? "");
    const thumbs = [thumb0, thumb1, thumb2];

    const animState = isActive || hovered ? (focusedIndex !== null ? "active" : "hover") : "rest";

    const handlePlayToggle = (i: number) => {
      const v = videoRefs.current[i];
      if (!v) return;
      if (v.paused) {
        videoRefs.current.forEach((other, oi) => { if (other && oi !== i) other.pause(); });
        v.muted = muted;
        v.play().catch(() => {});
        setPlayingIndex(i);
      } else {
        v.pause();
        setPlayingIndex(null);
      }
    };

    const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      setMuted((m) => {
        const next = !m;
        videoRefs.current.forEach((v) => { if (v) v.muted = next; });
        return next;
      });
    };

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => { setHovered(false); setFocusedIndex(null); }}
        onClick={onActivate}
        className={cn(
          "group relative cursor-pointer rounded-3xl border border-border bg-gradient-card p-6 shadow-soft backdrop-blur-xl transition-colors",
          isActive && "border-primary/60 shadow-card-glow",
          className,
        )}
      >
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-primary">{category}</p>
          <h3 className="mt-2 font-display text-2xl font-black md:text-3xl">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <motion.div
          variants={stackVariants}
          initial="rest"
          animate={animState}
          className="relative mx-auto h-56 w-full max-w-[340px]"
        >
          {display.map((src, i) => {
            const isFocused = focusedIndex === i;
            const isPlaying = playingIndex === i;
            const cardThumb = thumbs[i];
            return (
              <motion.div
                key={src + i}
                animate={
                  isFocused
                    ? { x: 0, y: -18, rotate: 0, scale: 1.06, zIndex: 30 }
                    : animState === "rest" ? itemRest(i) : itemSpread(i)
                }
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                onClick={(e) => { e.stopPropagation(); setFocusedIndex(i); }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: 200, height: 200 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-card shadow-card-glow">
                  {cardThumb && !isPlaying && (
                    <img
                      src={cardThumb}
                      alt={`${title} clip ${i + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={src}
                    poster={cardThumb ?? poster}
                    playsInline
                    loop
                    muted={muted}
                    preload="metadata"
                    className="h-full w-full object-cover"
                    style={{ opacity: isPlaying ? 1 : 0 }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFocusedIndex(i); handlePlayToggle(i); }}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="absolute inset-0 flex items-center justify-center text-primary-foreground"
                  >
                    <span className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 shadow-glow transition-all",
                      isPlaying ? "scale-90 opacity-0 group-hover:opacity-100" : "scale-100 opacity-95",
                    )}>
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
                    </span>
                  </button>

                  {(isFocused || (focusedIndex === null && i === 0)) && (
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={muted ? "Unmute" : "Mute"}
                      className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background"
                    >
                      {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </button>
                  )}

                  <span className="absolute bottom-2 left-2 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-foreground/80 backdrop-blur">
                    {String(i + 1).padStart(2, "0")} / {String(display.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-6 text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {isActive || hovered ? "Tap a clip to play" : "Hover to spread the stack"}
        </p>
      </motion.div>
    );
  },
);

VideoStackCard.displayName = "VideoStackCard";
