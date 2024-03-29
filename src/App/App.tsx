import { useState, useEffect } from "react";
import { DynamicDocument } from "..";
import { Analytics } from "../Analytics";
import { UI } from "../UI";

const grabHashState = () => {
  return Object.fromEntries(
    new URLSearchParams(window.location.hash.slice(1)).entries()
  );
};

interface AppProps {
  dynamicDocument: DynamicDocument;
}

export function App({ dynamicDocument }: AppProps) {
  let [showAnalytics, setShowAnalytics] = useState<boolean>(
    grabHashState()?.["display"] === "analytics"
  );

  useEffect(() => {
    function hashChangeHandler() {
      const hashState = grabHashState();
      setShowAnalytics(hashState?.["display"] === "analytics");
    }

    window.addEventListener("hashchange", hashChangeHandler, false);

    return () =>
      window.removeEventListener("hashchange", hashChangeHandler, false);
  }, [setShowAnalytics]);

  return (
    <>
      {showAnalytics ? (
        <Analytics dynamicDocument={dynamicDocument} />
      ) : (
        <UI dynamicDocument={dynamicDocument} />
      )}
    </>
  );
}
