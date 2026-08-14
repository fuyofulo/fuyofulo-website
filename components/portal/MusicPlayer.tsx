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

/* The YouTube embed is ~1.3MB of script + iframe, so it must not compete with
   the hero's images and fonts — but a fully lazy player made the first vinyl
   click take seconds on a cold cache. Middle path: the player warms up in the
   background once the page has finished loading, so the first click is
   effectively instant. A click that beats the warm-up queues the intent and
   onReady flushes it. */
export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const initStartedRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    return () => {
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      initStartedRef.current = false;
    };
  }, []);

  const ensureInit = useCallback(() => {
    if (initStartedRef.current) return;
    initStartedRef.current = true;

    function createPlayer() {
      if (!hostRef.current || !window.YT || playerRef.current) return;
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
            try {
              playerRef.current?.setVolume?.(60);
            } catch {
              /* ignore */
            }
            setReady(true);
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              try {
                playerRef.current?.playVideo();
              } catch {
                /* ignore */
              }
            }
          },
          onStateChange: (event) => {
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
      createPlayer();
    } else {
      // hand off to the API loader callback
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        createPlayer();
      };
      if (!document.querySelector(`script[src="${API_SRC}"]`)) {
        const tag = document.createElement("script");
        tag.src = API_SRC;
        tag.async = true;
        document.body.appendChild(tag);
      }
    }
  }, []);


  /* Warm-up: init once the page settles (load event, then idle). ensureInit
     is idempotent, so racing an early click is harmless. */
  useEffect(() => {
    let idleHandle: number | undefined;
    let timerHandle: ReturnType<typeof setTimeout> | undefined;

    const scheduleIdle = () => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(() => ensureInit(), {
          timeout: 4000,
        });
      } else {
        timerHandle = setTimeout(ensureInit, 1200);
      }
    };

    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      window.addEventListener("load", scheduleIdle, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleIdle);
      if (idleHandle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timerHandle !== undefined) clearTimeout(timerHandle);
    };
  }, [ensureInit]);

  const play = useCallback(() => {
    if (playerRef.current && ready) {
      try {
        playerRef.current.playVideo();
      } catch {
        /* ignore */
      }
      return;
    }
    pendingPlayRef.current = true;
    ensureInit();
  }, [ready, ensureInit]);

  const pause = useCallback(() => {
    pendingPlayRef.current = false;
    try {
      playerRef.current?.pauseVideo();
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    if (playing || pendingPlayRef.current) pause();
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
