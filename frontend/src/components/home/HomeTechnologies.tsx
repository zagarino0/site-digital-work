import { Code2, Database, Globe2, Layers3, Smartphone, Server, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type Technology = {
  name: string;
  categoryKey: string;
  descriptionKey: string;
  icon: LucideIcon;
};

const technologies: Technology[] = [
  { name: "React", categoryKey: "frontend", descriptionKey: "react", icon: Code2 },
  { name: "React Native", categoryKey: "mobile", descriptionKey: "reactNative", icon: Smartphone },
  { name: "Node.js", categoryKey: "backend", descriptionKey: "nodejs", icon: Server },
  { name: "TypeScript", categoryKey: "engineering", descriptionKey: "typescript", icon: Layers3 },
  { name: "PostgreSQL", categoryKey: "database", descriptionKey: "postgresql", icon: Database },
  { name: "Web Technologies", categoryKey: "web", descriptionKey: "webTechnologies", icon: Globe2 },
  { name: "Security", categoryKey: "infrastructure", descriptionKey: "security", icon: ShieldCheck },
  { name: "Performance", categoryKey: "optimization", descriptionKey: "performance", icon: Zap },
];

export default function HomeTechnologies() {
  const { t } = useTranslation();

  return (
    <section id="technologies" className="bg-[#faf9f6] py-24 text-[#11110f] dark:bg-[#1f1e1b] dark:text-[#f5f2e9] sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#77736a]">
            <span className="h-px w-10 bg-[#cfc7b8]" />
            <span>{t("technologies.eyebrow")}</span>
            <span className="h-px w-10 bg-[#cfc7b8]" />
          </div>
          <h2 className="font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[3.4rem]">
            {t("technologies.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6e6a61] sm:text-lg">
            {t("technologies.description")}
          </p>
        </header>

        <div className="mt-14 grid gap-px overflow-hidden border border-[#dcd7cc] bg-[#dcd7cc] sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((technology) => {
            const Icon = technology.icon;
            return (
              <article key={technology.name} className="group bg-white p-6 transition-colors hover:bg-[#faf9f6] dark:bg-[#24231f] dark:hover:bg-[#2a2924]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#f4f1eb] text-[#11110f] transition-colors group-hover:bg-[#11110f] group-hover:text-white dark:bg-[#2a2924] dark:text-[#f5f2e9] dark:group-hover:bg-[#f5f2e9] dark:group-hover:text-[#11110f] dw-icon-tile">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#9a958b]">
                    {t(`technologies.categories.${technology.categoryKey}`)}
                  </span>
                </div>
                <h3 className="mt-7 text-lg font-semibold">{technology.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6e6a61] dark:text-[#b9b5ac]">
                  {t(`technologies.items.${technology.descriptionKey}`)}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77736a] dark:text-[#a9a59b]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c99a4d]" />
                  {t("technologies.mastered")}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 grid overflow-hidden border border-[#dcd7cc] dark:border-[#4b4942] bg-white dark:bg-[#24231f] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f4f1eb] text-[#11110f] dark:bg-[#2a2924] dark:text-[#f5f2e9] dw-icon-tile">
                <Layers3 size={19} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#77736a]">
                {t("technologies.architecture.eyebrow")}
              </span>
            </div>
            <h3 className="mt-5 font-serif text-3xl font-semibold tracking-tight">{t("technologies.architecture.title")}</h3>
            <p className="mt-4 max-w-2xl leading-7 text-[#6e6a61] dark:text-[#b9b5ac]">{t("technologies.architecture.description")}</p>
          </div>

          <div className="border-t border-[#dcd7cc] dark:border-[#4b4942] p-8 lg:border-l lg:border-t-0 lg:p-12">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                ["Web", "web"],
                ["Mobile", "mobile"],
                ["API", "api"],
                ["Data", "data"],
              ].map(([name, key]) => (
                <div key={key}>
                  <p className="font-serif text-2xl font-semibold">{name}</p>
                  <p className="mt-1 text-sm text-[#77736a] dark:text-[#a9a59b]">{t(`technologies.architecture.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-6 text-[#77736a] dark:text-[#a9a59b]">
          {t("technologies.closing")}
        </p>
      </div>
    </section>
  );
}
