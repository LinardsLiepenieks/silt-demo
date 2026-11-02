import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

// Auto-advancing steps shared by the hero product slideshow and the customer journey. It
// only runs while the slideshow is at least 10% on screen and the tab is
// visible, and it holds still for people who prefer reduced motion. Picking
// a step restarts the timer, so the chosen step gets its full interval.
export function useSlideshow(
  root: RefObject<HTMLElement | null>,
  count: number,
  intervalMs: number,
) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  // Bumped on every change so the progress ring restarts its animation.
  const [cycle, setCycle] = useState(0);
  const reducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [root]);

  useEffect(() => {
    const onChange = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  const animating = inView && pageVisible && !reducedMotion.current;

  useEffect(() => {
    if (!animating) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
      setCycle((c) => c + 1);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [animating, count, intervalMs, cycle]);

  const select = useCallback((index: number) => {
    setActive(index);
    setCycle((c) => c + 1);
  }, []);

  return { active, select, animating, cycle };
}
