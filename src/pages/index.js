import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const HomePage = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Helper to dynamically load external scripts in absolute order
    const loadScript = (src, checkGlobalReady) => {
      return new Promise((resolve, reject) => {
        // If the global variable is already ready, resolve immediately
        if (checkGlobalReady && checkGlobalReady()) {
          resolve();
          return;
        }

        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          // If script tag is in DOM but global isn't ready yet, poll safely until it is ready
          if (checkGlobalReady) {
            const pollTimer = setInterval(() => {
              if (checkGlobalReady()) {
                clearInterval(pollTimer);
                resolve();
              }
            }, 50);
            return;
          }
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => {
          // Even if onload fired, wrapped JQuery $(function(){}) callbacks
          // might be queued in browser microtasks. Verify global availability before resolving.
          if (checkGlobalReady) {
            const onloadTimer = setInterval(() => {
              if (checkGlobalReady()) {
                clearInterval(onloadTimer);
                resolve();
              }
            }, 20);
            return;
          }
          resolve();
        };
        script.onerror = () => {
          reject(new Error(`Failed to load script ${src}`));
        };
        document.body.appendChild(script);
      });
    };

    // Chain loading: jQuery must be fully loaded and executed before sparkles plugin loads
    loadScript("/legacy-home/lib/jquery.min.js", () => typeof window !== "undefined" && window.$)
      .then(() => {
        return loadScript("/legacy-home/lib/jquery-canvas-sparkles.js", () => typeof window !== "undefined" && window.$ && typeof window.$.fn.sparkle === "function");
      })
      .then(() => {
        const $el = window.$(".star-background");

        // Robust initialization: wait for elements to have non-zero width/height
        // otherwise the canvas is initialized with 0x0 size and becomes invisible.
        const tryInit = () => {
          if ($el.length && $el.outerWidth() > 0 && $el.outerHeight() > 0) {
            $el.sparkle({
              // accepts a HEX string, or "rainbow" or an array of HEX strings:
              color: [
                "#ffffff",
                "#fec9f8",
                "#fef6a6",
                "#b1eff4",
                "#fbaeb8",
                "#fed687",
                "#fb8b99"
              ],
              // determine how many sparkles will be on the element at a time
              count: 10,
              // tell the canvas how far over the edge of it's container it should overlap in pixels.
              overlap: 0,
              // set the speed multiplier
              speed: 0.4,
              // min size
              minSize: 15,
              // max size
              maxSize: 20,
              // "up", "down" or "both" to set which direction the sparkles will travel in.
              direction: "up"
            })
            .trigger("mouseover.sparkle")
            .off("mouseout.sparkle");
          } else {
            setTimeout(tryInit, 100);
          }
        };

        tryInit();
      })
      .catch((err) => {
        console.error("Error loading sparkle assets:", err);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Xiaoxiong Daily</title>
        <link rel="stylesheet" href="/legacy-home/asset/styles/index.css" />
      </Helmet>

      <div className="star-background" />
      <div className="content">
        <a href="/blog/" className="logo-link" title="Enter Daily Blog">
          <img
            src="/legacy-home/asset/images/Nichijou_logo.svg"
            alt="Nichijou Logo"
            className="logo"
          />
        </a>

        <div className="player">
          <iframe
            className="netease-music"
            frameBorder="no"
            border="0"
            marginWidth="0"
            marginHeight="0"
            width="280"
            height="52"
            src="https://music.163.com/outchain/player?type=2&id=651241&auto=0&height=32"
            title="Netease Music"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
