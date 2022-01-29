import React, { useState } from "react";
import { useEffect } from "react";
import { DynamicDocument } from ".";
import { Analytics } from "./Analytics.tsx";
import { UI } from "./UI.tsx";

const grabHashState = () => {
  return Object.fromEntries(
    new URLSearchParams(window.location.hash.slice(1)).entries()
  );
};

interface AppProps {
  dynamicDocument: DynamicDocument;
}

function App({ dynamicDocument }: AppProps) {
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
    <div className="container">
      {showAnalytics ? (
        <Analytics dynamicDocument={dynamicDocument} />
      ) : (
        <UI dynamicDocument={dynamicDocument} />
      )}
    </div>
  );
}

export default App;
