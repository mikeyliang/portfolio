import React from "react";

type TagType = {
  bg_color?: string;
  txt_color?: string;
  hover_bg_color?: string;
  href?: string;
  children: React.ReactNode;
};

export default function Tag(props: TagType) {
  const cursorStyle = props.href ? "cursor-pointer" : "";
  const combinedClass = `whitespace-nowrap flex flex-row h-fit ${cursorStyle} justify-center items-center gap-2 font-bold px-2 py-1 rounded-lg w-fit ${props.bg_color} ${props.txt_color} ${props.hover_bg_color}`;

  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClass}>
      {props.children}
    </a>
  );
}
