"use client";

export default function Loading() {
  return (
    <>
      <div className="flex flex-row items-stretch justify-start w-auto border border-zinc-200 h-[700px] bg-white rounded-2xl loader"></div>
      <style jsx>{`
        .loader {
          background: linear-gradient(90deg, #fefefe, #ffffff, #fefefe);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  );
}
