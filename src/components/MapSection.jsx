import { ExternalLink } from 'lucide-react';

export default function MapSection({ venue }) {
  const query = encodeURIComponent(`${venue.name} ${venue.address}`);
  const mapUrl = `https://www.google.com/maps?q=${query}`;
  const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <section className="section map-section" aria-labelledby="map-title">
      <div className="section__inner split-layout">
        <div>
          <p className="eyebrow">Location</p>
          <h2 id="map-title">{venue.name}</h2>
          <p className="section-copy">{venue.address}</p>
          <a className="map-link" href={mapUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={18} aria-hidden="true" />
            Open in Google Maps
          </a>
        </div>
        <div className="map-frame">
          <iframe
            title={`${venue.name} map`}
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
