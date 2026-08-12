/* The spinning highlight overlaid on the record while music plays.
   Defaults match the hero turntable: source art is 924x902 with the record
   centered at (400, 462), radius 345. The navbar thumbnail crops differently,
   so it passes its own geometry. */

type VinylSheenProps = {
  left?: string;
  top?: string;
  width?: string;
  blur?: number;
};

export function VinylSheen({
  left = `${(55 / 924) * 100}%`,
  top = `${(117 / 902) * 100}%`,
  width = `${(690 / 924) * 100}%`,
  blur = 6,
}: VinylSheenProps) {
  return (
    <div className="vinyl-sheen-clip" style={{ left, top, width }}>
      <div className="vinyl-sheen" style={{ filter: `blur(${blur}px)` }} />
    </div>
  );
}
