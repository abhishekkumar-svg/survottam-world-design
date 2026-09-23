import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProjectFilters from "./components/ProjectFilters";
import ProjectGrid from "./components/ProjectGrid";

import { projects } from "../data/projectData";

import type {
  ProjectCategory,
  ProjectType,
} from "../types/projectTypes";

import "./ProjectsList.css";

gsap.registerPlugin(
  ScrollTrigger,
  Flip
);

export default function ProjectsListing() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [category, setCategory] =
    useState<ProjectCategory | "All">(
      "All"
    );

  const [subCategory, setSubCategory] =
    useState<ProjectType | "All">(
      "All"
    );

  const [search, setSearch] =
    useState("");


  /*
  |--------------------------------------------------------------------------
  | FILTER PROJECTS
  |--------------------------------------------------------------------------
  */

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {

      const matchesCategory =
        category === "All" ||
        project.category === category;

      const matchesSubCategory =
        subCategory === "All" ||
        project.subCategory === subCategory;

      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        project.title
          .toLowerCase()
          .includes(searchValue) ||
        project.location
          .toLowerCase()
          .includes(searchValue);

      return (
        matchesCategory &&
        matchesSubCategory &&
        matchesSearch
      );
    });
  }, [
    category,
    subCategory,
    search,
  ]);


  /*
  |--------------------------------------------------------------------------
  | CARD SCROLL REVEAL
  |--------------------------------------------------------------------------
  */

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      const cards =
        gsap.utils.toArray<HTMLElement>(
          ".property-card"
        );

      if (!cards.length) return;

      gsap.set(cards, {
        opacity: 0,
        y: 80,
        scale: 0.96,
        rotateX: 5,
      });

      cards.forEach((card) => {

        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,

          duration: 1.1,

          ease: "power3.out",

          scrollTrigger: {
            trigger: card,

            start: "top 88%",

            once: true,
          },
        });

      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };

  }, [filteredProjects]);







  return (
    <section
      className="projects-listing"
      ref={sectionRef}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="projects-listing-header">

        <div className="projects-intro">

          <span className="eyebrow">
            SARVOTTAM
          </span>

          <h1>
            Spaces
            <br />
            <em>that matter.</em>
          </h1>

          <p>
            Discover our delivered, ongoing
            and upcoming developments.
          </p>

        </div>

        <div className="projects-count">

          <span>
            PROJECTS
          </span>

          <strong>
            {String(
              filteredProjects.length
            ).padStart(2, "0")}
          </strong>

        </div>

      </div>


      {/* =====================================================
          FILTERS
      ===================================================== */}

      <ProjectFilters
        category={category}
        subCategory={subCategory}
        search={search}
        onCategoryChange={setCategory}
        onSubCategoryChange={
          setSubCategory
        }
        onSearchChange={setSearch}
      />


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      {/* <div className="projects-toolbar">

        <span>
          {filteredProjects.length}{" "}
          Projects Found
        </span>


        <div className="grid-controls">

          <span>
            VIEW
          </span>

          <button
            className={
              columns === 2
                ? "active"
                : ""
            }
            onClick={() =>
              changeGrid(2)
            }
          >
            02
          </button>

          <button
            className={
              columns === 3
                ? "active"
                : ""
            }
            onClick={() =>
              changeGrid(3)
            }
          >
            03
          </button>

          <button
            className={
              columns === 4
                ? "active"
                : ""
            }
            onClick={() =>
              changeGrid(4)
            }
          >
            04
          </button>

        </div>

      </div> */}


      {/* =====================================================
          PROJECT GRID
      ===================================================== */}

      {filteredProjects.length > 0 ? (

        <ProjectGrid
          projects={filteredProjects}
      
        />

      ) : (

        <div className="projects-empty">

          <span>
            NO PROJECTS FOUND
          </span>

          <h2>
            Nothing here yet.
          </h2>

          <button
            onClick={() => {
              setCategory("All");
              setSubCategory("All");
              setSearch("");
            }}
          >
            Clear Filters
          </button>

        </div>

      )}

    </section>
  );
}