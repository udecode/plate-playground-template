import { Slot } from '@radix-ui/react-slot';
import { cn } from '@udecode/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
    variants: {
      isMenu: {
        true: 'w-full cursor-pointer justify-start',
      },
      size: {
        icon: 'size-[28px] rounded-md px-1.5',
        lg: 'h-9 rounded-md px-4',
        md: 'h-8 px-3 text-sm',
        none: '',
        sm: 'h-[28px] rounded-md px-2.5',
        xs: 'h-8 rounded-md px-3 text-xs',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        inlineLink: 'text-base text-primary underline underline-offset-4',
        link: 'text-primary underline-offset-4 hover:underline',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const buttonType = Comp === 'button' ? ({ type: 'button' } as object) : {};

    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        {...buttonType}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, type ButtonProps, buttonVariants };
