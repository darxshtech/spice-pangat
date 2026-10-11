"use client";
import Image from "next/image";
import { images } from "@/config/images";
import { ImageReveal, LineReveal, Parallax, Reveal } from "./Motion";
import { Photo } from "./Photo";
import { LeafLine } from "./Ornaments";

export default function BrandStory() {
  return (
    <section id="story" className="story section section--beige" aria-labelledby="story-title">
      <LeafLine className="story__botanical" />
      <div className="container story__grid">
        <div className="story__media">
          <Parallax strength={26} className="story__large-wrap">
            <ImageReveal className="frame story__large">
              <Photo {...images.storyLarge} />
            </ImageReveal>
          </Parallax>
          <Parallax strength={-34} className="story__small-wrap">
            <ImageReveal className="frame story__small">
              <Photo {...images.storySmall} />
            </ImageReveal>
          </Parallax>
          <p className="story__caption">Traditional flavours, shared tables, and festive Maharashtrian heritage.</p>
        </div>

        <div className="story__text">
          <Reveal><p className="eyebrow">Our story · Maharashtra to London</p></Reveal>
          <h2 id="story-title" className="visually-hidden">Our story</h2>
          <LineReveal as="h3" lines={["Thousands of miles from home.", "Never far from its flavours."]} className="display display--md" />
          
          <Reveal delay={0.1}>
            <p className="body-lg">
              Somewhere between the aroma of a home-cooked meal and the laughter around a familiar table lives a feeling we never want to lose. Spice &amp; Pangat celebrates the flavours, traditions and togetherness of Maharashtra, bringing a little of that warmth to Northwood, London.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="founder-story-card">
              <div className="founder-story-card__media">
                <Image
                  src="/images/story/founder.jpg"
                  alt="Traditional Maharashtrian spices and home kitchen hospitality"
                  width={340}
                  height={420}
                  className="founder-story-card__img"
                />
              </div>
              <div className="founder-story-card__content">
                <span className="founder-story-badge">The Heart Behind the Table</span>
                <h4 className="founder-story-title">A personal note from our founder</h4>
                <p className="founder-story-text">
                  Growing up in Maharashtra, food was never just sustenance—it was our love language. Weeks before Diwali, our home filled with the fragrance of roasting besan, cardamom, and pure ghee. In every celebration, the <em>pangat</em> was sacred: sitting side-by-side on the floor as equals, sharing laughter and second helpings.
                </p>
                <p className="founder-story-text">
                  Living in London, I missed that unspoken comfort deeply. Spice &amp; Pangat was born from that longing. Every menu is cooked with patience, authentic heirloom masalas, and the same warmth our mothers gave us. When you sit at our table in Northwood, you aren&apos;t just dining out—you&apos;re coming home.
                </p>
                <p className="founder-signature">
                  <em>— With warmth &amp; spices, Host &amp; Founder, Spice &amp; Pangat</em>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="marathi-phrase" lang="mr">घरची चव, आपल्या माणसांसोबत.</p>
            <p className="marathi-gloss">The taste of home, with our own people.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
