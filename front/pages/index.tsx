import { NextPageWithLayout } from "./_app";
import { useEffect } from "react";
import {
    useAccount,
    useReadContract,
    type BaseError,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { contractAddress, FactoryContractAbi } from "../constants";
import CollectionCard, { FilterType } from "../components/ui/collectionCard";
import { BusyBox } from "../components/ui/busy-box";

const Discover: NextPageWithLayout = () => {
    const filter = FilterType.ALL;

    const {
        data: collectionList,
        isLoading: collectionListLoading,
        refetch: refetchcollectionList,
        error: err,
    } = useReadContract({
        address: contractAddress,
        abi: FactoryContractAbi,
        functionName: "getCollections",
        args: [filter],
    });

    useEffect(() => {
        refetchcollectionList();
    }, []);

    if (collectionListLoading || !collectionList || err) {
        // Gost CircularProgress ! fok
        return <BusyBox />;
    }
    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {(collectionList as `0x${string}`[]).map((item, index) => (
                <CollectionCard key={index} address={item} filter={filter} />
            ))}
        </div>
    );
};

export default Discover;
