import {
  ArrowLeft,
  Edit3,
  ExternalLink,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/logo.png";

import Button from "../../components/ui/Button";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";

import {
  adminLogout,
  deleteProject,
  getProjects,
  type Project,
} from "../../services/adminApi";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getProjects();

      setProjects(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Impossible de charger les projets."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  async function handleDelete(
    project: Project
  ) {
    const confirmed =
      window.confirm(
        `Supprimer "${project.title}" ?`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(project.id);

      setProjects((current) =>
        current.filter(
          (item) =>
            item.id !== project.id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Suppression impossible."
      );
    }
  }

  function handleLogout() {
    adminLogout();

    navigate("/admin/login", {
      replace: true,
    });
  }

  /* Retour direct vers l'accueil */
  function handleBackHome() {
    navigate("/");
  }

  return (
    <main className="min-h-screen bg-dw-background">

      {/* Header */}
      <header
        className="
          border-b
          border-dw-border
          bg-dw-surface
        "
      >
        <div
          className="
            mx-auto
            flex
            h-20
            max-w-7xl
            items-center
            justify-between
            px-5
            sm:px-6
            lg:px-8
          "
        >

          {/* Logo + titre */}
          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt="Digital Work"
              className="
                h-11
                w-11
                object-contain
              "
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-dw-primary">
                Digital Work
              </p>

              <h1 className="mt-1 text-xl font-bold text-dw-text">
                Administration
              </h1>
            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">

            <ThemeSwitcher />

            {/* Retour accueil */}
            <button
              type="button"
              onClick={handleBackHome}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-dw-border
                bg-dw-card
                text-dw-muted
                transition
                hover:border-dw-primary/30
                hover:text-dw-primary
              "
              aria-label="Retour à l'accueil"
              title="Retour à l'accueil"
            >
              <ArrowLeft size={17} />
            </button>

            {/* Déconnexion */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-dw-border
                bg-dw-card
                px-4
                py-2.5
                text-sm
                font-medium
                text-dw-muted
                transition
                hover:border-dw-primary/30
                hover:text-dw-text
              "
            >
              <LogOut size={16} />
              Déconnexion
            </button>

          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h2 className="text-3xl font-bold text-dw-text">
                Réalisations
              </h2>

              <p className="mt-2 text-sm text-dw-muted">
                Gérez les projets affichés sur votre site.
              </p>
            </div>

            <Button to="/admin/projects/new">
              <Plus size={17} />
              Ajouter une réalisation
            </Button>
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                mt-8
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                p-4
                text-sm
                text-red-500
              "
            >
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="py-20 text-center">
              <p className="text-dw-muted">
                Chargement des réalisations...
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading &&
            projects.length === 0 && (
              <div
                className="
                  mt-10
                  rounded-3xl
                  border
                  border-dw-border
                  bg-dw-card
                  px-6
                  py-20
                  text-center
                "
              >
                <h3 className="text-xl font-bold text-dw-text">
                  Aucune réalisation
                </h3>

                <p className="mt-2 text-sm text-dw-muted">
                  Commencez par ajouter votre premier projet.
                </p>

                <div className="mt-6">
                  <Button to="/admin/projects/new">
                    <Plus size={17} />
                    Ajouter un projet
                  </Button>
                </div>
              </div>
            )}

          {/* Projects */}
          {!loading &&
            projects.length > 0 && (
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="
                      rounded-2xl
                      border
                      border-dw-border
                      bg-dw-card
                      p-5
                    "
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-dw-primary">
                          {project.category}
                        </span>

                        <h3 className="mt-2 text-lg font-bold text-dw-text">
                          {project.title}
                        </h3>
                      </div>

                      {project.featured && (
                        <span className="rounded-lg bg-dw-primary/10 px-2 py-1 text-[10px] font-semibold text-dw-primary">
                          Principal
                        </span>
                      )}

                    </div>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-dw-muted">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies
                        .slice(0, 4)
                        .map((technology) => (
                          <span
                            key={technology}
                            className="
                              rounded-lg
                              border
                              border-dw-border
                              bg-dw-surface
                              px-2
                              py-1
                              text-[11px]
                              text-dw-muted
                            "
                          >
                            {technology}
                          </span>
                        ))}
                    </div>

                    <div className="mt-5 flex items-center gap-2">

                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="
                          inline-flex
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-dw-border
                          bg-dw-surface
                          px-3
                          py-2.5
                          text-sm
                          font-medium
                          text-dw-text
                          hover:border-dw-primary/30
                        "
                      >
                        <Edit3 size={15} />
                        Modifier
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(project)
                        }
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-red-500/20
                          bg-red-500/5
                          text-red-500
                          hover:bg-red-500/10
                        "
                        aria-label={`Supprimer ${project.title}`}
                      >
                        <Trash2 size={16} />
                      </button>

                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dw-border
                            bg-dw-surface
                            text-dw-muted
                            hover:text-dw-primary
                          "
                        >
                          <ExternalLink
                            size={16}
                          />
                        </a>
                      )}

                    </div>
                  </article>
                ))}

              </div>
            )}

        </div>
      </section>
    </main>
  );
}