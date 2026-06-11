"use client";

import { useRef, useState } from "react";

type CopyEmailButtonProps = {
  value: string;
  label: string;
  icon?: string;
};

export function CopyEmailButton({ value, label, icon }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <button
      type="button"
      className="micro-button micro-button--lime"
      onClick={handleCopy}
      aria-label={`copy email ${value}`}
    >
      {copied ? <span className="copy-pop">email copied</span> : null}
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="micro-button__icon" src={icon} alt="" aria-hidden="true" />
      ) : null}
      {label}
    </button>
  );
}
