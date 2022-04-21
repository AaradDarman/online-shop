import { useEffect, useState } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(
    () => {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
      const handler = (event) => setMatches(event.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    },
    // eslint-disable-next-line
    []
  );
  return matches;
}

export default function useBreakpoints() {
  const breakpoints = {
    isXs: useMediaQuery("(max-width: 576px)"),
    isSm: useMediaQuery("(min-width: 577px)"),
    isMd: useMediaQuery("(min-width: 769px)"),
    isLg: useMediaQuery("(min-width: 993px)"),
    active: "xs",
  };
  if (breakpoints.isXs) breakpoints.active = "xs";
  if (breakpoints.isSm) breakpoints.active = "sm";
  if (breakpoints.isMd) breakpoints.active = "md";
  if (breakpoints.isLg) breakpoints.active = "lg";
  return breakpoints;
}
