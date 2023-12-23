export default function Loading() {
  const numLoaders = 5;

  return (
    <div className="flex flex-col items-start w-full h-full gap-4 xl:flex-row">
      <div className="flex flex-col items-stretch w-auto max-w-[320px] sm:max-w-[380px] md:max-w-[360px] md:min-w-[360px] lg:max-w-[390px] lg:min-w-[390px] xl:max-w-[420px] xl:min-w-[420px] 2xl:max-w-[460px] 2xl:min-w-[460px] min-w-[320px] sm:min-w-[385px] ">
        {Array.from({ length: numLoaders }).map((_, index) => (
          <div
            key={index}
            className="mb-4 h-[115px] w-full border border-zinc-200 bg-white rounded-xl loader"></div>
        ))}
      </div>
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
    </div>
  );
}
