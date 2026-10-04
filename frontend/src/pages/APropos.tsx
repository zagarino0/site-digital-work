import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Code2,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
  Zap,
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
   PAGE
========================================================= */

export default function APropos() {
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
              <Badge>{t("aboutPage.hero.badge")}</Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-7 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-dw-white sm:text-6xl lg:text-7xl"
            >
              {t("aboutPage.hero.title")}
              <br />
              <span className="dw-gradient-text">
                {t("aboutPage.hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-dw-muted sm:text-lg"
            >
              {t("aboutPage.hero.description")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Button to="/contact">
                {t("aboutPage.hero.primary")}
                <ArrowRight size={17} />
              </Button>

              <Button
                to="/realisations"
                variant="secondary"
              >
                {t("aboutPage.hero.secondary")}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="border-t border-white/[0.06] py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Badge>{t("aboutPage.intro.badge")}</Badge>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-dw-white sm:text-4xl">
                {t("aboutPage.intro.title")}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-dw-muted">
                {t("aboutPage.intro.p1")}
              </p>

              <p className="mt-4 max-w-xl text-base leading-8 text-dw-muted">
                {t("aboutPage.intro.p2")}
              </p>

              <p className="mt-4 max-w-xl text-base leading-8 text-dw-muted">
                {t("aboutPage.intro.p3")}
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-dw-primary/10 blur-[90px]" />

              <div className="relative rounded-3xl border border-white/[0.07] bg-dw-card p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-dw-primary/10 text-dw-primary">
                    <Target size={26} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-dw-muted">
                      {t("aboutPage.objective.label")}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-dw-white">
                      {t("aboutPage.objective.title")}
                    </h3>
                  </div>
                </div>

                <div className="mt-8 space-y-5">
                  <ValueLine
                    icon={Lightbulb}
                    title="{t("aboutPage.objective.items.understand.title")}"
                    text="{t("aboutPage.objective.items.understand.text")}"
                  />

                  <ValueLine
                    icon={Code2}
                    title="{t("aboutPage.objective.items.build.title")}"
                    text="{t("aboutPage.objective.items.build.text")}"
                  />

                  <ValueLine
                    icon={Rocket}
                    title="{t("aboutPage.method.steps.develop.title")}"
                    text="{t("aboutPage.objective.items.evolve.text")}"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          VISION
      ====================================================== */}

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-32 ">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3 text-dw-white">
            <VisionCard
              icon={Target}
              title="{t("aboutPage.vision.mission.title")}"
              text="{t("aboutPage.vision.mission.text")}"
            />

            <VisionCard
              icon={Lightbulb}
              title="{t("aboutPage.vision.vision.title")}"
              text="Créer un écosystème digital où la technologie simplifie les opérations, améliore l'expérience client et accélère la croissance."
            />

            <VisionCard
              icon={Rocket}
              title="{t("aboutPage.vision.ambition.title")}"
              text="{t("aboutPage.vision.ambition.text")}"
            />
          </div>
        </Container>
      </section>

      {/* =====================================================
          EXPERTISE
      ====================================================== */}

      <section className="py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow="{t("aboutPage.expertise.eyebrow")}"
            title={
              <>
                {t("aboutPage.expertise.title")}
                <br />
                {t("aboutPage.expertise.titleHighlight")}
              </>
            }
            description="{t("aboutPage.expertise.description")}"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 text-dw-white"
          >
            <ExpertiseCard
              icon={Code2}
              title="{t("aboutPage.expertise.items.web.title")}"
              text="{t("aboutPage.expertise.items.web.text")}"
              tags={[
                "React",
                "TypeScript",
                "Node.js",
              ]}
            />

            <ExpertiseCard
              icon={Users2}
              title="{t("aboutPage.expertise.items.mobile.title")}"
              text="{t("aboutPage.expertise.items.mobile.text")}"
              tags={[
                "React Native",
                "Expo",
                "Firebase",
              ]}
            />

            <ExpertiseCard
              icon={Zap}
              title="{t("aboutPage.expertise.items.digital.title")}"
              text="{t("aboutPage.expertise.items.digital.text")}"
              tags={[
                "Automation",
                "Workflow",
                "Dashboard",
              ]}
            />

            <ExpertiseCard
              icon={ShieldCheck}
              title="{t("aboutPage.expertise.items.network.title")}"
              text="{t("aboutPage.expertise.items.network.text")}"
              tags={[
                "MikroTik",
                "Hotspot",
                "Wi-Fi",
              ]}
            />

            <ExpertiseCard
              icon={Sparkles}
              title="{t("aboutPage.expertise.items.ux.title")}"
              text="{t("aboutPage.expertise.items.ux.text")}"
              tags={[
                "UI",
                "UX",
                "Responsive",
              ]}
            />

            <ExpertiseCard
              icon={Rocket}
              title="{t("aboutPage.expertise.items.support.title")}"
              text="{t("aboutPage.expertise.items.support.text")}"
              tags={[
                "Conseil",
                "Déploiement",
                "Support",
              ]}
            />
          </motion.div>
        </Container>
      </section>

      {/* =====================================================
          METHOD
      ====================================================== */}

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow="{t("aboutPage.method.eyebrow")}"
            title={
              <>
                {t("aboutPage.method.title")}
                <br />
                {t("aboutPage.method.titleHighlight")}
              </>
            }
            description="{t("aboutPage.method.description")}"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            <MethodCard
              number="01"
              title="{t("aboutPage.method.steps.listen.title")}"
              text="{t("aboutPage.objective.items.understand.title")} votre activité, vos utilisateurs et vos contraintes."
            />

            <MethodCard
              number="02"
              title="{t("aboutPage.method.steps.design.title")}"
              text="Définir l'expérience, les fonctionnalités et l'architecture."
            />

            <MethodCard
              number="03"
              title="{t("aboutPage.method.steps.develop.title")}"
              text="{t("aboutPage.objective.items.build.title")} une solution fiable avec des technologies adaptées."
            />

            <MethodCard
              number="04"
              title="{t("aboutPage.method.steps.evolve.title")}"
              text="{t("aboutPage.method.steps.evolve.text")}"
            />
          </div>
        </Container>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Badge>{t("aboutPage.values.eyebrow")}</Badge>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-dw-white sm:text-4xl">
                {t("aboutPage.values.title")}
              </h2>

              <p className="mt-5 max-w-lg text-base leading-8 text-dw-muted">
                {t("aboutPage.values.description")}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ValueCard
                title="{t("aboutPage.values.items.simplicity.title")}"
                text="{t("aboutPage.values.items.simplicity.text")}"
              />

              <ValueCard
                title="{t("aboutPage.values.items.performance.title")}"
                text="{t("aboutPage.values.items.performance.text")}"
              />

              <ValueCard
                title="{t("aboutPage.values.items.transparency.title")}"
                text="{t("aboutPage.values.items.transparency.text")}"
              />

              <ValueCard
                title="{t("aboutPage.values.items.scalability.title")}"
                text="{t("aboutPage.values.items.scalability.text")}"
              />
            </div>
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
                {t("aboutPage.cta.title")}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-dw-muted">
                {t("aboutPage.cta.description")}
              </p>

              <div className="mt-8">
                <Button to="/contact">
                  {t("aboutPage.cta.button")}
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
   VALUE LINE
========================================================= */

interface ValueLineProps {
  icon: typeof Target;
  title: string;
  text: string;
}

function ValueLine({
  icon: Icon,
  title,
  text,
}: ValueLineProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-dw-primary">
        <Icon size={18} />
      </div>

      <div>
        <h4 className="text-sm font-bold text-dw-white">
          {title}
        </h4>

        <p className="mt-1 text-sm leading-6 text-dw-muted">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   VISION CARD
========================================================= */

interface VisionCardProps {
  icon: typeof Target;
  title: string;
  text: string;
}

function VisionCard({
  icon: Icon,
  title,
  text,
}: VisionCardProps) {
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-dw-card p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dw-primary/10 text-dw-primary">
        <Icon size={21} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-dw-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-dw-muted">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   EXPERTISE CARD
========================================================= */

interface ExpertiseCardProps {
  icon: typeof Code2;
  title: string;
  text: string;
  tags: string[];
}

function ExpertiseCard({
  icon: Icon,
  title,
  text,
  tags,
}: ExpertiseCardProps) {
  return (
    <motion.article
      variants={itemVariants}
      className="group rounded-2xl border border-white/[0.07] bg-dw-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-dw-primary/20"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-dw-primary">
        <Icon size={21} />
      </div>

      <h3 className="mt-6 text-lg font-bold text-dw-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-dw-muted">
        {text}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[11px] font-medium text-dw-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* =========================================================
   METHOD CARD
========================================================= */

interface MethodCardProps {
  number: string;
  title: string;
  text: string;
}

function MethodCard({
  number,
  title,
  text,
}: MethodCardProps) {
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

/* =========================================================
   VALUE CARD
========================================================= */

interface ValueCardProps {
  title: string;
  text: string;
}

function ValueCard({
  title,
  text,
}: ValueCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-dw-card p-6">
      <div className="mb-5 h-1 w-8 rounded-full bg-dw-primary" />

      <h3 className="text-lg font-bold text-dw-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-dw-muted">
        {text}
      </p>
    </div>
  );
}