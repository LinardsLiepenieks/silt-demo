import { CustomerJourney } from './components/customer-journey';
import { CustomerLogos } from './components/customer-logos';
import { CustomerSpotlight } from './components/customer-spotlight';
import { FeatureCards } from './components/feature-cards';
import { FeedbackNotes } from './components/feedback-notes';
import { Hero } from './components/hero';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { StatementBanner } from './components/statement-banner';

export function App() {
  return (
    <>
      <div className="relative flex min-h-[70vh] flex-col">
        <SiteHeader />
        <main className="flex-grow">
          <Hero />
          <CustomerLogos />
          <StatementBanner />
          <FeatureCards />
          <CustomerJourney />
          <CustomerSpotlight />
          <FeedbackNotes />
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
