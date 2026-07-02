import type React from "react";

const isTextNode = (child: React.ReactNode): child is string | number =>
  typeof child === "string" || typeof child === "number";

export { isTextNode };
