import { images } from "@/config/images";
import { ImageReveal, LineReveal, Reveal } from "./Motion";
import { Photo } from "./Photo";

const features = [
  { id: "flavours", tag: "Familiar flavours", title: ["Flavours that", "feel like home."], copy: "Food inspired by Maharashtra, thoughtfully prepared to bring familiar flavours and comforting memories to the table.", img: images.expFlavours },
  { id: "tables", tag: "Shared tables", title: ["Good food.", "Better company."], copy: "A welcoming space to sit together, enjoy a meal, meet new people and make room for new memories.", img: images.expTables },
  { id: "culture", tag: "Culture & celebration", title: ["Traditions", "worth sharing."], copy: "Discover the stories, traditions and festive moments that make Maharashtrian food about so much more than what is on the plate.", img: images.expCulture },
];

export default function Experience() {
  return (
    <section id="experience" className="experience section" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-head">
          <Reveal><p className="eyebrow">The experience</p></Reveal>
          <LineReveal as="h2" lines={["Every table", "has a story."]} className="display display--lg" />
        </header>
        {features.map((f, i) => (
          <article key={f.id} className={`feature feature--${i + 1}`}>
            <ImageReveal className="frame feature__img"><Photo {...f.img} /></ImageReveal>
            <div className="feature__text">
              <Reveal><p className="feature__tag">{f.tag}</p></Reveal>
              <LineReveal as="h3" lines={f.title} className="display display--md" />
              <Reveal delay={0.1}><p className="body-lg">{f.copy}</p></Reveal>
            </div>
          </article>
        ))}
        <p className="fineprint center">These are the themes behind our gatherings. The menu and activities of each gathering are listed on its booking page.</p>
      </div>
    </section>
  );
}
