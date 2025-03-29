"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Edit } from "lucide-react";
import { Piece } from "@/types/types";

export default function Pieces() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const response = await fetch("/api/pieces");
        const data = await response.json();
        setPieces(data.pieces);
      } catch (error) {
        console.error(error);
        setPieces([]);
      }
    };

    fetchPieces();
  }, []);

  const toggleCard = (index: number) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl mb-4 text-off-black border-b border-off-black/20 pb-2">
        Pieces
      </h2>

      {pieces.map((piece, index) => (
        <Card
          key={index}
          className="border-off-black/20 bg-off-white/50 hover:shadow-md transition-shadow duration-200 cursor-pointer p-0"
          onClick={() => toggleCard(index)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-sans text-lg text-off-black">
                  {piece.title.map((titleContribution, index) => {
                    if (index === piece.title.length - 1) {
                      return (
                        <span key={index}>
                          {titleContribution.contribution}
                        </span>
                      );
                    }
                    // add a regular space between contributions
                    return (
                      <span key={index}>
                        {titleContribution.contribution}&#32;
                      </span>
                    );
                  })}
                </h3>
                <p className="font-mono text-xs text-off-black/70">
                  by {piece.authors.map((author) => author.name).join(", ")}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="text-off-black">
                {expandedCard === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </Button>
            </div>

            {expandedCard === index && (
              <div className="mt-4 pt-4 border-t border-off-black/10">
                <p className="font-mono text-sm text-off-black whitespace-pre-wrap">
                  {piece.content.map((contentContribution, index) => {
                    if (index === piece.content.length - 1) {
                      return (
                        <span key={index}>
                          {contentContribution.contribution}
                        </span>
                      );
                    }
                    // add a regular space between contributions
                    return (
                      <span key={index}>
                        {contentContribution.contribution}&#32;
                      </span>
                    );
                  })}
                </p>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-mono text-xs flex items-center gap-1 border-off-black/20 text-off-black hover:bg-off-black/10"
                  >
                    <Edit size={14} />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
