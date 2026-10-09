"use client";
import { useEffect, useState } from "react";

// Returns the id of the section currently in view (for sticky sub-navigation).
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}
