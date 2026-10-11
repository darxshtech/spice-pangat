// Edit this file to change the featured gathering. Nothing else needs touching.
export type EventStatus = "upcoming" | "past" | "none";

export interface FeaturedEvent {
  title: string;
  marathiTitle: string;
  /** ISO date of the event (used to hide it automatically once it has passed). */
  dateISO: string;
  dateLabel: string;
  timeLabel?: string;
  venue: string;
  address: string;
  eyebrow: string;
  headline: string;
  promoCode?: string;
  promoNote?: string;
  description: string;
  details: { label: string; value: string }[];
  includes: string[];
  dietaryNote: string;
  bookingUrl: string;
  status: EventStatus;
}

export const featuredEvent: FeaturedEvent = {
  title: "Aathvanitali Diwali",
  marathiTitle: "आठवणीतली दिवाळी",
  dateISO: "2026-11-14",
  dateLabel: "Saturday, 14 November 2026",
  timeLabel: "5:00 PM – 8:30 PM GMT",
  venue: "Holy Trinity Church, Northwood",
  address: "Gateway Close, Northwood, HA6 2RP, London",
  eyebrow: "A special Diwali supper club",
  headline: "The Diwali we grew up with. The warmth we carry with us.",
  promoCode: "EARLYBIRD",
  promoNote: "Early bird offer — limited time only! Use code EARLYBIRD at checkout for your discount.",
  description:
    "Join Spice & Pangat for an evening filled with festive flavours, shared memories and the warmth of home. घरापासून दूर, पण दिवाळी मनाच्या जवळ… Settle in for handmade Diwali faral, traditional drinks, stories of celebration, and a piping-hot festive Maharashtrian thali served shoulder-to-shoulder.",
  details: [
    { label: "Timings", value: "5:00 PM – 8:30 PM GMT" },
    { label: "Food", value: "100% Vegetarian festive feast" },
    { label: "Format", value: "Traditional Maharashtrian Pangat" },
    { label: "Drinks", value: "Alcohol-free celebration (No BYOB)" },
    { label: "Children", value: "Under 5 Free · Ages 5–12 £25" },
    { label: "Early Bird", value: "Use code EARLYBIRD at checkout" },
  ],
  includes: [
    "🌸 A warm Maharashtrian welcome",
    "🍘 Authentic Diwali faral (sweet & savoury treats)",
    "🥤 Traditional Maharashtrian drinks",
    "🍛 गरमागरम Maharashtrian festive thali",
    "🪔 The stories and customs behind Diwali",
    "🎁 A little Diwali joy to take home (goodie bag)",
    "❤️ Friends, family and shared memories",
  ],
  dietaryNote:
    "All food served is vegetarian. Our menu includes nuts and may contain other allergens. Please contact the organizers before booking to discuss allergies. Cancellations accepted up to 10 days before the event (4 Nov 2026).",
  bookingUrl: "https://luma.com/w3fdwcm7",
  status: "upcoming",
};

/** Returns the event only while it is confirmed and has not yet passed. */
export function getBookableEvent(now: Date = new Date()): FeaturedEvent | null {
  const e = featuredEvent;
  if (e.status !== "upcoming") return null;
  const end = new Date(e.dateISO + "T23:59:59");
  return end.getTime() >= now.getTime() ? e : null;
}
