import { TechPill } from "../tech-pill";

export function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="tag-list" aria-label="technologies">
      {tags.map((tag) => (
        <li key={tag}>
          <TechPill label={tag} />
        </li>
      ))}
    </ul>
  );
}
