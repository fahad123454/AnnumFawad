import { Link } from "react-router-dom";
import {
  Clapperboard,
  Mail,
  MessageCircle,
  Instagram,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const navColumns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Work", to: "/work" },
      { label: "Pricing", to: "/pricing" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Short-form reels", to: "/work" },
      { label: "Cinematic edits", to: "/work" },
      { label: "Brand ads", to: "/work" },
      { label: "Creator packages", to: "/work" },
    ],
  },
];

const socials = [
  { icon: Mail, label: "Email", href: `mailto:${profile.email}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`,
  },
  { icon: Instagram, label: "Instagram", href: `https://www.instagram.com/${profile.instagram}` },
  { icon: Linkedin, label: "LinkedIn", href: `https://${profile.linkedin}` },
  { icon: ExternalLink, label: "Fiverr", href: profile.fiverr },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60 bg-background/80">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),transparent_60%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.12),transparent_60%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA banner */}
        <div className="glass mt-16 overflow-hidden rounded-3xl border border-border/70 p-8 shadow-soft md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-primary">
                Let's collaborate
              </p>
              <h3 className="mt-3 font-display text-3xl font-black md:text-5xl">
                Have footage? <span className="text-gradient">I'll shape the story.</span>
              </h3>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                Reels, cinematic edits, brand ads, or creator packages — send the brief and the raw clips.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-105"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
                <Clapperboard className="h-5 w-5" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-lg font-bold">{profile.name}</span>
                <span className="block text-xs text-muted-foreground">{profile.role}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              {profile.videosMade} videos shaped with Premiere Pro, CapCut PC, Photoshop, Canva, and AI-powered visuals.
            </p>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-foreground/80">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-y-px opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-foreground/80">
              Connect
            </h4>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={social.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              <a
                href={`mailto:${profile.email}`}
                className="break-all transition-colors hover:text-primary"
              >
                {profile.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Crafted with
            <Heart className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden />
            and obsessive attention to pacing.
          </p>
        </div>
      </div>
    </footer>
  );
}
