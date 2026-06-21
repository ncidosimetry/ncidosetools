import { Link } from "react-router-dom";

type FooterLink = { label: string; href: string; external?: boolean };

export const Footer = () => {
  const links: Record<string, FooterLink[]> = {
    Product: [
      { label: "Our Tools", href: "/tools" },
      { label: "For Vendors", href: "/vendors" },
      { label: "For Researchers", href: "/researchers" },
      { label: "Literature Registry", href: "/literature" },
      { label: "Links & Resources", href: "/resources" },
    ],
    Resources: [
      { label: "Official NCI Resources", href: "https://dceg.cancer.gov/tools/radiation-dosimetry-tools", external: true },
      { label: "GitHub Documentation", href: "https://github.com/ncidosimetry/ncidosetools", external: true },
      { label: "Approved-User Updates", href: "https://groups.google.com/g/ncidose", external: true },
      { label: "Professional Updates", href: "https://www.linkedin.com/in/choonsiklee/", external: true },
    ],
  };

  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              
              <span className="text-lg font-light tracking-tight">
                NCI Dose Tools
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Public information hub for NCI-developed radiation dosimetry tools,
              research access, and licensed vendor integration.
            </p>
          </div>

          <div ></div> 

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        {/* <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © 2024 National Cancer Institute. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Accessibility
            </a>
          </div>
        </div> */}
      </div>
    </footer>
  );
};
