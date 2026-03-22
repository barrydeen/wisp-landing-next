import { clsx } from "clsx";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <a
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
        variant === "primary" &&
          "bg-[#f97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] hover:brightness-110",
        variant === "secondary" &&
          "border border-[#222] bg-transparent text-[#999] hover:border-[#444] hover:text-[#ccc]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
