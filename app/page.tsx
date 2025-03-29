import Pieces from "@/components/pieces";
import StartWriting from "@/components/start-writing";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-center mt-0 md:mt-10 mb-12 text-off-black">
        Stitched Thoughts
      </h1>
      <StartWriting />
      <Pieces key={Math.random()} />{" "}
      {/*Temporary workaround, Force re-render on each load */}
    </div>
  );
}
