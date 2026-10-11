import { brand } from "@/config/brand";
import type { FeaturedEvent } from "@/config/events";
import { LineReveal, Reveal } from "./Motion";
import { LeafLine } from "./Ornaments";

export default function FinalCTA({ event }: { event: FeaturedEvent | null }) {
  return (
    <section className="final section section--burgundy" aria-labelledby="final-title">
      <LeafLine tone="ivory" className="final__leaf final__leaf--a" />
      <LeafLine tone="gold" className="final__leaf final__leaf--b" />
      <div className="container container--narrow center">
        <span id="final-title" className="visually-hidden">There is always room for one more at our table.</span>
        <LineReveal as="h2" lines={["There is always room", "for one more at our table."]} className="display display--lg" />
        <Reveal delay={0.1}>
          <p className="lede lede--light">
            {event ? "Come share the flavours, stories and warmth of a Maharashtrian pangat." : "Follow along for the flavours, stories and warmth of our next Maharashtrian pangat."}
          </p>
        </Reveal>
        <Reveal delay={0.2} className="final__actions">
          {event ? (
            <a className="btn btn--gold btn--large" href={event.bookingUrl} target="_blank" rel="noopener noreferrer">Join Our Next Gathering</a>
          ) : (
            <a className="btn btn--gold btn--large" href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">Follow for Upcoming Gatherings</a>
          )}
          <a className="link-arrow link-arrow--light" href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">Follow Our Journey on Instagram</a>
        </Reveal>
      </div>
    </section>
  );
}
