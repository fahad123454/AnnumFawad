import heroPortrait from "@/assets/CLICK-removebg-preview.png";

// mp4 assets
import social1 from "@/assets/social-1.mp4";
import social2 from "@/assets/social-2.mp4";
import social3 from "@/assets/social-3.mp4";
import brand1 from "@/assets/brand-1.mp4";
import brand2 from "@/assets/brand-2.mp4";
import brand3 from "@/assets/brand-3.mp4";
import motion1 from "@/assets/motion-1.mp4";
import motion2 from "@/assets/motion2.mp4";
import motion3 from "@/assets/motio3.mp4";
import uptalks from "@/assets/uptalks.mp4";
import duckDonuts from "@/assets/duck donuts 15(1).mp4";
import fadeGrowth from "@/assets/fade growth media intro reel.mp4";

export const profile = {
  name: "Annum Fawad",
  role: "Video Editor & Visual Storyteller",
  experience: "2 years",
  videosMade: "200+",
  email: "annumfawad22005@gmail.com",
  whatsapp: "+923495892425",
  instagram: "Ctrl_plus._y",
  linkedin: "www.linkedin.com/in/annum-fawad-video-editor",
  fiverr: "https://www.fiverr.com/sellers/annumfawad812/edit",
  softwares: ["Adobe Premiere Pro", "CapCut PC", "Adobe Photoshop", "Canva", "AI generatives"],
};

export const portfolioImages = [
  "https://media.discordapp.net/attachments/1451951160687595671/1499067447590780948/image.png?ex=69f372da&is=69f2215a&hm=5df0f6055d0d6a14a13878ee821de85e1743f49e1ca26ef2420b54727e597b2b&=&format=webp&quality=lossless&width=396&height=350",
  "https://media.discordapp.net/attachments/1451951160687595671/1499068377296015531/image.png?ex=69f373b8&is=69f22238&hm=a213bc96cac80fec47dc2d174501e5ee588c94b352fb83743f1632279a0b29ec&=&format=webp&quality=lossless&width=852&height=752",
  "https://media.discordapp.net/attachments/1451951160687595671/1499068280097210538/image.png?ex=69f373a1&is=69f22221&hm=5233e1cc61fbbb65d64a4365692f87c38386cbc38afdbbc6676bb2b07ac72386&=&format=webp&quality=lossless",
  "https://media.discordapp.net/attachments/1451951160687595671/1499068577091813477/image.png?ex=69f373e8&is=69f22268&hm=e4380c32db304bce4afea368b43fc666f7275d104a4ffa344c4a82a59daccf10&=&format=webp&quality=lossless",
  "https://media.discordapp.net/attachments/1451951160687595671/1499067609138725044/image.png?ex=69f37301&is=69f22181&hm=ce7838f5026ec9c1050fbb64c91c06f0229200c2e5becae6080390fb1ad9a175&=&format=webp&quality=lossless",
  "https://media.discordapp.net/attachments/1451951160687595671/1499067961712054344/image.png?ex=69f37355&is=69f221d5&hm=b24cf8cfc17b586bb604fa4910b96a36f39c9254723a0809b88ca082e05c7f68&=&format=webp&quality=lossless",
  "https://media.discordapp.net/attachments/1451951160687595671/1499067961116463184/image.png?ex=69f37355&is=69f221d5&hm=0ad5d5ef9b82810130f1095949098d420492b7faee5ce60f8bf6e20bff16435d&=&format=webp&quality=lossless",
  "https://media.discordapp.net/attachments/1451951160687595671/1499068712496664627/image.png?ex=69f37408&is=69f22288&hm=544aedcdb77d3e70ec5dc492352b13d07495c4e46e6599fa7c595a26bad688bd&=&format=webp&quality=lossless",
  "https://media.discordapp.net/attachments/1451951160687595671/1499067741980856421/image.png?ex=69f37321&is=69f221a1&hm=ace7c565870d7281b94fa0a7ca564e712ef1d106c64279af98cfc24a3c3e9cc1&=&format=webp&quality=lossless",
  "https://cdn.discordapp.com/attachments/1451951160687595671/1499068182919381063/image.png?ex=69f3738a&is=69f2220a&hm=68e5d48bc2df47dab6d66b57ae82f40c2aee1ca9f599a9c9531d3c859afc71c7",
  "https://media.discordapp.net/attachments/1451951160687595671/1499068479918051328/image.png?ex=69f373d0&is=69f22250&hm=953b2dc06ba030689dddb73e7a72db513af1a54ec1b136688bdcd63d9064f6f0&=&format=webp&quality=lossless",
  "https://media.discordapp.net/attachments/1451951160687595671/1499068893652848691/image.png?ex=69f37433&is=69f222b3&hm=9f940c3d257a376d51c14ff66e4396756474221616c9705c7fdca12c90bf166b&=&format=webp&quality=lossless",
];

/**
 * Public sample videos that are known to exist (Google Cloud Storage demo bucket).
 * Each VideoItem contains 3 short clip URLs that play in the PhotoStackCard hover stack.
 */
export interface VideoStackItem {
  category: string;
  title: string;
  subtitle: string;
  poster: string;
  videos: string[];
  detail: string;
}

export const videoShowcase: VideoStackItem[] = [
  {
    category: "PERSONAL BRANDS / INFLUENCERS",
    title: "Creator content",
    subtitle: "Reels · hooks · storytelling",
    poster: heroPortrait,
    videos: [social1, social2, social3],
    detail: "Fast hooks, clean captions, and pacing that keeps viewers watching.",
  },
  {
    category: "BUSINESS / ADS",
    title: "Brand & commercial",
    subtitle: "Launches · promos · product",
    poster: heroPortrait,
    videos: [brand1, brand2, brand3],
    detail: "Product-focused edits for launches, promos, and client campaigns.",
  },
  {
    category: "RESTAURANTS & FOOD",
    title: "Food content",
    subtitle: "Ambience · texture · appetite",
    poster: heroPortrait,
    videos: [motion1, motion2, motion3],
    detail: "Mouth-watering visuals with motion and color that make food pop.",
  },
  {
    category: "EVENTS",
    title: "Event highlights",
    subtitle: "Energy · moments · memories",
    poster: heroPortrait,
    videos: [uptalks, duckDonuts, fadeGrowth],
    detail: "High-energy event recaps capturing the best moments of any occasion.",
  },
];

export const workItems = [
  { title: "Short-form edits", category: "Social reels", video: social1, detail: "Fast hooks, clean captions, pacing that keeps viewers watching." },
  { title: "Cinematic videos", category: "Story edits", video: motion1, detail: "Color, music, movement, and emotion shaped into polished films." },
  { title: "Brand ads", category: "Commercial", video: brand1, detail: "Product-focused edits for launches, promos, and client campaigns." },
  { title: "Creator packages", category: "Content systems", video: uptalks, detail: "Repeatable editing style for creators posting every week." },
  { title: "Duck Donuts promo", category: "Client work", video: duckDonuts, detail: "Tasty short-form ad edit for Duck Donuts." },
  { title: "Fade Growth reel", category: "Intro reel", video: fadeGrowth, detail: "Intro reel showcasing editing style and motion work." },
];

export const pricingPlans = [
  {
    planName: "Basic",
    description: "Clean, simple edits for everyday content.",
    price: "10",
    features: [
      "Simple Captions",
      "Music mixing",
      "Up to 60 seconds",
      "Basic cuts and adding clips",
      "Color grading",
    ],
    buttonText: "Get Basic",
    buttonVariant: "secondary" as const,
  },
  {
    planName: "Standard",
    description: "Polished edits with style and energy.",
    price: "20",
    features: [
      "Animated Captions",
      "Music mixing",
      "SFX",
      "Up to 60 seconds",
      "Transitions and animations",
      "Colour grading",
      "Motion graphics",
    ],
    
    buttonText: "Get Standard",
    isPopular: true,
    buttonVariant: "primary" as const,
  },
  {
    planName: "Premium",
    description: "High-end production for brands and serious creators.",
    price: "35",
    features: [
      "Trending style animated captions",
      "Music mixing",
      "SFX",
      "Up to 100 seconds",
      "Advanced transitions and animations",
      "Color grading & color correction",
      "Complex motion graphics",
    ],
    buttonText: "Get Premium",
    buttonVariant: "primary" as const,
  },
];
