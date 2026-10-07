
import ProjectHero from './components/ProjectDetailsHero/ProjectDetailsHero'
import ProjectOverview from './components/Overview/Overview'
import ProjectGallery from './components/ProjectGallery/ProjectGallery'
import ProjectLocation from './ProjectLocation/ProjectLocation'
import { projects } from '../ProjectsList/data/projectData'
import { useParams } from 'react-router-dom'

const ProjectDetails = () => {
     const { projectName } = useParams();

  const project = projects.find(
    (project) => project.slug === projectName
  );

  if (!project) {
    return <h1>Project not found</h1>;
  }
  return (
  <>
    <ProjectHero projectDetails={{ title: project.title }} />
    <ProjectOverview/>
<ProjectGallery
  images={[
    {
      src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      alt: "Luxury property exterior",
    },
    {
      src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",
      alt: "Modern architectural development",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
      alt: "Luxury interior",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
      alt: "Modern property",
    },
  ]}
  description="A blend of contemporary architecture, premium retail spaces and vibrant public areas, designed for a thriving community."
  onViewGallery={() => {
    console.log("Open full gallery");
  }}
/>

<ProjectLocation/>

    </>
  )
}

export default ProjectDetails