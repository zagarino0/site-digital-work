
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

interface PillarConfig {
  number: string;
  icon: LucideIcon;
}

const pillars: PillarConfig[] = [
  {
    number: "01",
    icon: Code2,
  },
  {
    number: "02",
    icon: Layers3,
  },
  {
    number: "03",
    icon: Zap,
  },
  {
    number: "04",
    icon: ShieldCheck,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
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

export default function HomePillars() {
  const { t } = useTranslation();

  return (
    <section
      id="pillars"
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        sm:py-28
        dark:bg-slate-950
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute
            -left-40
            top-20
            h-96
            w-96
            rounded-full
            bg-blue-500/5
            blur-3xl
            dark:bg-blue-500/10
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-10
            h-96
            w-96
            rounded-full
            bg-indigo-500/5
            blur-3xl
            dark:bg-indigo-500/10
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-violet-500/5
            blur-3xl
            dark:bg-violet-500/10
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow */}
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-4
              py-2
              text-sm
              font-semibold
              text-blue-700
              dark:border-blue-900/60
              dark:bg-blue-950/40
              dark:text-blue-300
            "
          >
            <Sparkles
              className="h-4 w-4"
              aria-hidden="true"
            />

            {t("pillars.eyebrow")}
          </span>

          {/* Title */}
          <h2
            className="
              mt-6
              text-3xl
              font-black
              tracking-tight
              text-slate-950
              sm:text-4xl
              lg:text-5xl
              dark:text-white
            "
          >
            {t("pillars.title")}

            <br />

            <span
              className="
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-violet-600
                bg-clip-text
                text-transparent
                dark:from-blue-400
                dark:via-indigo-400
                dark:to-violet-400
              "
            >
              {t("pillars.highlight")}
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-slate-600
              sm:text-lg
              dark:text-slate-400
            "
          >
            {t("pillars.description")}
          </p>
        </motion.div>

        {/* =====================================================
            PILLARS
        ====================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            mt-16
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.number}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-7
                  shadow-sm
                  transition-shadow
                  duration-300
                  hover:shadow-xl
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >
                <div className="relative">
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      transition-all
                      duration-300
                      group-hover:bg-blue-600
                      group-hover:text-white
                      dark:bg-blue-950/50
                      dark:text-blue-400
                      dark:group-hover:bg-blue-500
                      dark:group-hover:text-white
                    "
                  >
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Number */}
                  <span
                    className="
                      absolute
                      right-0
                      top-0
                      text-xs
                      font-black
                      tracking-widest
                      text-slate-200
                      dark:text-slate-700
                    "
                  >
                    {pillar.number}
                  </span>

                  {/* Content */}
                  <div className="mt-7">
                    <h3
                      className="
                        text-lg
                        font-bold
                        text-slate-950
                        dark:text-white
                      "
                    >
                      {t(`pillars.items.${index}.title`)}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      {t(`pillars.items.${index}.description`)}
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul className="mt-6 space-y-3">
                    {[0, 1, 2].map((highlightIndex) => {
                      const highlight = t(
                        `pillars.items.${index}.highlights.${highlightIndex}`,
                        {
                          defaultValue: "",
                        },
                      );

                      // Ne rien afficher si la traduction est absente.
                      if (!highlight) {
                        return null;
                      }

                      return (
                        <li
                          key={`${pillar.number}-${highlightIndex}`}
                          className="
                            flex
                            items-start
                            gap-2.5
                            text-sm
                            leading-5
                            text-slate-600
                            dark:text-slate-300
                          "
                        >
                          <CheckCircle2
                            className="
                              mt-0.5
                              h-4
                              w-4
                              shrink-0
                              text-blue-600
                              dark:text-blue-400
                            "
                            aria-hidden="true"
                          />

                          <span>{highlight}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="
            mx-auto
            mt-16
            flex
            max-w-3xl
            flex-col
            items-center
            justify-between
            gap-5
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-6
            text-center
            sm:flex-row
            sm:text-left
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div>
            <h3
              className="
                text-lg
                font-bold
                text-slate-950
                dark:text-white
              "
            >
              {t("cta.title")}
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-slate-600
                dark:text-slate-400
              "
            >
              {t("cta.description")}
            </p>
          </div>

          <Link
            to="/contact"
            className="
              group
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-xl
              bg-slate-950
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-blue-600
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              dark:bg-white
              dark:text-slate-950
              dark:hover:bg-blue-400
              dark:focus:ring-offset-slate-900
            "
          >
            {t("cta.button")}

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

