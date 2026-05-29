"use client";

import { useMusicPlayer } from "./MusicPlayer";

export function MuteToggle() {
  const { muted, toggleMute } = useMusicPlayer();
  const label = muted ? "OFF" : "ON";

  return (
    <button
      type="button"
      className={`mute-toggle ${muted ? "mute-toggle--off" : "mute-toggle--on"}`}
      onClick={toggleMute}
      aria-label={muted ? "Unmute music" : "Mute music"}
      aria-pressed={muted}
    >
      <span className="mute-toggle__icon" aria-hidden="true">
        ♫
      </span>
      <span className="mute-toggle__label">{label}</span>
    </button>
  );
}
