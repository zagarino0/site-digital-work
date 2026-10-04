import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Check,
  Code2,
  Globe2,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";

import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";

/* =========================================================
   ANIMATIONS
========================================================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   SERVICES DATA
========================================================= */

const services = [
  { number: "01", icon: Globe2, key: "web" },
  { number: "02", icon: LayoutDashboard, key: "applications" },
  { number: "03", icon: Smartphone, key: "mobile" },
  { number: "04", icon: Workflow, key: "digitalization" },
  { number: "05", icon: Code2, key: "customSoftware" },
  { number: "06", icon: Sparkles, key: "modernization" },
];

/* =========================================================
   SERVICES PAGE
========================================================= */

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pb-28">
        {/* Grid */}

        <div className="absolute inset-0 -z-20 dw-grid opacity-30" />

        {/* Glow */}

        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-dw-primary/10 blur-[140px]" />

        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={itemVariants}>
              <Badge>{t("servicesPage.hero.badge")}</Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-7 text-5xl font-black tracking-[-0.04em] text-dw-white sm:text-6xl lg:text-7xl"
            >
              {t("servicesPage.hero.title")}
              <br />
              <span className="dw-gradient-text">
                {t("servicesPage.hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-dw-muted sm:text-lg"
            >
              {t("servicesPage.hero.description")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Button to="/contact">
                {t("servicesPage.hero.primary")}
                <ArrowRight size={17} />
              </Button>

              <Button
                to="/realisations"
                variant="secondary"
              >
                {t("servicesPage.hero.secondary")}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* =====================================================
          SERVICES INTRO
      ====================================================== */}

      <section className="border-t border-white/[0.06] py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow="{t("servicesPage.intro.eyebrow")}"
            title={
              <>
                {t("servicesPage.intro.title")}
                <br />
                {t("servicesPage.intro.titleHighlight")}
              </>
            }
            description="{t("servicesPage.intro.description")}"
          />

          {/* Services grid */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-16 grid gap-5 lg:grid-cols-2"
          >
            {services.map((service) => (
              <ServiceCard
                key={service.number}
                service={service}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =====================================================
          TECHNOLOGIES
      ====================================================== */}

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Badge>{t("servicesPage.technologies.eyebrow")}</Badge>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-dw-white sm:text-4xl">
                {t("servicesPage.technologies.title")}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-dw-muted">
                {t("servicesPage.technologies.description")}
              </p>

              <div className="mt-8">
                <Button to="/contact">
                  {t("servicesPage.technologies.button")}
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                "React",
                "TypeScript",
                "React Native",
                "Node.js",
                "PostgreSQL",
                "Firebase",
                "Tailwind CSS",
                "REST API",
                "Git",
              ].map((technology) => (
                <div
                  key={technology}
                  className="flex min-h-[90px] items-center justify-center rounded-2xl border border-white/[0.07] bg-dw-card px-4 text-center text-sm font-semibold text-dw-white transition-all duration-300 hover:-translate-y-1 hover:border-dw-primary/30 hover:bg-dw-primary/[0.04]"
                >
                  {technology}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow="{t("servicesPage.process.eyebrow")}"
            title={
              <>
                {t("servicesPage.process.title")}
                <br />
                {t("servicesPage.process.titleHighlight")}
              </>
            }
            description="{t("servicesPage.process.description")}"
          />

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ProcessCard
              number="01"
              title="{t("servicesPage.process.steps.analysis.title")}"
              text="{t("servicesPage.process.steps.analysis.text")}"
            />

            <ProcessCard
              number="02"
              title="{t("servicesPage.process.steps.design.title")}"
              text="Nous définissons l'expérience utilisateur et l'architecture de la solution."
            />

            <ProcessCard
              number="03"
              title="{t("servicesPage.process.steps.development.title")}"
              text="{t("servicesPage.process.steps.development.text")}"
            />

            <ProcessCard
              number="04"
              title="{t("servicesPage.process.steps.delivery.title")}"
              text="{t("servicesPage.process.steps.delivery.text")}"
            />
          </div>
        </Container>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-dw-primary/20 bg-dw-primary/[0.07] px-6 py-16 text-center sm:px-12">
            <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-dw-primary/10 blur-[100px]" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-dw-primary/20 bg-dw-primary/10 text-dw-primary">
                <Sparkles size={22} />
              </div>

              <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight text-dw-white sm:text-4xl">
                {t("servicesPage.cta.title")}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-dw-muted">
                {t("servicesPage.cta.description")}
              </p>

              <div className="mt-8">
                <Button to="/contact">
                  {t("servicesPage.cta.button")}
                  <ArrowRight size={17} />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* =========================================================
   SERVICE CARD
========================================================= */

interface Service {
  number: string;
  icon: typeof Globe2;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
}

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.article
      variants={itemVariants}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-dw-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-dw-primary/20 sm:p-8"
    >
      {/* Hover glow */}

      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-dw-primary/5 opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        {/* Header */}

        <div className="flex items-start justify-between gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dw-primary/20 bg-dw-primary/10 text-dw-primary">
            <Icon size={25} />
          </div>

          <span className="text-xs font-bold tracking-[0.18em] text-dw-primary/70">
            {service.number}
          </span>
        </div>

        {/* Title */}

        <h3 className="mt-7 text-2xl font-bold text-dw-white">
          {t(`servicesPage.cards.${service.key}.title`)}
        </h3>

        {/* Description */}

        <p className="mt-4 text-sm leading-7 text-dw-muted">
          {t(`servicesPage.cards.${service.key}.description`)}
        </p>

        {/* Features */}

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {(t(`servicesPage.cards.${service.key}.features`, { returnObjects: true }) as string[]).map((feature: string) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-dw-muted"
            >
              <Check
                size={15}
                className="shrink-0 text-emerald-400"
              />

              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* {t("servicesPage.technologies.eyebrow")} */}

        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6">
          {(t(`servicesPage.cards.${service.key}.technologies`, { returnObjects: true }) as string[]).map((technology: string) => (
            <span
              key={technology}
              className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-xs font-medium text-dw-muted"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   PROCESS CARD
========================================================= */

interface ProcessCardProps {
  number: string;
  title: string;
  text: string;
}

function ProcessCard({
  number,
  title,
  text,
}: ProcessCardProps) {
  return (
    <div className="relative rounded-2xl border border-white/[0.07] bg-dw-card p-6">
      <span className="text-xs font-bold tracking-[0.15em] text-dw-primary">
        {number}
      </span>

      <h3 className="mt-5 text-lg font-bold text-dw-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-dw-muted">
        {text}
      </p>
    </div>
  );
}