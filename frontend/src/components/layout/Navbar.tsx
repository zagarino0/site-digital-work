import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import Button from "../ui/Button";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const navigation = [
  { key: "home", label: "Accueil", to: "/" },
  { key: "services", label: "Services", to: "/services" },
  { key: "solutions", label: "Solutions", to: "/solutions" },
  { key: "projects", label: "Réalisations", to: "/realisations" },
  { key: "about", label: "À propos", to: "/a-propos" },
] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const adminClickCount = useRef(0);
  const adminClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMobileMenu = () => setMobileOpen(false);

  const handleAdminAccess = (event: React.MouseEvent<HTMLAnchorElement>) => {
    adminClickCount.current += 1;

    if (adminClickTimer.current) clearTimeout(adminClickTimer.current);

    adminClickTimer.current = setTimeout(() => {
      adminClickCount.current = 0;
      adminClickTimer.current = null;
    }, 2000);

    if (adminClickCount.current >= 5) {
      event.preventDefault();
      adminClickCount.current = 0;

      if (adminClickTimer.current) {
        clearTimeout(adminClickTimer.current);
        adminClickTimer.current = null;
      }

      window.location.href = "/admin/login";
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b backdrop-blur-xl transition-colors duration-300 ${
          isHome
            ? "border-white/10 bg-black/10"
            : "border-black/10 bg-dw-background/85"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={(event) => {
              closeMobileMenu();
              handleAdminAccess(event);
            }}
            className="group flex items-center gap-3"
            aria-label="Digital Work - Accueil"
          >
            <img
              src={logo}
              alt="Digital Work"
              className="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-105"
            />

            <div className="leading-none">
              <div
                className={`text-lg font-bold tracking-tight ${
                  isHome ? "text-white" : "text-dw-text"
                }`}
              >
                Digital<span className={isHome ? "text-white/80" : "text-dw-primary"}>Work</span>
              </div>
              <div
                className={`mt-1 text-[9px] font-medium uppercase tracking-[0.25em] ${
                  isHome ? "text-white/70" : "text-dw-muted"
                }`}
              >
                Solutions digitales
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isHome
                        ? "bg-white/85 text-[#171714]"
                        : "bg-dw-primary/10 text-dw-text"
                      : isHome
                        ? "text-white/90 hover:bg-white/10 hover:text-white"
                        : "text-dw-muted hover:bg-black/[0.03] hover:text-dw-text"
                  }`
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Button to="/contact">
              {t("nav.contact")}
              <ArrowRight size={16} />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            className={`rounded-xl border p-2.5 transition lg:hidden ${
              isHome
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-black/10 bg-white/50 text-dw-text hover:bg-white"
            }`}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`overflow-hidden border-b backdrop-blur-xl lg:hidden ${
              isHome
                ? "border-white/10 bg-black/55"
                : "border-black/10 bg-dw-surface/95"
            }`}
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-5 py-5 sm:px-6">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                      isActive
                        ? isHome
                          ? "bg-white/85 text-[#171714]"
                          : "bg-dw-primary/10 text-dw-text"
                        : isHome
                          ? "text-white/90 hover:bg-white/10"
                          : "text-dw-muted hover:bg-black/[0.03]"
                    }`
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              ))}

              <div className={`mt-4 border-t pt-4 ${
                isHome ? "border-white/10" : "border-black/10"
              }`}>
                <p
                  className={`mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                    isHome ? "text-white/60" : "text-dw-muted"
                  }`}
                >
                  {t("common.appearance")}
                </p>

                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>
              </div>

              <div className="mt-4">
                <Button
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="w-full justify-center"
                >
                  {t("nav.contact")}
                  <ArrowRight size={16} />
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
