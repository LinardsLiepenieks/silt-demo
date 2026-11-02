import { useCallback, useEffect, useMemo, useState, type JSX } from 'react';
import {
  routeFromHash,
  RouterProvider,
  routes,
  type Route,
} from './lib/router';
import { currentUser } from './lib/session';
import { Inbox } from './pages/inbox';
import { Landing } from './pages/landing';
import { OnboardingChannels } from './pages/onboarding-channels';
import { OnboardingTeam } from './pages/onboarding-team';
import { OnboardingWorkspace } from './pages/onboarding-workspace';
import { SignIn } from './pages/sign-in';
import { SignUp } from './pages/sign-up';

const pages: Record<Route, () => JSX.Element> = {
  landing: Landing,
  signIn: SignIn,
  signUp: SignUp,
  workspace: OnboardingWorkspace,
  channels: OnboardingChannels,
  team: OnboardingTeam,
  inbox: Inbox,
};

// The inbox needs a session; without one it sends you to sign in.
const guard = (route: Route): Route =>
  route === 'inbox' && !currentUser() ? 'signIn' : route;

export function App() {
  const [route, setRoute] = useState(() =>
    guard(routeFromHash(window.location.hash)),
  );

  const navigate = useCallback((href: string, { replace = false } = {}) => {
    const next = guard(routeFromHash(href));
    const url = routes[next];
    if (replace) window.history.replaceState(null, '', url);
    else if (url !== window.location.hash)
      window.history.pushState(null, '', url);
    setRoute(next);
  }, []);

  // Back/forward and hand-edited hashes. In-page anchors like `#pricing`
  // resolve to the landing page and keep their native jump.
  useEffect(() => {
    const sync = () => {
      const wanted = routeFromHash(window.location.hash);
      const next = guard(wanted);
      if (next !== wanted) window.history.replaceState(null, '', routes[next]);
      setRoute(next);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const router = useMemo(() => ({ route, navigate }), [route, navigate]);
  const Page = pages[route];

  return (
    <RouterProvider value={router}>
      <Page key={route} />
    </RouterProvider>
  );
}
