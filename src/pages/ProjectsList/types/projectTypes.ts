export type ProjectCategory =
  | "Delivered"
  | "Ongoing"
  | "Upcoming";

export type ProjectType =
  | "Residential"
  | "Commercial"
  | "Mixed Use"
  | "Plots & Land";

export interface Project {
  id: number;

  title: string;

  developer: string;

  category: ProjectCategory;

  subCategory: ProjectType;

  location: string;

  status: string;

  area: string;

  description: string;

  frontImage: string;

  backImage: string;

  amenities: string[];

  highlights?: string[];

  slug: string;
}