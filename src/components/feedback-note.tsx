import {
  feedbackRows,
  type FeedbackNoteData,
  type Marker,
} from '../content/feedback';

// Full class names so Tailwind finds them.
const markers: Record<Marker, string> = {
  mint: 'bg-tint-mint',
  sand: 'bg-tint-sand',
  sky: 'bg-tint-sky',
  rose: 'bg-tint-rose',
  lilac: 'bg-tint-lilac',
};

export function FeedbackNote({
  before = feedbackRows[0][0].before,
  highlight = feedbackRows[0][0].highlight,
  marker = feedbackRows[0][0].marker,
  after = feedbackRows[0][0].after,
  left = 628 - 128,
  rotate = feedbackRows[0][0].rotate,
  zIndex = 1,
}: Partial<FeedbackNoteData>) {
  return (
    <div
      // On hover the note straightens, grows and jumps above its neighbours, after a short delay.
      className="absolute top-0 w-64 cursor-pointer rounded-xl border border-border bg-white p-5 font-display shadow-[0_1px_2px_rgb(0_0_0/.04),0_8px_24px_rgb(0_0_0/.07)] select-none [transition:rotate_.2s_ease-out,scale_.2s_ease-out,box-shadow_.2s_ease-out,z-index_0s] hover:z-999! hover:scale-105 hover:rotate-0! hover:shadow-[0_2px_4px_rgb(0_0_0/.05),0_20px_40px_rgb(0_0_0/.12)]! hover:[transition-delay:.1s,.1s,.1s,.15s]"
      style={{
        left: `calc(50% - 628px + ${left}px)`,
        rotate: `${rotate}deg`,
        zIndex,
      }}
    >
      <p className="text-center text-lg leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
        {before}
        {highlight && (
          // Uneven corners and cloned edges make it read like a highlighter
          // stroke, even when the phrase wraps onto a second line.
          <span
            className={`-mx-0.5 rounded-[3px_10px_4px_12px/10px_4px_12px_5px] px-1 [box-decoration-break:clone] ${
              markers[marker ?? 'sand']
            }`}
          >
            {highlight}
          </span>
        )}
        {after}
      </p>
    </div>
  );
}
