export type CustomerGlyph =
  'peak' | 'loop' | 'bean' | 'monogram' | 'pine' | 'tiles' | 'leaf' | 'wheel';

export type CustomerLogo = {
  name: string;
  glyph: CustomerGlyph;
  /** Type treatment, so each wordmark feels like its own brand. */
  style: string;
};

export const customersHeading = 'Trusted by support teams at';

export const customerLogos: CustomerLogo[] = [
  { name: 'Northfield', glyph: 'peak', style: 'font-bold tracking-[-0.03em]' },
  { name: 'Brightloop', glyph: 'loop', style: 'font-semibold lowercase' },
  {
    name: 'Carta Coffee',
    glyph: 'bean',
    style: 'font-medium tracking-[-0.01em]',
  },
  {
    name: 'Halden & Co',
    glyph: 'monogram',
    style: 'font-semibold uppercase tracking-[0.14em] text-[0.8em]',
  },
  {
    name: 'Pinecrest',
    glyph: 'pine',
    style: 'font-extrabold tracking-[-0.04em]',
  },
  { name: 'Mosaic Labs', glyph: 'tiles', style: 'font-medium' },
  { name: 'Fernway', glyph: 'leaf', style: 'font-semibold tracking-[0.02em]' },
  {
    name: 'Quanta Bikes',
    glyph: 'wheel',
    style: 'font-bold uppercase tracking-[0.06em] text-[0.85em]',
  },
];
