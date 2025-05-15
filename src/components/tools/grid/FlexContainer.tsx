import React, { CSSProperties, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
const FlexContainer: React.FC<Props> = ({
  children,
  className = "",
  style,
}) => {
  return (
    <div style={style} className={`flex flex-nowrap ${className}`}>
      {children}
    </div>
  );
};

export default FlexContainer;
