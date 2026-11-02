import { satisfactionSurvey } from '../content/journey';
import { Avatar, MockCard, type Tint } from './mock-card';

export type SurveyProps = {
  question: string;
  /** Labels under the first and last point. */
  scale: [string, string];
  /** The chosen point, 1 to 5. */
  rating: number;
  comment: string;
  customer: { name: string; tint: Tint };
};

const faces = ['Very poor', 'Poor', 'Okay', 'Good', 'Great'];

/** The short survey a customer gets after their question is solved. */
export function SurveyMock({
  question = satisfactionSurvey.question,
  scale = satisfactionSurvey.scale,
  rating = satisfactionSurvey.rating,
  comment = satisfactionSurvey.comment,
  customer = satisfactionSurvey.customer,
}: Partial<SurveyProps>) {
  return (
    <MockCard>
      <p className="text-sm leading-snug font-semibold">{question}</p>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {faces.map((label, index) => {
          const point = index + 1;
          const chosen = point === rating;
          return (
            <span
              key={label}
              aria-label={label}
              className={`flex h-11 items-center justify-center rounded-xl border text-sm font-semibold ${
                chosen
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-white text-muted-foreground'
              }`}
            >
              {point}
            </span>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>{scale[0]}</span>
        <span>{scale[1]}</span>
      </div>
      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-surface p-3">
        <Avatar
          name={customer.name}
          tint={customer.tint}
          className="size-7 text-[11px]"
        />
        <p className="text-sm leading-snug">{comment}</p>
      </div>
    </MockCard>
  );
}
