import { archiveProjects } from "../../lib/site-data";
import { ArchiveCarousel } from "./ArchiveCarousel";
import { SectionCard } from "./SectionCard";

export function ArchiveGrid() {
  return (
    <SectionCard
      title="★ other projects · the archive"
      meta={`${archiveProjects.length} items`}
    >
      <ArchiveCarousel />
    </SectionCard>
  );
}
