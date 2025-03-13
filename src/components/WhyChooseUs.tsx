
import React from "react";
import { Shield, Zap, Lock, Globe } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Fast Processing",
      description:
        "Our optimized algorithms process your PDF files in seconds, saving you valuable time.",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure & Private",
      description:
        "Your files are processed securely on our servers and automatically deleted after processing.",
    },
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "Advanced Protection",
      description:
        "We use SSL encryption to ensure your documents remain confidential and secure.",
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Online Access",
      description:
        "Access from any device, anywhere. No software installation required.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose MasterAbhiPDF?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform is designed with simplicity, security, and efficiency in mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 text-center card-shadow opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s`, animationFillMode: 'forwards' }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
