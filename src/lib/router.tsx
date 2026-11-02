import {
  createContext,
  useContext,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from 'react';

/** Every screen, addressed by hash so the app runs from any static host. */
export const routes = {
  landing: '#/',
  signIn: '#/sign-in',
  signUp: '#/sign-up',
  workspace: '#/onboarding/workspace',
  channels: '#/onboarding/channels',
  team: '#/onboarding/team',
  inbox: '#/inbox',
} as const;

export type Route = keyof typeof routes;

// Anything unknown, including in-page anchors like `#pricing`, is the landing page.
export function routeFromHash(hash: string): Route {
  const path = hash.replace(/\/$/, '');
  const match = (Object.keys(routes) as Route[]).find(
    (route) => route !== 'landing' && routes[route] === path,
  );
  return match ?? 'landing';
}

export const isInternal = (href: string) => href.startsWith('#/');

type Router = {
  route: Route;
  /** Pushes a history entry, or replaces the current one with `replace`. */
  navigate: (href: string, options?: { replace?: boolean }) => void;
};

// Outside the app (a component previewed on its own) links just set the hash.
const RouterContext = createContext<Router>({
  route: 'landing',
  navigate: (href) => {
    window.location.hash = href;
  },
});

export const RouterProvider = RouterContext.Provider;
export const useRouter = () => useContext(RouterContext);

/** An anchor that routes internal `#/` links through the router. */
export function Link({
  href = '#',
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRouter();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !isInternal(href)) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    navigate(href);
  };
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      onClick={handleClick}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
    />
  );
}
