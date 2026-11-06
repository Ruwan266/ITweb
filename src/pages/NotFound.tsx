import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-dvh text-center px-4 bg-[#0a1628]">
      <h1 className="text-xl md:text-2xl font-semibold text-white">{t("not_found.title", "Page not found")}</h1>
      <p className="mt-3 text-base text-foreground-200/80">{t("not_found.body", "The page you are looking for does not exist or has moved.")}</p>
      <Link to="/" className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors min-h-[44px]">
        {t("not_found.home", "Back to home")}
      </Link>
    </section>
  );
}
