export const SITE = {
  name: "Artes de Ilusión",
  host: "artesdeilusion.com",
  url: "https://artesdeilusion.com",
  email: "info@artesdeilusion.com",
} as const;

export const NAV_HREFS = [
  { key: "about", href: "#about" },
  { key: "investments", href: "#investments" },
  { key: "investors", href: "#investors" },
] as const;

export const CITY_MARKERS = [
  { name: "New York", lat: 40.7128, lng: -74.006, tz: "America/New_York" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, tz: "Asia/Dubai" },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, tz: "America/Los_Angeles" },
  { name: "Brussels", lat: 50.8503, lng: 4.3517, tz: "Europe/Brussels" },
  { name: "Munich", lat: 48.1351, lng: 11.582, tz: "Europe/Berlin" },
  { name: "London", lat: 51.5074, lng: -0.1278, tz: "Europe/London" },
  { name: "Istanbul", lat: 41.0082, lng: 28.9784, tz: "Europe/Istanbul" },
] as const;

export const ALLOCATION_WEIGHTS = [
  { key: "ai", weight: 42 },
  { key: "software", weight: 28 },
  { key: "consumer", weight: 18 },
  { key: "venture", weight: 12 },
] as const;
