type Author = {
  name: string;
  id: string;
};

const AUTHORS: Author[] = [];

export async function GET() {
  return Response.json({ authors: AUTHORS });
}
