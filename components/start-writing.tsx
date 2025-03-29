"use client";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function StartWriting() {
  const router = useRouter();
  const [isWriting, setIsWriting] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 240) {
      setContent(e.target.value);
    }
  };

  const handleSavePiece = async () => {
    if (content && title && author) {
      const authorId = crypto.randomUUID();
      const authorObj = {
        name: author,
        id: authorId,
      };

      try {
        await fetch("/api/pieces", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: [{ author: authorObj, contribution: title }],
            authors: [authorObj],
            content: [
              {
                author: authorObj,
                contribution: content,
              },
            ],
          }),
        });
        setContent("");
        setTitle("");
        setAuthor("");
        setIsWriting(false);
        // Refresh the pieces list after saving
        // This is a workaround since we don't have a global state management in this example
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {!isWriting ? (
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setIsWriting(true)}
            className="bg-off-white hover:bg-[var(--off-black)]/2 border text-off-black font-mono flex items-center gap-2 px-6 py-5"
          >
            <Pencil size={18} />
            Start Writing
          </Button>
        </div>
      ) : (
        <div className="mb-10 p-6 border rounded-lg shadow-sm bg-off-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-sans text-lg text-off-black">New Piece</h2>
            <span className="font-mono text-sm text-[var(--off-black)]/70">
              {240 - content.length} characters left
            </span>
          </div>

          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 font-sans bg-transparent"
          />

          <Input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mb-3 font-mono text-sm bg-transparent"
          />

          <Textarea
            placeholder="Write your piece here (240 characters max)"
            value={content}
            onChange={handleContentChange}
            className="min-h-[120px] font-mono text-sm bg-transparent resize-none"
          />

          <div className="flex justify-end mt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => setIsWriting(false)}
              className="font-mono text-xs text-off-black hover:bg-off-black/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePiece}
              disabled={!content || !title}
              className="font-mono text-xs bg-off-black hover:bg-[var(--off-black)]/90 text-white"
            >
              Save Piece
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
