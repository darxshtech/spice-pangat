"use client";
import { useState } from "react";
import Image from "next/image";
import { Reveal } from "./Motion";
import { brand } from "@/config/brand";

interface JournalEntry {
  id: string;
  season: string;
  title: string;
  subtitle: string;
  date: string;
  seats: string;
  image: string;
  menuHighlights: string[];
  guestMoment: string;
  quoteAuthor: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "diwali",
    season: "Autumn Festive Gathering",
    title: "Aathvanitali Diwali",
    subtitle: "The Diwali we grew up with. The warmth we carry with us.",
    date: "November 2026",
    seats: "24 Seats · Communal Table",
    image: "/images/journal/diwali-gathering.jpg",
    menuHighlights: [
      "Crispy Handmade Chakli & Besan Ladoos",
      "Steaming Ukadiche Modak with fresh coconut & jaggery",
      "Katachi Amti with hot puris",
      "Traditional Kesar Shrikhand & spiced buttermilk",
    ],
    guestMoment:
      "“The fragrance of pure ghee and cardamom greeted us right at the door. By the time the warm modaks arrived, guests who walked in as strangers were laughing and sharing stories like childhood friends.”",
    quoteAuthor: "Host Journal Reflection",
  },
  {
    id: "shravan",
    season: "Monsoon Comforts",
    title: "Shravan Thali & Sacred Greens",
    subtitle: "Time-honoured fasting delicacies and rich vegetarian heirloom flavours.",
    date: "August 2026",
    seats: "22 Seats · Sold Out",
    image: "/images/journal/shravan-gathering.jpg",
    menuHighlights: [
      "Alu Vadi with roasted white sesame seeds",
      "Fragrant Varan Bhat with warm artisanal homemade tup",
      "Creamy Valache Birde with fresh grated coconut",
      "Puran Poli made thin, soft and soaked in melted ghee",
    ],
    guestMoment:
      "“A London guest remarked that the puran poli tasted identical to their grandmother's recipe in Pune. That quiet smile across the table is the entire reason we open our doors.”",
    quoteAuthor: "Guest Note from the Evening",
  },
  {
    id: "gudi-padwa",
    season: "Spring Harvest Feast",
    title: "Gudi Padwa Nav Varsh",
    subtitle: "Welcoming the Maharashtrian New Year around one festive table.",
    date: "April 2026",
    seats: "20 Seats · Intimate Pangat",
    image: "/images/journal/gudi-padwa.jpg",
    menuHighlights: [
      "Velvety Kesar-Elaichi Shrikhand crafted over 24 hours",
      "Golden puffy puris straight from the kadai",
      "Zesty Batatyachi Sukhi Bhaji & Khamang Kakdi",
      "Aromatic Spiced Mattha (buttermilk with ginger & coriander)",
    ],
    guestMoment:
      "“We sat together as equals, passed brass bowls across the table, and welcomed the spring harvest. A true pangat where nobody ate alone.”",
    quoteAuthor: "Table Conversation",
  },
];

export default function PastGatheringsJournal() {
  const [activeTab, setActiveTab] = useState<string>("diwali");

  const activeEntry = JOURNAL_ENTRIES.find((e) => e.id === activeTab) || JOURNAL_ENTRIES[0];

  return (
    <section id="journal" className="journal section" aria-labelledby="journal-title">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow">Moments From Our Table · Supper Club Diary</p>
          <h2 id="journal-title" className="section-title">
            Past Gatherings <em>Journal</em>
          </h2>
          <p className="body-lg journal-intro">
            A small chronicle of previous evenings in Northwood—the menus cooked from scratch, the laughter shared, and moments that build lasting memories.
          </p>
        </Reveal>

        {/* Tab selection */}
        <div className="journal-tabs" role="tablist" aria-label="Select past gathering">
          {JOURNAL_ENTRIES.map((entry) => (
            <button
              key={entry.id}
              role="tab"
              aria-selected={activeTab === entry.id}
              className={`journal-tab-btn${activeTab === entry.id ? " is-active" : ""}`}
              onClick={() => setActiveTab(entry.id)}
            >
              <span className="journal-tab-season">{entry.season}</span>
              <span className="journal-tab-title">{entry.title}</span>
            </button>
          ))}
        </div>

        {/* Active journal entry showcase */}
        <div className="journal-card" data-testid="journal-entry-card">
          <div className="journal-card__media">
            <Image
              src={activeEntry.image}
              alt={activeEntry.title}
              width={640}
              height={520}
              className="journal-card__img"
              priority
            />
            <div className="journal-card__badge">
              <span>{activeEntry.date}</span>
              <span className="bullet">·</span>
              <span>{activeEntry.seats}</span>
            </div>
          </div>

          <div className="journal-card__body">
            <span className="journal-card__season">{activeEntry.season}</span>
            <h3 className="journal-card__title">{activeEntry.title}</h3>
            <p className="journal-card__subtitle">{activeEntry.subtitle}</p>

            <div className="journal-card__menu">
              <h4 className="journal-card__menu-h">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Menu Highlights From The Evening
              </h4>
              <ul className="journal-card__menu-list">
                {activeEntry.menuHighlights.map((dish, i) => (
                  <li key={i}>{dish}</li>
                ))}
              </ul>
            </div>

            <blockquote className="journal-card__quote">
              <p>{activeEntry.guestMoment}</p>
              <cite>{activeEntry.quoteAuthor}</cite>
            </blockquote>
          </div>
        </div>

        <div className="journal-foot">
          <p className="fineprint">
            Every gathering features a new, seasonally curated regional menu. Have questions about attending your first pangat?
          </p>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow"
          >
            See Live Reels &amp; Guest Stories on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
