import { getBookableEvent } from "@/config/events";
import Header from "@/components/Header";
import SpiceRitualAnimation from "@/components/SpiceRitualAnimation";
import BrandManifesto from "@/components/BrandManifesto";
import BrandStory from "@/components/BrandStory";
import Experience from "@/components/Experience";
import PangatStoryAnimation from "@/components/PangatStoryAnimation";
import FeaturedEvent from "@/components/FeaturedEvent";
import FoodGallery from "@/components/FoodGallery";
import InstagramFeed from "@/components/InstagramFeed";
import PastGatheringsJournal from "@/components/PastGatheringsJournal";
import GuestEmailCapture from "@/components/GuestEmailCapture";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  const event = getBookableEvent();
  return (
    <>
      <Header event={event} />
      <main id="main">
        <span id="top" />
        <SpiceRitualAnimation />
        <BrandManifesto />
        <BrandStory />
        <Experience />
        <PangatStoryAnimation />
        <FeaturedEvent event={event} />
        <FoodGallery />
        <InstagramFeed />
        <PastGatheringsJournal />
        <GuestEmailCapture />
        <FAQ event={event} />
        <FinalCTA event={event} />
      </main>
      <Footer event={event} />
    </>
  );
}
