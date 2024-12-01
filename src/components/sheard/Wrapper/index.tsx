import React from "react";
import { WrapperProps } from "../../../typescript/interface/wrapperProps";
import { Flex } from "antd";

import './index.css';

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Flex align="center" className='container' justify="center" vertical>
      {children}  
    </Flex>
  );
};

export default Wrapper;
