import { NextPageWithLayout } from "../../_app";
import { useAccount, useReadContract } from "wagmi";
import { CollectionContractAbi } from "../../../constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Listed } from "../../../types/listed";
import { Address } from "../../../types/solidity-native";
import { NftDetailsAccordion } from "../../../components/accordion/nftDetailsAccordion";
import { CheeseMetadata } from "../../../types/nft-metadata";
import { Skeleton } from "../../../components/ui/skeleton";
import { BuyCard } from "../../../components/card/buyCard";
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
        data: desc,
        isLoading: descLoading,
        refetch: refetchDesc,
        error: descError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'description',
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
    
    const { data: nbMinted } = useReadContract({
        ...contractConfig,
        functionName: "getNbMint"
    });

    useEffect(() => {
        refetchCheeseMetadata();
        refetchtokenUri();
        refetchIsListed();
        refetchOwner();
    }, [isListed]);
    return (
        <div className="container mx-auto px-4 overflow-hidden flex flex-col max-sm:w-full max-sm:px-0">
            <div className="flex flex-row max-sm:flex-col">
                <div className="flex flex-col gap-4 max-sm:w-full">
                    <div className="border border-gray-500 bg-black rounded-2xl h-[394px] flex justify-center m-1
                    max-sm:w-full max-sm:h-200px">
                        {tokenUri ? (
                            <img
                                src={tokenUri! as string}
                                alt="NFT Image"
                                className="m-1 object-contain
                                max-sm:w-full max-sm:object-none"
                            />
                        ) : (nbMinted ?? 0) <= tokenId! ? (
                            <img
                                src="/ico/CheeseNotMinted.png"
                                alt="NFT Not Minted"
                                className="m-1 object-contain"
                            />
                        ) : (
                            <Skeleton className="w-96 h-96 m-1" />
                        )}
                    </div>
                    {cheeseMetadata ? (
                        <NftDetailsAccordion
                            description={desc as string}
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
                    <HistoryTable histories={(nftHistory as Listed[]).sort((a, b) => Number(b.timestamp) - Number(a.timestamp))} />
                ) : (
                    <Skeleton className="w-[700px] h-72" />
                )}
            </div>
        </div>
    );
};

export default CollectionPage;
