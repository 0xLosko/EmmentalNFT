import { Button } from "../../components/ui/button";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CollectionContractAbi } from "../../constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Listed } from "../../types/listed";
import { Address } from "../../types/solidity-native";
import { ethers } from "ethers";
import { BuyButton } from "../../components/button/buyButton";

const CollectionPage: NextPageWithLayout = () => {
    const { address } = useAccount();
    const router = useRouter();

    const contractConfig = {
        address: router.query.contractId as Address,
        abi: CollectionContractAbi,
    };

    const {
        data: name,
        isLoading: nameLoading,
        refetch: refetchName,
        error: nameError,
    } = useReadContract({
        ...contractConfig,
        functionName: "name",
    });

    const {
        data: maximumSupply,
        isLoading: maximumSupplyLoading,
        refetch: refetchMaximumSupply,
        error: maximumSupplyError,
    } = useReadContract({
        ...contractConfig,
        functionName: "getMaximumSupply",
    });

    const {
        data: nftUrl,
        isLoading: nftUrlLoading,
        refetch: refetchNftUrl,
        error: nftUrlError,
    } = useReadContract({
        ...contractConfig,
        functionName: "getBaseUri",
    });

    const {
        data: nftListed,
        isLoading: nftListedLoading,
        refetch: refetchNftListed,
        error: nftListedError,
    } = useReadContract({
        ...contractConfig,
        functionName: "getAllNftInMarket",
    });

    const {
        data: desc,
        isLoading: descLoading,
        refetch: refetchDesc,
        error: descError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'description',
    });

    useEffect(() => {
        refetchName();
        refetchMaximumSupply();
        refetchNftUrl();
        refetchNftListed();
        refetchDesc();
    }, [refetchName, refetchMaximumSupply, refetchNftUrl, refetchNftListed]);

    const isNftListed = (tokenId: number) => {
        return (nftListed as Listed[])?.some(
            (nft: { tokenId: number }) => nft.tokenId === tokenId
        );
    };

    const getNftPrice = (tokenId: number) => {
        const nft = (nftListed as Listed[])?.find(
            (nft: { tokenId: number }) => nft.tokenId === tokenId
        );
        return nft?.price;
    };

    return (
        <div className="container mx-auto px-4 overflow-hidden">
            <div className="banner relative w-full h-64 bg-gray-200 rounded-t-lg">
                <Image
                    src="/ico/bg-fro.jpg"
                    alt="Banner Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
            </div>
            <div className="flex flex-col items-center">
                <div className="relative w-36 h-36 -mt-12 border-4 border-white/30 rounded-full overflow-hidden">
                    <Image
                        src={nftUrl as string}
                        alt="Collection Logo"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <h1 className="text-4xl font-bold mt-4">
                    {nameLoading ? "Loading..." : (name as string)}
                </h1>
                <p className="text-gray-500 mt-2">
                    Supply:{" "}
                    {maximumSupplyLoading
                        ? "Loading..."
                        : Number(maximumSupply)}
                </p>
                <p className="text-customYellow mt-2">
                    {desc&& desc}
                </p>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 overflow-y-scroll max-h-[80vh] hide-scrollbar">
                {(maximumSupply as number) > 0 &&
                    Array.from(
                        {length: Number(maximumSupply)},
                        (_, index) => (
                            <div
                                className="nft-item p-4 rounded-lg bg-cardBg cursor-pointer"
                                key={index}
                                
                            >
                                <Image
                                    src={nftUrl as string}
                                    alt={"nft it"}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{
                                        width: "300px",
                                        height: "auto",
                                        borderRadius: "12px",
                                    }}
                                />
                                <h2 className="py-2 font-bold min-h-24 flex">
                                    {name + " #" + index}
                                </h2>
                                {isNftListed(index) && (
                                    <>
                                        <p className="text-gray-500">
                                            Listed, Price: {ethers.utils.formatEther(getNftPrice(index)?? 0)}{" "}
                                            ETH
                                        </p>
                                        <BuyButton
                                            price={getNftPrice(index)?? BigInt(0)}
                                            text="Buy now"
                                        />
                                    </>
                                )}
                            </div>
                        )
                    )}
            </div>
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default CollectionPage;
