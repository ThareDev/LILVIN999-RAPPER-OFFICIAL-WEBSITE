"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import album1 from "@/public/hhh.jpg";
import album2 from "@/public/jjjj.jpg";
import album3 from "@/public/kkk.jpg";

interface Track {
  num: string;
  title: string;
  feat: string;
  album: string;
  duration: string;
  hot: boolean;
  youtube: string;
}

const initialTracks: Track[] = [
  { num: "01", title: "Block Money", feat: "ft Smokio", album: "LILVIN999", duration: "4:51", hot: true, youtube: "" },
  { num: "02", title: "No Trust St", feat: "Ft Costa", album: "LILVIN999", duration: "4:08", hot: false, youtube: "" },
  { num: "03", title: "Hustle Hard Ave", feat: "", album: "LILVIN999", duration: "3:40", hot: false, youtube: "" },
  { num: "04", title: "999 Anthem", feat: "Ft Praba", album: "LILVIN999", duration: "5:00", hot: false, youtube: "" },
  { num: "05", title: "Receipts", feat: "", album: "LILVIN999", duration: "6:08", hot: false, youtube: "" },
  { num: "06", title: "Loyalty Hook", feat: "Costa x LILVIN999", album: "LILVIN999", duration: "2:50", hot: false, youtube: "" },
  { num: "07", title: "Fear None", feat: "Ft Praba", album: "LILVIN999", duration: "3:35", hot: false, youtube: "" },
];

function getYouTubeID(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  return match ? match[1] : null;
}

interface YTPlayer {
  destroy(): void;
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getDuration(): number;
  getCurrentTime(): number;
}
interface YTOnStateChangeEvent { data: number; }
interface YTPlayerConstructor {
  new (el: HTMLElement | string, opts: {
    height: string; width: string; videoId: string;
    playerVars: Record<string, number>;
    events: Record<string, (e: YTOnStateChangeEvent) => void>;
  }): YTPlayer;
}
interface YTAPI { Player: YTPlayerConstructor; PlayerState: { PLAYING: number; ENDED: number }; }
interface CustomWindow extends Window { YT?: YTAPI; onYouTubeIframeAPIReady?: () => void; }
declare const window: CustomWindow;

export default function Music() {
  const [trackList, setTrackList] = useState<Track[]>(initialTracks);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");

  const playerRef = useRef<YTPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  const destroyPlayer = () => {
    if (playerRef.current) { try { playerRef.current.destroy(); } catch {} playerRef.current = null; }
    clearInterval(progressInterval.current);
    progressInterval.current = undefined;
    setProgress(0); setCurrentTime("0:00");
  };

  const loadAndPlay = (index: number) => {
    const videoId = getYouTubeID(trackList[index].youtube);
    if (!videoId) return;
    destroyPlayer();
    setCurrentIndex(index); setIsPlaying(true);
    const init = () => {
      if (!playerContainerRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        height: "0", width: "0", videoId,
        playerVars: { autoplay: 1, controls: 0 },
        events: {
          onStateChange: (e: YTOnStateChangeEvent) => {
            if (window.YT && e.data === window.YT.PlayerState.PLAYING) {
              clearInterval(progressInterval.current);
              progressInterval.current = setInterval(() => {
                const dur = playerRef.current?.getDuration() ?? 0;
                const cur = playerRef.current?.getCurrentTime() ?? 0;
                if (dur > 0) setProgress((cur / dur) * 100);
                const m = Math.floor(cur / 60);
                const s = Math.floor(cur % 60).toString().padStart(2, "0");
                setCurrentTime(`${m}:${s}`);
              }, 500);
            }
            if (window.YT && e.data === window.YT.PlayerState.ENDED) {
              clearInterval(progressInterval.current);
              const next = index + 1;
              if (next < trackList.length) loadAndPlay(next);
              else { setIsPlaying(false); setProgress(0); setCurrentTime("0:00"); }
            }
          },
        },
      });
    };
    if (window.YT?.Player) init(); else window.onYouTubeIframeAPIReady = init;
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) { playerRef.current.pauseVideo(); clearInterval(progressInterval.current); }
    else { playerRef.current.playVideo(); }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = (dir: number) => {
    const base = currentIndex ?? 0;
    const next = base + dir;
    if (next >= 0 && next < trackList.length) loadAndPlay(next);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const dur = playerRef.current.getDuration() ?? 0;
    playerRef.current.seekTo(pct * dur, true);
  };

  const saveUrl = (index: number) => {
    const updated = [...trackList];
    updated[index] = { ...updated[index], youtube: urlInput };
    setTrackList(updated);
    setEditingIndex(null); setUrlInput("");
  };

  const currentTrack = currentIndex !== null ? trackList[currentIndex] : null;

  const albums = [
    { title: "Loyalty Over Everything", year: "2026", tracks: 12, image: album1 },
    { title: "No Trust St", year: "2024", tracks: 10, image: album2 },
    { title: "Raw Debut", year: "2022", tracks: 8, image: album3 },
  ];

  return (
    <section id="music" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#080F14" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&display=swap');

        .mx-btn-outline {
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
        .mx-btn-outline:hover {
          border-color: #39FF14;
          color: #fff;
          box-shadow: 0 0 14px rgba(57,255,20,0.2);
        }

        /* now playing bar */
        .now-playing {
          background: rgba(57,255,20,0.05);
          border: 1px solid rgba(57,255,20,0.2);
        }

        /* progress bar */
        .progress-track { background: rgba(255,255,255,0.08); cursor: pointer; }
        .progress-fill { background: #39FF14; box-shadow: 0 0 8px rgba(57,255,20,0.5); }

        /* play/pause circle */
        .play-circle {
          width: 40px; height: 40px; border-radius: 50%;
          background: #39FF14;
          display: flex; align-items: center; justify-content: center;
          color: #080F14;
          font-size: 14px;
          transition: background 0.25s, box-shadow 0.25s;
          border: none; cursor: pointer;
          box-shadow: 0 0 14px rgba(57,255,20,0.35);
        }
        .play-circle:hover { background: #fff; box-shadow: 0 0 20px rgba(57,255,20,0.2); }

        /* track rows */
        .track-row {
          transition: background 0.25s ease;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .track-row:hover { background: rgba(57,255,20,0.04); }
        .track-row.active { background: rgba(57,255,20,0.07); }

        /* mini waveform bars */
        .bar { background: rgba(255,255,255,0.1); transition: background 0.25s, height 0.25s; }
        .bar.active { background: rgba(57,255,20,0.5); }
        .track-row:hover .bar { background: rgba(57,255,20,0.25); }

        /* HOT tag */
        .hot-tag {
          font-family: 'Oswald', sans-serif;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: #39FF14;
          color: #080F14;
          padding: 2px 8px;
          font-weight: 700;
        }

        /* URL save button */
        .url-save-btn {
          font-family: 'Oswald', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: #39FF14;
          color: #080F14;
          padding: 7px 16px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          transition: background 0.2s;
        }
        .url-save-btn:hover { background: #fff; }

        /* album tiles */
        .album-tile { position: relative; overflow: hidden; cursor: pointer; }
        .album-tile::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(8,15,20,0.88) 0%, rgba(8,15,20,0.2) 55%, rgba(0,163,255,0.08) 100%);
          transition: background 0.35s ease;
        }
        .album-tile:hover::after {
          background: linear-gradient(to top, rgba(8,15,20,0.65) 0%, rgba(8,15,20,0.1) 55%, rgba(57,255,20,0.1) 100%);
        }
        .album-tile img { transition: transform 0.6s ease; }
        .album-tile:hover img { transform: scale(1.07); }
        .album-tile-info { position: relative; z-index: 10; }
      `}</style>

      {/* subtle right glow */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(0,163,255,0.04), transparent)" }}
      />

      {/* hidden YouTube mount */}
      <div ref={playerContainerRef} style={{ position: "absolute", opacity: 0, pointerEvents: "none" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: 32, height: 1, background: "#39FF14", opacity: 0.5 }} />
              <span style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 10, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#00A3FF",
              }}>
                Discography
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(38px, 6vw, 66px)",
              color: "#fff", textTransform: "uppercase",
              lineHeight: 0.95, margin: 0,
            }}>
              Latest Tracks
            </h2>
          </div>
          <a href="#" className="mx-btn-outline hidden md:block">All Music</a>
        </div>

        {/* now playing bar */}
        {currentTrack && (
          <div className="now-playing mb-8 flex flex-col md:flex-row items-center gap-4 px-5 py-4">
            <div className="flex-1 min-w-0">
              <p style={{
                fontFamily: "'Oswald', sans-serif", fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#39FF14", marginBottom: 4, opacity: 0.8,
              }}>
                Now Playing
              </p>
              <p style={{
                fontFamily: "'Anton', sans-serif", fontSize: 18,
                color: "#fff", textTransform: "uppercase", margin: 0,
              }} className="truncate">
                {currentTrack.title}
              </p>
              {currentTrack.feat && (
                <p style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: 11,
                  color: "rgba(0,163,255,0.7)", textTransform: "uppercase",
                }}>
                  {currentTrack.feat}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-64">
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                {currentTime}
              </span>
              <div className="progress-track flex-1 h-1 rounded-full" onClick={handleProgressClick}>
                <div className="progress-fill h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                {currentTrack.duration}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => skipTrack(-1)} style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, background: "none", border: "none", cursor: "pointer" }}
                className="hover:text-white transition-colors">⏮</button>
              <button onClick={togglePlay} className="play-circle">
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button onClick={() => skipTrack(1)} style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, background: "none", border: "none", cursor: "pointer" }}
                className="hover:text-white transition-colors">⏭</button>
            </div>
          </div>
        )}

        {/* track list */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {trackList.map((track, i) => (
            <div key={track.num}>
              <div className={`track-row group flex items-center gap-4 lg:gap-8 py-4 px-4 ${currentIndex === i ? "active" : ""}`}>

                {/* number / play icon */}
                <div className="w-8 text-center relative cursor-pointer" onClick={() => loadAndPlay(i)}>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)" }}
                    className={`transition-opacity ${currentIndex === i ? "opacity-0" : "group-hover:opacity-0"}`}>
                    {track.num}
                  </span>
                  <span style={{ color: currentIndex === i ? "#39FF14" : "rgba(57,255,20,0.7)" }}
                    className={`absolute inset-0 flex items-center justify-center text-sm ${currentIndex === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    {currentIndex === i && isPlaying ? "⏸" : "▶"}
                  </span>
                </div>

                {/* waveform */}
                <div className="hidden md:flex items-center gap-0.5 h-6">
                  {Array.from({ length: 16 }).map((_, j) => (
                    <div key={j} className={`bar w-0.5 rounded-full ${currentIndex === i && isPlaying ? "active" : ""}`}
                      style={{ height: `${((j * 37) % 70) + 30}%` }} />
                  ))}
                </div>

                {/* title */}
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => loadAndPlay(i)}>
                  <div className="flex items-center gap-3">
                    <span style={{
                      fontFamily: "'Oswald', sans-serif", fontSize: 15,
                      textTransform: "uppercase", letterSpacing: "0.02em",
                      color: currentIndex === i ? "#39FF14" : "#fff",
                    }} className="truncate">
                      {track.title}
                    </span>
                    {track.hot && <span className="hot-tag flex-shrink-0">Hot</span>}
                  </div>
                  {track.feat && (
                    <span style={{
                      fontFamily: "'Oswald', sans-serif", fontSize: 11,
                      color: "rgba(0,163,255,0.55)", textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>
                      {track.feat}
                    </span>
                  )}
                </div>

                {/* album */}
                <div className="hidden lg:block flex-shrink-0 w-44">
                  <span style={{
                    fontFamily: "'Oswald', sans-serif", fontSize: 11,
                    color: "rgba(0,163,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>
                    {track.album}
                  </span>
                </div>

                {/* duration */}
                <div className="flex-shrink-0" style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)",
                }}>
                  {track.duration}
                </div>

                {/* actions */}
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditingIndex(i); setUrlInput(track.youtube ?? ""); }}
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "rgba(57,255,20,0.5)", background: "none", border: "none", cursor: "pointer" }}
                    className="hover:text-white transition-colors uppercase tracking-wider"
                    title="Set YouTube link">
                    {track.youtube ? "🔗" : "+ URL"}
                  </button>
                  <button style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer" }}
                    className="hover:text-white transition-colors text-sm">♡</button>
                  <button style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer" }}
                    className="hover:text-white transition-colors text-sm">⋯</button>
                </div>
              </div>

              {/* URL input row */}
              {editingIndex === i && (
                <div className="flex items-center gap-3 px-4 py-3"
                  style={{ background: "rgba(57,255,20,0.04)", borderBottom: "1px solid rgba(57,255,20,0.1)" }}>
                  <span style={{
                    fontFamily: "'Oswald', sans-serif", fontSize: 10,
                    color: "#39FF14", textTransform: "uppercase", letterSpacing: "0.15em",
                  }} className="flex-shrink-0">
                    YouTube URL
                  </span>
                  <input type="text" value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveUrl(i)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 px-3 py-1.5 text-sm focus:outline-none"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      background: "rgba(57,255,20,0.04)",
                      border: "1px solid rgba(57,255,20,0.2)",
                      color: "#fff",
                    }}
                    autoFocus />
                  <button onClick={() => saveUrl(i)} className="url-save-btn">Save</button>
                  <button onClick={() => setEditingIndex(null)}
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer" }}
                    className="hover:text-white transition-colors px-2 uppercase tracking-widest">✕</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* albums grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {albums.map((album) => (
            <div key={album.title} className="album-tile group relative aspect-square">
              <Image src={album.image} alt={album.title} fill className="object-cover" />
              {/* neon grid overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage:
                  "linear-gradient(rgba(57,255,20,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.12) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 album-tile-info">
                <p style={{
                  fontFamily: "'Anton', sans-serif", fontSize: 16,
                  color: "#fff", textTransform: "uppercase", lineHeight: 1.1,
                }}>
                  {album.title}
                </p>
                <p style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: 10,
                  letterSpacing: "0.15em", color: "#39FF14",
                  textTransform: "uppercase", marginTop: 4, opacity: 0.8,
                }}>
                  {album.year} · {album.tracks} Tracks
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}