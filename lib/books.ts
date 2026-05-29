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
  {
    id: "school-of-life",
    title: "The School of Life",
    subtitle: "An Emotional Education",
    author: "Alain de Botton",
    cover: "/books/school_of_life.png",
    notes: [],
  },
  {
    id: "never-split-the-difference",
    title: "Never Split the Difference",
    subtitle: "Negotiating As If Your Life Depended On It",
    author: "Chris Voss with Tahl Raz",
    cover: "/books/never_split.png",
    notes: [],
  },
  {
    id: "digital-cash",
    title: "Digital Cash",
    subtitle:
      "The Unknown History of the Anarchists, Utopians, and Technologists Who Created Cryptocurrency",
    author: "Finn Brunton",
    cover: "/books/digital_cash.png",
    notes: [],
  },
  {
    id: "art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    cover: "/books/art_of_war.png",
    notes: [],
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    subtitle: "Notes on Startups, or How to Build the Future",
    author: "Peter Thiel & Blake Masters",
    cover: "/books/zero_to_one.png",
    notes: [],
  },
];

export function findBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}
