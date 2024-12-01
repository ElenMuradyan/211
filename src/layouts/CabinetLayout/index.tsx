import { Outlet } from "react-router-dom"
import Header from "../../components/global/Header";

const CabinetLayout = () => {
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
};

export default CabinetLayout;