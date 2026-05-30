import { CalendarHeart } from 'lucide-react';

export default function Hero({ data }) {
  return (
    <section className="hero" aria-label="Wedding invitation opening">
      <img className="hero__image" src={data.heroImage} alt="" />
      <div className="hero__overlay" />
      <div className="hero__content reveal">
        <p className="eyebrow">Wedding Invitation</p>
        <h1>
          {data.brideName}
          <span>&</span>
          {data.groomName}
        </h1>
        <div className="hero__date">
          <CalendarHeart size={20} aria-hidden="true" />
          <span>{data.weddingDate}</span>
        </div>
        <p className="hero__text">{data.welcomeText}</p>
      </div>
    </section>
  );
}
