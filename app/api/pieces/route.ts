import { Author, Piece } from "@/types/types";
import { revalidatePath } from "next/cache";

const MOCK_AUTHORS: Author[] = [
  {
    name: "Haruki M.",
    id: crypto.randomUUID(),
  },
  {
    name: "Yoko T.",
    id: crypto.randomUUID(),
  },
];

const PIECES_ARRAY: Piece[] = [
  {
    id: crypto.randomUUID(),
    title: [
      {
        author: MOCK_AUTHORS[0],
        contribution: "Morning Reflections",
      },
    ],
    authors: [MOCK_AUTHORS[0]],
    content: [
      {
        author: MOCK_AUTHORS[0],
        contribution:
          "The sun rose slowly, as if it wasn't sure it was worth all the effort. The scattered clouds painted themselves in shades of pink against the pale blue canvas.",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: [
      {
        author: MOCK_AUTHORS[1],
        contribution: "City Lights",
      },
    ],
    authors: [MOCK_AUTHORS[1]],
    content: [
      {
        author: MOCK_AUTHORS[1],
        contribution:
          "Neon signs flickered in the rain-soaked streets. Each puddle became a mirror to another world below, an inverted city of dreams and forgotten promises.",
      },
    ],
  },
];

export async function GET() {
  return Response.json({
    pieces: PIECES_ARRAY,
  });
}

export async function POST(request: Request) {
  const req = await request.json();
  const piece = { id: crypto.randomUUID(), ...req };
  PIECES_ARRAY.push(piece);
  revalidatePath("/api/pieces");
  return Response.json(piece);
}

// DELETE should delete ever be available?
// export async function DELETE(request: Request) {
//   const req = await request.json();
//   PIECES_ARRAY.splice(
//     PIECES_ARRAY.findIndex((piece) => piece.id === req.id),
//     1
//   );
//   return Response.json({ id: req.id });
// }

export async function PUT(request: Request) {
  const req = await request.json();
  const index = PIECES_ARRAY.findIndex((piece) => piece.id === req.id);
  PIECES_ARRAY[index] = req;
  return Response.json(req);
}
