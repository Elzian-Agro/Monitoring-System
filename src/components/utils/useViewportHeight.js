import { useEffect } from "react";

//custom hook to set the correct view port in a mobile device
const useViewportHeight = () => {
  useEffect(() => {
    const updateViewportHeight = () => {
      const viewportHeight = window.innerHeight;
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${viewportHeight}px`
      );
    };

    window.addEventListener("resize", updateViewportHeight);
    updateViewportHeight();

    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);
};

export default useViewportHeight;
