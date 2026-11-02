import { Link } from '../lib/router';
import { useEffect, useState } from 'react';
import { headerCtas, navEntries, siteUrl } from '../content/navigation';
import { BrandMark, BrandWordmark } from './brand-logo';
import { MobileNav } from './mobile-nav';
import { NavMenu } from './nav-menu';

const buttonBase =
  'items-center justify-center rounded-lg font-semibold whitespace-nowrap transition-colors duration-150 outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30';
const signInClass = 'text-foreground hover:bg-surface';
const trialClass = 'bg-accent text-white hover:bg-accent-strong';

// The bar gains a hairline border and soft shadow once the page scrolls.
function useScrolledPast(offset: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setPast(window.scrollY > offset);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [offset]);
  return past;
}

export function SiteHeader() {
  const scrolled = useScrolledPast(8);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background transition-[border-color,box-shadow] duration-200 ${
        scrolled
          ? 'border-border shadow-[0_1px_2px_rgb(0_0_0/0.03)]'
          : 'border-transparent'
      }`}
    >
      <div className="container flex h-16 items-center gap-6">
        <div className="flex flex-1 items-center">
          <a href={siteUrl} aria-label="Halcyon" className="flex items-center">
            <span className="flex lg:hidden">
              <BrandMark className="size-8" />
            </span>
            <span className="hidden lg:flex">
              <BrandWordmark />
            </span>
          </a>
        </div>
        <div className="hidden lg:flex">
          <NavMenu entries={navEntries} />
        </div>
        <div className="flex flex-1 items-center justify-end gap-1.5 lg:gap-2">
          <Link
            href={headerCtas.signIn.href}
            className={`${buttonBase} ${signInClass} hidden h-9 px-3.5 text-sm sm:inline-flex`}
          >
            {headerCtas.signIn.label}
          </Link>
          <Link
            href={headerCtas.trial.href}
            className={`${buttonBase} ${trialClass} inline-flex h-9 px-3.5 text-sm lg:px-4`}
          >
            {headerCtas.trial.label}
          </Link>
          <div className="lg:hidden">
            <MobileNav entries={navEntries} />
          </div>
        </div>
      </div>
    </header>
  );
}
