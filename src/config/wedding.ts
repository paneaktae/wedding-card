// All event content lives here. Replace the sample photos/story and add real contacts before sharing.
export const weddingConfig = {
  groomName: "Teravat",
  brideName: "Vorada",
  weddingDate: "2027-07-10T18:00:00+07:00",
  endDate: "2027-07-10T22:00:00+07:00",
  timeZone: "Asia/Bangkok",
  invitation:
    "Together with our families,\nwe invite you to celebrate our wedding.",
  introduction:
    "จากวันแรกที่เราได้พบกัน\nจนถึงวันที่เราตัดสินใจเดินไปด้วยกัน\nเรายินดีเป็นอย่างยิ่งที่จะมีคุณอยู่ร่วมในวันสำคัญของเรา",
  venue: "Mellow Garden",
  venueFullName: "Mellow Garden Restaurant & Bakery",
  location: "Bangkok, Thailand",
  googleMapUrl:
    "https://www.google.com/maps/place/Mellow+Garden+Restaurant+%26+Bakery/@13.8277133,100.6301381,17z/data=!4m6!3m5!1s0x311d62860825a6a3:0xac71df54306132d7!8m2!3d13.8277133!4d100.6301381!16s%2Fg%2F1ptwwy2ts",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Mellow%20Garden%20Restaurant%20%26%20Bakery%20Bangkok&t=&z=15&ie=UTF8&iwloc=&output=embed",
  schedule: [
    {
      time: "17:00",
      title: "Welcome & registration",
      detail: "A warm hello, a little catching up",
      icon: "welcome",
    },
    {
      time: "18:00",
      title: "Wedding ceremony",
      detail: "The beginning of our forever",
      icon: "rings",
    },
    {
      time: "18:30",
      title: "Dinner together",
      detail: "Good food, wonderful company",
      icon: "dinner",
    },
    {
      time: "20:00",
      title: "Let’s celebrate",
      detail: "An evening of love and laughter",
      icon: "celebrate",
    },
  ],
  dressCodeColors: [
    { name: "Ivory", hex: "#EFEBE1" },
    { name: "Beige", hex: "#D6C9B4" },
    { name: "Sage", hex: "#A8B3A0" },
    { name: "Champagne", hex: "#C4AF87" },
    { name: "Earth", hex: "#8B7965" },
  ],
  heroImage: {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
    alt: "Wedding photography inspiration — a couple celebrating in a garden",
  },
  galleryImages: [
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
      alt: "A romantic garden wedding setting",
    },
    {
      src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85",
      alt: "Wedding celebration inspiration",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      alt: "A quiet moment on a wedding day",
    },
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      alt: "A garden celebration filled with love",
    },
  ],
  photosAreSamples: true,
  storyIsSample: false,
  timeline: [
    {
      year: "2025",
      title: "FIRST MET",
      text: "Two paths crossed. A new story began.",
    },
    {
      year: "2026",
      title: "OUR JOURNEY - SHE SAID YES",
      text: "A simple question. A beautiful forever.",
    },
    {
      year: "2027",
      title: "OUR WEDDING DAY",
      text: "The next chapter, with you by our side.",
    },
  ],
  contact: {
    bride: { phone: "", lineUrl: "" },
    groom: { phone: "", lineUrl: "" },
  },
  // Optional licensed audio file, e.g. '/music/our-song.mp3'. Otherwise a quiet original chime melody is generated locally.
  musicUrl: "",
};
export function eventDateParts() {
  const date = new Date(weddingConfig.weddingDate);
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", {
      ...options,
      timeZone: weddingConfig.timeZone,
    }).format(date);
  return {
    day: format({ weekday: "long" }),
    date: format({ day: "2-digit" }),
    month: format({ month: "long" }),
    year: format({ year: "numeric" }),
    short: format({ day: "2-digit", month: "2-digit", year: "numeric" }),
    time: format({ hour: "2-digit", minute: "2-digit", hour12: false }),
    endTime: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: weddingConfig.timeZone,
    }).format(new Date(weddingConfig.endDate)),
  };
}
