import {
  Header,
  Hero,
  WeddingIntro,
  SaveTheDate,
  WeddingDetails,
  Location,
  DressCode,
  Gallery,
  OurStory,
  RSVP,
  Contact,
  Footer,
  MusicButton,
  ScrollReveal,
} from "@/components/wedding";
export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to invitation
      </a>
      <Header />
      <main id="main">
        <Hero />
        <WeddingIntro />
        <SaveTheDate />
        <WeddingDetails />
        <Location />
        <DressCode />
        <Gallery />
        <OurStory />
        <RSVP demoMode={!process.env.RSVP_WEBHOOK_URL} />
        <Contact />
      </main>
      <Footer />
      <MusicButton />
      <ScrollReveal />
    </>
  );
}
