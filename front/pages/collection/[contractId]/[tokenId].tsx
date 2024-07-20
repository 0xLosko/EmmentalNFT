import { Button } from "../../../components/ui/button";
import { NextPageWithLayout } from "../../_app";
import Image from "next/image";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CollectionContractAbi } from "../../../constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Listed } from "../../../types/listed";
import { Address } from "../../../types/solidity-native";
import { NftDetailsAccordion } from "../../../components/accordion/nftDetailsAccordion";
import { CheeseMetadata } from "../../../types/nft-metadata";
import { Skeleton } from "../../../components/ui/skeleton";
import { Card } from "../../../components/ui/card";
import { BuyCard } from "../../../components/card/buyCard";
import { BigNumberish } from "ethers";
import { ManageNftCard } from "../../../components/card/ManageNftCard";
import { HistoryTable } from "../../../components/table/historyTable";

const CollectionPage: NextPageWithLayout = () => {
    const { address } = useAccount();
    const router = useRouter();

    const tokenId = router.query.tokenId;
    const contractConfig = {
        address: router.query.contractId as Address,
        abi: CollectionContractAbi,
    };

    const {
        data: cheeseMetadata,
        isLoading: cheeseMetadataLoading,
        refetch: refetchCheeseMetadata,
        error: cheeseMetadataError,
    } = useReadContract({
        ...contractConfig,
        functionName: "getNftMetaDataById",
        args: [tokenId],
    });

    const {
        data: tokenUri,
        isLoading: tokenUriLoading,
        refetch: refetchtokenUri,
        error: tokenUriError,
    } = useReadContract({
        ...contractConfig,
        functionName: "tokenURI",
        args: [tokenId],
    });

    const {
        data: owner,
        isLoading: ownerLoading,
        refetch: refetchOwner,
        error: ownerError,
    } = useReadContract({
        ...contractConfig,
        functionName: "ownerOf",
        args: [tokenId],
    });

    const {
        data: isListed,
        isLoading: isListedLoading,
        refetch: refetchIsListed,
        error: isListedError,
    } = useReadContract({
        ...contractConfig,
        functionName: "isListed",
        args: [tokenId],
    });

    const {
        data: nftHistory,
        isLoading: getNftHistoryLoading,
        refetch: refetchGetNftHistory,
        error: getNftHistoryError,
    } = useReadContract({
        ...contractConfig,
        functionName: "getNftHistory",
        args: [tokenId],
    });

    const { data: marketData } = useReadContract({
        ...contractConfig,
        functionName: "getNftInMarket",
        args: [tokenId],
    });

    useEffect(() => {
        refetchCheeseMetadata();
        refetchtokenUri();
        refetchIsListed();
        refetchOwner();
    }, [cheeseMetadata, tokenUri, owner, isListed, marketData]);
    return (
        <div className="container mx-auto px-4 overflow-hidden flex flex-col">
            <div className="flex flex-row">
                <div className="flex flex-col gap-4">
                    <div className="border border-gray-500 bg-black rounded-2xl h-[394px] flex justify-center m-1">
                        {tokenUri ? (
                            <img
                                src={tokenUri! as string}
                                alt="NFT Image"
                                className="aspect-square m-1"
                            />
                        ) : (
                            <Skeleton className="w-96 h-96 m-1" />
                        )}
                    </div>
                    {cheeseMetadata ? (
                        <NftDetailsAccordion
                            description="Implement Nft description in the the contract"
                            attributes={cheeseMetadata! as CheeseMetadata}
                            details={{
                                contractAddress: contractConfig.address,
                                tokenId: tokenId as string,
                            }}
                        />
                    ) : (
                        <Skeleton className="w-[700px] h-72" />
                    )}
                </div>
                <div className="flex flex-col w-full content-center]">
                    {address === (owner as Address) ||
                    (isListed &&
                        (marketData
                            ? (marketData as Listed).from
                            : undefined) === (address as Address)) ? (
                        <ManageNftCard
                            listed={isListed ? (isListed as boolean) : false}
                            initialPrice={
                                marketData
                                    ? (marketData as Listed).price
                                    : BigInt(0)
                            }
                        />
                    ) : isListed ? (
                        <BuyCard
                            price={
                                marketData
                                    ? (marketData as Listed).price
                                    : BigInt(0)
                            }
                        />
                    ) : undefined}
                </div>
            </div>
            <div className="pt-5">
                {nftHistory ? (
                    <HistoryTable histories={nftHistory as Listed[]} />
                ) : (
                    <Skeleton className="w-[700px] h-72" />
                )}
            </div>
        </div>
    );
};

export default CollectionPage;
