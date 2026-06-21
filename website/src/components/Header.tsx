import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {Menu} from "lucide-react";

const isActivePath = (pathname: string, href: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(href));

const navItems = [
  { label: "Our Tools", href: "/tools" },
  { label: "For Vendors", href: "/vendors" },
  { label: "For Researchers", href: "/researchers" },
  { label: "Literature Registry", href: "/literature" },
  // { label: "Documentation", href: "/documentation" },
  { label: "Links & Resources", href: "/resources" },
];

export const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <motion.header
      initial={{ opacity: 1, y: 0 }}
      // animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {/* <div className="relative w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <rect x="2" y="2" width="28" height="28" stroke="currentColor" strokeWidth="1" className="text-primary" />
                <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1" className="text-primary" />
                <line x1="16" y1="4" x2="16" y2="10" stroke="currentColor" strokeWidth="1" className="text-primary" />
                <line x1="16" y1="22" x2="16" y2="28" stroke="currentColor" strokeWidth="1" className="text-primary" />
                <line x1="4" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="1" className="text-primary" />
                <line x1="22" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1" className="text-primary" />
              </svg>
            </div> */}
            <span className="text-lg font-light tracking-tight">
              NCI Dose Tools
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                // initial={{ opacity: 0, y: -10 }}
                // animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <Link
                  to={item.href}
                  className={`relative text-sm transition-colors duration-300 border-animate ${
                    isActivePath(pathname, item.href)
                      ? "text-foreground border-animate-active"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/#how-to-access"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                document.getElementById("how-to-access")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="hidden md:block"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="btn-precision text-sm inline-block"
            >
              Get Access
            </motion.span>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex flex-col gap-1.5 w-6 h-6 items-center justify-center"
                aria-label="Toggle menu"
              >
               <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-normal">
                  NCI Dose Tools
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm transition-colors duration-300 ${
                      isActivePath(pathname, item.href)
                        ? "text-primary font-medium"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-6 border-t border-border">
                  <Link
                    to="/#how-to-access"
                    onClick={(e) => {
                      setIsOpen(false);
                      if (pathname === "/") {
                        e.preventDefault();
                        document.getElementById("how-to-access")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="btn-precision text-sm inline-block w-full text-center"
                  >
                    Get Access
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
