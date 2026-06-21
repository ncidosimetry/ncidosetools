import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export const SimulatorDescription = () => {
  const [patientMass, setPatientMass] = useState(70);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Calculate dose based on mass (simplified linear relationship for demo)
  const baseDose = 5.2;
  const doseValue = (baseDose * (patientMass / 70)).toFixed(2);
  const fieldSize = 60 + (patientMass - 40) * 0.8;

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Interactive Demo
          </span>
          <h2 className="mt-4 text-section-md lg:text-section">
            Live Calculation Engine
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Experience real-time dose estimation with patient-size scaling.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Controls */}
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-4">
                    Patient Mass (kg)
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="120"
                    value={patientMass}
                    onChange={(e) => setPatientMass(Number(e.target.value))}
                    className="w-full h-1 bg-border rounded-none appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:bg-primary
                      [&::-webkit-slider-thumb]:rounded-none
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:transition-all
                      [&::-webkit-slider-thumb]:duration-300
                      [&::-webkit-slider-thumb]:hover:scale-125"
                  />
                  <div className="flex justify-between mt-2 text-xs font-mono text-muted-foreground">
                    <span>40 kg</span>
                    <span className="text-primary">{patientMass} kg</span>
                    <span>120 kg</span>
                  </div>
                </div>

                {/* Output */}
                <div className="space-y-4">
                  <div className="p-4 bg-background/50 border border-border">
                    <div className="text-xs font-mono text-muted-foreground mb-2">
                      Calculated Dose
                    </div>
                    <div className="flex items-baseline gap-2">
                      <motion.span
                        key={doseValue}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-light data-display"
                      >
                        {doseValue}
                      </motion.span>
                      <span className="text-xl text-primary">mGy</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background/50 border border-border">
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        Protocol
                      </div>
                      <div className="text-sm text-foreground">CT Abdomen</div>
                    </div>
                    <div className="p-4 bg-background/50 border border-border">
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        kVp / mAs
                      </div>
                      <div className="text-sm text-foreground">120 / 250</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visualization */}
              <div className="relative aspect-square flex items-center justify-center">
                {/* Radiation field visualization */}
                <motion.div
                  animate={{ 
                    width: `${fieldSize}%`,
                    height: `${fieldSize}%`,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 border border-primary/30"
                  style={{
                    boxShadow: `0 0 60px -10px hsl(var(--primary) / 0.4)`,
                  }}
                />

                {/* Inner rings */}
                <motion.div
                  animate={{ 
                    width: `${fieldSize * 0.6}%`,
                    height: `${fieldSize * 0.6}%`,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute rounded-full border border-primary/50"
                />
                <motion.div
                  animate={{ 
                    width: `${fieldSize * 0.3}%`,
                    height: `${fieldSize * 0.3}%`,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute rounded-full border border-primary"
                />

                {/* Center dot */}
                <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse" />

                {/* Measurement lines */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border border-border/30" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-border/30" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
