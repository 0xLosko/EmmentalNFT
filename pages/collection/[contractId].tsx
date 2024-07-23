import { NextPageWithLayout } from "../_app";
import Image from "next/image";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { CollectionContractAbi } from "../../constants";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { Address } from "../../types/solidity-native";
import { ethers } from "ethers";
import { BuyButton } from "../../components/button/buyButton";

interface NftItems {
    listed: boolean;
    number: number;
    price: number | undefined;
}

const CollectionPage: NextPageWithLayout = () => {
    const { address } = useAccount();
    const router = useRouter();

    const contractConfig = {
        address: router.query.contractId as Address,
        abi: CollectionContractAbi,
    };

    const { data: name, isLoading: nameLoading, refetch: refetchName } = useReadContract({
        ...contractConfig,
        functionName: "name",
    });

    const { data: maximumSupply, isLoading: maximumSupplyLoading, refetch: refetchMaximumSupply } = useReadContract({
        ...contractConfig,
        functionName: "getMaximumSupply",
    });

    const { data: nftUrl, isLoading: nftUrlLoading, refetch: refetchNftUrl } = useReadContract({
        ...contractConfig,
        functionName: "getBaseUri",
    });

    const { data: nftListed, isLoading: nftListedLoading, refetch: refetchNftListed } = useReadContract({
        ...contractConfig,
        functionName: "getAllNftInMarket",
    });

    const { data: desc, isLoading: descLoading, refetch: refetchDesc } = useReadContract({
        ...contractConfig,
        functionName: "description",
    });

    const [nftList, setNftList] = useState<NftItems[]>([]);
    const [sortOrder, setSortOrder] = useState<'number-asc' | 'number-desc' | 'price-asc' | 'price-desc'>('number-asc');

    useWatchContractEvent({
        ...contractConfig,
        eventName: "NftListed",
        onLogs(log) {
            refetchNftListed();
        },
    });

    useWatchContractEvent({
        ...contractConfig,
        eventName: "NftUnlisted",
        onLogs(log) {
            refetchNftListed();
        },
    });
    useWatchContractEvent({
        ...contractConfig,
        eventName: "NftSold",
        onLogs(log) {
            refetchNftListed();
        },
    });

    useEffect(() => {
        refetchName();
        refetchMaximumSupply();
        refetchNftUrl();
        refetchNftListed();
        refetchDesc();
    }, [router.query.contractId]);

    useEffect(() => {
        if (!nftListedLoading && maximumSupply && nftListed) {
            const list = createListed(maximumSupply as number, nftListed);
            setNftList(list);
        }
    }, [nftListedLoading, maximumSupply, nftListed]);

    const createListed = (maxSupply: number, nftListed: any): NftItems[] => {
        const list: NftItems[] = [];
        for (let i = 0; i < maxSupply; i++) {
            if (nftListed[i]) {
                list.push({
                    listed: true,
                    number: i,
                    price: nftListed[i].price ? Number(ethers.utils.formatEther(nftListed[i].price)) : undefined
                });
            } else {
                list.push({
                    listed: false,
                    number: i,
                    price: undefined
                });
            }
        }
        return list;
    };

    const sortedNftList = useMemo(() => {
        let sortedList = [...nftList];
        if (sortOrder === 'number-asc') {
            sortedList.sort((a, b) => a.number - b.number);
        } else if (sortOrder === 'number-desc') {
            sortedList.sort((a, b) => b.number - a.number);
        } else if (sortOrder === 'price-asc') {
            sortedList.sort(
                (a, b) =>
                    (Number(a.price) ?? Infinity) - (Number(b.price) ?? Infinity)
            );
        } else if (sortOrder === 'price-desc') {
            sortedList.sort(
                (a, b) => (Number(b.price) ?? 0) - (Number(a.price) ?? 0)
            );
        }
        return sortedList;
    }, [nftList, sortOrder]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value as 'number-asc' | 'number-desc' | 'price-asc' | 'price-desc');
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
                <p className="text-customYellow mt-2">{desc ? (desc as string) : ""}</p>
                <div className="flex gap-4 mt-4 items-center">
                    <label htmlFor="sortOrder" className="mr-2">
                        Sort by:
                    </label>
                    <select
                        id="sortOrder"
                        onChange={handleSortChange}
                        value={sortOrder}
                        className="p-2 rounded text-customYellow bg-cardBg"
                    >
                        <option value="number-asc">Number Ascending</option>
                        <option value="number-desc">Number Descending</option>
                        <option value="price-asc">Price Ascending</option>
                        <option value="price-desc">Price Descending</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 overflow-y-scroll max-h-[80vh] hide-scrollbar">
                {sortedNftList.map((nft, index) => (
                    <div
                        className="nft-item p-4 rounded-lg bg-cardBg cursor-pointer"
                        key={index}
                        onClick={() => {
                            router.push(
                                router.asPath + "/" + nft.number.toString()
                            );
                        }}
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
                            {name + " #" + nft.number}
                        </h2>
                        {nft.listed && (
                            <div className="flex">
                                <p className="text-gray-500">
                                    Listed, Price:{" "}
                                    <span className="text-customYellow">
                                        {nft.price} ETH
                                    </span>
                                </p>
                                <BuyButton text="View Now" price={Number(nft.price) ?? Number(0)} />
                            </div>
                        )}
                    </div>
                ))}
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
