"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Heart,
  MapPin,
  CalendarDays,
  Wine,
  Utensils,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Music2,
  VolumeX,
  Phone,
  MessageCircle,
  Check,
  LoaderCircle,
} from "lucide-react";
import { weddingConfig as w, eventDateParts } from "@/config/wedding";
const d = eventDateParts();
const monogram = `${w.groomName[0]} & ${w.brideName[0]}`;

function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical ${className}`}
      viewBox="0 0 180 260"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#7f884b" strokeWidth="2" strokeLinecap="round">
        <path d="M90 245C103 195 73 140 91 85" />
        <path d="M91 195C59 195 36 172 34 148C63 148 85 166 91 195Z" fill="#b1ac68" />
        <path d="M91 164C118 160 140 139 143 117C117 119 97 139 91 164Z" fill="#969a57" />
        <path d="M42 156L86 189M136 125L96 158" stroke="#788045" strokeWidth="1" />
      </g>
      <g>
        {Array.from({ length: 16 }, (_, i) => (
          <ellipse key={i} cx="90" cy="43" rx="9" ry="29" transform={`rotate(${i * 22.5} 90 79)`} fill={i % 2 ? "#efc34f" : "#e4ac31"} stroke="#d69b2d" strokeWidth=".6" />
        ))}
        <circle cx="90" cy="79" r="25" fill="#765031" />
        <circle cx="90" cy="79" r="19" fill="#8c623b" stroke="#b18a4d" strokeWidth="1.5" strokeDasharray="1 4" />
        <circle cx="90" cy="79" r="12" fill="none" stroke="#d0a363" strokeWidth="2" strokeDasharray="1 5" />
        <circle cx="90" cy="79" r="5" fill="#67442b" />
      </g>
    </svg>
  );
}
function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker">{children}</p>;
}
export function Header() {
  return (
    <header className="site-header">
      <a className="monogram" href="#" aria-label="Back to top">
        {monogram}
      </a>
      <nav aria-label="Wedding navigation">
        <a href="#celebration">The celebration</a>
        <a href="#story">Our story</a>
        <a href="#rsvp" className="nav-rsvp">
          Kindly RSVP <ArrowUpRight size={13} />
        </a>
      </nav>
    </header>
  );
}
export function Hero() {
  return (
    <section className="hero" aria-labelledby="couple">
      <div className="hero-photo">
        <Image
          src={w.heroImage.src}
          alt={w.heroImage.alt}
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-shade" />
      <Botanical className="hero-sunflower" />
      <div className="hero-content">
        <Kicker>THE WEDDING CELEBRATION OF</Kicker>
        <h1 id="couple">
          <span>{w.groomName}</span>
          <em>&</em>
          <span>{w.brideName}</span>
        </h1>
        <p className="hero-invitation">{w.invitation}</p>
        <div className="hero-date">
          <span>{d.day}</span>
          <i />
          <span>
            {d.date} {d.month} {d.year}
          </span>
        </div>
        <a href="#intro" className="hero-link">
          View our wedding <ArrowDown size={15} />
        </a>
      </div>
      <div className="hero-bottom">
        <span>A NEW CHAPTER. A LIFETIME OF LOVE.</span>
        <span>{w.location}</span>
      </div>
    </section>
  );
}
export function WeddingIntro() {
  return (
    <section className="intro section" id="intro">
      <Botanical className="intro-leaf" />
      <div className="reveal">
        <Kicker>WE’RE GETTING MARRIED</Kicker>
        <h2>
          Of all the moments,
          <br />
          <em>this one is ours.</em>
        </h2>
        <span className="tiny-divider" />
        <p lang="th" className="thai intro-thai">
          {w.introduction}
        </p>
        <p className="signature">
          {w.groomName} <span>&</span> {w.brideName}
        </p>
        <Heart className="small-heart" size={17} strokeWidth={1} />
      </div>
    </section>
  );
}
export function SaveTheDate() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const tick = () =>
      setRemaining(Math.max(0, new Date(w.weddingDate).getTime() - Date.now()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  const parts =
    remaining === null
      ? ["—", "—", "—", "—"]
      : [
          Math.floor(remaining / 86400000),
          Math.floor(remaining / 3600000) % 24,
          Math.floor(remaining / 60000) % 60,
          Math.floor(remaining / 1000) % 60,
        ].map((v) => String(v).padStart(2, "0"));
  function addCalendar() {
    const stamp = (value: string) =>
      new Date(value)
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
    const escape = (s: string) =>
      s
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");
    const text = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//EN",
      "BEGIN:VEVENT",
      `UID:${stamp(w.weddingDate)}-teravat-vorada@wedding.local`,
      `DTSTAMP:${stamp(new Date().toISOString())}`,
      `DTSTART:${stamp(w.weddingDate)}`,
      `DTEND:${stamp(w.endDate)}`,
      `SUMMARY:${escape(`${w.groomName} & ${w.brideName}'s wedding`)}`,
      `LOCATION:${escape(w.venueFullName)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/calendar" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "teravat-vorada-wedding.ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="save-date section" id="date">
      <div className="reveal">
        <Kicker>A DAY TO REMEMBER</Kicker>
        <h2>
          Save <em>the</em> date
        </h2>
        <div className="date-display">
          <span>{d.day}</span>
          <strong>{d.date}</strong>
          <span>
            {d.month}
            <br />
            {d.year}
          </span>
        </div>
        <p className="serif-italic countdown-title">Until we say “I do”</p>
        <div className="countdown" aria-label="Time until our wedding">
          {parts.map((part, i) => (
            <div key={i}>
              <strong>{part}</strong>
              <span>{["DAYS", "HOURS", "MINUTES", "SECONDS"][i]}</span>
            </div>
          ))}
        </div>
        {remaining === 0 && (
          <p>Our wedding day has arrived. Let’s celebrate!</p>
        )}
        <button className="text-link calendar-link" onClick={addCalendar}>
          <CalendarDays size={15} /> Add to your calendar{" "}
          <ArrowUpRight size={14} />
        </button>
      </div>
    </section>
  );
}
const scheduleIcons = {
  welcome: Heart,
  rings: Sparkles,
  dinner: Utensils,
  celebrate: Wine,
};
export function WeddingDetails() {
  return (
    <section className="section celebration" id="celebration">
      <div className="section-heading reveal">
        <Kicker>ONE BEAUTIFUL EVENING</Kicker>
        <h2>
          The <em>celebration</em>
        </h2>
        <p>Come for the vows. Stay for the memories.</p>
      </div>
      <div className="celebration-layout reveal">
        <div className="ceremony-card">
          <Botanical />
          <Kicker>WEDDING CEREMONY & RECEPTION</Kicker>
          <h3>{w.venue}</h3>
          <p>Restaurant & Bakery</p>
          <div className="ceremony-divider" />
          <p className="ceremony-date">
            {d.day}, {d.date} {d.month} {d.year}
          </p>
          <p className="ceremony-time">
            {d.time} – {d.endTime}
          </p>
          <p className="timezone">Bangkok time · ICT (UTC+7)</p>
          <a href="#location" className="text-link">
            Explore the venue <ArrowDown size={14} />
          </a>
        </div>
        <div className="schedule">
          {w.schedule.map((item) => {
            const Icon = scheduleIcons[item.icon as keyof typeof scheduleIcons];
            return (
              <div className="schedule-item" key={item.time}>
                <time>{item.time}</time>
                <div className="schedule-symbol">
                  <Icon size={20} strokeWidth={1.2} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function Location() {
  return (
    <section className="location-section" id="location">
      <div className="location-copy reveal">
        <MapPin size={22} strokeWidth={1} />
        <Kicker>MEET US HERE</Kicker>
        <h2>
          A little garden,
          <br />
          <em>a lot of love.</em>
        </h2>
        <h3>{w.venueFullName}</h3>
        <p>{w.location}</p>
        <a
          className="button button-dark"
          href={w.googleMapUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Google Maps <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="map-wrap">
        <iframe
          src={w.mapEmbedUrl}
          title={`Map to ${w.venueFullName}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
export function DressCode() {
  return (
    <section className="section dress-code">
      <div className="reveal">
        <Kicker>A LITTLE SUNSHINE, A LITTLE WARMTH</Kicker>
        <h2>
          Dress <em>with love</em>
        </h2>
        <p>We would love to see you in these colors.</p>
        <div className="palette">
          {w.dressCodeColors.map((c) => (
            <div key={c.name}>
              <span style={{ background: c.hex }} aria-label={c.hex} />
              <p>{c.name}</p>
            </div>
          ))}
        </div>
        <p className="serif-italic dress-note">
          Wear what makes you feel beautifully you.
        </p>
      </div>
    </section>
  );
}
export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  function close() {
    dialog.current?.close();
  }
  useEffect(() => {
    if (active === null) return;
    const modal = dialog.current;
    if (!modal?.open) modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
  return (
    <section className="section gallery-section" id="gallery">
      <div className="gallery-heading reveal">
        <div>
          <Kicker>LITTLE MOMENTS, ENDLESS LOVE</Kicker>
          <h2>
            Better <em>together</em>
          </h2>
        </div>
        <p>
          A glimpse of the love we’re celebrating.
          <br />
          {w.photosAreSamples && (
            <span className="sample-note">
              Photography inspiration · sample images
            </span>
          )}
        </p>
      </div>
      <div className="gallery-grid reveal">
        {w.galleryImages.map((photo, i) => (
          <button
            key={i}
            ref={(el) => {
              triggers.current[i] = el;
            }}
            className={`gallery-photo photo-${i}`}
            onClick={() => setActive(i)}
            aria-label={`Open photo ${i + 1}: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 600px) 50vw, 30vw"
            />
            <span>
              View moment <ArrowUpRight size={16} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Wedding photo gallery"
        onClose={() => {
          const previous = active;
          setActive(null);
          if (previous !== null) triggers.current[previous]?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setActive((i) => ((i ?? 0) + 1) % w.galleryImages.length);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setActive(
              (i) =>
                ((i ?? 0) - 1 + w.galleryImages.length) %
                w.galleryImages.length,
            );
          }
        }}
      >
        <button
          className="lightbox-close icon-button"
          aria-label="Close gallery"
          onClick={close}
          autoFocus
        >
          <X />
        </button>
        {active !== null && (
          <>
            <div className="lightbox-image">
              <Image
                src={w.galleryImages[active].src}
                alt={w.galleryImages[active].alt}
                fill
                sizes="90vw"
              />
            </div>
            <div className="lightbox-controls">
              <button
                aria-label="Previous photo"
                className="icon-button"
                onClick={() =>
                  setActive(
                    (active - 1 + w.galleryImages.length) %
                      w.galleryImages.length,
                  )
                }
              >
                <ChevronLeft />
              </button>
              <p>
                {active + 1} / {w.galleryImages.length}
              </p>
              <button
                aria-label="Next photo"
                className="icon-button"
                onClick={() => setActive((active + 1) % w.galleryImages.length)}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
export function OurStory() {
  return (
    <section className="section story-section" id="story">
      <div className="section-heading reveal">
        <Kicker>EVERY LOVE HAS A STORY</Kicker>
        <h2>
          And this <em>is ours</em>
        </h2>
      </div>
      <div className="story-timeline reveal">
        {w.timeline.map((item, i) => (
          <div className="story-item" key={item.year}>
            <span className="story-year">{item.year}</span>
            <span className="story-dot">
              {i === w.timeline.length - 1 && <Heart size={12} />}
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      {w.storyIsSample && (
        <p className="sample-note story-sample">
          Our story timeline · sample milestones
        </p>
      )}
    </section>
  );
}
export function RSVP({ demoMode }: { demoMode: boolean }) {
  const [attending, setAttending] = useState("yes");
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "demo" | "error"
  >("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || "").trim(),
          attending,
          guests: attending === "yes" ? guests : 0,
          message: form.get("message"),
          website: form.get("website"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Please try again.");
      setStatus(data.mode === "demo" ? "demo" : "success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send. Please try again.",
      );
      setStatus("error");
    }
  }
  return (
    <section className="section rsvp-section" id="rsvp">
      <div className="rsvp-copy reveal">
        <Kicker>IT WOULDN’T BE THE SAME WITHOUT YOU</Kicker>
        <h2>
          Will you
          <br />
          <em>join us?</em>
        </h2>
        <p>Your presence would make our special day even more meaningful.</p>
        <p className="thai" lang="th">
          ร่วมเป็นส่วนหนึ่งในวันสำคัญของเรา
          <br />
          เราหวังว่าจะได้พบคุณในวันนั้น
        </p>
        <Botanical />
      </div>
      <div className="rsvp-form-wrap reveal">
        {status === "success" || status === "demo" ? (
          <div className="rsvp-thanks" role="status">
            <span className="thanks-icon">
              <Check size={26} />
            </span>
            <h3>{status === "demo" ? "Preview complete." : "Thank you."}</h3>
            <p>
              {status === "demo"
                ? "This is a preview. Your response has not been sent to the couple."
                : attending === "yes"
                  ? "We can’t wait to celebrate with you."
                  : "We’ll miss you and will hold your wishes close."}
            </p>
            {status === "demo" && (
              <p className="thai" lang="th">
                แบบฟอร์มตัวอย่าง — ยังไม่ได้ส่งคำตอบถึงคู่บ่าวสาว
              </p>
            )}
            <button className="text-link" onClick={() => setStatus("idle")}>
              Back to invitation <ArrowUpRight size={14} />
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            {demoMode && (
              <p className="demo-notice" lang="th">
                แบบฟอร์มตัวอย่าง — ยังไม่เปิดรับ RSVP จริง
              </p>
            )}
            <label htmlFor="guest-name">
              Your full name <span>ชื่อ–นามสกุล</span>
            </label>
            <input
              id="guest-name"
              name="name"
              autoComplete="name"
              required
              maxLength={120}
              placeholder="How shall we call you?"
              pattern=".*\S.*"
            />
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <fieldset>
              <legend>Will you attend?</legend>
              <label
                className={`radio-choice ${attending === "yes" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={() => setAttending("yes")}
                />
                <span>Yes, I’ll be there</span>
                <Heart size={15} />
              </label>
              <label
                className={`radio-choice ${attending === "no" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                />
                <span>Sorry, I can’t make it</span>
              </label>
            </fieldset>
            {attending === "yes" && (
              <fieldset>
                <legend>
                  Number of guests <span>Including yourself</span>
                </legend>
                <div className="guest-count">
                  {[1, 2, 3].map((n) => (
                    <button
                      type="button"
                      aria-pressed={guests === n}
                      className={guests === n ? "selected" : ""}
                      key={n}
                      onClick={() => setGuests(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            <label htmlFor="guest-message">
              A little note for us <span>Optional</span>
            </label>
            <textarea
              id="guest-message"
              name="message"
              rows={3}
              maxLength={2000}
              placeholder="Leave a wish, a memory, a little love…"
            />
            <button
              className="button button-dark submit-button"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <LoaderCircle size={16} className="spin" /> Sending…
                </>
              ) : (
                <>
                  Confirm RSVP <ArrowUpRight size={16} />
                </>
              )}
            </button>
            {status === "error" && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <p className="form-footnote">
              Your details are used only to arrange our celebration.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
export function Contact() {
  return (
    <section className="contact-section section">
      <div className="reveal">
        <Kicker>A LITTLE HELP FINDING YOUR WAY?</Kicker>
        <h2>
          We’re a message <em>away</em>
        </h2>
        <div className="contacts">
          {(["bride", "groom"] as const).map((role) => {
            const person = w.contact[role];
            return (
              <div key={role}>
                <span className="kicker">THE {role.toUpperCase()}</span>
                <h3>{role === "bride" ? w.brideName : w.groomName}</h3>
                <div className="contact-links">
                  {person.phone && (
                    <a href={`tel:${person.phone}`}>
                      <Phone size={14} />
                      {person.phone}
                    </a>
                  )}
                  {person.lineUrl && (
                    <a href={person.lineUrl} target="_blank" rel="noreferrer">
                      <MessageCircle size={14} /> LINE
                    </a>
                  )}
                  {!person.phone && !person.lineUrl && (
                    <p className="contact-pending">
                      Contact details coming soon
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <span className="monogram">{monogram}</span>
      <p className="footer-names">
        {w.groomName} & {w.brideName}
      </p>
      <p className="kicker">
        {d.date} {d.month} {d.year}
      </p>
      <p>Thank you for being part of our special day.</p>
      <span className="serif-italic">
        With love, always <Heart size={12} />
      </span>
    </footer>
  );
}
export function MusicButton() {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const audio = useRef<HTMLAudioElement | null>(null);
  const context = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const notes = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];
  function stop() {
    audio.current?.pause();
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    void context.current?.suspend();
    setPlaying(false);
  }
  useEffect(
    () => () => {
      audio.current?.pause();
      if (timer.current) clearInterval(timer.current);
      void context.current?.close();
    },
    [],
  );
  async function toggle() {
    setError("");
    if (playing) {
      stop();
      return;
    }
    try {
      if (w.musicUrl) {
        audio.current ??= new Audio(w.musicUrl);
        audio.current.loop = true;
        audio.current.volume = 0.25;
        await audio.current.play();
      } else {
        context.current ??= new AudioContext();
        await context.current.resume();
        let index = 0;
        const playNote = () => {
          const ctx = context.current;
          if (!ctx) return;
          const oscillator = ctx.createOscillator();
          const gain = ctx.createGain();
          oscillator.type = "sine";
          oscillator.frequency.value = notes[index++ % notes.length];
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
          oscillator.connect(gain);
          gain.connect(ctx.destination);
          oscillator.start();
          oscillator.stop(ctx.currentTime + 2.6);
          oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
          };
        };
        playNote();
        timer.current = setInterval(playNote, 1000);
      }
      setPlaying(true);
    } catch {
      setPlaying(false);
      setError("Music is unavailable. Please try again.");
    }
  }
  return (
    <div className="music-control">
      {error && <span role="status">{error}</span>}
      <button
        className={`music-button ${playing ? "playing" : ""}`}
        aria-label={
          playing ? "Pause background music" : "Play background music"
        }
        aria-pressed={playing}
        onClick={toggle}
      >
        {playing ? <Music2 size={18} /> : <VolumeX size={18} />}
        <span>{playing ? "SOUND ON" : "SOUND OFF"}</span>
      </button>
    </div>
  );
}
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
