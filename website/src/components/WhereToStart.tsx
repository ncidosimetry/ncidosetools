import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, Building2, FlaskConical, ExternalLink, ArrowRight } from "lucide-react";

const startingPoints = [
  {
    icon: Compass,
    title: "Explore the Tools",
    description: "Read high-level summaries of NCICT, NCINM, NCIRF, and PHANTOM before going into technical documentation.",
    link: "/tools",
    linkText: "View Tools",
    external: false,
    color: "bg-primary/50",
  },
  {
    icon: Building2,
    title: "For Vendors",
    description: "See REST API-ready integration options, free trial availability, and the commercial licensing path.",
    link: "/vendors",
    linkText: "REST API Trial",
    external: false,
    color: "bg-primary/70",
  },
  {
    icon: FlaskConical,
    title: "For Researchers",
    description: "Find the non-commercial research access path, STA guidance, and approved-user documentation links.",
    link: "/researchers",
    linkText: "Research Access",
    external: false,
    color: "bg-primary/80",
  },
  {
    icon: ExternalLink,
    title: "Links & Resources",
    description: "See how this public site, the official NCI page, GitHub, and the approved-user group fit together.",
    link: "/resources",
    linkText: "Open Resources",
    external: false,
    color: "bg-primary",
  },
];

export const WhereToStart = () => {
  return (
    <section id="how-to-access" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Getting Started
          </span>
          <h2 className="mt-4 text-section-md lg:text-section">
            Where to Start
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Choose your path based on your role and objectives.
          </p>
        </motion.div>

        {/* Horizontal cards layout */}
        <div className="space-y-4">
          {startingPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {point.external ? (
                <a
                  href={point.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <CardContent point={point} index={index} />
                </a>
              ) : (
                <Link to={point.link} className="group block">
                  <CardContent point={point} index={index} />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CardContent = ({ point, index }: { point: typeof startingPoints[0]; index: number }) => (
  <div className="flex items-center bg-white dark:bg-slate-50 border border-border  overflow-hidden transition-all duration-300 group-hover:border-primary/50">
    {/* Left accent with number */}
    <div className={`${point.color} w-16 h-full min-h-[100px] flex items-center justify-center shrink-0`}>
      <span className="font-mono text-white text-2xl font-light">
        <point.icon className="w-8 h-8 text-white" />
        {/* {String(index + 1).padStart(2, '0')} */}
      </span>
    </div>

    {/* Content */}
    <div className="flex-1 flex items-center justify-between p-6 gap-6">
      <div className="flex items-center gap-5">
        {/* <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <point.icon className="w-5 h-5 text-slate-600" />
        </div> */}
        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">{point.title}</h3>
          <p className="text-sm text-slate-500">{point.description}</p>
        </div>
      </div>
      
      {/* Arrow */}
      <div className="flex items-center gap-2 text-primary shrink-0">
        <span className="text-sm font-mono hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
          {point.linkText}
        </span>
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </div>
);
