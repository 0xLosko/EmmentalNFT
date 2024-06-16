import {NextPageWithLayout} from "./_app";
import {useEffect} from "react";
import { useAccount, useReadContract, type BaseError, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractAddress, contractAbi } from "../constants"

const Discover: NextPageWithLayout = () => {
    const { data: totalMinted, isLoading: totalMintedLoading, refetch: refetchTotalMinted, error: test} = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getNbMint',
    })

    useEffect(() => {
       refetchTotalMinted();
    }, [])
    return (
        <div className="flex gap-3">
            {Array.from({ length: Number(totalMinted) }).map((_, index) => (
                <div key={index} className="w-[350px] h-[350px] bg-amber-400 rounded-3xl flex justify-center items-center">
                    <h2>#{index}</h2>
                </div>
            ))}
        </div>
    );
};

export default Discover;