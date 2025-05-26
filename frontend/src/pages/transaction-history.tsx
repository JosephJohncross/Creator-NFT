import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";
import { useAccount, useFeeData} from "wagmi";
import { getNftContract } from "../services";
import { useMintedNFT } from "../hooks/use-mintedNFT";
import { LucideLoader } from "lucide-react";
import { NFTTable } from "../components/nft/minted-nft-table";

const TransactionHistory = () => {
    const { isConnected, address } = useAccount();
    const { nfts, loading } = useMintedNFT();

    // if (loading) return <p>Loading...</p>;
    // if (!nfts.length) return <p>No NFTs minted yet.</p>;

    useEffect(() =>{
        console.log(nfts)
    }, [nfts])
  

    return (
        <div className="flex flex-col w-full h-[calc(100vh-80px)] py-10 relative font-poppins overflow-y-auto app-container">


            { isConnected ?
                <>
                    { loading ?
                        <div className="flex flex-col items-center justify-center gap-3 w-full h-[calc(70vh-80px)] py-10 mt-20">
                            <LucideLoader className="size-20 text-primary z-50"/>
                        </div> :
                            
                        <div className="pt-32">
                            <h2 className="mb-5 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 text-primary">
                                Log Events from Minting
                            </h2>
                            <NFTTable data={nfts}/>
                        </div>
                    }
                </> :

                <div className="flex flex-col items-center justify-center h-full gap-3">    
                    <MdSignalWifiStatusbarConnectedNoInternet className="size-20 text-primary z-50" />
                    <p className="text-lg font-normal text-blue-500">
                        No account connected
                    </p>
                </div>
            }
        </div>
    )
}

export default TransactionHistory