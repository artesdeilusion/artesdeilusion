import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/messages/en";
import { tr } from "@/i18n/messages/tr";

const dictionaries = {
  en,
  tr,
};

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
