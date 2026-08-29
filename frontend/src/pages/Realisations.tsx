import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Check,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

import {
  getUniqueProjectCategories,
  getCanonicalProjectCategory,
} from "../constants/projectCategories";

import {
  fetchProjects,
  getProjectImageUrl,
  type Project,
} from "../services/projectsApi";
import { useTranslation } from "react-i18next";
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

export default function Realisations() {
  const { t } = useTranslation();

  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     CHARGEMENT DES PROJETS
  ======================================================= */

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProjects();

        setProjects(data);
      } catch (error) {
        console.error(
          "Erreur chargement réalisations:",
          error
        );

       
         {error instanceof Error
          ? error.message
          : t("realisations.states.loadError")}
     
      } finally {
        setLoading(false);
      }
    }

    void loadProjects();
  }, []);

  /* =======================================================
     PROJETS NORMALISÉS
  ======================================================= */

  /**
   * On normalise la catégorie provenant de l'API.
   *
   * Exemple :
   *
   * "développement web"
   * "Développement Web "
   *
   * deviennent :
   *
   * "Développement Web"
   */
  const normalizedProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      category: getCanonicalProjectCategory(
        project.category
      ),
    }));
  }, [projects]);

  /* =======================================================
     CATEGORIES
  ======================================================= */
const categories = useMemo(() => {
  const projectCategories = normalizedProjects.map(
    (project) => project.category
  );

  return [
    "Tous",
    ...getUniqueProjectCategories(projectCategories),
  ];
}, [normalizedProjects]);
  /* =======================================================
     FILTRAGE
  ======================================================= */

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") {
      return normalizedProjects;
    }

    return normalizedProjects.filter(
      (project) =>
        getCanonicalProjectCategory(project.category) ===
        getCanonicalProjectCategory(activeCategory)
    );
  }, [normalizedProjects, activeCategory]);

  /* =======================================================
     RESET CATÉGORIE
  ======================================================= */

  /**
   * Sécurité :
   * si une catégorie n'existe plus après rechargement,
   * on revient automatiquement sur "Tous".
   */
  useEffect(() => {
    if (
      activeCategory !== "Tous" &&
      !categories.includes(activeCategory)
    ) {
      setActiveCategory("Tous");
    }
  }, [activeCategory, categories]);

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          isolate
          overflow-hidden
          bg-dw-background
          pt-32
          pb-20
          sm:pb-24
        "
      >
        <div
          className="
            absolute
            inset-0
            -z-20
            dw-grid
            opacity-30
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-0
            -z-10
            h-[520px]
            w-[720px]
            -translate-x-1/2
            rounded-full
            bg-dw-primary/10
            blur-[150px]
          "
        />

        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              mx-auto
              max-w-4xl
              text-center
            "
          >
             </motion.div>
            <motion.div variants={itemVariants}>
            <Badge>{t("realisations.hero.badge")}</Badge>

              <motion.h1
                variants={itemVariants}
                className="
                  mt-7
                  text-5xl
                  font-black
                  leading-[1.02]
                  tracking-[-0.04em]
                  text-dw-text
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                {t("realisations.hero.title")}
                <br />
                <span className="dw-gradient-text">
                  {t("realisations.hero.titleHighlight")}
                </span>
              </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="
                    mx-auto
                    mt-7
                    max-w-2xl
                    text-base
                    leading-8
                    text-dw-muted
                    sm:text-lg
                  "
                >
                  {t("realisations.hero.description")}
                </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* =====================================================
          PROJECTS
      ====================================================== */}

      <section
        className="
          border-t
          border-dw-border
          bg-dw-background
          py-20
          sm:py-28
        "
      >
        <Container>
          {/* FILTRES */}

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-2
            "
          >
            {categories.map((category) => {
              const active =
                activeCategory === category;

              return (
                <button
                  key={category === "Tous"
                        ? t("realisations.categories.all")
                        : t(
                            `realisations.categories.${category
                              .toLowerCase()
                              .normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, "")
                              .replace(/\s+/g, "_")}`,
                            {
                              defaultValue: category,
                            }
                          )}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`
                    rounded-xl
                    border
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      active
                        ? `
                          border-dw-primary/30
                          bg-dw-primary/10
                          text-dw-primary
                        `
                        : `
                          border-dw-border
                          bg-dw-card
                          text-dw-muted
                          hover:border-dw-primary/30
                          hover:text-dw-text
                        `
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* ERREUR */}

          {error && (
            <div
              className="
                mt-10
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                p-4
                text-center
                text-sm
                text-red-500
              "
            >
              {error}
            </div>
          )}

          {/* LOADING */}

          {loading && (
            <div className="py-20 text-center">
                  <p className="text-dw-muted">
                    {t("realisations.states.loading")}
                  </p>
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-dw-muted">
                  {t("realisations.states.empty")}
                </p>
              </div>
            )}

          {/* PROJECT GRID */}

          {!loading &&
            !error &&
            filteredProjects.length > 0 && (
              <motion.div
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="
                  mt-12
                  grid
                  gap-6
                  md:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </motion.div>
            )}
        </Container>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section
        className="
          border-y
          border-dw-border
          bg-dw-surface
          py-24
          sm:py-32
        "
      >
        <Container>
          <div
            className="
              grid
              gap-12
              lg:grid-cols-2
              lg:items-center
            "
          >
            <div>
              <Badge>{t("realisations.process.badge")}</Badge>

                <h2
                  className="
                    mt-6
                    text-3xl
                    font-bold
                    tracking-tight
                    text-dw-text
                    sm:text-4xl
                  "
                >
                  {t("realisations.process.title")}
                  <br />
                  {t("realisations.process.titleSecondLine")}
                </h2>

                <p
                  className="
                    mt-5
                    max-w-xl
                    text-base
                    leading-8
                    text-dw-muted
                  "
                >
                  {t("realisations.process.description")}
                </p>

                <div className="mt-8">
                  <Button to="/contact">
                    {t("realisations.process.cta")}
                    <ArrowRight size={17} />
                  </Button>
                </div>
            </div>

            <div className="space-y-4">
              <ProcessItem
                  number="01"
                  title={t("realisations.process.steps.analysis.title")}
                  text={t("realisations.process.steps.analysis.text")}
                />

                <ProcessItem
                  number="02"
                  title={t("realisations.process.steps.design.title")}
                  text={t("realisations.process.steps.design.text")}
                />

                <ProcessItem
                  number="03"
                  title={t("realisations.process.steps.development.title")}
                  text={t("realisations.process.steps.development.text")}
                />

                <ProcessItem
                  number="04"
                  title={t("realisations.process.steps.production.title")}
                  text={t("realisations.process.steps.production.text")}
                />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section
        className="
          bg-dw-background
          py-24
          sm:py-32
        "
      >
        <Container>
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-dw-primary/20
              bg-dw-primary/[0.07]
              px-6
              py-16
              text-center
              sm:px-12
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-0
                h-64
                w-96
                -translate-x-1/2
                rounded-full
                bg-dw-primary/10
                blur-[100px]
              "
            />

            <div className="relative">
              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-dw-primary/20
                  bg-dw-primary/10
                  text-dw-primary
                "
              >
                <ArrowRight size={22} />
              </div>
                <h2
                  className="
                    mx-auto
                    mt-6
                    max-w-3xl
                    text-3xl
                    font-bold
                    tracking-tight
                    text-dw-text
                    sm:text-4xl
                  "
                >
                  {t("realisations.cta.title")}
                  <br />
                  {t("realisations.cta.titleHighlight")}
                </h2>

                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-2xl
                    text-base
                    leading-7
                    text-dw-muted
                  "
                >
                  {t("realisations.cta.description")}
                </p>

                <div className="mt-8">
                  <Button to="/contact">
                    {t("realisations.cta.button")}
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
   PROJECT CARD
========================================================= */

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();

  const [imageError, setImageError] = useState(false);

  const projectLink =
    project.demo_url ||
    project.project_url ||
    "";

  const hasLink = Boolean(projectLink);

  const imageUrl = getProjectImageUrl(
    project.image_url
  );
  return (
    <motion.article
      layout
      variants={itemVariants}
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-dw-border
        bg-dw-card
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-dw-primary/30
        hover:shadow-xl
        hover:shadow-dw-primary/5
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
          border-b
          border-dw-border
          bg-dw-surface
        "
      >
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            onError={() =>
              setImageError(true)
            }
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-dw-primary/10
              via-dw-surface
              to-dw-background
            "
          >
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-2xl
                border
                border-dw-primary/20
                bg-dw-primary/10
                text-2xl
                font-black
                text-dw-primary
              "
            >
              DW
            </div>
          </div>
        )}

        {/* OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-transparent
            opacity-70
          "
        />

        {/* CATEGORY */}

        <div
          className="
            absolute
            bottom-4
            left-4
          "
        >
          <span
            className="
              rounded-lg
              border
              border-white/10
              bg-black/40
              px-3
              py-1.5
              text-xs
              font-semibold
              text-white
              backdrop-blur-md
            "
          >
            //esssaye
           {t(
              `realisations.categories.${getCanonicalProjectCategory(
                project.category
              )
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "_")}`,
              {
                defaultValue: getCanonicalProjectCategory(
                  project.category
                ),
              }
            )}
          </span>
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-6
        "
      >
        {/* TITLE */}

        <div className="flex items-start justify-between gap-4">
          <h3
            className="
              text-xl
              font-bold
              leading-tight
              text-dw-text
            "
          >
            aria-label={t("realisations.project.viewProduction", {
                title: project.title,
              })}
         
          </h3>

          {hasLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Voir ${project.title} en production`}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-dw-border
                bg-dw-surface
                text-dw-muted
                transition-all
                hover:border-dw-primary/30
                hover:bg-dw-primary/10
                hover:text-dw-primary
              "
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4
            text-sm
            leading-7
            text-dw-muted
          "
        >
          {project.description}
        </p>

        {/* POINTS CLÉS */}

        {project.benefits &&
          project.benefits.length > 0 && (
            <div
              className="
                mt-4
                rounded-lg
                border
                border-dw-border
                bg-dw-surface
                p-3
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-dw-success/10
                    text-dw-success
                  "
                >
                  <CheckCircle2 size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-dw-success
                    "
                  >
                    Points clés
                  </p>

                  <ul className="mt-3 space-y-2">
                    {project.benefits
                      .slice(0, 4)
                      .map((benefit, index) => (
                        <li
                          key={`${project.id}-benefit-${index}`}
                          className="
                            flex
                            items-start
                            gap-2
                            text-xs
                            leading-5
                            text-dw-muted
                          "
                        >
                          <Check
                            size={14}
                            className="
                              mt-0.5
                              shrink-0
                              text-dw-primary
                            "
                          />

                          <span>
                            {benefit}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        {/* TECHNOLOGIES */}

        {project.technologies &&
          project.technologies.length > 0 && (
            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              {project.technologies.map(
                (technology, index) => (
                  <span
                    key={`${project.id}-technology-${index}`}
                    className="
                      rounded-lg
                      border
                      border-dw-border
                      bg-dw-surface
                      px-2.5
                      py-1
                      text-[11px]
                      font-medium
                      text-dw-muted
                    "
                  >
                    {technology}
                  </span>
                )
              )}
            </div>
          )}

        {/* PROJECT BUTTON */}

        <div className="mt-auto pt-7">
          {hasLink ? (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-dw-primary/20
                bg-dw-primary/10
                px-4
                py-2.5
                text-sm
                font-semibold
                text-dw-primary
                transition-all
                hover:border-dw-primary/40
                hover:bg-dw-primary/15
              "
            >
              Voir le projet

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </a>
          ) : (
            <span
              className="
                inline-flex
                items-center
                rounded-xl
                border
                border-dw-border
                bg-dw-surface
                px-4
                py-2.5
                text-sm
                font-medium
                text-dw-muted
              "
            >
              Projet indisponible
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   PROCESS ITEM
========================================================= */

interface ProcessItemProps {
  number: string;
  title: string;
  text: string;
}

function ProcessItem({
  number,
  title,
  text,
}: ProcessItemProps) {
  return (
    <div
      className="
        flex
        gap-5
        rounded-2xl
        border
        border-dw-border
        bg-dw-card
        p-5
        transition-all
        duration-300
        hover:border-dw-primary/25
      "
    >
      <span
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-dw-primary/10
          text-xs
          font-bold
          text-dw-primary
        "
      >
        {number}
      </span>

      <div>
        <h3 className="font-bold text-dw-text">
          {title}
        </h3>

        <p
          className="
            mt-1
            text-sm
            leading-6
            text-dw-muted
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}