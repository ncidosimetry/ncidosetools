import { motion } from "framer-motion";
import { FlaskConical, Building2, CheckCircle2 } from "lucide-react";

const audiences = [
  {
    icon: FlaskConical,
    title: "Researchers",
    accent: "from-primary/20 to-transparent",
    items: [
      "Clinical research studies requiring patient-specific dose estimation",
      "Studies spanning diverse patient sizes, ages, and imaging protocols",
      "Outcomes research, validation, and benchmarking of dosimetry methods",
      "Reproducible, transparent dose estimation workflows applied across cohorts",
    ],
  },
  {
    icon: Building2,
    title: "Vendors",
    accent: "from-indigo-500/20 to-transparent",
    items: [
      "Dose monitoring and analytics platforms that want organ-dose estimates beyond summary exposure indicators",
      "Commercial teams evaluating CT, nuclear medicine, and radiography/fluoroscopy coverage",
      "Vendors seeking a scientifically defensible dose layer through an approved NCI licensing pathway",
      "Product teams that need credible documentation, version history, and support routes for customers",
    ],
  },
];

export const WhoFor = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-surface/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Use Cases
          </span>
          <h2 className="mt-4 text-section-md lg:text-section">
            Who are they for?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Card with white background */}
              <div className="relative h-full bg-white dark:bg-slate-50 border border-border overflow-hidden">
                {/* Gradient accent bar at top */}
                {/* <div className={`h-1 bg-gradient-to-r ${audience.accent}`} /> */}
                
                <div className="p-8">
                  {/* Icon and title */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 border border-primary  flex items-center justify-center">
                      <audience.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{audience.title}</h3>
                  </div>

                  {/* Items with checkmarks */}
                  <ul className="space-y-4">
                    {audience.items.map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
