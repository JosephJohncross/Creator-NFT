import { ReactNode, useEffect } from "react"
import { useLocation, useNavigate, matchPath } from "react-router-dom"
import { ApplicationRoutes } from "./routes/routes-constant"

export const privateRoutes: string[] = [
    
]

const isPrivateRoute = (path: string) => {
  return privateRoutes.some((route) => matchPath(route, path));
};

const MiddlewareProvider = ({children}: {children: ReactNode}) => {

    return children

}

export default MiddlewareProvider