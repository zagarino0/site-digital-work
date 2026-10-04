import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Lightbulb, Rocket, Search, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface MethodStep { number: string; title: string; description: string; icon: LucideIcon; }

const steps: MethodStep[] = [
  { number: "01", title: "", description: "", icon: Search },
  { number: "02", title: "", description: "", icon: Lightbulb },
  { number: "03", title: "", description: "", icon: Code2 },
  { number: "04", title: "", description: "", icon: Rocket },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomeMethod() {
  const { t } = useTranslation();
  const localized = [
    { ...steps[0], title: t("method.steps.analysis.title"), description: t("method.steps.analysis.description") },
    { ...steps[1], title: t("method.steps.design.title"), description: t("method.steps.design.description") },
    { ...steps[2], title: t("method.steps.development.title"), description: t("method.steps.development.description") },
    { ...steps[3], title: t("method.steps.deployment.title"), description: t("method.steps.deployment.description") },
  ];

  return (
    <section id="method" className="bg-white py-24 text-[#11110f] sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#77736a]">
            <span className="h-px w-10 bg-[#cfc7b8]" />
            <span>{t("method.eyebrow")}</span>
            <span className="h-px w-10 bg-[#cfc7b8]" />
          </div>
          <h2 className="font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[3.4rem]">
            {t("method.title")}{" "}
            <span className="text-[#c99a4d]">{t("method.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6e6a61] sm:text-lg">
            {t("method.description")}
          </p>
        </motion.header>

        <div className="relative">
          <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-[3.2rem] hidden h-px bg-[#dcd7cc] lg:block" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {localized.map((step) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.number}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="group relative bg-white"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#d6d0c4] bg-white text-[#11110f]">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <div className="mt-6 border-t border-[#dcd7cc] pt-5">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#c99a4d]">{step.number}</span>
                    <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#6e6a61]">{step.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-4xl border-y border-[#dcd7cc] py-6">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f4f1eb] dark:bg-[#2a2924]">
              <CheckCircle2 className="h-5 w-5 text-[#11110f] dark:text-[#f5f2e9]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{t("method.reassurance.title")}</h3>
              <p className="mt-1 text-sm leading-6 text-[#6e6a61]">{t("method.reassurance.description")}</p>
            </div>
            <Link to="/contact" className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#11110f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2b2925]">
              {t("method.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
