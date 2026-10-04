import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  Rocket,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const resultIcons = [TrendingUp, Gauge, Users, Rocket];

export default function HomeResults() {
  const { t } = useTranslation();

  const results = [
    { icon: resultIcons[0], value: "+40%", label: t("results.performance.label"), description: t("results.performance.description") },
    { icon: resultIcons[1], value: "2×", label: t("results.productivity.label"), description: t("results.productivity.description") },
    { icon: resultIcons[2], value: "+60%", label: t("results.engagement.label"), description: t("results.engagement.description") },
    { icon: resultIcons[3], value: "100%", label: t("results.custom.label"), description: t("results.custom.description") },
  ];

  const benefits = t("results.benefits", { returnObjects: true }) as string[];

  return (
    <section id="results" className="bg-[#faf9f6] py-24 text-[#11110f] sm:py-28">
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
              <BarChart3 className="h-3.5 w-3.5 text-[#c99a4d]" />
              {t("results.eyebrow")}
            </span>
            <span className="h-px w-10 bg-[#cfc7b8]" />
          </div>
          <h2 className="font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[3.4rem]">
            {t("results.title")}{" "}
            <span className="text-[#c99a4d]">{t("results.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6e6a61] sm:text-lg">
            {t("results.description")}
          </p>
        </motion.header>

        <div className="mt-14 grid gap-0 border-y border-[#dcd7cc] sm:grid-cols-2 lg:grid-cols-4">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <motion.article
                key={result.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group border-b border-[#dcd7cc] px-6 py-8 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#aaa398]">
                    0{index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-[#11110f]" strokeWidth={1.6} />
                </div>
                <p className="mt-8 font-serif text-4xl font-semibold tracking-tight">{result.value}</p>
                <h3 className="mt-2 text-sm font-semibold">{result.label}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6e6a61]">{result.description}</p>
                <ArrowUpRight className="mt-6 h-4 w-4 text-[#c99a4d] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mt-14 grid overflow-hidden border border-[#dcd7cc] bg-white lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#11110f] text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-serif text-3xl font-semibold tracking-tight">
              {t("results.impact.title")}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#6e6a61]">
              {t("results.impact.description")}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {Array.isArray(benefits) && benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-2.5 text-sm text-[#56544d]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#c99a4d]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-[300px] items-center justify-center bg-[#11110f] p-8 text-white">
            <div className="w-full max-w-sm">
              <div className="border border-white/15 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">{t("results.visual.performance")}</p>
                    <p className="mt-2 font-serif text-4xl">+87%</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-[#c99a4d]" />
                </div>
                <div className="mt-8 h-1 overflow-hidden bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "87%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="h-full bg-[#c99a4d]"
                  />
                </div>
                <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.15em] text-white/40">
                  <span>{t("results.visual.before")}</span>
                  <span>{t("results.visual.after")}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
