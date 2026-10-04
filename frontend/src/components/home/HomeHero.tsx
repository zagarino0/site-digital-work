import { ArrowRight, BarChart3, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProjects, type Project } from "../../services/projectsApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const image = `${import.meta.env.BASE_URL}images/mahajanga-background.jpg`;

export default function HomeHero() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;

    async function loadPublishedProjects() {
      try {
        const data = await fetchProjects();

        if (active) {
          setProjects(
            data.filter((project) => project.published === true)
          );
        }
      } catch (error) {
        console.error(
          "Erreur chargement statistiques hero:",
          error
        );

        if (active) {
          setProjects([]);
        }
      }
    }

    void loadPublishedProjects();

    return () => {
      active = false;
    };
  }, []);

  /*
   * Les statistiques publiques proviennent exclusivement
   * des projets publiés dans PostgreSQL, donc de la même
   * source de vérité que l'administration.
   */
  const publishedProjects = projects;
  const publishedProjectCount = publishedProjects.length;
  const projectCategories = new Set(
    publishedProjects.map((project) => project.category)
  ).size;
  const technologies = new Set(
    publishedProjects.flatMap((project) => project.technologies)
  ).size;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white text-[#11110f]"
    >
      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 pb-14 pt-24 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-8 lg:pb-16 lg:pt-28">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#11110f]"
          >
            <span className="h-px w-10 bg-[#b7a98d]" />
            <span>{t("hero.badge")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="max-w-[760px] font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-[#11110f] sm:text-6xl lg:text-[4.7rem] xl:text-[4.85rem]"
          >
            {t("hero.title")}{" "}
            <span className="text-[#c99a4d]">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-7 max-w-xl text-base leading-7 text-[#56544d] sm:text-lg"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/services"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-black"
            >
              {t("hero.primary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/realisations"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d8d3c8] bg-white px-7 py-4 text-sm font-semibold text-[#11110f] transition hover:-translate-y-0.5 hover:border-[#11110f]"
            >
              {t("hero.secondary")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-10 grid grid-cols-3 border-t border-[#e5e1d8] pt-6"
          >
            {[
              [String(publishedProjectCount), t("hero.stats.projects", { defaultValue: "Projets réalisés" })],
              [String(projectCategories), t("hero.stats.categories", { defaultValue: "Domaines couverts" })],
              [String(technologies), t("hero.stats.technologies", { defaultValue: "Technologies utilisées" })],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`min-w-0 px-3 first:pl-0 last:pr-0 sm:px-5 ${index > 0 ? "border-l border-[#e5e1d8]" : ""}`}
              >
                <div className="text-2xl font-semibold leading-none tracking-tight sm:text-3xl">{value}</div>
                <div className="mt-2 text-[10px] leading-4 text-[#77736a] sm:text-xs">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="relative mx-auto w-full max-w-[650px] lg:ml-auto"
        >
          <div className="relative min-h-[390px] sm:min-h-[450px]">
            <div className="absolute left-[8%] top-[7%] z-10 w-[76%] overflow-hidden rounded-[18px] border border-white bg-white p-1 shadow-[0_24px_60px_rgba(17,17,15,0.12)]">
              <img
                src={image}
                alt="Mahajanga"
                className="aspect-[4/3] w-full object-cover object-center"
              />
            </div>

            <div className="absolute right-0 top-[8%] z-20 w-[30%] overflow-hidden rounded-[14px] border border-white bg-white p-1 shadow-[0_18px_45px_rgba(17,17,15,0.14)]">
              <img
                src={image}
                alt=""
                className="aspect-[4/3] w-full object-cover object-[75%_40%]"
              />
            </div>

            <div className="absolute right-[4%] top-[53%] z-20 w-[34%] overflow-hidden rounded-[14px] border border-white bg-white p-1 shadow-[0_18px_45px_rgba(17,17,15,0.14)]">
              <img
                src={image}
                alt=""
                className="aspect-[4/3] w-full object-cover object-[25%_80%]"
              />
            </div>

            <div className="absolute left-0 top-[18%] z-30 flex items-center gap-3 rounded-2xl border border-[#e9e5dc] bg-white px-4 py-3 shadow-[0_18px_45px_rgba(17,17,15,0.12)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f1eb] text-[#11110f]">
                <BarChart3 className="h-5 w-5" />
              </span>
              <div>
                <div className="text-lg font-semibold leading-none">{publishedProjectCount}</div>
                <div className="mt-1 text-xs text-[#77736a]">
                  {t("hero.stats.projects", { defaultValue: "Projets réalisés" })}
                </div>
              </div>
            </div>

            <div className="absolute bottom-[4%] left-[25%] z-30 flex items-center gap-3">
              <span className="font-serif text-2xl italic text-[#11110f]">Mahajanga</span>
              <span className="h-px w-14 bg-[#b7a98d]" />
              <span className="max-w-[120px] text-[9px] font-medium uppercase leading-4 tracking-[0.18em] text-[#77736a]">
                {t("hero.stats.localTagline")}
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#b7a98d]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
