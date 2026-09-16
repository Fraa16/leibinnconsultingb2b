/**
 * Responsive image manifest.
 *
 * Collects the derivatives produced by `npm run images` and groups them into
 * per-format srcsets, so adding a width to scripts/optimize-images.mjs is
 * picked up here automatically.
 */

const files = import.meta.glob('../assets/images/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

type Format = 'avif' | 'webp';
type Entry = { url: string; width: number };

/** name → format → entries, ascending by width */
const groups: Record<string, Partial<Record<Format, Entry[]>>> = {};

for (const [path, url] of Object.entries(files)) {
  const match = path.match(/\/([a-z-]+)-(\d+)\.(avif|webp)$/);
  if (!match) continue;
  const [, name, width, format] = match;
  ((groups[name] ??= {})[format as Format] ??= []).push({ url, width: Number(width) });
}

// Numeric sort — sorting the "<url> 768w" strings lexically would rank 768w
// above 1600w and pick the wrong fallback.
for (const formats of Object.values(groups)) {
  for (const entries of Object.values(formats)) entries.sort((a, b) => a.width - b.width);
}

const srcSet = (name: string, format: Format) =>
  (groups[name]?.[format] ?? []).map((e) => `${e.url} ${e.width}w`).join(', ');

export type ResponsiveImage = {
  avif: string;
  webp: string;
  /** Widest derivative, used as the <img> fallback src. */
  fallback: string;
  width: number;
  height: number;
};

function build(name: string, width: number, height: number): ResponsiveImage {
  const webp = groups[name]?.webp ?? [];
  return {
    avif: srcSet(name, 'avif'),
    webp: srcSet(name, 'webp'),
    fallback: webp.length ? webp[webp.length - 1].url : '',
    width,
    height,
  };
}

// Intrinsic dimensions come from the masters; they set the aspect ratio that
// prevents layout shift while the image loads.
export const heroImage = build('cedrik-hero', 5524, 3946);
export const portraitImage = build('cedrik-portrait', 3807, 5710);
export const meetingImage = build('kundengespraech', 5528, 3685);
