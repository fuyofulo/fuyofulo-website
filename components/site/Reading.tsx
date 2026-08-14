"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { submitSuggestion } from "../../app/(site)/reading/actions";
import { shelf } from "../../lib/site-content";

const N = shelf.length;

/* Carousel geometry, from frame 11a:
   a closed book is a 48px spine; the open one folds out to 48 + 156 = 204px.
   With a 14px gap the closed pitch is 62px, and 248 centers the open book in
   the 700px viewport (which shows 4 spines + open book + 4 spines). */
const SPINE_W = 48;
const OPEN_W = 204;
const PITCH = 62;
const CENTER_OFFSET = 248;

const LETTERS = [
  { char: "R", height: 52, width: 44, transform: "translate(0px, 4px) rotate(-4deg)" },
  { char: "E", height: 49, transform: "rotate(3deg) translateY(2px)" },
  { char: "A", height: 51, transform: "translate(0px, 3px) rotate(-2deg)" },
  { char: "D", height: 48, transform: "rotate(-4deg) translateY(1px)" },
  { char: "I", height: 54, transform: "none" },
  { char: "N", height: 48, transform: "translate(0px, 2px) rotate(-2deg)" },
  { char: "G", height: 50, width: 52, transform: "translate(0px, 2px) rotate(-2deg)" },
] as const;

export function Reading() {
  const [selBook, setSelBook] = useState(0);
  // Index into the tripled list; starts inside the middle copy.
  const [selG, setSelG] = useState(N);
  const [snap, setSnap] = useState(false);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Infinite wrap: once the selection leaves the middle copy, jump it back to
     the equivalent slot with transitions off. 520ms lets the fold finish. */
  useEffect(() => {
    if (snap) return;
    if (selG >= N && selG < 2 * N) return;

    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      setSelG((((selG % N) + N) % N) + N);
      setSnap(true);
    }, 520);

    return () => {
      if (snapTimer.current) clearTimeout(snapTimer.current);
    };
  }, [selG, snap]);

  function select(i: number, g: number) {
    setSelBook(i);
    setSelG(g);
    setSnap(false);
  }

  function step(delta: number) {
    setSelBook((selBook + N + delta) % N);
    setSelG(selG + delta);
    setSnap(false);
  }

  const sel = shelf[selBook];
  const shelfX = selG * PITCH - CENTER_OFFSET;
  const stripTrans = snap ? "transform 0s" : "transform .5s ease";
  const bookTrans = snap ? "all 0s" : "all .5s ease";
  const tripled = [...shelf, ...shelf, ...shelf];

  return (
    <div className="reading-content">
      <PaperGrainFilter />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="reading-cat"
        src="/stickers/cat-book.webp"
        alt="cat asleep on a book"
      />

      <div className="reading-stack">
        <div className="reading-titlerow">
          <div className="reading-title">
            {LETTERS.map((l) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={l.char}
                src={`/stickers/letter-${l.char}.webp`}
                alt={l.char}
                style={{
                  height: l.height,
                  width: "width" in l ? l.width : undefined,
                  transform: l.transform,
                  display: "block",
                }}
              />
            ))}
          </div>
        </div>

        <div className="reading-body">
          {/* ---- selected book highlight ---- */}
          <div className="reading-spread">
            <div className="reading-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sel.cover} alt={`${sel.title} cover`} />
            </div>

            <div className="reading-meta">
              <div className="reading-book-title">{sel.title}</div>
              {sel.subtitle ? (
                <div className="reading-book-sub">{sel.subtitle}</div>
              ) : null}
              <div className="reading-book-author">{sel.author}</div>
              {sel.notes ? (
                <div className="reading-book-notes">{sel.notes}</div>
              ) : null}
            </div>
          </div>

          {/* ---- bookshelf carousel ---- */}
          <div className="shelf-row">
            <button
              type="button"
              className="shelf-paddle"
              onClick={() => step(-1)}
              aria-label="previous book"
            >
              ‹
            </button>

            <div className="shelf-viewport">
              <div
                className="shelf-strip"
                style={{
                  transform: `translateX(-${shelfX}px)`,
                  transition: stripTrans,
                }}
              >
                {tripled.map((b, g) => {
                  const i = g % N;
                  const open = g === selG;
                  return (
                    <button
                      type="button"
                      key={`${b.num}-${g}`}
                      className="shelf-book"
                      onClick={() => select(i, g)}
                      title={b.title}
                      aria-label={b.title}
                      aria-pressed={open}
                      style={{
                        width: open ? OPEN_W : SPINE_W,
                        transition: bookTrans,
                      }}
                    >
                      <div
                        className="shelf-spine"
                        style={{
                          background: b.spineColor,
                          color: b.textColor,
                          transform: `rotateY(${open ? -60 : 0}deg)`,
                          transition: bookTrans,
                        }}
                      >
                        <div className="grain" style={{ opacity: 0.32 }} />
                        <div className="shelf-spine-label">
                          {b.spineTitle ?? b.title}
                        </div>
                      </div>

                      <div
                        className="shelf-cover"
                        style={{
                          transform: `rotateY(${open ? 30 : 90}deg)`,
                          visibility: open ? "visible" : "hidden",
                          transition: `${bookTrans}, visibility 0s ${open ? 0 : 0.5}s`,
                        }}
                      >
                        <div className="shelf-cover-edge" />
                        <div className="grain" style={{ opacity: 0.28 }} />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.cover} alt="" aria-hidden="true" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="shelf-paddle"
              onClick={() => step(1)}
              aria-label="next book"
            >
              ›
            </button>

            <div className="shelf-note-slot">
              <SuggestNote />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Submits to the Upstash-backed server action; suggestions show publicly
   at /reading/suggestions. */
function SuggestNote() {
  const [status, setStatus] = useState<
    "idle" | "sent" | "invalid" | "rate" | "error"
  >("idle");
  const [pending, startTransition] = useTransition();

  const HELP: Record<typeof status, string> = {
    idle: "read something i should read too? scribble it down.",
    sent: "noted — thank you :)",
    invalid: "at least your name and the book, please!",
    rate: "easy! try again in a bit.",
    error: "hmm, that didn't send — try again?",
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      const result = await submitSuggestion(data);
      if (result.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus(result.reason === "unavailable" ? "error" : result.reason);
      }
    });
  }

  return (
    <form className="sticky-note" onSubmit={handleSubmit}>
      <div className="grain" style={{ opacity: 0.4 }} />
      <div className="sticky-note-tape" aria-hidden="true" />
      <div className="sticky-note-body">
        <div className="sticky-note-title">suggest me a book!</div>
        <div className="sticky-note-help">
          {pending ? "sending…" : HELP[status]}
        </div>
        <input name="name" placeholder="your name" aria-label="your name" maxLength={40} />
        <input name="book" placeholder="book title" aria-label="book title" maxLength={80} />
        <input name="why" placeholder="why?" aria-label="why?" maxLength={240} />
        {/* honeypot — invisible to people, irresistible to bots */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sticky-note-hp"
        />
        <div className="sticky-note-bottom">
          <Link href="/reading/suggestions" className="sticky-note-peek">
            see suggestions
          </Link>
          <button type="submit" className="sticky-note-send" disabled={pending}>
            send it →
          </button>
        </div>
      </div>
    </form>
  );
}

/* Shared grain texture for the spines, covers, and sticky note. */
function PaperGrainFilter() {
  return (
    <svg
      style={{ position: "absolute", width: 0, height: 0, visibility: "hidden" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="8"
            result="noise"
          />
          <feDiffuseLighting
            in="noise"
            lightingColor="white"
            surfaceScale="1"
            result="diffLight"
          >
            <feDistantLight azimuth="45" elevation="35" />
          </feDiffuseLighting>
        </filter>
      </defs>
    </svg>
  );
}
