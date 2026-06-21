import { motion } from "framer-motion";
import { FileText, Building, ExternalLink, ArrowRight } from "lucide-react";
import { portalLinks } from "@/data/nciDoseTools";

export const HowToAccess = () => {
  return (
    <section id="how-to-access" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Access
          </span>
          <h2 className="mt-4 text-section-md lg:text-section">
            How to Access
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Choose the appropriate pathway based on your intended use.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Non-Commercial Research Use */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className=" dark:bg-slate-50 bg-white border border-border overflow-hidden h-full">
              {/* Header */}
              <div className="p-6 bg-slate-100 text-primary border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider opacity-80">Research</span>
                    <h3 className="text-xl font-semibold">Non-Commercial Use</h3>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white h-full flex flex-col ">
                <div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    NCI dose tools are available at no cost for non-commercial research use under an
                    {" "}
                    <a
                      href={portalLinks.staForm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      approved Software Transfer Agreement (STA)
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </p>

                  {/* Steps */}
                  <div className="mb-8 h-36">
                    <h4 className="text-xs font-mono text-slate-400 pb-5 uppercase tracking-wider">
                      To Request Access
                    </h4>

                    <div className="flex items-center gap-2 border-primary/20">
                      <div className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</div>
                      <p className="text-sm text-slate-700">
                        Complete the{" "}
                        <a
                          href={portalLinks.staForm}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
                        >
                          STA form <ExternalLink className="w-3 h-3" />
                        </a>
                      </p>
                    </div>

                    <div className="w-[1px] h-6 bg-primary ml-[10px]"></div>

                    <div className="relative flex items-center gap-2 border-primary/20">
                      <div className=" w-5 h-5  rounded-full bg-primary text-white text-xs flex items-center justify-center">2</div>
                      <p className="text-sm text-slate-700">Obtain required signatures</p>
                    </div>

                    <div className="w-[1px] h-6 bg-primary ml-[10px]"></div>

                    <div className="relative flex items-center gap-2">
                      <div className=" w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">3</div>
                      <p className="text-sm text-slate-700">Submit the completed form</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-slate-50 dark:bg-slate-100 p-4">
                  <p className="text-xs font-mono text-slate-400 uppercase  mb-3">
                    Submit to
                  </p>

                  <div className="space-y-1 mb-3">
                    <p className="text-sm font-medium text-slate-900">Dr. Choonsik Lee</p>
                    <p className="text-xs text-slate-500">Lead Developer</p>
                  </div>


                  <a
                    href="mailto:choonsik.lee@nih.gov"
                    className="text-primary hover:underline font-mono text-sm"
                  >
                    choonsik.lee@nih.gov
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Commercial Use */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="bg-white dark:bg-slate-50  bg-white border border-border overflow-hidden h-full">
              {/* Header */}
              <div className="bg-primary p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider opacity-80">Commercial</span>
                    <h3 className="text-xl font-semibold">Commercial Use</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Commercial use of NCI dose tools requires a licensing agreement through the
                  NCI Technology Transfer Center.
                </p>

                {/* Options */}
                <div className="space-y-4 mb-8 h-36">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Vendors May Request
                  </h4>

                  <div className="grid gap-2">
                    {[
                      "Evaluation access",
                      "Commercial runtime licensing",
                      "REST API integration licensing",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-100 "
                      >
                        <ArrowRight className="w-4 h-4 text-primary" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-slate-50 dark:bg-slate-100  p-4">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                    Contact
                  </p>
                  <div className="space-y-1">
                    <div className="space-y-1 mb-3">
                      <p className="text-sm font-medium text-slate-900">Dr. Kevin Chang</p>
                      <p className="text-xs text-slate-500">Licensing and Technology Transfer Officer (NCI Technology Transfer Center)</p>
                    </div>
                    <a
                      href="mailto:kevin.chang@nih.gov"
                      className="text-primary hover:underline font-mono text-sm"
                    >
                      kevin.chang@nih.gov
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
