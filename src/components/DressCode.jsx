export default function DressCode({ colors }) {
  return (
    <section className="section dress-section" aria-labelledby="dress-title">
      <div className="section__inner split-layout">
        <div>
          <p className="eyebrow">Guest Attire</p>
          <h2 id="dress-title">Dress Color Code</h2>
          <p className="section-copy">
            We would love to see our celebration dressed in soft, harmonious tones.
          </p>
        </div>
        <div className="swatch-grid" aria-label="Recommended dress colors">
          {colors.map((color) => (
            <div className="swatch-card" key={color.hex}>
              <span
                className="swatch"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <div>
                <h3>{color.name}</h3>
                <p>{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
