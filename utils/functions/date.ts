/**
 * Supported languages
 */
type Language = "en" | "es" | "fr"; // Add more as needed

/**
 * Translation dictionary interface
 */
interface RelativeTimeTranslations {
  now: string;
  future: string;
  yesterday: string;
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  weeks: string;
  months: string;
  years: string;
  ago: string;
  shortUnits: {
    seconds: string;
    minutes: string;
    hours: string;
    days: string;
    weeks: string;
    months: string;
    years: string;
  };
}

/**
 * Complete translations dictionary
 */
const translations: Record<Language, RelativeTimeTranslations> = {
  en: {
    now: "just now",
    future: "in the future",
    yesterday: "yesterday",
    seconds: "second",
    minutes: "minute",
    hours: "hour",
    days: "day",
    weeks: "week",
    months: "month",
    years: "year",
    ago: "ago",
    shortUnits: {
      seconds: "s",
      minutes: "m",
      hours: "h",
      days: "d",
      weeks: "w",
      months: "mo",
      years: "y",
    },
  },
  es: {
    now: "ahora",
    future: "en el futuro",
    yesterday: "ayer",
    seconds: "segundo",
    minutes: "minuto",
    hours: "hora",
    days: "día",
    weeks: "semana",
    months: "mes",
    years: "año",
    ago: "hace",
    shortUnits: {
      seconds: "s",
      minutes: "m",
      hours: "h",
      days: "d",
      weeks: "sem",
      months: "mes",
      years: "año",
    },
  },
  fr: {
    now: "à l'instant",
    future: "dans le futur",
    yesterday: "hier",
    seconds: "seconde",
    minutes: "minute",
    hours: "heure",
    days: "jour",
    weeks: "semaine",
    months: "mois",
    years: "année",
    ago: "il y a",
    shortUnits: {
      seconds: "s",
      minutes: "min",
      hours: "h",
      days: "j",
      weeks: "sem",
      months: "mois",
      years: "an",
    },
  },
};

interface RelativeTimeFormatOptions {
  /** Language to use (default: 'en') */
  language?: Language;
  /** Include "ago" equivalent in the output (default: true) */
  includeAgo?: boolean;
  /** Use short format (e.g., "1d" instead of "1 day ago") */
  shortFormat?: boolean;
}

/**
 * Formats relative time with internationalization support
 * @param isoDate - ISO date string or Date object
 * @param options - Formatting options
 * @returns Localized relative time string
 */
export function fromNow(
  isoDate: string | Date,
  options: RelativeTimeFormatOptions = {}
): string {
  const { language = "en", includeAgo = true, shortFormat = false } = options;

  const t = translations[language];
  const date = typeof isoDate === "string" ? new Date(isoDate) : isoDate;
  const now = new Date();

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  const secondsElapsed = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  const daysElapsed = Math.floor(hoursElapsed / 24);

  // Future dates
  if (secondsElapsed < 0) {
    return shortFormat ? t.shortUnits.seconds : t.future;
  }

  // Same day
  if (date.toDateString() === now.toDateString()) {
    if (hoursElapsed > 0) {
      return shortFormat
        ? `${hoursElapsed}${t.shortUnits.hours}`
        : `${hoursElapsed} ${t.hours}${hoursElapsed > 1 ? "s" : ""}${
            includeAgo ? ` ${t.ago}` : ""
          }`;
    }
    if (minutesElapsed > 0) {
      return shortFormat
        ? `${minutesElapsed}${t.shortUnits.minutes}`
        : `${minutesElapsed} ${t.minutes}${minutesElapsed > 1 ? "s" : ""}${
            includeAgo ? ` ${t.ago}` : ""
          }`;
    }
    if (secondsElapsed > 10) {
      return shortFormat
        ? `${secondsElapsed}${t.shortUnits.seconds}`
        : `${secondsElapsed} ${t.seconds}${secondsElapsed > 1 ? "s" : ""}${
            includeAgo ? ` ${t.ago}` : ""
          }`;
    }
    return t.now;
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return t.yesterday;
  }

  // Days (up to 7)
  if (daysElapsed > 0 && daysElapsed <= 7) {
    return shortFormat
      ? `${daysElapsed}${t.shortUnits.days}`
      : `${daysElapsed} ${t.days}${daysElapsed > 1 ? "s" : ""} ${t.ago}`;
  }

  // Weeks (up to 4)
  const weeksElapsed = Math.floor(daysElapsed / 7);
  if (weeksElapsed > 0 && weeksElapsed <= 4) {
    return shortFormat
      ? `${weeksElapsed}${t.shortUnits.weeks}`
      : `${weeksElapsed} ${t.weeks}${weeksElapsed > 1 ? "s" : ""} ${t.ago}`;
  }

  // Months
  const monthsElapsed =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());
  if (monthsElapsed > 0) {
    return shortFormat
      ? `${monthsElapsed}${t.shortUnits.months}`
      : `${monthsElapsed} ${t.months}${monthsElapsed > 1 ? "s" : ""} ${t.ago}`;
  }

  // Years
  const yearsElapsed = now.getFullYear() - date.getFullYear();
  if (yearsElapsed > 0) {
    return shortFormat
      ? `${yearsElapsed}${t.shortUnits.years}`
      : `${yearsElapsed} ${t.years}${yearsElapsed > 1 ? "s" : ""} ${t.ago}`;
  }

  // Fallback to localized date
  return date.toLocaleDateString(language);
}
