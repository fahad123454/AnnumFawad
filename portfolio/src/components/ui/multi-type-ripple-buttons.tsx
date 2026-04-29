import { type CSSProperties, type MouseEvent, type ReactNode, useMemo, useState } from "react";

interface RippleState {
  key: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface RippleButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "hover" | "ghost" | "hoverborder";
  rippleColor?: string;
  rippleDuration?: number;
  hoverBaseColor?: string;
  hoverRippleColor?: string;
  hoverBorderEffectColor?: string;
  hoverBorderEffectThickness?: string;
}

const hexToRgba = (hex: string, alpha: number): string => {
  let value = hex.startsWith("#") ? hex.slice(1) : hex;
  if (value.length === 3) value = value.split("").map((char) => char + char).join("");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const GRID_HOVER_NUM_COLS = 36;
const GRID_HOVER_NUM_ROWS = 12;
const GRID_HOVER_TOTAL_CELLS = GRID_HOVER_NUM_COLS * GRID_HOVER_NUM_ROWS;
const GRID_HOVER_RIPPLE_EFFECT_SIZE = "18.973665961em";

const JS_RIPPLE_KEYFRAMES = `
  @keyframes js-ripple-animation {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
  .animate-js-ripple-effect { animation: js-ripple-animation var(--ripple-duration) ease-out forwards; }
`;

export const RippleButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
  variant = "default",
  rippleColor,
  rippleDuration = 600,
  hoverBaseColor = "#f59e0b",
  hoverRippleColor,
  hoverBorderEffectColor = "rgba(245, 158, 11, 0.45)",
  hoverBorderEffectThickness = "0.18em",
}: RippleButtonProps) => {
  const [jsRipples, setJsRipples] = useState<RippleState[]>([]);

  const determinedJsRippleColor = useMemo(
    () => rippleColor ?? "var(--button-ripple-color, rgba(255, 255, 255, 0.2))",
    [rippleColor],
  );

  const dynamicGridHoverStyles = useMemo(() => {
    let nthChildHoverRules = "";
    const cellDim = 0.25;
    const initialTopOffset = 0.125;
    const initialLeftOffset = 0.1875;
    const hoverEffectDuration = "0.9s";

    for (let r = 0; r < GRID_HOVER_NUM_ROWS; r++) {
      for (let c = 0; c < GRID_HOVER_NUM_COLS; c++) {
        const childIndex = r * GRID_HOVER_NUM_COLS + c + 1;
        const topPos = initialTopOffset + r * cellDim;
        const leftPos = initialLeftOffset + c * cellDim;
        const selector = variant === "hover" ? "hover-variant" : "hoverborder-variant";
        nthChildHoverRules += `.${selector}-grid-cell:nth-child(${childIndex}):hover ~ .${selector}-visual-ripple { top: ${topPos}em; left: ${leftPos}em; transition: width ${hoverEffectDuration} ease-out, height ${hoverEffectDuration} ease-out, top 0s linear, left 0s linear; }`;
      }
    }

    if (variant === "hover") {
      const actualHoverRippleColor = hoverRippleColor ?? hexToRgba(hoverBaseColor, 0.466);
      return `.hover-variant-visual-ripple { background-color: ${actualHoverRippleColor}; transition: width ${hoverEffectDuration} ease, height ${hoverEffectDuration} ease, top 99999s linear, left 99999s linear; } .hover-variant-grid-cell:hover ~ .hover-variant-visual-ripple { width: ${GRID_HOVER_RIPPLE_EFFECT_SIZE}; height: ${GRID_HOVER_RIPPLE_EFFECT_SIZE}; } ${nthChildHoverRules}`;
    }

    if (variant === "hoverborder") {
      return `.hoverborder-variant-ripple-container { padding: ${hoverBorderEffectThickness}; mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; } .hoverborder-variant-visual-ripple { background-color: ${hoverBorderEffectColor}; transition: width ${hoverEffectDuration} ease-out, height ${hoverEffectDuration} ease-out, top 99999s linear, left 9999s linear; } .hoverborder-variant-grid-cell:hover ~ .hoverborder-variant-visual-ripple { width: ${GRID_HOVER_RIPPLE_EFFECT_SIZE}; height: ${GRID_HOVER_RIPPLE_EFFECT_SIZE}; } ${nthChildHoverRules}`;
    }

    return "";
  }, [variant, hoverBaseColor, hoverRippleColor, hoverBorderEffectColor, hoverBorderEffectThickness]);

  const createJsRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple: RippleState = {
      key: Date.now(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
      color: determinedJsRippleColor,
    };
    setJsRipples((prev) => [...prev, ripple]);
    setTimeout(() => setJsRipples((prev) => prev.filter((item) => item.key !== ripple.key)), rippleDuration);
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    createJsRipple(event);
    onClick?.(event);
  };

  const ripples = (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {jsRipples.map((ripple) => (
        <span
          key={ripple.key}
          className="animate-js-ripple-effect absolute rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: ripple.color,
            "--ripple-duration": `${rippleDuration}ms`,
          } as CSSProperties}
        />
      ))}
    </span>
  );

  if (variant === "hover" || variant === "hoverborder") {
    const prefix = variant === "hover" ? "hover-variant" : "hoverborder-variant";
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={handleButtonClick}
        className={`relative isolate cursor-pointer overflow-hidden border-none bg-transparent ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`}
      >
        <style>{JS_RIPPLE_KEYFRAMES + dynamicGridHoverStyles}</style>
        <span className={`absolute inset-0 overflow-hidden rounded-[inherit] ${prefix}-ripple-container`}>
          {Array.from({ length: GRID_HOVER_TOTAL_CELLS }).map((_, index) => (
            <span key={index} className={`absolute z-10 h-1 w-1 ${prefix}-grid-cell`} />
          ))}
          <span className={`absolute h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${prefix}-visual-ripple`} />
        </span>
        <span className="relative z-20">{children}</span>
        {ripples}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleButtonClick}
      className={`relative isolate overflow-hidden ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`}
    >
      <style>{JS_RIPPLE_KEYFRAMES}</style>
      <span className="relative z-10">{children}</span>
      {ripples}
    </button>
  );
};
