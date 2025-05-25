import { Contract, ethers } from "ethers";
import { ensureEthereumAvailable, getNftContract } from ".";
import { handleErrorMessage } from "../lib/utils";

export const getName = async () => {
    await ensureEthereumAvailable();

    try {
        const contract: Contract = await getNftContract();
        const name = await contract.name();
        return name;
    } catch (error) {
        handleErrorMessage(error);
        throw error;
    }
}

export const getSymbol = async () => {
    await ensureEthereumAvailable();

    try {
        const contract: Contract = await getNftContract();
        const symbol = await contract.symbol();
        return symbol;
    } catch (error) {
        handleErrorMessage(error);
        throw error;
    }
}

export const mintNFT = async (tokenUri: string) =>{
    await ensureEthereumAvailable();

    try {
        const contract: Contract = await getNftContract();
        const tx = await contract.mintNft(tokenUri);
        const receipt = await tx.wait();

        return receipt;
    } catch (error) {
        handleErrorMessage(error);
        throw error;
    }
}

export const getTokenBalance = async ({ address }: { address: string }) => {
    console.log("Hello")
    if (!address || address.length !== 42) {
      throw new Error("Address is required and must be a valid wallet address.");
    }
  
    await ensureEthereumAvailable();
  
    const contract = await getNftContract();
    const balance = await contract.balanceOf(address);
    return ethers.formatUnits(balance, 18);
};

export const getContractOwner = async () => {
    await ensureEthereumAvailable();

    try {
        const contract: Contract = await getNftContract();
        const owner = await contract.owner();
        return owner;
    } catch (error) {
        handleErrorMessage(error);
        throw error;
    }
}