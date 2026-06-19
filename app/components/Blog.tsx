const posts = [
  {
    category: "Behind the Scenes",
    title: "Inside the '999 Sessions' All-Nighter",
    excerpt: "36 hours straight in the booth. Here's what really went down when we recorded the title track.",
    date: "Apr 2, 2026",
    readTime: "5 min read",
  },
  {
    category: "Tour Diary",
    title: "Galle Was Wild — A Night I Won't Forget",
    excerpt: "Thousands deep, one mic, zero rehearsal. The Galle show went harder than anything I've done.",
    date: "Mar 28, 2026",
    readTime: "4 min read",
  },
  {
    category: "Industry Talk",
    title: "Why I Turned Down the Major Label Deal",
    excerpt: "They came with numbers I'd never seen. I walked away anyway. Here's the honest reason why.",
    date: "Mar 15, 2026",
    readTime: "7 min read",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="relative py-24 lg:py-32" style={{ background: "#080F14" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&display=swap');

        .blog-card {
          position: relative;
          border: 1px solid rgba(57,255,20,0.1);
          background: #0A1520;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .blog-card:hover {
          border-color: rgba(57,255,20,0.35);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(57,255,20,0.06);
        }

        .blog-cat {
          font-family: 'Oswald', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #39FF14;
          display: block;
          margin-bottom: 10px;
          opacity: 0.8;
        }

        .blog-title {
          font-family: 'Anton', sans-serif;
          color: #fff;
          text-transform: uppercase;
          transition: color 0.3s ease;
          line-height: 1.05;
        }
        .blog-card:hover .blog-title { color: #39FF14; }

        .blog-meta {
          font-family: 'Oswald', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }
        .blog-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(57,255,20,0.3);
          display: inline-block;
        }

        .blog-outline-btn {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #39FF14;
          background: transparent;
          border: 1px solid rgba(57,255,20,0.35);
          padding: 9px 22px;
          transition: border-color 0.25s, color 0.25s, box-shadow 0.25s;
          text-decoration: none;
          display: inline-block;
        }
        .blog-outline-btn:hover {
          border-color: #39FF14;
          color: #fff;
          box-shadow: 0 0 14px rgba(57,255,20,0.2);
        }

        /* noise texture on cards */
        .blog-noise {
          background-image: repeating-linear-gradient(
            45deg,
            rgba(57,255,20,0.03) 0,
            rgba(57,255,20,0.03) 1px,
            transparent 0,
            transparent 50%
          );
          background-size: 12px 12px;
        }

        /* left accent border on featured card */
        .blog-card-featured::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, #39FF14, transparent);
          opacity: 0.5;
        }

        .blog-card-side::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, #00A3FF, transparent);
          opacity: 0.4;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: 32, height: 1, background: "#39FF14", opacity: 0.5 }} />
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#00A3FF",
                }}
              >
                Words
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(38px, 6vw, 66px)",
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              Latest News
            </h2>
          </div>
          <a href="#" className="blog-outline-btn hidden md:block">View All</a>
        </div>

        {/* featured + side posts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* featured (large) */}
          <div className="lg:col-span-2 blog-card blog-card-featured group cursor-pointer">
            <div className="relative aspect-video overflow-hidden">
              {/* gradient fill — no image here, stylized placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(57,255,20,0.08) 0%, rgba(0,163,255,0.06) 50%, rgba(8,15,20,0.9) 100%)",
                }}
              />
              <div className="blog-noise absolute inset-0 opacity-60" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, #080F14 5%, transparent 55%)" }}
              />

              <div className="absolute inset-0 flex items-end p-6 lg:p-8">
                <div>
                  <span className="blog-cat">{posts[0].category}</span>
                  <h3
                    className="blog-title mb-3"
                    style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
                  >
                    {posts[0].title}
                  </h3>
                  <p
                    className="hidden lg:block max-w-lg"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.7,
                    }}
                  >
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="blog-meta">{posts[0].date}</span>
                    <span className="blog-dot" />
                    <span className="blog-meta">{posts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* side posts */}
          <div className="flex flex-col gap-5">
            {posts.slice(1).map((post) => (
              <div key={post.title} className="blog-card blog-card-side group cursor-pointer flex-1">
                <div className="relative h-full min-h-[180px] overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(0,163,255,0.07) 0%, rgba(8,15,20,0.95) 70%)",
                    }}
                  />
                  <div className="blog-noise absolute inset-0 opacity-40" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #0A1520 10%, transparent 65%)" }}
                  />

                  <div className="absolute inset-0 flex items-end p-5">
                    <div>
                      <span className="blog-cat" style={{ color: "#00A3FF" }}>
                        {post.category}
                      </span>
                      <h3 className="blog-title" style={{ fontSize: "clamp(15px, 2vw, 21px)" }}>
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="blog-meta">{post.date}</span>
                        <span className="blog-dot" style={{ background: "rgba(0,163,255,0.4)" }} />
                        <span className="blog-meta">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* mobile view all */}
        <div className="mt-8 flex justify-center md:hidden">
          <a href="#" className="blog-outline-btn">View All Posts</a>
        </div>
      </div>
    </section>
  );
}