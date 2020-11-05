import React from "react";
import { FlattenSimpleInterpolation } from "styled-components";

type HeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface HeadingProps {
  tag?: HeadingTags;
  tagStyle?: HeadingTags;
  children?: React.ReactNode;
  Texteps?: boolean;
}
function Heading({ tag = "h1", tagStyle = "h1", children, Texteps }: HeadingProps) {
  // console.log("Heading Texteps:" + Texteps);
  const Tag = tag;
  const styles = {
    h1: "3.052em",
    h2: "2.441em",
    h3: "1.953em",
    h4: "1.563em",
    h5: "1.25em",
    h6: "1em",
  };
  return (
    <Tag
      style={{
        fontSize: styles[tagStyle],
      }}
      className={Texteps ? "ellipsis" : "none"}
    >
      {children}
    </Tag>
  );
}

export default Heading;
