export const SITE = {
  name: "Artes de Ilusión",
  host: "artesdeilusion.com",
  url: "https://artesdeilusion.com",
  email: "info@artesdeilusion.com",
} as const;

export const NAV_HREFS = [
  { key: "about", href: "/about" },
  { key: "investments", href: "/investments" },
  { key: "investors", href: "/investors" },
] as const;

export const CITY_MARKERS = [
  { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
  { name: "Antalya", lat: 36.8969, lng: 30.7133 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Madrid", lat: 40.4168, lng: -3.7038 },
  { name: "Riyadh", lat: 24.7136, lng: 46.6753 },
  { name: "Moscow", lat: 55.7558, lng: 37.6173 },
  { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
] as const;

export const ALLOCATION_WEIGHTS = [
  { key: "ai", weight: 42 },
  { key: "software", weight: 28 },
  { key: "consumer", weight: 18 },
  { key: "venture", weight: 12 },
] as const;
