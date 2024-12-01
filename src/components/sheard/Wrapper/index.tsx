import React from "react";
import { WrapperProps } from "../../../typescript/interface/wrapperProps";
import { Flex } from "antd";

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Flex align="center" justify="center">
      {children}  
    </Flex>
  );
};

export default Wrapper;
