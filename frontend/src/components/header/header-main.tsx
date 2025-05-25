import HeaderCenter from "./header-center"
import HeaderEnd from "./header-end"
import { useLocation } from "react-router-dom"
import HeaderStart from "./header-start"
import { useRef } from "react"
import { cn } from "../../lib/utils"




const HeaderMain = () => {

    return (
        <>
            <header 
                className={cn("fixed z-[100] overflow-hidden w-screen left-0 right-0 top-0 py-5  mini:py-6 font-poppins border-b backdrop-blur",)}
            >
                <div className="flex items-center justify-between app-container">
                    <HeaderStart />
                    
                    <HeaderCenter/>

                    <HeaderEnd/>
                </div>
            </header>
        </>
    )
}

export default HeaderMain