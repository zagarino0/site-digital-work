import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

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

      window.location.href = `${import.meta.env.BASE_URL}admin/login`;
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-[#ebe8e1] bg-white/95 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
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
              <div className="text-lg font-bold tracking-tight text-[#11110f]">
                Digital<span className="text-[#11110f]">Work</span>
              </div>
              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-[#77736a]">
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
                      ? "bg-[#f0eee8] text-[#11110f]"
                      : "text-[#56544d] hover:bg-[#f7f5ef] hover:text-[#11110f]"
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
            className="rounded-xl border border-[#e2ded5] bg-white p-2.5 text-[#11110f] transition hover:bg-[#f7f5ef] lg:hidden"
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
            className="overflow-hidden border-b border-[#ebe8e1] bg-white lg:hidden"
          >
            <nav className="dw-mobile-nav mx-auto flex max-w-7xl flex-col px-5 py-5 sm:px-6">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `dw-mobile-nav-item px-4 py-3.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#11110f]"
                        : "text-[#56544d] hover:text-[#11110f]"
                    }`
                  }
                  style={{ background: "transparent", borderRadius: 0 }}
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              ))}

              <div className="mt-4 border-t border-[#ebe8e1] pt-4">
                <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77736a]">
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
