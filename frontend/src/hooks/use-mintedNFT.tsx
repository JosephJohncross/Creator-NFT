import { Contract, ethers, JsonRpcProvider } from "ethers";
import { useEffect, useState } from "react";
import { artNFTContract } from "../services/contract";

export interface MintedNFT {
    tokenId: string;
    creator: string;
    tokenURI: string;
}

export const useMintedNFT = () => {
    const [nfts, setNfts] = useState<MintedNFT[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchEvents = async () => {
            try {
                const artNft = new Contract(artNFTContract.contractAddress, artNFTContract.contractABI, artNFTContract.provider)

                const filter = await artNft.getEvent("NFTMinted");
                const events = await artNft.queryFilter(filter, 0, "latest");
                

                const parsed = events.map((e: any) => {
                    const { tokenId, creator, tokenURI } = e.args;
                    return {
                      tokenId: tokenId.toString(),
                      creator,
                      tokenURI,
                    };
                });

                setNfts(parsed);
            } catch (error) {
                console.error("Error fetching NFT events:", error);
            } finally {
                setLoading(false)
            }
        }

        fetchEvents();
    }, [])

    return { nfts, loading };
}