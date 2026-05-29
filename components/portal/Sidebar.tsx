import { WallOfHopeWidget } from "./widgets/WallOfHopeWidget";
import { LibraryWidget } from "./widgets/LibraryWidget";
import { NewsletterWidget } from "./widgets/NewsletterWidget";
import { MediumWidget } from "./widgets/MediumWidget";
import { CurrentlyWidget } from "./widgets/CurrentlyWidget";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <WallOfHopeWidget />
      <LibraryWidget />
      <NewsletterWidget />
      <MediumWidget />
      <CurrentlyWidget />
    </aside>
  );
}
