import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BarChart3,
  Check,
  Globe2,
  Hotel,
  Layers3,
  Network,
  Settings2,
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
      staggerChildren: 0.08,
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
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   SOLUTIONS DATA
========================================================= */

const solutions = [
  { number: "01", icon: Globe2, key: "presence" },
  { number: "02", icon: BarChart3, key: "management" },
  { number: "03", icon: Workflow, key: "processes" },
  { number: "04", icon: Hotel, key: "hospitality" },
  { number: "05", icon: Network, key: "network" },
];

/* =========================================================
   PAGE
========================================================= */

export default function Solutions() {
  const { t } = useTranslation();

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pb-28">
        <div className="absolute inset-0 -z-20 dw-grid opacity-30" />

        <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-dw-primary/10 blur-[150px]" />

        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={itemVariants}>
              <Badge>{t("solutionsPage.hero.badge")}</Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-7 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-dw-white sm:text-6xl lg:text-7xl"
            >
              {t("solutionsPage.hero.title")}
              <br />
              <span className="dw-gradient-text">
                {t("solutionsPage.hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-dw-muted sm:text-lg"
            >
              {t("solutionsPage.hero.description")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Button to="/contact">
                {t("solutionsPage.hero.primary")}
                <ArrowRight size={17} />
              </Button>

              <Button
                to="/realisations"
                variant="secondary"
              >
                {t("solutionsPage.hero.secondary")}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* =====================================================
          POSITIONING
      ====================================================== */}

      <section className="border-t border-white/[0.06] py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge>{t("solutionsPage.positioning.badge")}</Badge>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t("solutionsPage.positioning.title")}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-dw-muted">
                {t("solutionsPage.positioning.p1")}
              </p>

              <p className="mt-4 max-w-xl text-base leading-8 text-dw-muted">
                {t("solutionsPage.positioning.p2")}
              </p>

              <div className="mt-8">
                <Button to="/services">
                  {t("solutionsPage.positioning.button")}
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-dw-primary/10 blur-[80px]" />

              <div className="relative rounded-3xl border border-white/[0.07] bg-dw-card p-7">
                <div className="grid grid-cols-2 gap-4">
                  <MiniStat
                    icon={Globe2}
                    title={t("solutionsPage.positioning.stats.visibility.title")}
                    text={t("solutionsPage.positioning.stats.visibility.text")}
                  />

                  <MiniStat
                    icon={BarChart3}
                    title={t("solutionsPage.positioning.stats.management.title")}
                    text={t("solutionsPage.positioning.stats.management.text")}
                  />

                  <MiniStat
                    icon={Workflow}
                    title={t("solutionsPage.positioning.stats.automation.title")}
                    text={t("solutionsPage.positioning.stats.automation.text")}
                  />

                  <MiniStat
                    icon={Settings2}
                    title={t("solutionsPage.positioning.stats.evolution.title")}
                    text={t("solutionsPage.positioning.stats.evolution.text")}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          SOLUTIONS
      ====================================================== */}

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow={t("solutionsPage.solutions.eyebrow")}
            title={
              <>
                {t("solutionsPage.solutions.title")}
                <br />
                {t("solutionsPage.solutions.titleHighlight")}
              </>
            }
            description={t("solutionsPage.solutions.description")}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="mt-16 space-y-5"
          >
            {solutions.map((solution) => (
              <SolutionCard
                key={solution.number}
                solution={solution}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =====================================================
          BUSINESS SECTORS
      ====================================================== */}

      <section className="py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow={t("solutionsPage.sectors.eyebrow")}
            title={
              <>
                {t("solutionsPage.sectors.title")}
                <br />
                {t("solutionsPage.sectors.titleHighlight")}
              </>
            }
            description={t("solutionsPage.sectors.description")}
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <SectorCard
              icon={Hotel}
              title={t("solutionsPage.sectors.items.hotel.title")}
              text={t("solutionsPage.sectors.items.hotel.text")}
            />

            <SectorCard
              icon={Layers3}
              title={t("solutionsPage.sectors.items.sme.title")}
              text={t("solutionsPage.sectors.items.sme.text")}
            />

            <SectorCard
              icon={Smartphone}
              title={t("solutionsPage.sectors.items.retail.title")}
              text={t("solutionsPage.sectors.items.retail.text")}
            />

            <SectorCard
              icon={Network}
              title={t("solutionsPage.sectors.items.network.title")}
              text={t("solutionsPage.sectors.items.network.text")}
            />
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow={t("solutionsPage.process.eyebrow")}
            title={
              <>
                {t("solutionsPage.process.title")}
                <br />
                {t("solutionsPage.process.titleHighlight")}
              </>
            }
            description={t("solutionsPage.process.description")}
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <ProcessStep
              number="01"
              title={t("solutionsPage.process.steps.explain.title")}
              text={t("solutionsPage.process.steps.explain.text")}
            />

            <ProcessStep
              number="02"
              title={t("solutionsPage.process.steps.design.title")}
              text={t("solutionsPage.process.steps.design.text")}
            />

            <ProcessStep
              number="03"
              title={t("solutionsPage.process.steps.build.title")}
              text={t("solutionsPage.process.steps.build.text")}
            />
          </div>
        </Container>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="py-24 sm:py-32">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-dw-primary/20 bg-dw-primary/[0.07] px-6 py-16 text-center sm:px-12">
            <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-dw-primary/10 blur-[100px]" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-dw-primary/20 bg-dw-primary/10 text-dw-primary">
                <Sparkles size={22} />
              </div>

              <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight text-dw-white sm:text-4xl">
                {t("solutionsPage.cta.title")}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-dw-muted">
                {t("solutionsPage.cta.description")}
              </p>

              <div className="mt-8">
                <Button to="/contact">
                  {t("solutionsPage.cta.button")}
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
   SOLUTION CARD
========================================================= */

interface Solution {
  number: string;
  icon: typeof Globe2;
  key: string;
}

interface SolutionCardProps {
  solution: Solution;
}

function SolutionCard({ solution }: SolutionCardProps) {
  const { t } = useTranslation();
  const Icon = solution.icon;

  return (
    <motion.article
      variants={itemVariants}
      className="group rounded-3xl border border-white/[0.07] bg-dw-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-dw-primary/20 sm:p-9"
    >
      <div className="grid gap-8 lg:grid-cols-[80px_1fr_1fr] lg:items-start">
        {/* Number */}

        <div className="flex items-center justify-between lg:block">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dw-primary/20 bg-dw-primary/10 text-dw-primary">
            <Icon size={25} />
          </div>

          <span className="text-xs font-bold tracking-[0.18em] text-dw-primary/70 lg:mt-5 lg:block">
            {solution.number}
          </span>
        </div>

        {/* Text */}

        <div>
          <h3 className="text-2xl font-bold text-dw-white">
            {t(`solutionsPage.cards.${solution.key}.title`)}
          </h3>

          <p className="mt-2 text-sm font-medium text-dw-primary">
            {t(`solutionsPage.cards.${solution.key}.subtitle`)}
          </p>

          <p className="mt-4 max-w-xl text-sm leading-7 text-dw-muted">
            {t(`solutionsPage.cards.${solution.key}.description`)}
          </p>
        </div>

        {/* Features */}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {(t(`solutionsPage.cards.${solution.key}.features`, { returnObjects: true }) as string[]).map((feature: string) => (
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
      </div>
    </motion.article>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

interface MiniStatProps {
  icon: typeof Globe2;
  title: string;
  text: string;
}

function MiniStat({
  icon: Icon,
  title,
  text,
}: MiniStatProps) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dw-primary/10 text-dw-primary">
        <Icon size={19} />
      </div>

      <h3 className="mt-4 text-sm font-bold text-dw-white">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-dw-muted">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   SECTOR CARD
========================================================= */

interface SectorCardProps {
  icon: typeof Hotel;
  title: string;
  text: string;
}

function SectorCard({
  icon: Icon,
  title,
  text,
}: SectorCardProps) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-dw-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-dw-primary/20">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-dw-primary">
        <Icon size={21} />
      </div>

      <h3 className="mt-6 text-lg font-bold text-dw-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-dw-muted">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   PROCESS STEP
========================================================= */

interface ProcessStepProps {
  number: string;
  title: string;
  text: string;
}

function ProcessStep({
  number,
  title,
  text,
}: ProcessStepProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-dw-card p-7">
      <span className="text-xs font-bold tracking-[0.15em] text-dw-primary">
        {number}
      </span>

      <h3 className="mt-5 text-xl font-bold text-dw-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-dw-muted">
        {text}
      </p>
    </div>
  );
}