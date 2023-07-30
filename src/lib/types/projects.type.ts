export type ProjectCategory = "image" | "video" | "audio" | "text";

export type ProjectType =
  | "Art" // Color: bg-yellow-400 (Yellow)
  | "Design" // Color: bg-blue-400 (Blue)
  | "Software" // Color: bg-green-400 (Green)
  | "Mechanical" // Color: bg-red-500 (Red)
  | "Electrical"; // Color: bg-orange-400 (Orange)

// Define a function to map ProjectTag to corresponding bg_color and txt_color
export function getTypeColor(tag: string) {
  switch (tag) {
    case "Art":
      return { bg_color: "bg-red-100", txt_color: "text-red-400" };
    case "Design":
      return { bg_color: "bg-blue-100", txt_color: "text-blue-400" };
    case "Software":
      return { bg_color: "bg-green-100", txt_color: "text-green-400" };
    case "Mechanical":
      return { bg_color: "bg-orange-100", txt_color: "text-orange-400" };
    case "Electrical":
      return { bg_color: "bg-purple-100", txt_color: "text-purple-400" };
    default:
      return { bg_color: "bg-gray-100", txt_color: "text-gray-00" };
  }
}
