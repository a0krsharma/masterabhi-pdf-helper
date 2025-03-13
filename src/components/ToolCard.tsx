
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  iconSvg: React.ReactNode;
  title: string;
  description: string;
  color: string;
  href: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  iconSvg,
  title,
  description,
  color,
  href,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "tool-card relative group flex flex-col items-center text-center p-5 md:p-6 rounded-xl bg-white border border-border transition-all duration-300 card-shadow hover:shadow-lg",
        "hover:translate-y-[-4px]"
      )}
    >
      <div
        className={cn(
          "tool-icon w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl mb-4",
          `bg-${color}/10`
        )}
      >
        <div className={`w-7 h-7 md:w-8 md:h-8 text-${color}`}>
          {iconSvg}
        </div>
      </div>
      <h3 className="text-base md:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-xs md:text-sm mb-3 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center text-primary text-sm font-medium mt-auto">
        <span>Use tool</span>
        <ArrowRight className="tool-arrow ml-1 w-3 h-3 md:w-4 md:h-4" />
      </div>
    </Link>
  );
};

export default ToolCard;
