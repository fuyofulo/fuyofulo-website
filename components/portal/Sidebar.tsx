import { WallOfHopeWidget } from "./widgets/WallOfHopeWidget";
// import { CatsWidget } from "./widgets/CatsWidget";
import { LibraryWidget } from "./widgets/LibraryWidget";
import { NewsletterWidget } from "./widgets/NewsletterWidget";
import { MediumWidget } from "./widgets/MediumWidget";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <WallOfHopeWidget />
      {/* <CatsWidget /> */}
      <LibraryWidget />
      <NewsletterWidget />
      <MediumWidget />
    </aside>
  );
}
