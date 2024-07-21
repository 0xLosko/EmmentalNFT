import { NextPageWithLayout } from "./_app";
import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { contractAddress, FactoryContractAbi } from "../constants";
import { BusyBox } from "../components/ui/busy-box";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel";
import MintCard from "../components/card/mintCard";
import { Card } from "../components/ui/card";
import CollectionCard from "../components/card/collectionCard";
import { Address } from "../types/solidity-native";
export enum FilterType {
    ALL,
    MINTABLE,
}

const Discover: NextPageWithLayout = () => {
    const {
        data: collectionMintableList,
        isLoading: collectionMintableListLoading,
        refetch: refetchcollectionMintableList,
        error: collectionMintableErr,
    } = useReadContract({
        address: contractAddress,
        abi: FactoryContractAbi,
        functionName: "getCollections",
        args: [FilterType.MINTABLE],
    });

    const {
        data: collectionList,
        isLoading: collectionListLoading,
        refetch: refetchcollectionList,
        error: collectionErr,
    } = useReadContract({
        address: contractAddress,
        abi: FactoryContractAbi,
        functionName: "getCollections",
        args: [FilterType.ALL],
    });

    useEffect(() => {
        refetchcollectionMintableList();
        refetchcollectionList();
        console.log(collectionList);
    }, []);

    if (
        collectionMintableListLoading ||
        collectionListLoading ||
        !collectionMintableList ||
        collectionMintableErr
    ) {
        return (
            <div className="flex w-full justify-center items-center gap-3">
                <BusyBox />
                <p className="text-xl">collection search in progress...</p>
            </div>
        );
    }
    return (
        <>
            <section>
                <h2 className="text-5xl my-16 animate-text bg-gradient-to-r from-teal-500
                via-purple-500 to-orange-500 bg-clip-text text-transparent font-black
                max-sm:text-4xl max-sm:my-8">
                    Mint Now
                </h2>
                <Carousel>
                    <CarouselContent>
                        {(collectionMintableList as Address[]).map(
                            (item, index) => (
                                <CarouselItem key={index}>
                                    <MintCard contractAdr={item.toString() as Address} />
                                </CarouselItem>
                            )
                        )}
                    </CarouselContent>
                    {(collectionMintableList as []).length > 0 ? (
                        <>
                            <CarouselPrevious className="bg-cardBg" />
                            <CarouselNext className="bg-cardBg" />
                        </>
                    ) : (
                        <div className="flex w-full justify-center items-center gap-3">
                            <BusyBox />
                            <p className="text-xl">
                                collection search in progress...
                            </p>
                        </div>
                    )}
                </Carousel>
            </section>
            <section>
                <h2 className="text-5xl my-16 text-gray-300 font-black max-sm:my-8 max-sm:text-4xl">
                    Discover
                </h2>
                {(collectionList as []).length > 0 ? (
                    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
                        {(collectionList as Address[]).map((item, index) => (
                            <CollectionCard contractAdr={item.toString() as Address} />
                        ))}
                    </div>
                ) : (
                    <div className="flex w-full justify-center items-center gap-3">
                        <BusyBox />
                        <p className="text-xl">
                            collection search in progress...
                        </p>
                    </div>
                )}
            </section>
        </>
    );
};

export default Discover;
