import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomeCTA() {
  const { t } = useTranslation();

  const rawBenefits = t("cta.benefits", { returnObjects: true });
  const benefits = Array.isArray(rawBenefits)
    ? rawBenefits.filter((benefit): benefit is string => typeof benefit === "string")
    : [];

  return (
    <section id="contact" className="bg-white py-24 text-[#11110f] sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden border-y border-[#dcd7cc] bg-[#faf9f6] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ead8b9]/35" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#77736a]">
                <span className="h-px w-10 bg-[#c99a4d]" />
                <Sparkles className="h-3.5 w-3.5 text-[#c99a4d]" />
                <span>{t("cta.badge")}</span>
              </div>

              <h2 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[4rem]">
                {t("cta.title")}{" "}
                <span className="text-[#c99a4d]">{t("cta.highlight")}</span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#6e6a61] sm:text-lg">
                {t("cta.description")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#11110f] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2b2925]"
                >
                  {t("cta.primaryCta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/realisations"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d6d0c4] bg-white px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[#11110f]"
                >
                  {t("cta.secondaryCta")}
                </Link>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {benefits.map((benefit, index) => (
                  <div key={`${benefit}-${index}`} className="flex items-center gap-2 text-sm text-[#6e6a61]">
                    <CheckCircle2 className="h-4 w-4 text-[#c99a4d]" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#dcd7cc] bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#e5e1d8] pb-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77736a]">
                    {t("cta.response")}
                  </p>
                  <p className="mt-2 font-serif text-3xl font-semibold">Digital Work</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#11110f] text-white">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-[#6e6a61]">
                {t("cta.responseDescription")}
              </p>

              <div className="mt-7 space-y-5">
                {[
                  ["analysis", "100%"],
                  ["design", "85%"],
                  ["development", "65%"],
                ].map(([key, width]) => (
                  <div key={key}>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium">{t(`cta.process.${key}`)}</span>
                      <span className="text-[#99948a]">{width}</span>
                    </div>
                    <div className="h-1 bg-[#e8e4db]">
                      <div className="h-full bg-[#c99a4d]" style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-[#e5e1d8] pt-5">
                <p className="text-xs leading-5 text-[#77736a]">{t("cta.footerText")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
