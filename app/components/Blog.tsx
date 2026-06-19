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
    <section id="blog" className="relative py-24 lg:py-32" style={{ background: "#070C0A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Permanent+Marker&display=swap');

        .blog-card {
          position: relative;
          border: 1px solid rgba(107,124,115,0.1);
          background: #0D1620;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .blog-card:hover {
          border-color: rgba(46,74,61,0.6);
          transform: translateY(-4px);
        }
        .blog-card .bc-overlay {
          transition: opacity 0.4s ease;
        }
        .blog-card:hover .bc-overlay { opacity: 0.85; }

        .blog-cat {
          font-family: 'Oswald', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #6B7C73;
          display: block;
          margin-bottom: 10px;
        }
        .blog-title {
          font-family: 'Anton', sans-serif;
          color: #fff;
          text-transform: uppercase;
          transition: color 0.3s ease;
          line-height: 1.05;
        }
        .blog-card:hover .blog-title { color: #6B7C73; }

        .blog-meta {
          font-family: 'Oswald', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(107,124,115,0.4);
        }
        .blog-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(107,124,115,0.4);
        }

        .blog-outline-btn {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6B7C73;
          background: transparent;
          border: 1px solid #2E4A3D;
          padding: 9px 22px;
          transition: border-color 0.25s, color 0.25s;
        }
        .blog-outline-btn:hover { border-color: #6B7C73; color: #fff; }

        .blog-grain {
          background-image: repeating-linear-gradient(45deg, rgba(107,124,115,0.06) 0, rgba(107,124,115,0.06) 1px, transparent 0, transparent 50%);
          background-size: 12px 12px;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: 32, height: 1, background: "#2E4A3D" }} />
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#3D5666",
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
          <a href="#" className="blog-outline-btn hidden md:block">
            View All
          </a>
        </div>

        {/* featured + side posts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* featured (large) */}
          <div className="lg:col-span-2 blog-card group cursor-pointer">
            <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(46,74,61,0.4) 0%, transparent 70%)",
                }}
              />
              <div className="blog-grain absolute inset-0 opacity-40" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, #070C0A 5%, transparent 60%)" }}
              />

              <div className="absolute inset-0 flex items-end p-6 lg:p-8">
                <div>
                  <span className="blog-cat">{posts[0].category}</span>
                  <h3
                    className="blog-title mb-3"
                    style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
                  >
                    {posts[0].title}
                  </h3>
                  <p
                    className="hidden lg:block max-w-lg"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 14,
                      color: "rgba(107,124,115,0.65)",
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
              <div key={post.title} className="blog-card group cursor-pointer flex-1">
                <div className="relative h-full min-h-[180px] overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(160deg, rgba(27,45,58,0.45) 0%, transparent 70%)",
                    }}
                  />
                  <div className="blog-grain absolute inset-0 opacity-30" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #0D1620 10%, transparent 65%)" }}
                  />

                  <div className="absolute inset-0 flex items-end p-5">
                    <div>
                      <span className="blog-cat">{post.category}</span>
                      <h3 className="blog-title" style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="blog-meta">{post.date}</span>
                        <span className="blog-dot" />
                        <span className="blog-meta">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}