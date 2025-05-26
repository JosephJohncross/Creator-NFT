import { PinataSDK } from 'pinata'
import { ensureEthereumAvailable } from ".";

const pinata = new PinataSDK({
    pinataJwt: import.meta.env.VITE_PINATA_JWT,
    pinataGateway: import.meta.env.VITE_GATEWAY_URL
});

export interface NFTMetadata {
    name: string;
    description: string;
    image: string;
    attributes?: Array<{
        trait_type: string;
        value: string | number;
    }>;
}


export const uploadToIPFS = async (file: File): Promise<string> => {
    try {
        // Get presigned URL from your server
        const urlResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/presigned_url`, {
            method: "GET",
            headers: {
                // Add your server authorization headers here
            }
        });

        console.log(urlResponse)
        const data = await urlResponse.json();

        // Upload file using presigned URL
        const upload = await pinata.upload.public
            .file(file)
            .url(data.url)
            // .keyvalues({
            //     user: address
            // });

        if (!upload.cid) {
            throw new Error('Upload failed - no CID returned');
        }

        // Convert CID to IPFS URL
        const ipfsUrl = await pinata.gateways.public.convert(upload.cid);
        return ipfsUrl;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw new Error('Failed to upload to IPFS');
    }
};

export const uploadMetadata = async (metadata: NFTMetadata, address: string): Promise<string> => {
    try {
        // Get presigned URL from your server
        const urlResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/presigned_url`, {
            method: "GET",
            headers: {
                // Add your server authorization headers here
            }
        });
        const data = await urlResponse.json();

        // Convert metadata to File
        const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
        const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });

        // Upload metadata using presigned URL
        const upload = await pinata.upload.public
            .file(metadataFile)
            .url(data.url)
            .keyvalues({
                user: address,
                name: metadata.name,
                description: metadata.description,
                type: "nft-metadata",
                imageUrl: metadata.image
            });

        if (!upload.cid) {
            throw new Error('Upload failed - no CID returned');
        }

        // Convert CID to IPFS URL
        const ipfsUrl = await pinata.gateways.public.convert(upload.cid);
        return ipfsUrl;
    } catch (error) {
        console.error('Error uploading metadata to IPFS:', error);
        throw new Error('Failed to upload metadata to IPFS');
    }
}; 

// I did not take this is to consideration - so i am just fetching the NFTS from
// IPFS via pinata. In the real world case, i'll need to retrieve this from the blockchain

// https://example-gateway.mypinata.cloud/ipfs/{cid}
export const fetchNftCollectionsFromPinata = async (address: string) => {
    await ensureEthereumAvailable();

    console.log(address)

    try{
        const files = await pinata.files
            .public
            .list()
            .keyvalues({
                //@ts-ignore
                user: address.address,
                type: "nft-metadata"
            })
        
        return files

    } catch (error) {
        console.error('Error getting NFT collections:', error);
        throw new Error('Failed to retrieve user NFTs');
    }
}