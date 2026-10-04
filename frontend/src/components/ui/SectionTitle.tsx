import type { ReactNode } from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-dw-muted">
          <span className="h-px w-7 bg-dw-primary/50" />
          {eyebrow}
        </span>
      )}

      <h2 className="mt-5 text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-dw-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-dw-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
