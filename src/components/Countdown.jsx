import { useEffect, useMemo, useState } from 'react';

function getRemaining(targetDate) {
  const target = new Date(String(targetDate).replace(' ', 'T')).getTime();

  if (Number.isNaN(target)) {
    return null;
  }

  const distance = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function Countdown({ targetDate }) {
  const initialValue = useMemo(() => getRemaining(targetDate), [targetDate]);
  const [remaining, setRemaining] = useState(initialValue);

  useEffect(() => {
    setRemaining(getRemaining(targetDate));
    const timer = window.setInterval(() => {
      setRemaining(getRemaining(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  const units = remaining
    ? [
        ['Days', remaining.days],
        ['Hours', remaining.hours],
        ['Minutes', remaining.minutes],
        ['Seconds', remaining.seconds],
      ]
    : [
        ['Days', '--'],
        ['Hours', '--'],
        ['Minutes', '--'],
        ['Seconds', '--'],
      ];

  return (
    <section className="section countdown-section" aria-labelledby="countdown-title">
      <div className="section__inner">
        <p className="eyebrow">Counting Down</p>
        <h2 id="countdown-title">Until We Say I Do</h2>
        <div className="countdown" role="timer" aria-live="polite">
          {units.map(([label, value]) => (
            <div className="countdown__item" key={label}>
              <strong>{String(value).padStart(2, '0')}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        {!remaining && (
          <p className="helper-text">Update the countdown target in the wedding config file.</p>
        )}
      </div>
    </section>
  );
}
