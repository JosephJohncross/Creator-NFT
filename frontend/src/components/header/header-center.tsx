import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { ApplicationRoutes } from "../../routes/routes-constant"

export const centerRoutes = [
    {
        label: "Home",
        link: ApplicationRoutes.HOME
    },
    {
        label: "My Collections",
        link: ApplicationRoutes.COLLECTIONS
    },
    {
        label: "History",
        link: ApplicationRoutes.TRANSACTIONS
    },
]

const HeaderCenter = () => {
    const location = useLocation()
    const path = location.pathname
    
    return (
        <div className="font-poppins items-center space-x-8 font-circular text-base hidden mini:flex">
            {centerRoutes.map(routes => {
                return (
                    <Link key={routes.label} className={cn("text-gray-700")} to={routes.link}>{routes.label}</Link>
                )
            })}
        </div>
    )
}

export default HeaderCenter