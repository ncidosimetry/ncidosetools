import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { publicationSearches } from "@/data/nciDoseTools";

const excludedCountryIsoA3 = new Set([
  "CHN",
  "CUB",
  "HKG",
  "IRN",
  "MAC",
  "PRK",
  "RUS",
  "VEN",
]);

export const GlobalMap = () => {
  const locations = useMemo(() => [
    { name: "United States", isoA3: "USA", users: 188 },
    { name: "United Kingdom", isoA3: "GBR", users: 29 },
    { name: "Italy", isoA3: "ITA", users: 28 },
    { name: "France", isoA3: "FRA", users: 17 },
    { name: "Japan", isoA3: "JPN", users: 11 },
    { name: "Ireland", isoA3: "IRL", users: 10 },
    { name: "Australia", isoA3: "AUS", users: 9 },
    { name: "Portugal", isoA3: "PRT", users: 7 },
    { name: "Brazil", isoA3: "BRA", users: 8 },
    { name: "Canada", isoA3: "CAN", users: 6 },
    { name: "Iran", isoA3: "IRN", users: 6 },
    { name: "Spain", isoA3: "ESP", users: 6 },
    { name: "India", isoA3: "IND", users: 5 },
    { name: "Belgium", isoA3: "BEL", users: 5 },
    { name: "Poland", isoA3: "POL", users: 5 },
    { name: "Sweden", isoA3: "SWE", users: 4 },
    { name: "Turkey", isoA3: "TUR", users: 5 },
    { name: "Netherlands", isoA3: "NLD", users: 4 },
    { name: "South Korea", isoA3: "KOR", users: 4 },
    { name: "Denmark", isoA3: "DNK", users: 3 },
    { name: "Oman", isoA3: "OMN", users: 3 },
    { name: "Czechia", isoA3: "CZE", users: 3 },
    { name: "Finland", isoA3: "FIN", users: 3 },
    { name: "Philippines", isoA3: "PHL", users: 3 },
    { name: "Saudi Arabia", isoA3: "SAU", users: 3 },
    { name: "Tunisia", isoA3: "TUN", users: 3 },
    { name: "Bulgaria", isoA3: "BGR", users: 4 },
    { name: "Thailand", isoA3: "THA", users: 2 },
    { name: "Indonesia", isoA3: "IDN", users: 5 },
    { name: "Iceland", isoA3: "ISL", users: 3 },
    { name: "Norway", isoA3: "NOR", users: 3 },
    { name: "Greece", isoA3: "GRC", users: 2 },
    { name: "Israel", isoA3: "ISR", users: 2 },
    { name: "Germany", isoA3: "DEU", users: 2 },
    { name: "Switzerland", isoA3: "CHE", users: 2 },
    { name: "Nigeria", isoA3: "NGA", users: 1 },
    { name: "Taiwan", isoA3: "TWN", users: 1 },
    { name: "Chile", isoA3: "CHL", users: 1 },
    { name: "Ethiopia", isoA3: "ETH", users: 1 },
    { name: "Kuwait", isoA3: "KWT", users: 1 },
    { name: "South Africa", isoA3: "ZAF", users: 1 },
    { name: "Cyprus", isoA3: "CYP", users: 1 },
    { name: "New Zealand", isoA3: "NZL", users: 1 },
    { name: "Malta", isoA3: "MLT", users: 3 },
    { name: "Kazakhstan", isoA3: "KAZ", users: 1 },
    { name: "Qatar", isoA3: "QAT", users: 1 },
    { name: "Hungary", isoA3: "HUN", users: 1 },
    { name: "Morocco", isoA3: "MAR", users: 1 },
    { name: "China", isoA3: "CHN", users: 1 },
    { name: "Singapore", isoA3: "SGP", users: 1 },
    { name: "Argentina", isoA3: "ARG", users: 1 },
  ].filter((location) => !excludedCountryIsoA3.has(location.isoA3)), []);

  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    name: string;
    users: number;
  } | null>(null);

  const legendMinUsers = 0;
  const legendMaxUsers = 200;

  const minOpacity = 0.25;
  const maxOpacity = 0.9;

  const getFillOpacity = (users: number) => {
    if (legendMaxUsers === legendMinUsers) {
      return (minOpacity + maxOpacity) / 2;
    }

    const normalized = (users - legendMinUsers) / (legendMaxUsers - legendMinUsers);
    return minOpacity + normalized * (maxOpacity - minOpacity);
  };

  const legendStops = useMemo(() => {
    if (legendMaxUsers === legendMinUsers) {
      return Array.from({ length: 5 }, () => legendMinUsers);
    }

    return Array.from({ length: 5 }, (_, index) =>
      Math.round(legendMinUsers + ((legendMaxUsers - legendMinUsers) * index) / 4),
    );
  }, [legendMinUsers, legendMaxUsers]);

  const getLegendPosition = (value: number) => {
    if (legendMaxUsers === legendMinUsers) return 0;
    return ((value - legendMinUsers) / (legendMaxUsers - legendMinUsers)) * 100;
  };

  const updateTooltipPosition = (event: ReactMouseEvent<SVGPathElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    setTooltip((prev) =>
      prev
        ? {
            ...prev,
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top,
          }
        : prev,
    );
  };

  const normalizeName = (value: string) =>
    value
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[().,]/g, "")
      .trim();

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Global Reach
          </span>
          <h2 className="mt-4 text-section-md lg:text-section">
            Distribution of Approved Research Users
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl"
        >
          <div ref={containerRef} className="relative aspect-[2/1] overflow-visible">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 128,
                center: [0, 12],
              }}
              className="h-full w-full"
              aria-label="World map with user distribution"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  <>
                    {geographies.map((geo) => {
                      const isoA3 =
                        (geo.properties?.ISO_A3 as string | undefined) ??
                        (geo.properties?.iso_a3 as string | undefined) ??
                        (geo.properties?.ADM0_A3 as string | undefined) ??
                        "";
                      const geoName =
                        (geo.properties?.NAME as string | undefined) ??
                        (geo.properties?.name as string | undefined) ??
                        "";
                      const match = locations.find((location) => {
                        if (isoA3 && location.isoA3 === isoA3) {
                          return true;
                        }

                        if (geoName) {
                          return (
                            normalizeName(location.name) === normalizeName(geoName) ||
                            normalizeName(geoName).includes(normalizeName(location.name)) ||
                            normalizeName(location.name).includes(normalizeName(geoName))
                          );
                        }

                        return false;
                      });

                      const fillOpacity = match ? getFillOpacity(match.users) : 1;
                      const fillColor = match ? "hsl(var(--primary))" : "hsl(var(--muted))";

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          fillOpacity={fillOpacity}
                          stroke="hsl(var(--border))"
                          strokeWidth={0.5}
                          onMouseEnter={(event) => {
                            if (!match || !containerRef.current) return;
                            const bounds = containerRef.current.getBoundingClientRect();
                            setTooltip({
                              x: event.clientX - bounds.left,
                              y: event.clientY - bounds.top,
                              name: match.name,
                              users: match.users,
                            });
                          }}
                          onMouseMove={match ? updateTooltipPosition : undefined}
                          onMouseLeave={() => setTooltip(null)}
                          style={{
                            default: { outline: "none" },
                            hover: { outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })}
                  </>
                }
              </Geographies>
            </ComposableMap>

            {tooltip ? (
              <div
                className="pointer-events-none absolute z-10 min-w-32 rounded-lg border border-primary/20 bg-background/95 px-3 py-2 text-left font-sans text-xs text-foreground shadow-lg shadow-primary/10 backdrop-blur"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: tooltip.y < 58 ? "translate(-50%, 18px)" : "translate(-50%, -140%)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">{tooltip.name}</span>
                </div>
                <div className="mt-1 pl-4 text-[11px] text-muted-foreground">
                  <span className="tabular-nums">{tooltip.users.toLocaleString()}</span> users
                </div>
              </div>
            ) : null}

            <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 sm:block lg:left-10">
              <div className="text-[10px] font-mono uppercase text-muted-foreground">
                Users
              </div>
              <div className="relative mt-3 flex">
                <div
                  className="h-40 w-3 rounded-full border border-border bg-gradient-to-t from-primary/10 to-primary"
                  // style={{
                  //   background:
                  //     "linear-gradient(to top, hsla(var(--primary), 0.25), hsla(var(--primary), 0.9))",
                  // }}
                />
                <div className="relative ml-3 mt-4 h-36 w-10">
                  {legendStops.map((value) => (
                    <div
                      key={`${value}-${getLegendPosition(value)}`}
                      className="absolute left-0 flex items-center gap-2"
                      style={{ bottom: `${getLegendPosition(value)}%` }}
                    >
                      <span className="h-px w-3 bg-border" />
                      <span className="text-[11px] text-muted-foreground">
                        {value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="absolute bottom-6 left-6 text-xs font-mono text-muted-foreground">
              Sample distribution (population-scaled)
            </div> */}
          </div>
          <div className="mt-3 px-1 sm:hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Users
              </div>
              <div className="text-[10px] text-muted-foreground">
                {legendMinUsers.toLocaleString()}-{legendMaxUsers.toLocaleString()}
              </div>
            </div>
            <div className="mt-2 h-2 w-full rounded-full border border-border bg-gradient-to-r from-primary/10 to-primary" />
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              {legendStops.map((value, index) => (
                <span
                  key={`${value}-${index}`}
                  className={index === 0 ? "text-left" : index === legendStops.length - 1 ? "text-right" : "text-center"}
                >
                  {value.toLocaleString()}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm text-muted-foreground text-center max-w-2xl mx-auto"
        >
          Map shows the approximate geographic distribution of institutions with executed
          Software Transfer Agreements (STAs) for NCI dose tools. Counts are inferred from
          institutional information and do not represent commercial use or clinical deployment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-3xl text-center"
        >
          <h3 className="text-2xl font-light text-foreground lg:text-3xl">
            Growing peer-reviewed literature
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            NCICT, NCIRF, NCINM, and PHANTOM are represented in publications
            spanning CT dose estimation, radiography/fluoroscopy dosimetry,
            nuclear medicine absorbed dose estimation, and hybrid computational
            phantom development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {publicationSearches.map((item) => (
            <Link
              key={item.tool}
              to={`/literature/${item.id}`}
              className="group border border-border bg-background p-5 text-left transition-colors hover:border-primary/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-primary">
                    {item.tool}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.modality}</div>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                View year-by-year publications
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
