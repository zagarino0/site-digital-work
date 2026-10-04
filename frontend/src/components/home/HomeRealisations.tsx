import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  FolderKanban,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "../ui/Container";
import Badge from "../ui/Badge";

import {
  fetchProjects,
  getProjectImageUrl,
  type Project,
} from "../../services/projectsApi";

import {
  getCanonicalProjectCategory,
} from "../../constants/projectCategories";

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
   COMPONENT
========================================================= */

export default function HomeRealisations() {
  const { t } = useTranslation();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     CHARGEMENT DES PROJETS DEPUIS LE BACKEND
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProjects();

        if (!mounted) {
          return;
        }

        setProjects(data);
      } catch (err) {
        console.error(
          "Erreur chargement réalisations accueil:",
          err
        );

        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : t(
                "realisations.errors.load",
                "Impossible de charger les réalisations."
              )
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      mounted = false;
    };
  }, [t]);

  /* =======================================================
     NORMALISATION DES PROJETS

     IMPORTANT :
     Aucun projet n'est créé ici.
     Les données viennent exclusivement du backend.
  ======================================================= */

  const normalizedProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      category: getCanonicalProjectCategory(
        project.category
      ),
    }));
  }, [projects]);

  /* =======================================================
     PROJETS À AFFICHER

     La homepage affiche simplement les 3 premiers projets
     retournés par le backend.

     Si tu veux plus tard un système "featured",
     il faudra ajouter explicitement ce champ au backend.
  ======================================================= */

  const displayedProjects = useMemo(() => {
    return normalizedProjects.slice(0, 3);
  }, [normalizedProjects]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="realisations"
      className="
        border-y
        border-dw-border
        bg-dw-surface
        py-24
        sm:py-32
      "
    >
      <Container>
        {/* =================================================
            HEADER
        ================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <motion.div variants={itemVariants}>
            <Badge>
              {t(
                "realisations.badge",
                "Nos réalisations"
              )}
            </Badge>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="
              mt-6
              text-3xl
              font-bold
              tracking-tight
              text-dw-text
              sm:text-4xl
              lg:text-5xl
            "
          >
            {t(
              "realisations.home.title",
              "Des solutions conçues pour produire des résultats."
            )}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-8
              text-dw-muted
            "
          >
            {t(
              "realisations.home.description",
              "Découvrez quelques projets réalisés par Digital Work."
            )}
          </motion.p>
        </motion.div>

        {/* =================================================
            LOADING
        ================================================== */}

        {loading && (
          <div
            className="
              mt-12
              grid
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-dw-border
                  bg-dw-card
                "
              >
                <div
                  className="
                    aspect-[16/10]
                    animate-pulse
                    bg-dw-surface
                  "
                />

                <div className="space-y-4 p-6">
                  <div
                    className="
                      h-5
                      w-2/3
                      animate-pulse
                      rounded
                      bg-dw-surface
                    "
                  />

                  <div
                    className="
                      h-4
                      w-full
                      animate-pulse
                      rounded
                      bg-dw-surface
                    "
                  />

                  <div
                    className="
                      h-4
                      w-4/5
                      animate-pulse
                      rounded
                      bg-dw-surface
                    "
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================== */}

        {!loading && error && (
          <div
            className="
              mx-auto
              mt-12
              max-w-2xl
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              p-5
              text-center
              text-sm
              text-red-500
            "
          >
            {error}
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================== */}

        {!loading &&
          !error &&
          displayedProjects.length === 0 && (
            <div
              className="
                mx-auto
                mt-12
                max-w-xl
                rounded-3xl
                border
                border-dw-border
                bg-dw-card
                p-10
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-dw-primary/10
                  text-dw-primary
                "
              >
                <FolderKanban size={24} />
              </div>

              <h3
                className="
                  mt-5
                  text-lg
                  font-bold
                  text-dw-text
                "
              >
                {t(
                  "realisations.empty.title",
                  "Aucune réalisation disponible"
                )}
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-dw-muted
                "
              >
                {t(
                  "realisations.empty.description",
                  "Les projets ajoutés depuis l'administration apparaîtront ici."
                )}
              </p>
            </div>
          )}

        {/* =================================================
            PROJECTS
        ================================================== */}

        {!loading &&
          !error &&
          displayedProjects.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              className="
                mt-12
                grid
                gap-6
                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {displayedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </motion.div>
          )}

        {/* =================================================
            CTA
        ================================================== */}

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mt-12 text-center"
        >
          <Link
            to="/realisations"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-dw-primary/20
              bg-dw-primary/10
              px-5
              py-3
              text-sm
              font-semibold
              text-dw-primary
              transition-all
              hover:border-dw-primary/40
              hover:bg-dw-primary/15
            "
          >
            {t(
              "realisations.home.viewAll",
              "Voir toutes nos réalisations"
            )}

            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({
  project,
}: ProjectCardProps) {
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

  const category = getCanonicalProjectCategory(
    project.category
  );

  return (
    <motion.article
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
      {/* =================================================
          IMAGE
      ================================================== */}

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
            alt={
              project.title ||
              t(
                "realisations.card.imageAlt",
                "Réalisation Digital Work"
              )
            }
            loading="lazy"
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
            onError={() => setImageError(true)}
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
            from-black/50
            via-transparent
            to-transparent
          "
        />

        {/* CATEGORY */}

        {category && (
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
              {category}
            </span>
          </div>
        )}
      </div>

      {/* =================================================
          CONTENT
      ================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-6
        "
      >
        {/* TITLE */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <h3
            className="
              text-xl
              font-bold
              leading-tight
              text-dw-text
            "
          >
            {project.title}
          </h3>

          {hasLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(
                "realisations.home.viewProduction",
                "Voir le projet en production"
              )}
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

        {project.description && (
          <p
            className="
              mt-4
              line-clamp-3
              text-sm
              leading-7
              text-dw-muted
            "
          >
            {project.description}
          </p>
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
              {project.technologies
                .slice(0, 5)
                .map((technology, index) => (
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
                ))}
            </div>
          )}

        {/* BUTTON */}

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
              {t(
                "realisations.card.view",
                "Voir le projet"
              )}

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
              {t(
                "realisations.card.unavailable",
                "Projet indisponible"
              )}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}