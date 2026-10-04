
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

type LegalModal = "legal" | "privacy" | null;

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState<LegalModal>(null);


  const changeLanguage = (language: "fr" | "mg" | "en") => {
    i18n.changeLanguage(language);
  };

  const languages = [
    { code: "fr" as const, label: "FR" },
    { code: "mg" as const, label: "MG" },
    { code: "en" as const, label: "EN" },
  ];

  return (
    <>
      <footer className="border-t border-[#e5e1d8] bg-white dark:border-[#e5e1d8] dark:bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Main footer */}
         <div className="grid min-w-0 gap-10 sm:gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div className="min-w-0 lg:col-span-1">
                <div>
                    {/* =================================================
              LOGO
          ================================================== */}

          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="Digital Work - Accueil"
          >
            {/* Logo icon */}

            <img
              src={logo}
              alt="Digital Work"
              className="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-105"
            />

            {/* Logo text */}

            <div className="leading-none">
              <div className="text-lg font-bold tracking-tight text-[#11110f]">
                Digital
                <span className="text-[#c99a4d]">
                  Work
                </span>
              </div>

              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-[#77736a]">
                Solutions digitales
              </div>
            </div>
          </Link>


                  <p className="mt-5 max-w-sm text-sm leading-7 text-[#6e6a61] dark:text-[#77736a]">
                    {t("footer.description")}
                  </p>


                </div>
            </div>
            <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-10 lg:contents">  
            {/* Services */}
            <div className="min-w-0">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#11110f] dark:text-[#11110f]">
                {t("footer.services.title")}
              </h3>

              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    to="/services"
                    className="text-sm text-[#6e6a61] transition-colors hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.services.websites")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-sm text-[#6e6a61] transition-colors hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.services.webApplications")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-sm text-[#6e6a61] transition-colors hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.services.mobileApplications")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/solutions"
                    className="text-sm text-[#6e6a61] transition-colors hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.services.businessSolutions")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/solutions"
                    className="text-sm text-[#6e6a61] transition-colors hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.services.automation")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/solutions"
                    className="text-sm text-[#6e6a61] transition-colors hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.services.digitalSolutions")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#11110f] dark:text-[#11110f]">
                {t("footer.navigation.title")}
              </h3>

              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-[#6e6a61] hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.navigation.home")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-sm text-[#6e6a61] hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.navigation.services")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/solutions"
                    className="text-sm text-[#6e6a61] hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.navigation.solutions")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/realisations"
                    className="text-sm text-[#6e6a61] hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.navigation.projects")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/a-propos"
                    className="text-sm text-[#6e6a61] hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.navigation.about")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-[#6e6a61] hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                  >
                    {t("footer.navigation.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 min-w-0 lg:col-span-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#11110f] dark:text-[#11110f]">
                {t("footer.contact.title")}
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8">
                <a
                  href={`mailto:${t("footer.contact.email")}`}
                  className="flex min-w-0 items-start gap-3 text-sm text-[#6e6a61] hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />

                  <span className="break-all">
                    {t("footer.contact.email")}
                  </span>
                </a>

                <a
                  href="tel:+261348428652"
                  className="flex items-start gap-3 text-sm text-[#6e6a61] hover:text-[#11110f] dark:text-[#77736a] dark:hover:text-[#c99a4d]"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />

                  <span className="min-w-0 break-words">{t("footer.contact.phone")}</span>
                </a>

                <div className="flex items-start gap-3 text-sm text-[#6e6a61] dark:text-[#77736a]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                  <span className="min-w-0 break-words">{t("footer.madagascar")}</span>
                </div>
              </div>

              <div className="col-start-2 row-start-1">
                {/* Social */}
                <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.facebook.com/search/top?q=zagarino%20Razafindrafita"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook — Zagarino Razafindrafita"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e1d8] text-[#6e6a61] transition-all hover:border-[#c99a4d] hover:bg-[#f4f1eb] hover:text-[#11110f] dark:border-[#e5e1d8] dark:text-[#77736a] dark:hover:border-[#c99a4d] dark:hover:bg-[#f4f1eb] dark:hover:text-[#c99a4d]"
                >
                  <Facebook className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e1d8] text-[#6e6a61] transition-all hover:border-[#c99a4d] hover:bg-[#f4f1eb] hover:text-[#11110f] dark:border-[#e5e1d8] dark:text-[#77736a] dark:hover:border-[#c99a4d] dark:hover:bg-[#f4f1eb] dark:hover:text-[#c99a4d]"
                >
                  <Instagram className="h-4 w-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/zagarino-razafindrafita/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn — Zagarino Razafindrafita"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e1d8] text-[#6e6a61] transition-all hover:border-[#c99a4d] hover:bg-[#f4f1eb] hover:text-[#11110f] dark:border-[#e5e1d8] dark:text-[#77736a] dark:hover:border-[#c99a4d] dark:hover:bg-[#f4f1eb] dark:hover:text-[#c99a4d]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

                <a
                  href="https://github.com/zagarino0"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub — zagarino0"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e1d8] text-[#6e6a61] transition-all hover:border-[#c99a4d] hover:bg-[#f4f1eb] hover:text-[#11110f] dark:border-[#e5e1d8] dark:text-[#77736a] dark:hover:border-[#c99a4d] dark:hover:bg-[#f4f1eb] dark:hover:text-[#c99a4d]"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>

              {/* Language */}
              <div className="col-start-2 row-start-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {t("footer.language")}
                </p>

                <div className="mt-3 flex gap-2">
                  {languages.map((language) => {
                    const active = i18n.language.startsWith(language.code);

                    return (
                      <button
                        key={language.code}
                        type="button"
                        onClick={() => changeLanguage(language.code)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                          active
                            ? "bg-[#11110f] text-white shadow-sm"
                            : "bg-[#f4f1eb] text-[#56544d] hover:bg-[#eae5dc] dark:bg-slate-800 dark:text-[#56544d] dark:hover:bg-slate-700"
                        }`}
                        aria-pressed={active}
                      >
                        {language.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              </div>
            </div>
            </div>
        </div>
          {/* Bottom */}
          <div className="mt-14 border-t border-[#e5e1d8] pt-8 dark:border-[#e5e1d8]">
            <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[#77736a] dark:text-[#77736a]">
                © {new Date().getFullYear()} Digital Work.{" "}
                {t("footer.copyright")}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <button
                  type="button"
                  onClick={() => setModal("legal")}
                  className="text-[#77736a] transition-colors hover:text-[#11110f] dark:hover:text-[#11110f]"
                >
                  {t("footer.legal")}
                </button>

                <button
                  type="button"
                  onClick={() => setModal("privacy")}
                  className="text-[#77736a] transition-colors hover:text-[#11110f] dark:hover:text-[#11110f]"
                >
                  {t("footer.privacy")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal / Privacy modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#11110f]/70 p-4 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-modal-title"
            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-white sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setModal(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-[#77736a] transition-colors hover:bg-[#f4f1eb] hover:text-[#11110f] dark:hover:bg-[#f4f1eb] dark:hover:text-[#11110f]"
              aria-label={t("footer.modal.close")}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-10">
              <p className="text-xs font-bold uppercase tracking-widest text-[#11110f] dark:text-[#c99a4d]">
                Digital Work
              </p>

              <h2
                id="footer-modal-title"
                className="mt-2 text-2xl font-black tracking-tight text-[#11110f] dark:text-[#11110f]"
              >
                {modal === "legal"
                  ? t("footer.legal")
                  : t("footer.privacy")}
              </h2>

              <div className="mt-6 space-y-5 text-sm leading-7 text-[#6e6a61] dark:text-[#56544d]">
                {modal === "legal" ? (
                  <>
                    <p>{t("footer.legalContent.introduction")}</p>

                    <div>
                      <h3 className="font-bold text-[#11110f] dark:text-[#11110f]">
                        {t("footer.legalContent.editorTitle")}
                      </h3>
                      <p>{t("footer.legalContent.editor")}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#11110f] dark:text-[#11110f]">
                        {t("footer.legalContent.hostingTitle")}
                      </h3>
                      <p>{t("footer.legalContent.hosting")}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#11110f] dark:text-[#11110f]">
                        {t("footer.legalContent.intellectualTitle")}
                      </h3>
                      <p>{t("footer.legalContent.intellectual")}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{t("footer.privacyContent.introduction")}</p>

                    <div>
                      <h3 className="font-bold text-[#11110f] dark:text-[#11110f]">
                        {t("footer.privacyContent.dataTitle")}
                      </h3>
                      <p>{t("footer.privacyContent.data")}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#11110f] dark:text-[#11110f]">
                        {t("footer.privacyContent.usageTitle")}
                      </h3>
                      <p>{t("footer.privacyContent.usage")}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#11110f] dark:text-[#11110f]">
                        {t("footer.privacyContent.rightsTitle")}
                      </h3>
                      <p>{t("footer.privacyContent.rights")}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#11110f] dark:text-[#11110f]">
                        {t("footer.privacyContent.contactTitle")}
                      </h3>
                      <p>{t("footer.privacyContent.contact")}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

