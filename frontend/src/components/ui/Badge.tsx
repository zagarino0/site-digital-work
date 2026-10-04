import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-dw-border bg-dw-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-dw-muted shadow-sm ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-dw-primary" />
      {children}
    </span>
  );
}
