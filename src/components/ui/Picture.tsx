import type { ImageSet } from '../../lib/media';

type PictureProps = {
  image: ImageSet;
  fallback: string;
  alt: string;
  /** Layout hint for the browser's source selection. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** The hero image is the LCP element and must not be lazy. */
  priority?: boolean;
  style?: React.CSSProperties;
};

/**
 * AVIF -> WebP -> <img> with a real srcset, explicit dimensions to
 * reserve layout space (no CLS), and lazy loading everywhere except
 * the LCP image.
 */
export default function Picture({
  image,
  fallback,
  alt,
  sizes,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  priority = false,
  style,
}: PictureProps) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={imgClassName}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        // React 18 does not map the camelCase `fetchPriority` prop, so the
        // attribute has to be written in its DOM casing.
        {...({ fetchpriority: priority ? 'high' : 'auto' } as Record<string, string>)}
      />
    </picture>
  );
}
