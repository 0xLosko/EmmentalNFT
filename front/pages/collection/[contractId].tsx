import { Button } from "../../components/ui/button";
import { NextPageWithLayout } from "../_app";
import Image from 'next/image';
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CollectionContractAbi } from "../../constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CollectionPage: NextPageWithLayout = () => {
    const { address } = useAccount();
    const router = useRouter();

    const contractConfig = {
        address: router.query.contractId as string,
        abi: CollectionContractAbi,
    };

    const {
        data: name,
        isLoading: nameLoading,
        refetch: refetchName,
        error: nameError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'name',
    });

    const {
        data: maximumSupply,
        isLoading: maximumSupplyLoading,
        refetch: refetchMaximumSupply,
        error: maximumSupplyError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'getMaximumSupply',
    });

    const {
        data: nftUrl,
        isLoading: nftUrlLoading,
        refetch: refetchNftUrl,
        error: nftUrlError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'getBaseUri',
    });

    useEffect(() => {
        refetchName();
        refetchMaximumSupply();
        refetchNftUrl;
    }, [refetchName, refetchMaximumSupply]);

    return (
        <div className="container mx-auto px-4">
            <div className="banner relative w-full h-64 bg-gray-200 rounded-t-lg">
                <Image src="/ico/bg-fro.jpg" alt="Banner Image" layout="fill" objectFit="cover" className="rounded-t-lg" />
            </div>
            <div className="flex flex-col items-center ">
                <div className="relative w-36 h-36 -mt-12 border-4 border-white/30 rounded-full overflow-hidden">
                    <Image src={nftUrl} alt="Collection Logo" layout="fill" objectFit="cover" />
                </div>
                <h1 className="text-4xl font-bold mt-4">{nameLoading ? "Loading..." : name}</h1>
                <p className="text-gray-500 mt-2">Supply: {maximumSupplyLoading ? "Loading..." : Number(maximumSupply)}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
                {/* Here you can map through your NFT items and render them */}
                <div className="nft-item border p-4 rounded-lg">
                    <Image src="/path/to/nft.jpg" alt="NFT Item" width={200} height={200} />
                    <h2 className="mt-2 font-bold">NFT Title</h2>
                    <p className="text-gray-500">Price: 0.1 ETH</p>
                </div>
                {/* Repeat for other NFT items */}
            </div>
        </div>
    );
};

export default CollectionPage;
