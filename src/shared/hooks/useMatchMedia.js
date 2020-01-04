import { useState, useEffect } from "react";

function useMatchMedia(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const onChange = event => setMatches(event.matches);

    mql.addListener(onChange);

    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}

export { useMatchMedia };
