"use client";

import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

export type HeadVariant =
  | "default"
  | "hot"
  | "green"
  | "yellow"
  | "orange"
  | "black";
export type CTAVariant = "lime" | "pink" | "blue" | "orange" | "black" | "green";
export type TitleVariant = "default" | "count";

export type WidgetIcon =
  | {
      kind: "image";
      src: StaticImageData;
      alt: string;
      style?: "logo" | "emoji";
    }
  | { kind: "glyph"; glyph: string; tone?: "default" | "pink" | "green" };

export type WidgetCTA =
  | {
      kind: "link";
      label: string;
      href: string;
      variant?: CTAVariant;
      external?: boolean;
    }
  | {
      kind: "button";
      label: string;
      onClick: () => void;
      variant?: CTAVariant;
    };

export type WidgetProps = {
  headTitle: string;
  headBadge?: string;
  headVariant?: HeadVariant;
  icon: WidgetIcon;
  title: string;
  titleVariant?: TitleVariant;
  description?: string;
  cta?: WidgetCTA;
};

function ctaClassName(variant: CTAVariant = "lime"): string {
  const map: Record<CTAVariant, string> = {
    lime: "micro-button micro-button--lime widget__cta",
    pink: "micro-button micro-button--pink widget__cta",
    blue: "micro-button micro-button--blue widget__cta",
    orange: "micro-button micro-button--orange widget__cta",
    black: "micro-button micro-button--black widget__cta",
    green: "micro-button micro-button--green widget__cta",
  };
  return map[variant];
}

function StampIcon({ icon }: { icon: WidgetIcon }) {
  if (icon.kind === "image") {
    const styleClass =
      icon.style === "emoji" ? "logo-stamp--emoji" : "logo-stamp--sm";
    return (
      <div className={`logo-stamp ${styleClass}`}>
        <Image src={icon.src} alt={icon.alt} width={36} height={36} />
      </div>
    );
  }
  const toneClass =
    icon.tone === "pink"
      ? "logo-stamp--glyph-pink"
      : icon.tone === "green"
        ? "logo-stamp--glyph-green"
        : "logo-stamp--glyph-blue";
  return (
    <div
      className={`logo-stamp logo-stamp--sm logo-stamp--glyph ${toneClass}`}
      aria-hidden="true"
    >
      {icon.glyph}
    </div>
  );
}

function CTAElement({ cta }: { cta: WidgetCTA }) {
  const cls = ctaClassName(cta.variant);
  if (cta.kind === "link") {
    if (cta.external || /^https?:\/\//.test(cta.href)) {
      return (
        <a className={cls} href={cta.href} target="_blank" rel="noreferrer">
          {cta.label}
        </a>
      );
    }
    return (
      <Link className={cls} href={cta.href}>
        {cta.label}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} onClick={cta.onClick}>
      {cta.label}
    </button>
  );
}

const headVariantClass: Record<HeadVariant, string> = {
  default: "",
  hot: "widget--hot",
  green: "widget--green",
  yellow: "widget--yellow",
  orange: "widget--orange",
  black: "widget--black",
};

export function Widget({
  headTitle,
  headBadge,
  headVariant = "default",
  icon,
  title,
  titleVariant = "default",
  description,
  cta,
}: WidgetProps) {
  const variantClass = headVariantClass[headVariant];
  const titleClass =
    titleVariant === "count" ? "widget__title widget__title--count" : "widget__title";

  return (
    <div className={`widget ${variantClass}`.trim()}>
      <div className="widget__head">
        <span>{headTitle}</span>
        <span className="widget__head-badge">{headBadge ?? ""}</span>
      </div>
      <div className="widget__body">
        <div className="widget__row">
          <StampIcon icon={icon} />
          <strong className={titleClass}>{title}</strong>
        </div>
        {description ? <p className="widget__blurb">{description}</p> : null}
        {cta ? <CTAElement cta={cta} /> : null}
      </div>
    </div>
  );
}
