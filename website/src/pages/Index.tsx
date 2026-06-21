import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhatAreTools } from "@/components/WhatAreTools";
import { GlobalMap } from "@/components/GlobalMap";
import { WhereToStart } from "@/components/WhereToStart";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#how-to-access") {
      document.getElementById("how-to-access")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <WhatAreTools />
        <GlobalMap />
        <WhereToStart />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
