import { Md3dRotation, MdOutlineSentimentNeutral, MdSelectAll, MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";
import { useAccount } from "wagmi";
import NftCollectionGallery from "../components/nft/gallery";
import { fetchNftCollectionsFromPinata } from "../services/pinata";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";

const MyCollectionPage = () => {
    const { isConnected, address } = useAccount();
    const [myCollection, setMyCollections] = useState([])

    const {
        fn: getCollectionFn,
        data: collections,
        isLoading: isFetchingCollection,
    } = useFetch(fetchNftCollectionsFromPinata);

    useEffect(() => {
        if (typeof address === "string" && address.length === 42) {
            getCollectionFn({address});
        }
    }, [address]);

    useEffect(() => {
        if (collections) {
            setMyCollections(collections.files);
            console.log(collections)
        }
    }, [collections]);
    
    return(
        <>
            

                <div className="h-[calc(100vh-80px)] app-container font-poppins">
                    { isConnected ?
                        <>
                            <div className="">
                                { collections?.length < 0 ?
                                    <div className="flex flex-col items-center justify-center gap-3 w-full h-[calc(80vh-80px)] py-10 mt-20">
                                        <div className="flex flex-col items-center">
                                            <MdSelectAll strokeWidth={"0px"} className="size-32 text-gray-500 z-50"/> 
                                            <p className="text-base mt-4">You don't have any collection</p>
                                        </div>
                                    </div>

                                    :

                                    <NftCollectionGallery items={myCollection}/>
                                }   
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