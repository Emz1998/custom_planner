import * as React from "react"
import { cn } from "../../lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="range"
      className={cn(
        "flex h-6 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 outline-none transition-opacity hover:opacity-75",
        "slider-thumb:appearance-none slider-thumb:h-6 slider-thumb:w-6 slider-thumb:rounded-full slider-thumb:bg-blue-500 slider-thumb:cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Slider.displayName = "Slider"

export { Slider }