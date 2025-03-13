
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Edit, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-10 h-10 md:w-12 md:h-12 text-primary" />,
      title: "Upload Your Files",
      description:
        "Select the PDF files you want to work with from your device, cloud storage, or drag and drop them directly."
    },
    {
      icon: <Edit className="w-10 h-10 md:w-12 md:h-12 text-primary" />,
      title: "Make Changes",
      description:
        "Use our intuitive tools to edit, merge, split, compress or convert your PDF files with just a few clicks."
    },
    {
      icon: <Download className="w-10 h-10 md:w-12 md:h-12 text-primary" />,
      title: "Download Result",
      description:
        "Once processed, download your new PDF files instantly. No registration required for basic features."
    }
  ];

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Working with PDFs has never been easier. Just three simple steps to get what you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.2 * index}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <div className="absolute top-0 -right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <Button size="lg" className="text-base px-8 py-6">
            Try It Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
