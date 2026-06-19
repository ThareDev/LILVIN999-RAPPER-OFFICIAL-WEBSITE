export default function Ticker() {
  const items = [
    "Na Hook (feat. Costa & Marley)",
    "Kachal Kasi (feat. Smokio)",
    "Bashawa",
    "ගෑනු නැකත (Gaanu Nakatha)",
    "තේරෙයි කල් යයි (Theruyi Kal Yayi) (feat. Lil Rome Asha)",
    "Paramanu (පරමාණු)",
    "මදේ හිස් ඩිස් (Made His Dis)",
    "Visakuru Charitha (feat. S.H.A.G.I & Safa)",
    "දේවත්වෙන් (Dewathwen)",
    "Fake Chandi",
    "Mama Mama Maai",
    "දහම (Dahama)",
    "Yakkunge Vimane",
    "Ahasa Gugura",
  ];

  const repeated = [...items, ...items];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&display=swap');

        .ticker-wrap {
          overflow: hidden;
          position: relative;
          z-index: 10;
          background: #080F14;
          border-top: 1px solid rgba(57,255,20,0.2);
          border-bottom: 1px solid rgba(57,255,20,0.2);
          padding: 10px 0;
        }

        /* left/right fade masks */
        .ticker-wrap::before,
        .ticker-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .ticker-wrap::before {
          left: 0;
          background: linear-gradient(to right, #080F14, transparent);
        }
        .ticker-wrap::after {
          right: 0;
          background: linear-gradient(to left, #080F14, transparent);
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 35s linear infinite;
        }

        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }

        .ticker-item {
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
          display: flex;
          align-items: center;
        }

        .ticker-sep {
          margin: 0 24px;
          color: #39FF14;
          font-size: 8px;
          opacity: 0.8;
          text-shadow: 0 0 8px rgba(57,255,20,0.6);
        }
      `}</style>

      <div className="ticker-wrap">
        <div className="ticker-track">
          {repeated.map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-sep">◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}