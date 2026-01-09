import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './GalleryStack.css';

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reduced horizontal tilt, stronger vertical
  const rotateX = useTransform(y, [-150, 150], [30, -30]);   // Vertical tilt
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);   // Less horizontal tilt

  function handleDragEnd(_, info) {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    // Prioritize vertical movement
    if (Math.abs(offset) > sensitivity || Math.abs(velocity) > 500) {
      // Vertical swipe (up or down) → send to back
      onSendToBack();
    } else if (Math.abs(info.offset.x) > sensitivity * 1.5) {
      // Only allow horizontal as fallback with higher threshold
      onSendToBack();
    } else {
      // Snap back
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.4}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
      // Add exit animation feel
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -300, rotateX: 30 }}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  cards = [],                     // Expect cards to be provided
  randomRotation = false,
  sensitivity = 200,
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  // Use only the cards prop — no fallback images
  const [stack, setStack] = useState(cards);

  // Update stack when cards prop changes
  useEffect(() => {
    setStack(cards);
  }, [cards]);

  const sendToBack = id => {
    setStack(prev => {
      const newStack = [...prev];
      const index = newStack.findIndex(card => card.id === id);
      if (index === -1) return newStack;
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  // Pause autoplay when zoomed
  useEffect(() => {
    if (zoomedImage) {
      setIsPaused(true);
    } else if (!pauseOnHover || !isPaused) { // Resume only if not hovered
      setIsPaused(false);
    }
  }, [zoomedImage, pauseOnHover]);

  if (stack.length === 0) {
    return null; // or render a placeholder if you prefer
  }

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const depth = stack.length - 1 - index; // 0 for top (front), high for bottom (back)
        const randomRotate = randomRotation ? Math.random() * 6 - 3 : 0; // Softer rotation

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="card"
              style={{
                    transformOrigin: depth === 0 ? 'center center' : '50% 100%', // only top card uses center
                }}
              onClick={() => shouldEnableClick && sendToBack(card.id)} // Keep if enabled
              onTap={() => {
                // Only zoom top card on tap (click without drag)
                if (depth === 0) {
                  setZoomedImage(card.content.props.src);
                }
              }}
              animate={{
                rotateZ: depth * 2 + randomRotate, // Slight rotation increasing with depth
                scale: 1 - depth * 0.03, // Front: 1, back: smaller (e.g., 0.91 for 3-deep)
                y: depth * 15, // Back cards shifted down (positive y = down)
                opacity: 1 - depth * 0.15, // Front: 1, back: faded (e.g., 0.55 for 3-deep)
                filter: `blur(${depth * 1.2}px)`, // Front: 0px, back: blurred
                zIndex: stack.length - depth, // Front on top
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}

      <AnimatePresence>
        {zoomedImage && (
            <motion.div
            key="zoom-modal"
            style={{
                position: 'fixed',
                inset: 0,                    // better than top/left/width/height
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'zoom-out',
            }}
            onClick={() => setZoomedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            >
            <motion.img
                src={zoomedImage}
                alt="Zoomed image"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                maxWidth: '75vw',
                maxHeight: '75vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7)',
                }}
            />
            </motion.div>
        )}
        </AnimatePresence>
    </div>
  );
}