import { Typography } from "antd"
import { mainComponentProps } from "../../../typescript/interface/mainComponentProps";

const { Title } = Typography;

const MainPageComponents = ({ title }: mainComponentProps) => {
    return(
        <div>
            <Title level={4}>{`${title[0].toUpperCase()}${title.slice(1)}`}</Title>
        </div>
    )
}

export default MainPageComponents;