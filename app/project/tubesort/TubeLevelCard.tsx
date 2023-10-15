type TubeLevelCardProps = {};



export default function TubeLevelCard() {
  return (
    <div
      onClick={() => {
        router.push(
          `/catalog/${props.club.id}${
            props.searchString ? `?${props.searchString}` : ""
          }`,
          {
            shallow: true,
          }
        );
      }}
      className="flex flex-col items-center justify-center gap-2 p-3 md:max-w-[385px] lg:max-w-[400px] min-w-[280px] 2xs:min-w-[290px] sm:min-w-[385px] border border-zinc-200  bg-white cursor-pointer md:hover:shadow-md rounded-2xl">
      <div className="flex flex-row items-center justify-between w-full gap-3">
        <div className="flex flex-row items-center w-full gap-3">
          <div className="h-full">
            {props.club.img && (
              <BlurImage image={props.club.img} width={36} height={36} />
            )}
          </div>
          <div className="flex flex-col items-start justify-between w-full ">
            <span className="text-lg font-bold text-zinc-800">
              {props.club.name}
            </span>
          </div>
        </div>
        <FollowButton
          liked={liked}
          setLiked={setLiked}
          clubId={props.club.id}
          userId={props.userId}
        />
      </div>

      <div className="flex flex-row items-center justify-start w-full gap-2 text-xs font-semibold">
        {props.club.categories &&
          props.club.categories.map((category, index) => {
            return (
              <div
                key={index}
                className="px-2 py-1 text-gray-500 bg-gray-100 rounded-lg">
                {category}
              </div>
            );
          })}
      </div>

      <div className="flex flex-row items-center justify-between w-full">
        {props.club.group && (
          <div
            style={{
              backgroundColor: groupStyle[props.club.group]?.backgroundColor,
              color: groupStyle[props.club.group]?.textColor,
            }}
            className={`px-2 py-1 rounded-lg text-xs font-semibold ${
              groupStyle[props.club.group]?.backgroundColor || "bg-gray-100"
            } ${groupStyle[props.club.group]?.textColor || "text-gray-500"}`}>
            {props.club.group.replace("_", " ")}
          </div>
        )}

        <div className="flex flex-row items-center justify-center">
          {diffWeeks < 17 ? (
            diffYears < 1 ? (
              <IconPointFilled className="w-3 h-3 text-[#49DD7B]" />
            ) : (
              <IconPointFilled className="w-3 h-3 text-[#FF9534]" />
            )
          ) : (
            <IconPointFilled className="w-3 h-3 text-[#FF2525]" />
          )}
          <span className="text-xs italic font-semibold text-gray-600">
            {`verified ${lastUpdate} ago`}
          </span>
        </div>
      </div>
    </div>
  );
}
