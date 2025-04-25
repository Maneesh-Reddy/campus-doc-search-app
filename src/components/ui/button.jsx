
import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  asChild = false,
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button";
  
  const handleClick = (e) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Comp
      className={cn("button-base", className)}
      ref={ref}
      onClick={handleClick}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
