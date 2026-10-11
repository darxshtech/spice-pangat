// Single source of truth for brand facts, links and navigation.
export const brand = {
  name: "Spice & Pangat",
  marathi: "पंगत",
  descriptor: "Maharashtrian Supper Club",
  location: "Northwood, London",
  instagramUrl: "https://www.instagram.com/spiceandpangat/?hl=en",
  siteUrl: "https://spiceandpangat.example",
  logo: {
    original: "/logo/spice-and-pangat-logo.png", // 1080×1080, ivory background
    transparent: "/logo/spice-and-pangat-logo-transparent.png", // cropped, transparent
  },
  colors: {
    burgundy: "#640D26",
    ivory: "#FBF7EC",
    gold: "#B69654",
    leaf: "#315C3A",
    chilli: "#B52332",
    brown: "#2B201C",
    beige: "#E8DDCA",
  },
  nav: [
    { label: "Our Story", href: "#story" },
    { label: "The Experience", href: "#experience" },
    { label: "Gatherings", href: "#gatherings" },
    { label: "Gallery", href: "#gallery" },
    { label: "Journal", href: "#journal" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
