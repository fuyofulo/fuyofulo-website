"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

/* The designs are authored as fixed frames sized to a desktop viewport. Scale
   the frame to fit the space it's given — up as well as down — so the
   composition fills the screen instead of sitting boxed in the middle. Uses
   min() of both axes so the frame is contained rather than cropped: one axis
   fills exactly, the other may leave a thin margin when the available aspect
   differs from the design's. The sticker PNGs are 3-18x their rendered size, so
   upscaling stays sharp.

   transform:scale() does not change layout size, so the container's height is
   measured and set explicitly. Without that a scaled-down frame leaves the box
   too tall (phantom scrolling past the content) and a scaled-up one too short
   (the page won't scroll far enough to reach the bottom).

   The scale lives in CSS custom properties on <html> rather than in React
   state. That lets a blocking inline script set it during HTML parsing, so the
   first paint is already correct — otherwise the server markup paints at 1x and
   visibly zooms once JS hydrates. Keeping it off the React-rendered style
   attribute also avoids a hydration mismatch. */

/* Runs inline, before paint. Kept terse because it ships as a string. */
function preScale(
  width: number,
  height: number,
  fold: number,
  centered: boolean,
  pfx: string,
) {
  return `(function(){try{
var e=document.currentScript.previousElementSibling;if(!e)return;
var r=document.documentElement.style;
var p=parseFloat(getComputedStyle(e).paddingTop)||0;
var s=Math.min(innerWidth/${width},(innerHeight-p)/${fold});
r.setProperty("${pfx}-scale",s);
r.setProperty("${pfx}-box-h",Math.max(innerHeight,p+${height}*s)+"px");
r.setProperty("${pfx}-mt",${centered ? `Math.max(0,(innerHeight-p-${height}*s)/2)` : "0"}+"px");
}catch(_){}})();`;
}

/* useLayoutEffect so client-side navigation between two framed pages also
   applies before paint; falls back on the server where it can't run. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function FitFrame({
  width,
  height,
  className,
  /* For frames taller than one screen: the scale is chosen so this much of the
     frame fills the viewport on load, and the remainder is revealed by
     scrolling. Defaults to the full height (fits entirely, no scroll). */
  foldHeight,
  /* Split any leftover vertical space evenly above and below the frame instead
     of letting it all fall to the bottom. Uses the frame's *visual* (scaled)
     height — flex centering can't do this because transform:scale() doesn't
     change layout size. Only for frames with no navbar row at their top edge. */
  centered = false,
  /* CSS-variable namespace for this instance. Two frames can coexist on one
     page (e.g. hidden desktop + visible mobile) only if they write different
     vars — the defaults match the original global names. */
  varPrefix = "--fit",
  children,
}: {
  width: number;
  height: number;
  className?: string;
  foldHeight?: number;
  centered?: boolean;
  varPrefix?: string;
  children: ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const fold = foldHeight ?? height;

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement.style;

    function fit() {
      const el = outerRef.current;
      if (!el) return;

      /* Any space reserved for the fixed navbar is this element's own
         padding-top, so the nav height never needs hardcoding here. */
      const padTop = parseFloat(getComputedStyle(el).paddingTop) || 0;
      const scale = Math.min(
        window.innerWidth / width,
        (window.innerHeight - padTop) / fold,
      );

      root.setProperty(`${varPrefix}-scale`, String(scale));
      /* Never shorter than the viewport, or the background stops before the
         bottom of the screen and the page shows through underneath. */
      root.setProperty(
        `${varPrefix}-box-h`,
        `${Math.max(window.innerHeight, padTop + height * scale)}px`,
      );
      /* Vars are global on <html>, so non-centered pages must reset this or
         they'd inherit the offset from a previously visited centered page. */
      root.setProperty(
        `${varPrefix}-mt`,
        centered
          ? `${Math.max(0, (window.innerHeight - padTop - height * scale) / 2)}px`
          : "0px",
      );
    }

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [width, height, fold, centered, varPrefix]);

  return (
    <>
      <div
        ref={outerRef}
        className={`fitframe-outer${className ? ` ${className}` : ""}`}
        style={{ height: `var(${varPrefix}-box-h, 100vh)` }}
      >
        <div
          className="fitframe"
          style={
            {
              "--fit-w": `${width}px`,
              "--fit-h": `${height}px`,
              marginTop: `var(${varPrefix}-mt, 0px)`,
              transform: `scale(var(${varPrefix}-scale, 1))`,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </div>
      {/* Must sit immediately after the frame: it locates it via
          currentScript.previousElementSibling and needs the stylesheet already
          applied to read the reserved navbar padding. */}
      <script
        dangerouslySetInnerHTML={{
          __html: preScale(width, height, fold, centered, varPrefix),
        }}
      />
    </>
  );
}
