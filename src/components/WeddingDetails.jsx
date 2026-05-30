import { Clock, MapPin, Sparkles } from 'lucide-react';

export default function WeddingDetails({ data }) {
  const detailCards = [
    {
      title: 'Ceremony',
      icon: Clock,
      lines: [data.ceremony.date, data.ceremony.time],
    },
    {
      title: 'Reception',
      icon: Sparkles,
      lines: [data.reception.date, data.reception.time],
    },
    {
      title: data.venue.name,
      icon: MapPin,
      lines: [data.venue.address],
    },
  ];

  return (
    <section className="section details-section" aria-labelledby="details-title">
      <div className="section__inner">
        <p className="eyebrow">The Celebration</p>
        <h2 id="details-title">Wedding Details</h2>
        <div className="details-grid">
          {detailCards.map(({ title, icon: Icon, lines }) => (
            <article className="detail-card" key={title}>
              <Icon size={24} aria-hidden="true" />
              <h3>{title}</h3>
              {lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </article>
          ))}
        </div>
        <p className="guest-note">{data.venue.note}</p>
      </div>
    </section>
  );
}
