import { LineReveal, Reveal } from "./Motion";
import { Sprig } from "./Ornaments";

export default function BrandManifesto() {
  return (
    <section className="manifesto section">
      <div className="container container--narrow center">
        <Sprig className="manifesto__sprig" />
        <Reveal><p className="eyebrow">The spirit of Pangat</p></Reveal>
        <LineReveal as="h2" lines={["Because the best memories", "are made around a table."]} className="display display--lg" />
        <Reveal delay={0.15}>
          <p className="lede">
            A familiar flavour can take you home. A shared table can turn strangers into friends. Pangat is our way of bringing people together through Maharashtrian food, hospitality and stories worth sharing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
