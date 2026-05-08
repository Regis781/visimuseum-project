import type { Museum } from "@/data/museums";

export function slugify(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function museumSlug(m: Museum): string {
  return `${slugify(m.name)}-${slugify(m.city)}`;
}
