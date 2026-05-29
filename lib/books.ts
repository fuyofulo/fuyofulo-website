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
export const books: Book[] = [
  {
    id: "ascent-of-money",
    title: "The Ascent of Money",
    subtitle: "A Financial History of the World",
    author: "Niall Ferguson",
    cover: "/books/ascent_of_money.png",
    notes: [],
  },
  {
    id: "little-book-of-data",
    title: "The Little Book of Data",
    subtitle:
      "Understanding the Powerful Analytics that Fuel AI, Make or Break Careers, and Could Just End Up Saving the World",
    author: "Justin Evans",
    cover: "/books/the_little_book_of_data.png",
    notes: [],
  },
];

export function findBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}
