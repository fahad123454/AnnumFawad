import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";

const CheckIcon = ({ className }: { className?: string }) => <Check className={className} aria-hidden="true" />;

const ShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glProgramRef = useRef<WebGLProgram | null>(null);
  const glBgColorLocationRef = useRef<WebGLUniformLocation | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const [backgroundColor, setBackgroundColor] = useState([0.06, 0.04, 0.02]);

  useEffect(() => {
    const updateColor = () => setBackgroundColor([0.06, 0.04, 0.02]);
    updateColor();
  }, []);

  useEffect(() => {
    const gl = glRef.current;
    const program = glProgramRef.current;
    const location = glBgColorLocationRef.current;
    if (gl && program && location) {
      gl.useProgram(program);
      gl.uniform3fv(location, new Float32Array(backgroundColor));
    }
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    glRef.current = gl;

    const vertexShaderSource = "attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }";
    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){ return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0; }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff = center-uv;
        float len = length(diff);
        len += variation(diff,vec2(0.,1.),5.,2.);
        len -= variation(diff,vec2(1.,0.),5.,2.);
        float circle = smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        uv.x *= 1.5; uv.x -= 0.25;
        float mask = 0.0;
        float radius = .35;
        vec2 center = vec2(.5);
        mask += paintCircle(uv,center,radius,.035).r;
        mask += paintCircle(uv,center,radius-.018,.01).r;
        mask += paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;
        vec3 foregroundColor=vec3(.95*v.x,.48+v.y*.25,.10+v.x*.18);
        vec3 color=mix(uBackgroundColor,foregroundColor,mask);
        color=mix(color,vec3(1.),paintCircle(uv,center,radius,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Could not create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation error");
      return shader;
    };

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    gl.useProgram(program);
    glProgramRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResLoc = gl.getUniformLocation(program, "iResolution");
    glBgColorLocationRef.current = gl.getUniformLocation(program, "uBackgroundColor");
    gl.uniform3fv(glBgColorLocationRef.current, new Float32Array(backgroundColor));

    let animationFrameId = 0;
    const render = (time: number) => {
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    animationFrameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-50" aria-hidden="true" />;
};

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=923495892425&text&type=phone_number&app_absent=0";

export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
}

export const PricingCard = ({ planName, description, price, features, buttonText, isPopular = false, buttonVariant = "primary" }: PricingCardProps) => {
  const cardClasses = `backdrop-blur-[14px] bg-gradient-to-br rounded-2xl shadow-xl flex-1 max-w-xs px-7 py-8 flex flex-col transition-all duration-300 from-card/80 to-card/30 border border-border ${isPopular ? "scale-105 relative ring-2 ring-primary/30 shadow-2xl" : ""}`;
  const buttonClasses = `mt-auto w-full rounded-xl px-4 py-3 text-[14px] font-semibold transition ${buttonVariant === "primary" ? "bg-primary text-primary-foreground hover:brightness-110" : "border border-border bg-secondary text-secondary-foreground hover:bg-muted"}`;

  const handleGetStarted = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <article className={cardClasses}>
      {isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground">Most Popular</div>}
      <div>
        <h3 className="font-display text-2xl font-bold text-foreground">{planName}</h3>
        <p className="mt-2 min-h-12 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="my-7 flex items-end gap-1">
        <span className="font-display text-5xl font-black text-foreground">${price}</span>
        <span className="pb-2 text-sm text-muted-foreground">/mo</span>
      </div>
      <ul className="mb-8 space-y-3 text-sm text-foreground/90">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary"><CheckIcon className="h-3.5 w-3.5" /></span>
            {feature}
          </li>
        ))}
      </ul>
      <RippleButton variant="default" className={buttonClasses} onClick={handleGetStarted}>{buttonText}</RippleButton>
    </article>
  );
};

interface ModernPricingPageProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  plans: PricingCardProps[];
  showAnimatedBackground?: boolean;
}

export const ModernPricingPage = ({ title, subtitle, plans, showAnimatedBackground = true }: ModernPricingPageProps) => {
  return (
    <section className="relative isolate min-h-screen overflow-hidden px-4 py-28 sm:px-6 lg:px-8">
      {showAnimatedBackground && <ShaderCanvas />}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-black leading-tight md:text-7xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
        </div>
        <div className="mt-14 flex flex-col items-center justify-center gap-6 lg:flex-row lg:items-stretch">
          {plans.map((plan) => <PricingCard key={plan.planName} {...plan} />)}
        </div>
      </div>
    </section>
  );
};