import { motion } from "framer-motion";
import {
  phantomDistributionPoints,
  phantomGroupMeta,
  type PhantomGroupId,
} from "@/data/phantomDistribution";
import phantomFamilyImage from "../../family2.png";

const groups: PhantomGroupId[] = [1, 2, 3, 4];

const heightMin = 45;
const heightMax = 190;
const weightMin = 0;
const weightMax = 145;

const axisTicks = {
  height: [50, 80, 110, 140, 170, 190],
  weight: [0, 25, 50, 75, 100, 125, 145],
};

const chart = {
  width: 960,
  height: 540,
  marginTop: 38,
  marginRight: 42,
  marginBottom: 76,
  marginLeft: 82,
};

const miniChart = {
  width: 420,
  height: 260,
  marginTop: 22,
  marginRight: 20,
  marginBottom: 34,
  marginLeft: 42,
};

const groupOffsets: Record<PhantomGroupId, { x: number; y: number }> = {
  1: { x: -5, y: -4 },
  2: { x: 5, y: -2 },
  3: { x: -5, y: 4 },
  4: { x: 5, y: 4 },
};

type PlotGeometry = typeof chart;

const normalize = (value: number, min: number, max: number) =>
  (value - min) / (max - min);

const plotWidth = (geometry: PlotGeometry) =>
  geometry.width - geometry.marginLeft - geometry.marginRight;

const plotHeight = (geometry: PlotGeometry) =>
  geometry.height - geometry.marginTop - geometry.marginBottom;

const scaleX = (height: number, geometry: PlotGeometry) =>
  geometry.marginLeft + normalize(height, heightMin, heightMax) * plotWidth(geometry);

const scaleY = (weight: number, geometry: PlotGeometry) =>
  geometry.marginTop +
  (1 - normalize(weight, weightMin, weightMax)) * plotHeight(geometry);

const scatterPoint = (
  point: (typeof phantomDistributionPoints)[number],
  geometry: PlotGeometry,
  offsetScale = 1,
) => {
  const offset = groupOffsets[point.group];

  return {
    x: scaleX(point.height, geometry) + offset.x * offsetScale,
    y: scaleY(point.weight, geometry) + offset.y * offsetScale,
  };
};

const PhantomScatter = ({
  geometry,
  compact = false,
  preserveAspectRatio = "xMidYMid meet",
  className = "h-full w-full",
}: {
  geometry: PlotGeometry;
  compact?: boolean;
  preserveAspectRatio?: string;
  className?: string;
}) => {
  const dotRadius = compact ? 2.7 : 4.6;
  const offsetScale = compact ? 0.52 : 1;
  const bottomY = geometry.height - geometry.marginBottom;
  const rightX = geometry.width - geometry.marginRight;

  return (
    <svg
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      role={compact ? undefined : "img"}
      aria-label={
        compact
          ? undefined
          : "Two-dimensional dot distribution of phantom height and weight by anatomical group"
      }
    >
      <defs>
        <clipPath id={compact ? "phantomMiniClip" : "phantomScatterClip"}>
          <rect
            x={geometry.marginLeft}
            y={geometry.marginTop}
            width={plotWidth(geometry)}
            height={plotHeight(geometry)}
          />
        </clipPath>
      </defs>

      <rect width={geometry.width} height={geometry.height} fill="#ffffff" />
      <rect
        x={geometry.marginLeft}
        y={geometry.marginTop}
        width={plotWidth(geometry)}
        height={plotHeight(geometry)}
        fill="#f8fafc"
      />

      <g stroke="#cbd5e1" strokeWidth={1}>
        {axisTicks.height.map((tick) => {
          const x = scaleX(tick, geometry);
          return (
            <line
              key={`height-grid-${tick}`}
              x1={x}
              y1={geometry.marginTop}
              x2={x}
              y2={bottomY}
              strokeOpacity={compact ? 0.35 : 0.6}
            />
          );
        })}

        {axisTicks.weight.map((tick) => {
          const y = scaleY(tick, geometry);
          return (
            <line
              key={`weight-grid-${tick}`}
              x1={geometry.marginLeft}
              y1={y}
              x2={rightX}
              y2={y}
              strokeOpacity={compact ? 0.35 : 0.6}
            />
          );
        })}
      </g>

      <g stroke="#334155" strokeWidth={compact ? 1.2 : 1.8}>
        <line
          x1={geometry.marginLeft}
          y1={bottomY}
          x2={rightX}
          y2={bottomY}
        />
        <line
          x1={geometry.marginLeft}
          y1={geometry.marginTop}
          x2={geometry.marginLeft}
          y2={bottomY}
        />
      </g>

      <g clipPath={`url(#${compact ? "phantomMiniClip" : "phantomScatterClip"})`}>
        {phantomDistributionPoints.map((point, index) => {
          const meta = phantomGroupMeta[point.group];
          const { x, y } = scatterPoint(point, geometry, offsetScale);

          return (
            <circle
              key={`${point.group}-${point.height}-${point.weight}-${index}`}
              cx={x}
              cy={y}
              r={dotRadius}
              fill={meta.color}
              fillOpacity={compact ? 0.7 : 0.76}
              stroke="#ffffff"
              strokeOpacity={0.85}
              strokeWidth={compact ? 0.45 : 0.9}
            >
              {!compact && (
                <title>
                  {meta.label}: {point.height} cm, {point.weight} kg
                </title>
              )}
            </circle>
          );
        })}
      </g>

      {!compact && (
        <>
          <g
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="12"
            fill="#475569"
          >
            {axisTicks.height.map((tick) => {
              const x = scaleX(tick, geometry);
              return (
                <text
                  key={`height-label-${tick}`}
                  x={x}
                  y={bottomY + 24}
                  textAnchor="middle"
                >
                  {tick}
                </text>
              );
            })}

            {axisTicks.weight.map((tick) => {
              const y = scaleY(tick, geometry);
              return (
                <text
                  key={`weight-label-${tick}`}
                  x={geometry.marginLeft - 14}
                  y={y + 4}
                  textAnchor="end"
                >
                  {tick}
                </text>
              );
            })}
          </g>

          <g fontFamily="ui-sans-serif, system-ui, sans-serif" fill="#0f172a">
            <text
              x={(geometry.marginLeft + rightX) / 2}
              y={geometry.height - 24}
              textAnchor="middle"
              fontSize="14"
            >
              Height cm
            </text>
            <text
              x={24}
              y={(geometry.marginTop + bottomY) / 2}
              textAnchor="middle"
              fontSize="14"
              transform={`rotate(-90 24 ${(geometry.marginTop + bottomY) / 2})`}
            >
              Weight kg
            </text>
          </g>

          <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="13">
            {groups.map((group, index) => {
              const meta = phantomGroupMeta[group];
              const x = geometry.marginLeft + index * 190;
              const y = geometry.marginTop - 14;

              return (
                <g key={`legend-${group}`} transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="0" r="5" fill={meta.color} />
                  <text x="12" y="4" fill="#334155">
                    {meta.label}
                  </text>
                </g>
              );
            })}
          </g>
        </>
      )}
    </svg>
  );
};

export const PhantomMiniGrid = ({ focus = "full" }: { focus?: "full" | "right" }) => (
  <div className={`relative h-full overflow-hidden bg-white ${focus === "right" ? "" : "p-2"}`}>
    <PhantomScatter
      geometry={miniChart}
      compact
      preserveAspectRatio={focus === "right" ? "xMaxYMid slice" : "xMidYMid meet"}
      className={focus === "right" ? "h-full w-full origin-right scale-[1.12]" : "h-full w-full"}
    />
  </div>
);

export const PhantomLibraryVisual = ({ compact = false }: { compact?: boolean }) => {
  if (compact) {
    return <PhantomMiniGrid />;
  }

  return (
    <div className="overflow-hidden border border-border bg-white shadow-xl">
      <div className="border-b border-border bg-slate-50">
        <img
          src={phantomFamilyImage}
          alt="Computational human phantom family models"
          className="w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="bg-white p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">
              Size-dependent PHANTOM Library
            </div>
          </div>
          <div className="text-xs leading-relaxed text-slate-500">
            Each dot represents one mapped phantom size. Color identifies the anatomical group.
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden border border-slate-200 bg-white"
        >
          <PhantomScatter geometry={chart} />
        </motion.div>

        <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
          <div className="border border-slate-200 bg-white p-3">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">
              Broad body habitus
            </div>
            <p className="mt-2 leading-relaxed">
              The distribution spans pediatric through adult body sizes across
              height and weight.
            </p>
          </div>
          <div className="border border-slate-200 bg-white p-3">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">
              Same selection logic
            </div>
            <p className="mt-2 leading-relaxed">
              The chart follows the group, height, and weight map used by the NCICT
              phantom selector.
            </p>
          </div>
          <div className="border border-slate-200 bg-white p-3">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">
              Vendor-ready scale
            </div>
            <p className="mt-2 leading-relaxed">
              The library goes far beyond typical 20-30 phantom sets while preserving
              a coherent REST API-matching structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
