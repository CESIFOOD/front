import MobileSubMenu from "../components/MobileSubMenu"
import axios from "axios";

const DashboardPage = () => {
    return(
        <div className="container mx-auto px-5 top-0">
            {/* Sous Menu*/}
            <div>
                <MobileSubMenu/>
            </div>
        </div>
    )
}

export default DashboardPage