import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const sidebarSections = [
  {
    title: "Getting Started",
    items: ["Introduction", "Quick Start", "Installation", "Authentication"],
  },
  {
    title: "Core Concepts",
    items: ["Dose Calculation", "Protocols", "Phantoms", "Validation"],
  },
  {
    title: "REST API Reference",
    items: ["Endpoints", "Request Format", "Response Codes", "Rate Limits"],
  },
  {
    title: "Guides",
    items: ["Integration", "Best Practices", "Troubleshooting", "Migration"],
  },
];

const codeExamples = {
  python: `import nci_dose

client = nci_dose.Client(api_key="your_api_key")

# Calculate dose for CT scan
result = client.calculate(
    protocol="ct_abdomen",
    patient_mass=70,
    patient_age=45
)

print(f"Effective Dose: {result.effective_dose} mSv")`,
  javascript: `import { NCIDose } from '@nci/dose-sdk';

const client = new NCIDose({ apiKey: 'your_api_key' });

// Calculate dose for CT scan
const result = await client.calculate({
  protocol: 'ct_abdomen',
  patientMass: 70,
  patientAge: 45
});

console.log(\`Effective Dose: \${result.effectiveDose} mSv\`);`,
  curl: `curl -X POST https://api.nci-dose.gov/v2/calculate \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "protocol": "ct_abdomen",
    "patient_mass": 70,
    "patient_age": 45
  }'`,
};

const apiEndpoints = [
  { method: "POST", endpoint: "/v2/calculate", description: "Calculate dose for a given protocol and patient parameters" },
  { method: "GET", endpoint: "/v2/protocols", description: "List all available protocols" },
  { method: "GET", endpoint: "/v2/protocols/:id", description: "Get details for a specific protocol" },
  { method: "POST", endpoint: "/v2/batch", description: "Submit batch calculation requests" },
  { method: "GET", endpoint: "/v2/results/:id", description: "Retrieve calculation results by ID" },
];

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("Introduction");
  const [activeCodeTab, setActiveCodeTab] = useState<keyof typeof codeExamples>("python");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-24">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                {sidebarSections.map((section, i) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
                      {section.title}
                    </h4>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => setActiveSection(item)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors duration-200 ${
                              activeSection === item
                                ? "text-primary bg-primary/10 border-l-2 border-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-card"
                            }`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-8"
              >
                <span>Docs</span>
                <span>/</span>
                <span className="text-primary">{activeSection}</span>
              </motion.div>

              {/* Page Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-section-md lg:text-section mb-4">{activeSection}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Welcome to the NCI Dose Tools documentation. This guide will help you integrate our computational dose engine into your clinical workflow.
                </p>
              </motion.div>

              {/* Quick Start Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 glass-card p-6 border-l-4 border-l-primary"
              >
                <h3 className="text-card-title text-foreground mb-2">Quick Start</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get up and running with NCI Dose Tools in under 5 minutes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs font-mono bg-primary/20 text-primary">Step 1: Get REST API Key</span>
                  <span className="px-3 py-1 text-xs font-mono bg-card border border-border">Step 2: Install SDK</span>
                  <span className="px-3 py-1 text-xs font-mono bg-card border border-border">Step 3: First Request</span>
                </div>
              </motion.div>

              {/* Code Examples */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12"
              >
                <h2 className="text-2xl font-light mb-6">Code Examples</h2>
                
                {/* Language Tabs */}
                <div className="flex border-b border-border mb-0">
                  {(Object.keys(codeExamples) as (keyof typeof codeExamples)[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveCodeTab(lang)}
                      className={`px-4 py-2 text-sm font-mono capitalize transition-colors duration-200 ${
                        activeCodeTab === lang
                          ? "text-primary border-b-2 border-primary -mb-px"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Code Block */}
                <div className="bg-card border border-border border-t-0 p-6 overflow-x-auto">
                  <pre className="font-mono text-sm text-foreground">
                    <code>{codeExamples[activeCodeTab]}</code>
                  </pre>
                </div>
              </motion.div>

              {/* REST API Reference Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12"
              >
                <h2 className="text-2xl font-light mb-6">REST API Endpoints</h2>
                
                <div className="glass-card overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-card/50 border-b border-border text-xs font-mono text-muted-foreground uppercase">
                    <div className="col-span-2">Method</div>
                    <div className="col-span-4">Endpoint</div>
                    <div className="col-span-6">Description</div>
                  </div>
                  {apiEndpoints.map((endpoint, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-12 gap-4 p-4 border-b border-border last:border-b-0 hover:bg-card/50 transition-colors"
                    >
                      <div className="col-span-2">
                        <span className={`text-xs font-mono px-2 py-1 ${
                          endpoint.method === "POST" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                        }`}>
                          {endpoint.method}
                        </span>
                      </div>
                      <div className="col-span-4 font-mono text-sm text-primary">
                        {endpoint.endpoint}
                      </div>
                      <div className="col-span-6 text-sm text-muted-foreground">
                        {endpoint.description}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 grid md:grid-cols-2 gap-6"
              >
                <div className="glass-card p-6 border-l-4 border-l-secondary">
                  <h4 className="text-card-title text-foreground mb-2">💡 Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Use batch endpoints for processing multiple calculations simultaneously—up to 100 requests per batch.
                  </p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-destructive">
                  <h4 className="text-card-title text-foreground mb-2">⚠️ Important</h4>
                  <p className="text-sm text-muted-foreground">
                    REST API keys should never be exposed in client-side code. Always use server-side integration.
                  </p>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 flex items-center justify-between py-8 border-t border-border"
              >
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Previous: Installation
                </button>
                <button className="btn-precision-outline text-sm">
                  Next: Authentication →
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
