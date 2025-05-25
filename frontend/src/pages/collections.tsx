import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";
import { useAccount } from "wagmi";
import NftCollectionGallery from "../components/nft/gallery";

const MyCollectionPage = () => {
    const { isConnected, address } = useAccount();
    
    return(
        <>
            <div className="h-[calc(100vh-80px)] app-container">
                { isConnected ?
                    <>
                        <div className="">
                            <NftCollectionGallery/>
                        </div>
                    </> :

                    <div className="flex flex-col items-center justify-center h-full gap-3">
                        <MdSignalWifiStatusbarConnectedNoInternet className="size-20 text-blue-500 z-50" />
                        <p className="text-lg font-normal text-blue-500">
                            No account connected
                        </p>
                    </div>
                }
            </div>
        </>
    )
}

export default MyCollectionPage