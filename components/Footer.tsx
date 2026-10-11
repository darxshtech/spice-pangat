import { brand } from "@/config/brand";
import type { FeaturedEvent } from "@/config/events";

export default function Footer({ event }: { event: FeaturedEvent | null }) {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__brand">Spice <span className="amp">&amp;</span> Pangat</p>
          <p className="footer__mr" lang="mr">{brand.marathi}</p>
          <p className="footer__desc">{brand.descriptor}</p>
          <p className="footer__desc">{brand.location}</p>
        </div>
        <nav aria-label="Footer" className="footer__nav">
          {brand.nav.filter((n) => n.href !== "#contact").map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="footer__links">
          <p className="footer__h">Get in touch</p>
          <p className="footer__desc">For questions about a gathering, message us on Instagram.</p>
          <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram: @spiceandpangat</a>
          {event && <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer">Book: {event.title}</a>}
        </div>
      </div>
      <div className="container footer__base">
        <p>© {year} Spice &amp; Pangat. All rights reserved.</p>
      </div>
    </footer>
  );
}
