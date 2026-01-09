import { useMemo } from "react";
import './App.css';
import FloatingLines from './components/floating-lines/floatingLines';
import Stack from "./components/gallery-stack/GalleryStack";

import img1 from "./assets/gallery/gallery1.jpg";
import img2 from "./assets/gallery/gallery2.jpg";
import img3 from "./assets/gallery/gallery3.jpg";
import img4 from "./assets/gallery/gallery4.jpg";
import img5 from "./assets/gallery/gallery5.jpg";
import img6 from "./assets/gallery/gallery6.jpg";
import img7 from "./assets/gallery/gallery7.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];

function App() {
  // Create cards inside the component (or use useMemo if images change)
  const cards = useMemo(() => {
    return images.map((src, index) => ({
      id: index + 1,
      content: (
        <img
          key={index}
          src={src}
          alt={`gallery-${index + 1}`}
          className="card-image"
        />
      )
    }));
  }, []); // Empty dependency: images are static imports

  const floatingLinesProps = useMemo(() => ({
    enabledWaves: ["top", "middle", "bottom"],
    lineCount: [2, 5, 3],
    lineDistance: [20, 200, 20],
    bendRadius: 6.5,
    bendStrength: -1,
    interactive: true,
    parallax: true,
    parallaxStrength: 0.2,
    animationSpeed: 1,
    mouseDamping: 0.05,
  }), []);

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingLines {...floatingLinesProps} />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "800px", // Good for landscape
          height: "60%",
          aspectRatio: "16 / 9", // Enforce horizontal if needed
          zIndex: 10,
          borderRadius: 20,
          color: "white",
        }}
      >
        <Stack
          cards={cards}
          randomRotation // Or false for no random tilt
          sensitivity={100}
          autoplay
          autoplayDelay={3000}
          pauseOnHover
          borderradius={20}
        />
      </div>

      {/* Optional: Remove dot indicators entirely */}
      {/* Or keep them if you want manual control (but then disable Stack autoplay) */}
    </div>
  );
}

export default App;