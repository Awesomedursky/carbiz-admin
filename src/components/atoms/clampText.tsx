import clsx from "clsx";
import { JSX } from "react";

type ClampTextProps = {
  text?: string | null;
  lines?: number;
  className?: string;
  maxWidth?: string;
  as?: keyof JSX.IntrinsicElements;
};

const ClampText = ({
  text,
  lines = 2,
  className,
  maxWidth = "max-w-xs",
  as: Component = "p",
}: ClampTextProps) => {
  if (!text) return null;

  return (
    <Component
      className={clsx(
        `line-clamp-${lines}`,
        "block break-words",
        maxWidth,
        className,
      )}
      title={text} // native tooltip fallback
    >
      {text}
    </Component>
  );
};

export default ClampText;
