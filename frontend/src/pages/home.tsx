import { Contract } from "ethers";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getNftContract } from "../services";
import { getName, getSymbol, getTokenBalance } from "../services/serviceFn";
import { truncateAddr } from "../lib/utils";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";
import MintForm from "../components/nft/mint-form";
const Home = () => {
    const { isConnected, address } = useAccount();
    const [tokenName, setTokenName] = useState<string>("");
    const [contract, setContract] = useState<Contract | null>(null);
    const [tokenBalance, setTokenBalance] = useState("")
    const [tokenSymbol, setTokenSymbol] = useState("")

    const {
        fn: getNameFn,
        data: name,
        isLoading: isFetchingName,
    } = useFetch(getName);

    const {
        fn: getSymbolFn,
        data: symbol,
        isLoading: isSymbolLoading,
    } = useFetch(getSymbol);

    const {
        fn: getTokenBalanceFn,
        data: balance,
        isLoading: isTBalanceLoading,
    } = useFetch(getTokenBalance);

    useEffect(() => {
        getNameFn();
    }, [getNameFn, address]);

    useEffect(() => {
        if (name) {
            setTokenName(name);
        }
    }, [name]);

    useEffect(() => {
        getSymbolFn();
    }, [getSymbol, address]);

    useEffect(() => {
        if (symbol) {
            setTokenSymbol(symbol);
        }
    }, [symbol]);

    useEffect(() => {
        if (typeof address === "string" && address.length === 42) {
          console.log("Calling getTokenBalanceFn with:", address);
          getTokenBalanceFn({ address }); // ✅ correct
        }
    }, [address]);

    useEffect(() => {
        if (balance) {
            setTokenBalance(balance);
        }
    }, [balance]);


    // initialise contract
    useEffect(() => {
        const initContract = async () => {
            const contractInstance: Contract = await getNftContract();
            setContract(contractInstance);
        };

        initContract();
    }, []);

    return (
        <main className="flex flex-col w-full h-[calc(100vh-80px)] py-10 mt-16 relative font-poppins overflow-y-auto">
            {isConnected ? (
                <div className="mx-auto max-w-3xl size-full flex flex-col gap-8 flex-1">
                <div className="flex items-center justify-between px-6 bg-green-500 rounded-md py-3">
                    <div className="">
                        <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-medium text-slate-800">
                            👋 Welcome, {truncateAddr(address)}
                        </h1>
                        <p className="text-xs uppercase tracking-wide text-white font-semibold">
                            Token Name: {isFetchingName ? "Loading..." : tokenName }
                        </p>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-xs uppercase tracking-wide text-white font-semibold">
                            Balance:{isTBalanceLoading ? "Loading..." : tokenBalance } {isSymbolLoading ? "Loading..." : tokenSymbol}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-4 bg-card rounded-lg border">
                    <div className="bg-card/50 rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Mint New NFT</h2>
                    <MintForm />
                    </div>
                </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                    <MdSignalWifiStatusbarConnectedNoInternet className="size-20 text-blue-500 z-50" />
                    <p className="text-lg font-normal text-blue-500">
                        No account connected
                    </p>
                </div>
            )}
        </main>
    );
}

export default Home