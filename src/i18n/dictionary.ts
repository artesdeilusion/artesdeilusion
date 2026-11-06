import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/messages/en";

const dictionaries = {
  en,
};

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
