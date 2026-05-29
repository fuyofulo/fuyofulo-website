import { HeroStrip } from "../components/portal/HeroStrip";
import { FeaturedProjects } from "../components/portal/FeaturedProjects";
import { HighlightsGrid } from "../components/portal/HighlightsGrid";
import { ArchiveGrid } from "../components/portal/ArchiveGrid";
import { Sidebar } from "../components/portal/Sidebar";

export default function Home() {
  return (
    <div className="channel">
      <main className="channel-main">
        <HeroStrip />
        <HighlightsGrid />
        <FeaturedProjects />
        <ArchiveGrid />
      </main>
      <Sidebar />
    </div>
  );
}
