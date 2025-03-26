import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/services/utils";

const cardVariants = cva(
  "rounded-lg text-card-foreground",
  {
    variants: {
      variant: {
        default: "bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300",
        outline: "bg-card border border-border hover:border-primary-200 transition-all duration-300",
        interactive: "bg-card border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 hover:border-primary-200 cursor-pointer",
        gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 border border-border shadow-sm",
        elevated: "bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300",
        ghost: "bg-transparent",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        compact: "p-3",
      },
      rounded: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-3xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, rounded, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, size, rounded }),
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-2", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-end space-x-2 pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
