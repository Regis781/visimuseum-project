const translations = {
  en: {
    free: "Free admission",
    paid: "Paid admission",
    visit: "Visit website",
    allMuseums: "All museums",
    rankings: "Rankings",
    about: "About",
  },
  fr: {
    free: "Entrée gratuite",
    paid: "Entrée payante",
    visit: "Visiter le site",
    allMuseums: "Tous les musées",
    rankings: "Classements",
    about: "À propos",
  },
  es: {
    free: "Entrada gratuita",
    paid: "Entrada de pago",
    visit: "Visitar sitio",
    allMuseums: "Todos los museos",
    rankings: "Rankings",
    about: "Acerca de",
  },
} as const;

type Lang = keyof typeof translations;
type Key = keyof (typeof translations)["en"];

function detectLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  if (lang && lang in translations) return lang as Lang;
  const nav = navigator.language?.slice(0, 2);
  if (nav && nav in translations) return nav as Lang;
  return "fr";
}

export function useI18n() {
  const lang = detectLang();
  return {
    lang,
    t: (key: Key) => translations[lang][key] ?? translations["fr"][key],
  };
}
