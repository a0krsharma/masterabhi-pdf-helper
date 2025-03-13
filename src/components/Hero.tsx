
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      containerRef.current.style.setProperty('--mouse-x', x.toString());
      containerRef.current.style.setProperty('--mouse-y', y.toString());
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-blue-50 to-white"
      style={{ 
        '--mouse-x': '0.5', 
        '--mouse-y': '0.5',
      } as React.CSSProperties}
    >
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-100/50 animate-float" 
             style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 -left-10 w-60 h-60 rounded-full bg-indigo-100/40 animate-float" 
             style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-100/30 animate-float" 
             style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-primary/10 text-primary text-sm md:text-base font-medium px-4 py-1.5 rounded-full">
              The ultimate PDF toolkit
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}>
            Every PDF tool you could need, <br className="hidden sm:block" />
            <span className="text-primary">all in one place</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto animate-fade-in-up"
             style={{ animationDelay: '0.3s' }}>
            Easy, secure, and powerful PDF management. Split, merge, compress, 
            convert and edit your PDFs effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up"
               style={{ animationDelay: '0.5s' }}>
            <Button size="lg" className="text-base px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6">
              View All Tools
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
