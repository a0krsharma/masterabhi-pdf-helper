
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  icon: ReactNode;
  colorClass: string;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({
  children,
  title,
  description,
  icon,
  colorClass,
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center mb-8">
            <div className={`w-12 h-12 rounded-lg mr-4 flex items-center justify-center ${colorClass}`}>
              {icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-border p-6 md:p-8 shadow-sm">
            {children}
          </div>
          
          <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">About {title}</h2>
            <div className="text-muted-foreground">
              <p className="mb-3">
                This online {title.toLowerCase()} tool is completely free and easy to use. No registration or installation required.
              </p>
              <p>
                Your files are secure and only processed in your browser. They are never uploaded to our server, ensuring complete privacy and security.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolLayout;
