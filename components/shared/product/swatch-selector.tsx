import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SwatchSelectorProps {
  colors: string[]
  selectedColor: string
  onColorSelect: (color: string) => void
  size?: 'sm' | 'md' | 'lg'
}

const SwatchSelector = ({ 
  colors, 
  selectedColor, 
  onColorSelect, 
  size = 'md' 
}: SwatchSelectorProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {colors.map((color) => (
        <TooltipProvider key={color}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onColorSelect(color)}
                className={cn(
                  "rounded-full border-2 border-white shadow-md transition-all hover:scale-110",
                  sizeClasses[size],
                  selectedColor === color ? "ring-2 ring-offset-1 ring-gray-400" : "hover:ring-2 hover:ring-offset-1 hover:ring-gray-300"
                )}
                style={{ backgroundColor: color }}
                aria-label={`Color: ${color}`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="capitalize">{color}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

export default SwatchSelector