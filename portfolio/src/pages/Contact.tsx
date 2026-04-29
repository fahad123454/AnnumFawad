import { useEffect } from "react";
import { ExternalLink, Instagram, Mail, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { profile } from "@/lib/portfolio-data";

const contactLinks = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: profile.whatsapp,
    href: `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: profile.instagram,
    href: `https://www.instagram.com/${profile.instagram}`,
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: profile.linkedin,
    href: `https://${profile.linkedin}`,
  },
  { icon: ExternalLink, label: "Fiverr", value: "annumfawad812", href: profile.fiverr },
];

const Contact = () => {
  useEffect(() => {
    document.title = "Contact — Annum Fawad";
  }, []);

  return (
    <SiteShell>
      <section className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Contact</p>
          <h1 className="mt-4 font-display text-5xl font-black leading-tight md:text-7xl">
            Let's edit your <span className="text-gradient">next video.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Send the footage, goal, deadline, and reference style — Annum can take it from raw clips
            to polished content.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
          {contactLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-border bg-card/75 p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-sm text-muted-foreground">{item.label}</span>
                <span className="block break-words font-semibold text-foreground group-hover:text-primary">
                  {item.value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </SiteShell>
  );
};

export default Contact;
