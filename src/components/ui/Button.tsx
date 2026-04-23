import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "violet" | "cyan";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: "md" | "lg";
  children: React.ReactNode;
}

const base =
  "inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 active:translate-y-[1px]";

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-pink via-accent to-yellow text-[#0f0d14] shadow-[0_10px_30px_-10px_rgba(255,122,26,0.55)] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-12px_rgba(255,77,143,0.6)]",
  secondary:
    "bg-[#1f1b2b] text-[#f5f1ff] border border-[#322944] hover:border-[#4a3d66] hover:bg-[#261f36]",
  ghost:
    "bg-transparent text-[#9d95b3] hover:text-white hover:bg-[#1f1b2b]/60",
  violet:
    "bg-violet text-[#0f0d14] shadow-[0_10px_30px_-10px_rgba(155,123,255,0.6)] hover:-translate-y-0.5",
  cyan:
    "bg-cyan text-[#0f0d14] shadow-[0_10px_30px_-10px_rgba(77,216,255,0.6)] hover:-translate-y-0.5",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <a
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </a>
  );
}
