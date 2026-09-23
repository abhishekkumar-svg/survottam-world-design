
import { Search } from "lucide-react";
import type {
  ProjectCategory,
  ProjectType,
} from "../../types/projectTypes";

interface ProjectFiltersProps {
  category: ProjectCategory | "All";
  subCategory: ProjectType | "All";
  search: string;

  onCategoryChange: (
    category: ProjectCategory | "All"
  ) => void;

  onSubCategoryChange: (
    subCategory: ProjectType | "All"
  ) => void;

  onSearchChange: (value: string) => void;
}

const categories: Array<ProjectCategory | "All"> = [
  "All",
  "Delivered",
  "Ongoing",
  "Upcoming",
];

const subCategories: Array<ProjectType | "All"> = [
  "All",
  "Residential",
  "Commercial",
];

export default function ProjectFilters({
  category,
  subCategory,
  search,
  onCategoryChange,
  onSubCategoryChange,
  onSearchChange,
}: ProjectFiltersProps) {
  return (
    <div className="project-filters">

      {/* Search */}
      <div className="project-search">
        <span className="project-search-icon">
            <Search size={18}/>
        </span>

        <input
          type="text"
          placeholder="Search projects, locations..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      {/* Category */}
      <div className="filter-group">
        <span className="filter-label">
          Project Status
        </span>

        <div className="filter-pills">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                onCategoryChange(item)
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory */}
      <div className="filter-group">
        <span className="filter-label">
          Property Type
        </span>

        <div className="filter-pills">
          {subCategories.map((item) => (
            <button
              key={item}
              className={
                subCategory === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                onSubCategoryChange(item)
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}