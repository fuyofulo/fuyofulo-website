import { hero, socials } from "../../lib/site-data";
import { WhiteFireSmiley } from "../white-fire-smiley";

export function HeroStrip() {
  return (
    <div className="hero-strip">
      <div>
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.name}</h1>
        <p className="bio">{hero.bio}</p>
        <div className="hero-strip__actions">
          {socials.map((social) => {
            const isExternal = social.href.startsWith("http");
            return (
              <a
                key={social.label}
                className="micro-button micro-button--lime"
                href={social.href}
                {...(isExternal
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {social.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="micro-button__icon"
                    src={social.icon}
                    alt=""
                    aria-hidden="true"
                  />
                ) : social.glyph ? (
                  <span className="micro-button__glyph" aria-hidden="true">
                    {social.glyph}
                  </span>
                ) : null}
                {social.label}
              </a>
            );
          })}
        </div>
      </div>
      <div className="hero-strip__smiley">
        <WhiteFireSmiley />
        <div className="kicker hero-strip__smiley-caption">fuyo smile</div>
      </div>
    </div>
  );
}
