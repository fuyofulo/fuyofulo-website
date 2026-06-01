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

const VIDEO_ID = "iAMo8JhDjGM";
const API_SRC = "https://www.youtube.com/iframe_api";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
  setVolume?: (v: number) => void;
  mute?: () => void;
  unMute?: () => void;
};

type YTNamespace = {
  Player: new (
    el: HTMLElement,
    options: {
      videoId: string;
      width: number;
      height: number;
      playerVars: Record<string, string | number>;
      events: {
        onReady: () => void;
        onStateChange: (e: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

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
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function init() {
      if (cancelled || !hostRef.current || !window.YT) return;
      const host = document.createElement("div");
      hostRef.current.innerHTML = "";
      hostRef.current.appendChild(host);
      playerRef.current = new window.YT.Player(host, {
        videoId: VIDEO_ID,
        width: 1,
        height: 1,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            try {
              playerRef.current?.setVolume?.(60);
            } catch {
              /* ignore */
            }
            setReady(true);
          },
          onStateChange: (event) => {
            if (cancelled) return;
            const states = window.YT?.PlayerState;
            if (!states) return;
            if (event.data === states.PLAYING) setPlaying(true);
            else if (
              event.data === states.PAUSED ||
              event.data === states.ENDED
            ) {
              setPlaying(false);
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      init();
    } else {
      // hand off to the API loader callback
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        init();
      };
      if (!document.querySelector(`script[src="${API_SRC}"]`)) {
        const tag = document.createElement("script");
        tag.src = API_SRC;
        tag.async = true;
        document.body.appendChild(tag);
      }
    }

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, []);

  const play = useCallback(() => {
    try {
      playerRef.current?.playVideo();
    } catch {
      /* ignore */
    }
  }, []);

  const pause = useCallback(() => {
    try {
      playerRef.current?.pauseVideo();
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      try {
        if (next) playerRef.current?.mute?.();
        else playerRef.current?.unMute?.();
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <MusicPlayerContext.Provider value={{ ready, playing, muted, play, pause, toggle, toggleMute }}>
      {children}
      <div ref={hostRef} className="yt-host" aria-hidden="true" />
    </MusicPlayerContext.Provider>
  );
}
