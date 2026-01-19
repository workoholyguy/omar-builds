import { Hero, FeaturedProjects, Skills, Contact } from "@/components/home";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <Skills />
      <Contact />
    </>
  );
}
