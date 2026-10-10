"use client";

import {
  AnimatePresence,
  motion,
  type MotionValue,
  type Variants,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { createContext, useContext, useRef, type ReactNode } from "react";

// Adapted from the MIT-licensed dock and BlurFade primitives in n-portfolio.
// See THIRD_PARTY_NOTICES.md.

type DockContextValue = {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  reducedMotion: boolean;
};

const DockContext = createContext<DockContextValue | null>(null);
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

export function Dock({
  children,
  className,
  magnification = 58,
  distance = 105,
}: {
  children: ReactNode;
  className?: string;
  magnification?: number;
  distance?: number;
}) {
  const mouseX = useMotionValue(Infinity);
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <DockContext.Provider
      value={{ mouseX, magnification, distance, reducedMotion }}
    >
      <motion.div
        onMouseMove={(event) => {
          if (!reducedMotion) mouseX.set(event.pageX);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={className}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export function DockIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);
  if (!context) throw new Error("DockIcon must be used inside Dock");

  const { mouseX, magnification, distance, reducedMotion } = context;
  const distanceFromPointer = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });
  const containerSize = useSpring(
    useTransform(
      distanceFromPointer,
      [-distance, 0, distance],
      [BASE_SIZE, reducedMotion ? BASE_SIZE : magnification, BASE_SIZE],
    ),
    SPRING,
  );
  const iconSize = useSpring(
    useTransform(
      distanceFromPointer,
      [-distance, 0, distance],
      [
        BASE_ICON_SIZE,
        reducedMotion ? BASE_ICON_SIZE : magnification * 0.5,
        BASE_ICON_SIZE,
      ],
    ),
    SPRING,
  );

  return (
    <motion.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={className}
    >
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="dock-icon-inner"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

type BlurFadeProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-hidden"?: boolean | "true" | "false";
  variant?: Variants;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
};

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.45,
  delay = 0,
  yOffset = 8,
  inView = false,
  inViewMargin = "-50px",
  blur = "8px",
  ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const margin = inViewMargin as NonNullable<
    Parameters<typeof useInView>[1]
  >["margin"];
  const inViewResult = useInView(ref, { once: true, margin });
  const visible = !inView || inViewResult;
  const variants: Variants =
    variant ??
    ({
      hidden: { y: -yOffset, opacity: 0, filter: `blur(${blur})` },
      visible: { y: 0, opacity: 1, filter: "blur(0px)" },
    } satisfies Variants);

  if (reducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        exit="hidden"
        variants={variants}
        transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
