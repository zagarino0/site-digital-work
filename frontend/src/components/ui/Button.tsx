import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-[-0.01em] transition-all duration-200";

  const variantClass =
    variant === "primary"
      ? "bg-dw-primary text-dw-background shadow-sm hover:bg-dw-primary-hover hover:-translate-y-0.5"
      : "border border-dw-border bg-dw-surface text-dw-text hover:border-dw-primary/25 hover:bg-dw-card hover:-translate-y-0.5";

  const classes = `${baseClass} ${variantClass} ${className}`;

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
