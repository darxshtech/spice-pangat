"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { brand } from "@/config/brand";
import { InstagramPost, InstagramProfile } from "@/app/api/instagram/route";

const DEFAULT_PROFILE: InstagramProfile = {
  username: "spiceandpangat",
  name: "Spice and Pangat",
  bio: "Maharashtrian supper club 🪔 Homemade flavours. Memories of home. Next supper club · 14 Nov 2026.",
  location: "Northwood, London",
  profileUrl: "https://www.instagram.com/spiceandpangat/?hl=en",
  followers: 21,
  postsCount: 5,
  avatarUrl: brand.logo.transparent,
};

const DEFAULT_POSTS: InstagramPost[] = [
  {
    id: "post-1",
    type: "reel",
    permalink: "https://www.instagram.com/spiceandpangat/reel/DeXASG3AaSw/?hl=en",
    mediaUrl: "/images/instagram/post1.jpg",
    caption: "Aathvanitali Diwali — live music, the soothing notes of the flute, and celebratory Maharashtrian hospitality in Northwood. 🪔✨",
    timestamp: "Recent Reel",
    likes: 18,
    comments: 4,
  },
  {
    id: "post-2",
    type: "photo",
    permalink: "https://www.instagram.com/spiceandpangat/p/DeJcT6eDYWD/?hl=en",
    mediaUrl: "/images/instagram/post2.jpg",
    caption: "Diwali Supper Club · 14 Nov 2026. Hand-rolled puran poli, slow-cooked katachi amti, and childhood memories served shoulder-to-shoulder.",
    timestamp: "Announcement",
    likes: 24,
    comments: 6,
  },
  {
    id: "post-3",
    type: "reel",
    permalink: "https://www.instagram.com/spiceandpangat/reel/DeHQoXhNrAw/?hl=en",
    mediaUrl: "/images/instagram/post3.jpg",
    caption: "Homemade flavours. Memories of home. A peek into our London home kitchen as seasonal spices roast.",
    timestamp: "Behind-the-Scenes",
    likes: 22,
    comments: 5,
  },
  {
    id: "post-4",
    type: "photo",
    permalink: "https://www.instagram.com/spiceandpangat/p/Dd_duoLNR_V/?hl=en",
    mediaUrl: "/images/instagram/post4.jpg",
    caption: "A little piece of home in Northwood. Traditional brass thali, warm hospitality, and conversations that stretch into the night.",
    timestamp: "The Pangat Table",
    likes: 29,
    comments: 7,
  },
  {
    id: "post-5",
    type: "reel",
    permalink: "https://www.instagram.com/spiceandpangat/reel/Dd-GSjOAG9B/?hl=en",
    mediaUrl: "/images/instagram/post5.jpg",
    caption: "The secret is in the roast — stone-ground spices for authentic Goda Masala. Every spice has a story. Every pangat brings us together. 🌿",
    timestamp: "Spice Ritual",
    likes: 31,
    comments: 8,
  },
];

export default function InstagramFeed() {
  const [profile, setProfile] = useState<InstagramProfile>(DEFAULT_PROFILE);
  const [posts, setPosts] = useState<InstagramPost[]>(DEFAULT_POSTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchInstagram() {
      try {
        setLoading(true);
        const res = await fetch("/api/instagram");
        if (res.ok) {
          const data = await res.json();
          if (mounted && data.success) {
            if (data.profile) setProfile(data.profile);
            if (data.posts && data.posts.length > 0) setPosts(data.posts);
          }
        }
      } catch (err) {
        // Fall back gracefully to default posts
        console.warn("Instagram fetch notice: using cached feed", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchInstagram();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="insta-feed" id="instagram" aria-label="Follow Spice & Pangat on Instagram">
      <div className="container">
        {/* Section Header */}
        <div className="insta-feed__header">
          <div className="insta-feed__titles">
            <p className="eyebrow">From Our Social Diary</p>
            <h2 className="section-title">
              Follow Along On <em>Instagram</em>
            </h2>
            <p className="section-sub">
              Behind the stove, intimate supper snapshots, and announcement drops for upcoming London pangats.
            </p>
          </div>

          {/* Profile Card / CTA */}
          <div className="insta-feed__profile-badge">
            <div className="insta-feed__avatar-wrap">
              <Image
                src={profile.avatarUrl}
                alt={`${profile.name} Instagram profile`}
                width={56}
                height={56}
                className="insta-feed__avatar"
              />
            </div>
            <div className="insta-feed__info">
              <div className="insta-feed__handle-row">
                <span className="insta-feed__handle">@{profile.username}</span>
                <span className="insta-feed__badge">London Host</span>
              </div>
              <p className="insta-feed__meta">
                <span>{profile.postsCount} posts</span>
                <span className="bullet">·</span>
                <span>{profile.location}</span>
              </p>
            </div>
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--sm insta-feed__btn"
              aria-label={`Follow @${profile.username} on Instagram (opens in new tab)`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Follow
            </a>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="insta-feed__grid" role="list">
          {posts.map((post) => (
            <article key={post.id} className="insta-card" role="listitem">
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="insta-card__link"
                aria-label={`View Instagram post: ${post.caption.slice(0, 60)}...`}
              >
                <div className="insta-card__media">
                  <Image
                    src={post.mediaUrl}
                    alt={post.caption}
                    width={480}
                    height={480}
                    sizes="(max-width: 600px) 100vw, (max-width: 1040px) 50vw, 20vw"
                    className="insta-card__img"
                  />
                  {post.type === "reel" && (
                    <div className="insta-card__type-badge" title="Instagram Reel">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      <span>Reel</span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="insta-card__overlay">
                    <div className="insta-card__metrics">
                      <span className="insta-metric">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {post.likes}
                      </span>
                      <span className="insta-metric">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        {post.comments}
                      </span>
                    </div>
                    <span className="insta-card__tap">Open on Instagram ↗</span>
                  </div>
                </div>

                <div className="insta-card__content">
                  <span className="insta-card__tag">{post.timestamp}</span>
                  <p className="insta-card__caption">{post.caption}</p>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="insta-feed__footer">
          <p className="insta-feed__footer-text">
            Tag <strong className="insta-feed__tag-name">#SpiceAndPangat</strong> or <strong>@spiceandpangat</strong> in your dinner photos for a chance to be featured in our seasonal journal.
          </p>
          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline btn--sm"
          >
            Visit @spiceandpangat on Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}
