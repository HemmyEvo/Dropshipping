import { cn } from '@/lib/utils';

// Divider with text in the middle
interface TextDividerProps {
  text?: string;
  className?: string;
}

export const TextDivider: React.FC<TextDividerProps> = ({ text, className }) => {
  return (
    <div className={cn("relative flex items-center justify-center my-8", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      {text && (
        <div className="relative bg-white px-3 text-sm text-gray-500">
          {text}
        </div>
      )}
    </div>
  );
};

// Simple line divider
interface LineDividerProps {
  className?: string;
  color?: string;
}

export const LineDivider: React.FC<LineDividerProps> = ({ 
  className, 
  color = "border-gray-200" 
}) => {
  return <div className={cn(`w-full border-t ${color} my-6`, className)} />;
};

// Ornamental divider with pattern
export const OrnamentalDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center my-8", className)}>
      <div className="w-4 h-4 border-2 border-gray-300 rotate-45 mx-2"></div>
      <div className="w-4 h-4 border-2 border-gray-300 rotate-45 mx-2"></div>
      <div className="w-4 h-4 border-2 border-gray-300 rotate-45 mx-2"></div>
    </div>
  );
};

// Gradient divider
export const GradientDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("w-full h-px my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent", className)} />
  );
};

// Dotted divider
export const DottedDivider: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn("w-full border-t border-dotted border-gray-300 my-6", className)} />;
};

// Section divider with fancy edges
export const SectionDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative my-12", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white px-4">
          <div className="w-3 h-3 border-2 border-gray-200 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

// Wave pattern divider
export const WaveDivider: React.FC<{ className?: string; flip?: boolean }> = ({ 
  className, 
  flip = false 
}) => {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className={cn("w-full h-6", flip ? "transform rotate-180" : "")}
      >
        <path 
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z" 
          className="fill-gray-100"
        ></path>
      </svg>
    </div>
  );
};

// Zigzag divider
export const ZigzagDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("w-full", className)}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="w-full h-4"
      >
        <path 
          d="M1200 120L0 0 0 120 1200 120z" 
          className="fill-gray-100"
        ></path>
      </svg>
    </div>
  );
};

// Curved divider
export const CurvedDivider: React.FC<{ className?: string; flip?: boolean }> = ({ 
  className, 
  flip = false 
}) => {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className={cn("w-full h-8", flip ? "transform rotate-180" : "")}
      >
        <path 
          d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" 
          className="fill-gray-100"
        ></path>
      </svg>
    </div>
  );
};

// Custom shape divider (like Shopify uses)
export const CustomShapeDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("w-full", className)}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="w-full h-6"
      >
        <path 
          d="M1200,0H0V120H1200V0ZM892.6,71.69C839.55,30.1,758.9,9.83,678,16.18,561.5,25,456.57,76.07,343,69.6,238.18,63.75,143.09,25.08,60,0H1200V96.14C1121.86,113.93,1041.56,118.09,965,103.5,891.64,89.51,892.6,71.69,892.6,71.69Z" 
          className="fill-gray-100"
        ></path>
      </svg>
    </div>
  );
};

// Divider with icons
interface IconDividerProps {
  icon: React.ReactNode;
  className?: string;
}

export const IconDivider: React.FC<IconDividerProps> = ({ icon, className }) => {
  return (
    <div className={cn("relative flex items-center justify-center my-8", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative bg-white p-2 text-gray-400">
        {icon}
      </div>
    </div>
  );
};

// Fancy double line divider
export const DoubleLineDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative my-8", className)}>
      <div className="w-full border-t border-gray-200 mb-1"></div>
      <div className="w-full border-t border-gray-200"></div>
    </div>
  );
};