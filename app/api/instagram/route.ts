import { NextResponse } from "next/server";
import { brand } from "@/config/brand";

export interface InstagramPost {
  id: string;
  type: "photo" | "reel";
  permalink: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export interface InstagramProfile {
  username: string;
  name: string;
  bio: string;
  location: string;
  profileUrl: string;
  followers: number;
  postsCount: number;
  avatarUrl: string;
}

const PROFILE: InstagramProfile = {
  username: "spiceandpangat",
  name: "Spice and Pangat",
  bio: "Maharashtrian supper club 🪔 Homemade flavours. Memories of home. Next supper club · 14 Nov 2026. Book your seat.",
  location: "Northwood, London",
  profileUrl: "https://www.instagram.com/spiceandpangat/?hl=en",
  followers: 21,
  postsCount: 5,
  avatarUrl: brand.logo.transparent,
};

const POSTS: InstagramPost[] = [
  {
    id: "post-1",
    type: "reel",
    permalink: "https://www.instagram.com/spiceandpangat/reel/DeXASG3AaSw/?hl=en",
    mediaUrl: "/images/instagram/post1.jpg",
    caption: "Aathvanitali Diwali — live music, the soothing notes of the flute, and the warmth of a celebratory Maharashtrian pangat in Northwood, London. 🪔✨",
    timestamp: "Recent Reel",
    likes: 18,
    comments: 4,
  },
  {
    id: "post-2",
    type: "photo",
    permalink: "https://www.instagram.com/spiceandpangat/p/DeJcT6eDYWD/?hl=en",
    mediaUrl: "/images/instagram/post2.jpg",
    caption: "Diwali Supper Club · 14 Nov 2026. Hand-rolled puran poli, slow-cooked katachi amti, and childhood memories served shoulder-to-shoulder. Seats are limited.",
    timestamp: "Supper Club Announcement",
    likes: 24,
    comments: 6,
  },
  {
    id: "post-3",
    type: "reel",
    permalink: "https://www.instagram.com/spiceandpangat/reel/DeHQoXhNrAw/?hl=en",
    mediaUrl: "/images/instagram/post3.jpg",
    caption: "Homemade flavours. Memories of home. Peek into our London home kitchen as the seasonal spices begin to roast.",
    timestamp: "Kitchen Behind-the-Scenes",
    likes: 22,
    comments: 5,
  },
  {
    id: "post-4",
    type: "photo",
    permalink: "https://www.instagram.com/spiceandpangat/p/Dd_duoLNR_V/?hl=en",
    mediaUrl: "/images/instagram/post4.jpg",
    caption: "A little piece of home in Northwood. Traditional brass thali, warm hospitality, and conversations that stretch deep into the night.",
    timestamp: "The Pangat Table",
    likes: 29,
    comments: 7,
  },
  {
    id: "post-5",
    type: "reel",
    permalink: "https://www.instagram.com/spiceandpangat/reel/Dd-GSjOAG9B/?hl=en",
    mediaUrl: "/images/instagram/post5.jpg",
    caption: "The secret is in the roast — roasting stone-ground spices for authentic Goda Masala. Every spice has a story. Every pangat brings us together. 🌿",
    timestamp: "Spice Ritual",
    likes: 31,
    comments: 8,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    profile: PROFILE,
    posts: POSTS,
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
