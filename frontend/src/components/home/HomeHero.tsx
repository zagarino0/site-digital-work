import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MAHAJANGA_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Grand_Baobab_du_bord_de_la_mer_mahajanga.jpg";

export default function HomeHero() {
  const { t } = useTranslation();

  const stats = [
    { value: "50+", label: t("hero.stats.projects"), icon: BriefcaseBusiness },
    { value: "30+", label: t("hero.stats.clients"), icon: Users },
    { value: "5+", label: t("hero.stats.experience"), icon: Clock3 },
    { value: "Majunga", label: t("hero.stats.location"), icon: MapPin },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[760px] overflow-hidden bg-black text-white sm:min-h-[820px] lg:min-h-screen"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${MAHAJANGA_IMAGE}")` }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
      />

      <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col px-5 pb-8 pt-28 sm:min-h-[820px] sm:px-6 sm:pt-32 lg:min-h-screen lg:px-8 lg:pt-36">
        <div className="flex flex-1 items-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/90"
            >
              <span className="h-px w-10 bg-white/80" />
              <span>{t("hero.badge")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            >
              {t("hero.title")}{" "}
              <span className="text-[#d9ad61]">{t("hero.titleHighlight")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-7 max-w-2xl text-base leading-7 text-white/85 sm:text-lg"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#171714] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-black"
              >
                {t("hero.primary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/realisations"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/60 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                {t("hero.secondary")}
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4 }}
          className="grid overflow-hidden rounded-[1.75rem] border border-white/25 bg-white/80 text-[#171714] shadow-2xl shadow-black/20 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map(({ value, label, icon: Icon }, index) => (
            <div
              key={label}
              className={`flex items-center gap-4 px-5 py-5 sm:px-7 ${
                index > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0" : ""
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} />
              <div>
                <div className="text-xl font-semibold tracking-tight">{value}</div>
                <div className="mt-0.5 text-xs text-black/60">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
