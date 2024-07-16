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
import CollectionCard, { FilterType } from "../components/card/collectionCard";
import { BusyBox } from "../components/ui/busy-box";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel"
import mintCard from "../components/card/mintCard";
import MintCard from "../components/card/mintCard";


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
        console.log("test", collectionList)
    }, []);

    if (collectionListLoading || !collectionList || err) {
        // Gost CircularProgress ! fok
        return <BusyBox />;
    }
    return (
        <>
            <section>
                <h2 className="text-5xl my-16 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">Mint Now</h2>
                <Carousel>
                    <CarouselContent>
                        {(collectionList as `0x${string}`[]).map((item, index) => (
                            <CarouselItem key={index}><MintCard contractAdr={item.toString()}/></CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-cardBg"/>
                    <CarouselNext className="bg-cardBg"/>
                </Carousel>
            </section>
            <section>
                <h2 className="text-5xl my-16 text-gray-300 font-black">
                    Discover</h2>
                //faire une grid avec toute les collections deja minté et pagination
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                    {(collectionList as `0x${string}`[]).map((item, index) => (
                        <CollectionCard key={index} address={item} filter={filter}/>
                    ))}
                </div>
            </section>
        </>
    )
        ;
};

export default Discover;
