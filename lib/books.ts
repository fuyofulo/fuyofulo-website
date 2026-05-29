export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  cover: string;
  takeaway?: string;
  notes: string[];
};

// Order in this array = order on the shelf, left-to-right, top-to-bottom.
// Newest reads go at the TOP (index 0). To rearrange later, just move
// objects up or down within the array.
export const books: Book[] = [];

export function findBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}
