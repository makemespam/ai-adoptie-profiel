"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Bureautje Aap logo.
 * Gebruikt /bureautjeaap-logo.webp of /bureautjeaap-logo.png als het bestaat, anders tekst-fallback.
 * Logo toevoegen: kopieer Bureautje_Aap_Logo__3_.webp naar public/bureautjeaap-logo.webp
 */
export default function Logo() {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return (
      <span
        className="text-white text-[1.1rem]"
        style={{ fontFamily: "var(--font-heading), 'Alfa Slab One', serif" }}
      >
        BUREAUTJE 🐒 AAP
      </span>
    );
  }

  return (
    <Image
      src="/bureautjeaap-logo.webp"
      alt="Bureautje Aap"
      height={36}
      width={180}
      style={{ objectFit: "contain" }}
      onError={() => setUseFallback(true)}
      className="h-9"
    />
  );
}
