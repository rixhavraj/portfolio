const { useEffect, useState } = require("react");
const Image = require("next/image");


export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (event) => {
      if (event?.clientX !== undefined && event?.clientY !== undefined) {
        setCursorPos({ x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#f8f5ec] flex items-center justify-center overflow-hidden">
      {/* Moving Cursor Dot */}
      <div
        className="absolute w-6 h-6 bg-black rounded-full transition-transform duration-100 ease-out"
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
      />

      {/* Centered Image */}
      <div className="relative z-10">
        <Image
          src="/your-image.jpg" // Replace with your uploaded image
          alt="Portfolio Avatar"
          width={400}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </div>

      {/* Title and Description */}
      <div className="absolute top-10 text-center">
        <h1 className="text-6xl font-bold tracking-wide">Your Name</h1>
        <p className="text-lg mt-2 text-gray-700">
          A creative developer crafting digital experiences.
        </p>
      </div>
    </div>
  );
}
