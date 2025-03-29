type Author = {
  name: string;
  id: string;
};

const AUTHORS = [];

export async function GET(_request: Request) {
  return Response.json({ authors: AUTHORS });
}
