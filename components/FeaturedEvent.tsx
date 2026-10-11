import Image from "next/image";
import { brand } from "@/config/brand";
import type { FeaturedEvent as EventT } from "@/config/events";
import { images } from "@/config/images";
import { ImageReveal, LineReveal, Reveal } from "./Motion";
import { Photo } from "./Photo";
import { Diya } from "./art/Scenes";
import { Sprig } from "./Ornaments";

export default function FeaturedEvent({ event }: { event: EventT | null }) {
  if (!event) {
    return (
      <section id="gatherings" className="event section section--burgundy" aria-labelledby="event-title">
        <div className="container container--narrow center">
          <Sprig tone="gold" className="manifesto__sprig" />
          <p className="eyebrow eyebrow--gold">Gatherings</p>
          <h2 id="event-title" className="display display--lg">Our next gathering is being planned.</h2>
          <p className="lede lede--light">We share every confirmed date on Instagram first. Follow along and you will be among the first to know.</p>
          <a className="btn btn--gold" href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
        </div>
      </section>
    );
  }
  return (
    <section id="gatherings" className="event section section--burgundy" aria-labelledby="event-title">
      <div className="event__diyas" aria-hidden="true">
        <div className="event__diya event__diya--a"><Diya id="ev1" /></div>
        <div className="event__diya event__diya--b"><Diya id="ev2" /></div>
      </div>
      <div className="container event__grid">
        <div className="event__text">
          <Reveal><p className="eyebrow eyebrow--gold">{event.eyebrow}</p></Reveal>
          <Reveal delay={0.05}>
            <p className="event__name"><span>{event.title}</span> <span lang="mr" className="event__mr">{event.marathiTitle}</span></p>
          </Reveal>
          <LineReveal as="h2" lines={["The Diwali we grew up with.", "The warmth we carry with us."]} className="display display--lg event__headline" />
          <span id="event-title" className="visually-hidden">{event.headline}</span>
          {event.promoCode && (
            <Reveal delay={0.08}>
              <div className="event__promo-badge">
                <span className="event__promo-tag">Limited Time</span>
                <p className="event__promo-text">
                  Use code <strong>{event.promoCode}</strong> at checkout for your discount
                </p>
              </div>
            </Reveal>
          )}
          <Reveal delay={0.1}><p className="lede lede--light">{event.description}</p></Reveal>

          <Reveal delay={0.15}>
            <dl className="event__facts">
              <div><dt>Date</dt><dd>{event.dateLabel}</dd></div>
              <div><dt>Venue</dt><dd>{event.venue}</dd></div>
              <div><dt>Address</dt><dd>{event.address}</dd></div>
              {event.details.map((d) => (
                <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="event__sub">Listed for this gathering</h3>
            <ul className="event__includes">
              {event.includes.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <p className="fineprint fineprint--light">{event.dietaryNote} Details apply to this gathering only. Ticket options and booking requirements are shown on the official booking page.</p>
          </Reveal>

          <Reveal delay={0.25}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
              <a className="btn btn--gold btn--large" href={event.bookingUrl} target="_blank" rel="noopener noreferrer">Reserve Your Seat on Luma<span className="visually-hidden"> (opens the official booking page in a new tab)</span></a>
              {event.promoCode && (
                <span style={{ fontSize: "0.85rem", color: "var(--gold)" }}>Code: <strong>{event.promoCode}</strong></span>
              )}
            </div>
          </Reveal>
        </div>
        <ImageReveal className="event__media">
          <a
            href={event.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Book Aathvanitali Diwali on Luma"
            className="event__poster-card"
          >
            <div className="frame frame--poster">
              <Image
                src="/images/gatherings/aathvanitali-diwali.png"
                alt="Aathvanitali Diwali Supper Club official poster with code EARLYBIRD"
                width={800}
                height={800}
                priority
                className="event__poster-img"
              />
            </div>
          </a>
        </ImageReveal>
      </div>
    </section>
  );
}
