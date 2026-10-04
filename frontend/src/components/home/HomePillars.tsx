import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers3,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface PillarConfig { number: string; icon: LucideIcon; }

const pillars: PillarConfig[] = [
  { number: "01", icon: Code2 },
  { number: "02", icon: Layers3 },
  { number: "03", icon: Zap },
  { number: "04", icon: ShieldCheck },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function HomePillars() {
  const { t } = useTranslation();

  return (
    <section id="pillars" className="bg-white py-24 text-[#11110f] dark:bg-[#1f1e1b] dark:text-[#f5f2e9] sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#77736a]">
            <span className="h-px w-10 bg-[#cfc7b8]" />
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#c99a4d]" />
              {t("pillars.eyebrow")}
            </span>
            <span className="h-px w-10 bg-[#cfc7b8]" />
          </div>

          <h2 className="font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[3.4rem]">
            {t("pillars.title")}{" "}
            <span className="text-[#c99a4d]">{t("pillars.highlight")}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6e6a61] sm:text-lg">
            {t("pillars.description")}
          </p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.number}
                variants={itemVariants}
                className="group relative border-t border-[#dcd7cc] bg-white py-7 pr-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4f1eb] text-[#11110f] transition-colors group-hover:bg-[#11110f] group-hover:text-white dark:bg-[#2a2924] dark:text-[#f5f2e9] dark:group-hover:bg-[#f5f2e9] dark:group-hover:text-[#11110f]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-[#aaa398]">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {t(`pillars.items.${index}.title`)}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6e6a61] dark:text-[#b9b5ac]">
                  {t(`pillars.items.${index}.description`)}
                </p>

                <ul className="mt-5 space-y-2">
                  {[0, 1, 2].map((highlightIndex) => {
                    const highlight = t(`pillars.items.${index}.highlights.${highlightIndex}`, { defaultValue: "" });
                    if (!highlight) return null;
                    return (
                      <li key={highlightIndex} className="flex items-start gap-2 text-xs leading-5 text-[#6e6a61]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c99a4d]" />
                        <span>{highlight}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 h-px w-10 bg-[#c99a4d] transition-all duration-300 group-hover:w-20" />
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center justify-between gap-5 border-y border-[#ded9cf] dark:border-[#4b4942] py-6 sm:flex-row">
          <div>
            <h3 className="text-lg font-semibold">{t("cta.title")}</h3>
            <p className="mt-1 text-sm text-[#6e6a61]">{t("cta.description")}</p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#11110f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2b2925]"
          >
            {t("cta.button")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
