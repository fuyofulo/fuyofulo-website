"use client";

import { useEffect, useState } from "react";
import { nowPlaying } from "../../lib/site-data";
import { useMusicPlayer } from "./MusicPlayer";

const LOAD_MS = 3500;

type VibeGateProps = {
  defaultDismissed?: boolean;
};

export function VibeGate({ defaultDismissed = false }: VibeGateProps) {
  const { play, ready } = useMusicPlayer();
  const [dismissed, setDismissed] = useState(defaultDismissed);
  const [timerDone, setTimerDone] = useState(defaultDismissed);
  const [primeAutoplay, setPrimeAutoplay] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const id = setTimeout(() => setTimerDone(true), LOAD_MS);
    return () => clearTimeout(id);
  }, [dismissed]);

  // returning sessions: wait for the first user gesture on the page,
  // then ask the player to start. Browsers require a trusted gesture for
  // autoplay; mousemove doesn't count, click/keydown/touch do.
  useEffect(() => {
    if (!defaultDismissed) return;

    let consumed = false;

    function consume() {
      if (consumed) return;
      consumed = true;
      cleanup();
      setPrimeAutoplay(true);
    }

    function cleanup() {
      document.removeEventListener("click", consume);
      document.removeEventListener("keydown", consume);
      document.removeEventListener("touchstart", consume);
    }

    document.addEventListener("click", consume);
    document.addEventListener("keydown", consume);
    document.addEventListener("touchstart", consume);

    return cleanup;
  }, [defaultDismissed]);

  // Fire play() once both the user gesture AND the YT player are ready.
  // Either can land first.
  useEffect(() => {
    if (!primeAutoplay) return;
    if (!ready) return;
    play();
    setPrimeAutoplay(false);
  }, [primeAutoplay, ready, play]);

  const canEnter = timerDone && ready;

  function handleEnter() {
    // session cookie — no Max-Age/Expires means it deletes when the browser
    // session ends. SameSite=Lax avoids cross-site noise.
    document.cookie = "fv=1; path=/; SameSite=Lax";
    // fire-and-forget counter increment
    fetch("/api/visit", { method: "POST" }).catch(() => {
      /* swallow — display isn't gated on this */
    });
    play();
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div
      className="vibe-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vibe-gate-title"
    >
      <div className="vibe-gate__card">
        <div className="vibe-gate__head">
          <span>welcome.exe</span>
          <div className="vibe-gate__head-actions" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="vibe-gate__body">
          <p className="vibe-gate__eyebrow">a fuyofulo production</p>
          <h2 id="vibe-gate-title" className="vibe-gate__title">
            {canEnter ? "the vibes are loaded" : "loading the vibes..."}
          </h2>

          <div className="vibe-gate__loader-row" aria-hidden="true">
            <span className="vibe-gate__spinner">✦</span>
            <div className="vibe-gate__loader-bar">
              <div className="vibe-gate__loader-stripes" />
            </div>
          </div>

          <button
            type="button"
            className="micro-button micro-button--lime vibe-gate__primary"
            onClick={handleEnter}
            disabled={!canEnter}
          >
            {canEnter ? "enter the website →" : "loading..."}
          </button>

          <p className="vibe-gate__credit">
            ♫ {nowPlaying.trackName}
          </p>
        </div>
      </div>
    </div>
  );
}
