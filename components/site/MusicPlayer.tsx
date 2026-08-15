"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* Self-hosted <audio> — replaced the YouTube iframe player entirely. Playback
   is instant, there is no third-party script, and preload="metadata" keeps the
   track off the wire until someone actually presses play. */
const TRACK_SRC = "/audio/cutie-pie-instrumental.mp3";
const VOLUME = 0.6;

type MusicPlayerCtx = {
  ready: boolean;
  playing: boolean;
  muted: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  toggleMute: () => void;
};

const MusicPlayerContext = createContext<MusicPlayerCtx | null>(null);

export function useMusicPlayer(): MusicPlayerCtx {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) {
    throw new Error("useMusicPlayer must be used inside MusicPlayerProvider");
  }
  return ctx;
}

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.volume = VOLUME;
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {
      /* autoplay policy — a real user gesture will succeed */
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  /* Reads the element's own paused flag rather than React state so a
     double-click can never get out of sync. */
  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {
        /* ignore */
      });
    } else {
      a.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{ ready: true, playing, muted, play, pause, toggle, toggleMute }}
    >
      {children}
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </MusicPlayerContext.Provider>
  );
}
