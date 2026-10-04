import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock3,
  Code2,
  EyeOff,
  Layers,
  TrendingDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const problems = [
  { key: "time", icon: Clock3 },
  { key: "technology", icon: Code2 },
  { key: "visibility", icon: EyeOff },
  { key: "systems", icon: Layers },
  { key: "profitability", icon: TrendingDown },
  { key: "scalability", icon: AlertTriangle },
] as const;

export default function HomeProblems() {
  const { t } = useTranslation();

  return (
    <section
      id="problems"
      className="relative overflow-hidden bg-[#faf9f6] py-20 text-[#11110f] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6e6a61]">
            <span className="h-px w-10 bg-[#cfc7b8]" />
            <span>{t("problems.eyebrow")}</span>
            <span className="h-px w-10 bg-[#cfc7b8]" />
          </div>

          <h2 className="font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#11110f] sm:text-5xl lg:text-[3.25rem]">
            {t("problems.title")}{" "}
            <span className="text-[#c99a4d]">{t("problems.highlight")}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6e6a61] sm:text-lg">
            {t("problems.description")}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            const content = t(`problems.items.${problem.key}`, {
              returnObjects: true,
            }) as { title: string; description: string };

            return (
              <motion.article
                key={problem.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group relative min-h-[170px] rounded-[14px] border border-[#e3dfd7] bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc7b8] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#f3f0ea] text-[#11110f] dark:bg-[#2a2924] dark:text-[#f5f2e9]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>

                  <span className="text-[11px] font-semibold tracking-[0.18em] text-[#11110f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#11110f]">
                  {content.title}
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#6e6a61]">
                  {content.description}
                </p>

                <span className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#ddd8ce] text-[#11110f] dark:border-[#5a574f] dark:text-[#f5f2e9] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#f5f2e9] group-hover:text-[#11110f] dark:group-hover:bg-[#f5f2e9] dark:group-hover:text-[#11110f]">
                  <ArrowRightIcon />
                </span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
