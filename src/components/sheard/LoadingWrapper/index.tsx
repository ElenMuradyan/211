import { Spin, Flex } from "antd";
import { useSelector } from "react-redux";
import { WrapperProps } from "../../../typescript/interface/wrapperProps";
import { RootState } from "../../../typescript/interface/rootState";

const LoadingWrapper:React.FC<WrapperProps> = ({ children }) => {
    const { loading } = useSelector((store: RootState) => store.userProfile);

    return (<>
        {loading ?
         <Flex style={{width:'100%', height:'100vh', backgroundColor:'white'}} justify='center' align='center' vertical>
            <Spin
            size='large'
            tip="Please wait..."
            fullscreen
            /> 
         </Flex>
        : children}
    </>   
    )
}

export default LoadingWrapper;