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
  { num: "01", title: "CLOSE", feat: "ft Clessoff (Remix)", album: "LILVIN999", duration: "3:30", hot: true, youtube: "https://youtu.be/sv6oICe5qoo?si=ajsu_qGE7pqNldaB" },
  { num: "02", title: "PORO PAARA", feat: "", album: "LILVIN999", duration: "3:30", hot: false, youtube: "https://youtu.be/-XLSkpaaEOU?si=TIzmwtkJQYm2yITl" },
  { num: "03", title: "ALUGOZU", feat: "ft Zana Beatz", album: "LILVIN999", duration: "3:30", hot: false, youtube: "https://youtu.be/JXbJFBZYP-E?si=LYiLPR3qPkJKa4um" },
  { num: "04", title: "LEAN", feat: "", album: "LILVIN999", duration: "3:30", hot: false, youtube: "https://youtu.be/qSSz4Ssvraw?si=ahLKQpCXmDIopoFL" },
  { num: "05", title: "MONARU", feat: "", album: "LILVIN999", duration: "3:30", hot: false, youtube: "https://youtu.be/qsyrs73aLdY?si=1YSuM5e-WmoURQ-Q" },
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
  new (el: string, opts: {
    height: string; width: string; videoId: string;
    playerVars: Record<string, number>;
    events: Record<string, (e: YTOnStateChangeEvent) => void>;
  }): YTPlayer;
}
interface YTAPI { Player: YTPlayerConstructor; PlayerState: { PLAYING: number; ENDED: number; PAUSED: number }; }
interface CustomWindow extends Window { YT?: YTAPI; onYouTubeIframeAPIReady?: () => void; }
declare const window: CustomWindow;

let ytApiReady = false;
const ytReadyCallbacks: (() => void)[] = [];

function ensureYTApi(cb: () => void) {
  if (ytApiReady && window.YT?.Player) { cb(); return; }
  ytReadyCallbacks.push(cb);
  if (!document.getElementById("yt-api-script")) {
    const tag = document.createElement("script");
    tag.id = "yt-api-script";
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      ytApiReady = true;
      ytReadyCallbacks.forEach(fn => fn());
      ytReadyCallbacks.length = 0;
    };
  }
}

export default function Music() {
  const [trackList] = useState<Track[]>(initialTracks);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const [volume, setVolume] = useState(80);

  const playerRef = useRef<YTPlayer | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const playerDivId = "yt-player-div";

  const destroyPlayer = () => {
    clearInterval(progressInterval.current);
    progressInterval.current = undefined;
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch {}
      playerRef.current = null;
    }
    setProgress(0);
    setCurrentTime("0:00");
    setTotalTime("0:00");
  };

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const loadAndPlay = (index: number) => {
    const videoId = getYouTubeID(trackList[index].youtube);
    if (!videoId) return;
    destroyPlayer();
    setCurrentIndex(index);
    setIsPlaying(true);
    setPlayerOpen(true);

    ensureYTApi(() => {
      if (!window.YT) return;
      // ensure div exists
      let div = document.getElementById(playerDivId);
      if (!div) return;

      playerRef.current = new window.YT.Player(playerDivId, {
        height: "0",
        width: "0",
        videoId,
        playerVars: { autoplay: 1, controls: 0, rel: 0 },
        events: {
          onStateChange: (e: YTOnStateChangeEvent) => {
            if (!window.YT) return;
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              clearInterval(progressInterval.current);
              progressInterval.current = setInterval(() => {
                const dur = playerRef.current?.getDuration() ?? 0;
                const cur = playerRef.current?.getCurrentTime() ?? 0;
                if (dur > 0) {
                  setProgress((cur / dur) * 100);
                  setTotalTime(fmt(dur));
                }
                setCurrentTime(fmt(cur));
              }, 500);
            }
            if (e.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              clearInterval(progressInterval.current);
            }
            if (e.data === window.YT.PlayerState.ENDED) {
              clearInterval(progressInterval.current);
              const next = index + 1;
              if (next < trackList.length) loadAndPlay(next);
              else {
                setIsPlaying(false);
                setProgress(0);
                setCurrentTime("0:00");
              }
            }
          },
        },
      });
    });
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
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

  const closePlayer = () => {
    destroyPlayer();
    setPlayerOpen(false);
    setCurrentIndex(null);
    setIsPlaying(false);
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
        .mx-btn-outline:hover { border-color: #39FF14; color: #fff; box-shadow: 0 0 14px rgba(57,255,20,0.2); }

        .track-row { transition: background 0.25s ease; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .track-row:hover { background: rgba(57,255,20,0.04); }
        .track-row.active { background: rgba(57,255,20,0.07); }

        .bar { background: rgba(255,255,255,0.1); transition: background 0.25s; }
        .bar.active { background: rgba(57,255,20,0.5); animation: pulse 0.8s ease-in-out infinite alternate; }
        .track-row:hover .bar { background: rgba(57,255,20,0.25); }
        @keyframes pulse { from { opacity: 0.4; } to { opacity: 1; } }

        .hot-tag {
          font-family: 'Oswald', sans-serif; font-size: 9px; letter-spacing: 0.15em;
          text-transform: uppercase; background: #39FF14; color: #080F14;
          padding: 2px 8px; font-weight: 700;
        }

        /* ── MUSIC PLAYER MODAL ── */
        .player-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .player-modal {
          width: min(480px, 94vw);
          background: #0B1520;
          border: 1px solid rgba(57,255,20,0.2);
          box-shadow: 0 0 60px rgba(57,255,20,0.08), 0 0 120px rgba(0,163,255,0.05);
          padding: 32px 28px 28px;
          position: relative;
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .player-close {
          position: absolute; top: 16px; right: 18px;
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.3); font-size: 18px;
          transition: color 0.2s;
        }
        .player-close:hover { color: #39FF14; }

        .player-track-label {
          font-family: 'Oswald', sans-serif; font-size: 9px;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #39FF14; opacity: 0.7; margin-bottom: 6px;
        }
        .player-track-title {
          font-family: 'Anton', sans-serif; font-size: 26px;
          color: #fff; text-transform: uppercase; line-height: 1;
          margin-bottom: 4px;
        }
        .player-track-feat {
          font-family: 'Oswald', sans-serif; font-size: 11px;
          color: rgba(0,163,255,0.7); text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* waveform visualizer */
        .player-vis {
          display: flex; align-items: center; gap: 2px;
          height: 40px; margin: 24px 0 20px;
        }
        .vis-bar {
          flex: 1; border-radius: 2px;
          background: rgba(57,255,20,0.15);
          transition: background 0.3s;
        }
        .vis-bar.lit {
          background: #39FF14;
          box-shadow: 0 0 6px rgba(57,255,20,0.6);
          animation: visPulse 0.6s ease-in-out infinite alternate;
        }
        @keyframes visPulse { from { opacity: 0.5; } to { opacity: 1; } }

        /* progress */
        .player-progress-track {
          width: 100%; height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 99px; cursor: pointer; margin-bottom: 8px;
          position: relative;
        }
        .player-progress-fill {
          height: 100%; border-radius: 99px;
          background: #39FF14;
          box-shadow: 0 0 10px rgba(57,255,20,0.6);
          transition: width 0.3s linear;
        }
        .player-times {
          display: flex; justify-content: space-between;
          font-family: 'Oswald', sans-serif; font-size: 11px;
          color: rgba(255,255,255,0.3); margin-bottom: 28px;
        }

        /* controls */
        .player-controls { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 24px; }

        .ctrl-btn {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.35); font-size: 20px;
          transition: color 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .ctrl-btn:hover { color: rgba(255,255,255,0.8); }

        .ctrl-play {
          width: 56px; height: 56px; border-radius: 50%;
          background: #39FF14;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: #080F14;
          box-shadow: 0 0 24px rgba(57,255,20,0.45);
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .ctrl-play:hover { background: #fff; box-shadow: 0 0 32px rgba(57,255,20,0.3); transform: scale(1.05); }
        .ctrl-play:active { transform: scale(0.97); }

        /* volume */
        .player-volume { display: flex; align-items: center; gap-10px; gap: 10px; }
        .vol-icon { font-size: 14px; color: rgba(255,255,255,0.3); }
        .vol-slider {
          flex: 1; appearance: none; height: 3px;
          background: rgba(255,255,255,0.1); border-radius: 99px; outline: none; cursor: pointer;
        }
        .vol-slider::-webkit-slider-thumb {
          appearance: none; width: 12px; height: 12px;
          border-radius: 50%; background: #39FF14;
          box-shadow: 0 0 6px rgba(57,255,20,0.5);
          cursor: pointer;
        }

        /* track list in player */
        .player-tracklist { margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
        .player-track-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          cursor: pointer;
          transition: background 0.2s;
        }
        .player-track-item:hover { background: rgba(57,255,20,0.04); }
        .player-track-item.active-track { background: rgba(57,255,20,0.07); }
        .pti-num {
          font-family: 'Oswald', sans-serif; font-size: 11px;
          color: rgba(255,255,255,0.2); width: 20px; text-align: center; flex-shrink: 0;
        }
        .pti-title {
          font-family: 'Oswald', sans-serif; font-size: 13px;
          text-transform: uppercase; letter-spacing: 0.03em; flex: 1;
        }
        .pti-dur {
          font-family: 'Oswald', sans-serif; font-size: 11px;
          color: rgba(255,255,255,0.25); flex-shrink: 0;
        }

        /* album tiles */
        .album-tile { position: relative; overflow: hidden; cursor: pointer; }
        .album-tile::after {
          content: ''; position: absolute; inset: 0;
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

      {/* hidden YT mount — always in DOM */}
      <div style={{ position: "fixed", bottom: -9999, left: -9999, opacity: 0, pointerEvents: "none" }}>
        <div id={playerDivId} />
      </div>

      {/* ── PLAYER MODAL ── */}
      {playerOpen && currentTrack && (
        <div className="player-overlay" onClick={(e) => e.target === e.currentTarget && closePlayer()}>
          <div className="player-modal">
            <button className="player-close" onClick={closePlayer}>✕</button>

            {/* track info */}
            <div className="player-track-label">Now Playing</div>
            <div className="player-track-title">{currentTrack.title}</div>
            {currentTrack.feat && <div className="player-track-feat">{currentTrack.feat}</div>}

            {/* animated waveform */}
            <div className="player-vis">
              {Array.from({ length: 28 }).map((_, j) => {
                const h = ((j * 41 + 13) % 70) + 30;
                const lit = isPlaying && j % 3 !== 0;
                return (
                  <div key={j} className={`vis-bar ${lit ? "lit" : ""}`}
                    style={{
                      height: `${h}%`,
                      animationDelay: `${(j * 0.07) % 0.6}s`,
                    }} />
                );
              })}
            </div>

            {/* progress bar */}
            <div className="player-progress-track" onClick={handleProgressClick}>
              <div className="player-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="player-times">
              <span>{currentTime}</span>
              <span>{totalTime}</span>
            </div>

            {/* controls */}
            <div className="player-controls">
              <button className="ctrl-btn" onClick={() => skipTrack(-1)} title="Previous">⏮</button>
              <button className="ctrl-play" onClick={togglePlay}>
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button className="ctrl-btn" onClick={() => skipTrack(1)} title="Next">⏭</button>
            </div>

            {/* volume */}
            <div className="player-volume">
              <span className="vol-icon">🔈</span>
              <input type="range" min={0} max={100} value={volume} className="vol-slider"
                onChange={(e) => setVolume(Number(e.target.value))} />
              <span className="vol-icon">🔊</span>
            </div>

            {/* mini tracklist */}
            <div className="player-tracklist">
              {trackList.map((t, i) => (
                <div key={t.num} className={`player-track-item ${currentIndex === i ? "active-track" : ""}`}
                  onClick={() => loadAndPlay(i)}>
                  <span className="pti-num">{currentIndex === i && isPlaying ? "▶" : t.num}</span>
                  <span className="pti-title" style={{ color: currentIndex === i ? "#39FF14" : "rgba(255,255,255,0.7)" }}>
                    {t.title}
                  </span>
                  <span className="pti-dur">{t.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* right glow */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(0,163,255,0.04), transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: 32, height: 1, background: "#39FF14", opacity: 0.5 }} />
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#00A3FF" }}>
                Discography
              </span>
            </div>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(38px, 6vw, 66px)", color: "#fff", textTransform: "uppercase", lineHeight: 0.95, margin: 0 }}>
              Latest Tracks
            </h2>
          </div>
          <a href="#" className="mx-btn-outline hidden md:block">All Music</a>
        </div>

        {/* track list */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {trackList.map((track, i) => (
            <div key={track.num}
              className={`track-row group flex items-center gap-4 lg:gap-8 py-4 px-4 cursor-pointer ${currentIndex === i ? "active" : ""}`}
              onClick={() => loadAndPlay(i)}>

              {/* number / play */}
              <div className="w-8 text-center relative">
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
                    style={{ height: `${((j * 37) % 70) + 30}%`, animationDelay: `${(j * 0.05) % 0.4}s` }} />
                ))}
              </div>

              {/* title */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, textTransform: "uppercase", letterSpacing: "0.02em", color: currentIndex === i ? "#39FF14" : "#fff" }} className="truncate">
                    {track.title}
                  </span>
                  {track.hot && <span className="hot-tag flex-shrink-0">Hot</span>}
                </div>
                {track.feat && (
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "rgba(0,163,255,0.55)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {track.feat}
                  </span>
                )}
              </div>

              {/* album */}
              <div className="hidden lg:block flex-shrink-0 w-44">
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "rgba(0,163,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {track.album}
                </span>
              </div>

              {/* duration */}
              <div className="flex-shrink-0" style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
                {track.duration}
              </div>
            </div>
          ))}
        </div>

        {/* albums grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {albums.map((album) => (
            <div key={album.title} className="album-tile group relative aspect-square">
              <Image src={album.image} alt={album.title} fill className="object-cover" />
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(57,255,20,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.12) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 album-tile-info">
                <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, color: "#fff", textTransform: "uppercase", lineHeight: 1.1 }}>{album.title}</p>
                <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: "0.15em", color: "#39FF14", textTransform: "uppercase", marginTop: 4, opacity: 0.8 }}>
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