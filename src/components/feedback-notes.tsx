import {
  feedbackHeading,
  feedbackRows,
  type FeedbackNoteData,
} from '../content/feedback';
import { FeedbackNote } from './feedback-note';

// Rows keep a 1000px minimum width, so below lg the pile overflows and is cropped.
const rowClass =
  'relative flex h-48 w-full min-w-[1000px] items-start justify-center';

export function FeedbackNotes({
  title = feedbackHeading.title,
  text = feedbackHeading.text,
  rows = feedbackRows,
}: {
  title?: string;
  text?: string;
  rows?: FeedbackNoteData[][];
}) {
  return (
    <div className="relative isolate overflow-hidden bg-background lg:-mb-24">
      <section className="container pt-8 pb-12 md:pt-10 md:pb-24 lg:py-18">
        <div className="flex flex-col items-center">
          <div className="max-w-2xl pb-6 text-center lg:pb-10">
            <h2 className="font-display text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-balance text-muted-foreground sm:text-xl/8">
              {text}
            </p>
          </div>
        </div>
        <div className="relative max-h-[400px] overflow-hidden rounded-2xl bg-surface lg:max-h-none lg:overflow-visible lg:bg-transparent">
          {rows.map((row, i) => (
            <div key={i} className={`${rowClass} ${i > 0 ? '-mt-24' : ''}`}>
              {row.map((note) => (
                <FeedbackNote key={note.before + note.highlight} {...note} />
              ))}
            </div>
          ))}
          {/* An empty trailing row gives the last notes room to hang below. */}
          <div className={`${rowClass} -mt-24 lg:mb-6`} />
          {/* Inset shadow framing the cropped pile on smaller screens. */}
          <div className="pointer-events-none absolute inset-0 z-1000 rounded-2xl shadow-[inset_0_6px_12px_-2px_#0000001a,inset_0_-6px_12px_-2px_#0000001a,inset_6px_0_12px_-2px_#0000001a,inset_-6px_0_12px_-2px_#0000001a] lg:hidden" />
        </div>
      </section>
    </div>
  );
}
