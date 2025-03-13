
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
    <a
      href={href}
      className={cn(
        "tool-card relative group flex flex-col items-center text-center p-6 md:p-8 rounded-xl bg-white border border-border transition-all duration-300 card-shadow hover:shadow-lg",
        "hover:translate-y-[-4px]"
      )}
    >
      <div
        className={cn(
          "tool-icon w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl mb-6",
          `bg-${color}/10`
        )}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 text-[#${color}]">
          {iconSvg}
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm md:text-base mb-4">
        {description}
      </p>
      <div className="flex items-center text-primary font-medium mt-auto">
        <span>Use tool</span>
        <ArrowRight
          className="tool-arrow ml-1 w-4 h-4"
          style={{ color: `var(--${color})` }}
        />
      </div>
    </a>
  );
};

export default ToolCard;
