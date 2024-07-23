"use client"
import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardFooter,
} from '../ui/card';
import {CollectionContractAbi, contractAddress} from '../../constants';
import { useReadContract} from 'wagmi';
import {useRouter} from "next/router";
import { Address } from '../../types/solidity-native';
export enum FilterType {
    ALL,
    MINTABLE,
}

const CollectionCard = ({ contractAdr }: { contractAdr: Address }) => {
    const router = useRouter();
    
    const contractConfig = {
        address: contractAdr,
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
        refetchNftUrl();
    }, [contractAdr]);
    return (
        <Card
            className="w-full min-h-60 opacity-80 flex justify-center flex-col bg-cardBg border-0 hover:cursor-pointer
        transition-opacity duration-300 hover:opacity-100 hover:shadow-lg"
            onClick={() => router.push(`collection/${contractAdr}`)}
        >
            <CardContent className="mt-4 flex justify-center">
                <div className="h-full w-[200px]">
                    <img
                        src={nftUrl as string}
                        alt="Logo"
                        className="object-contain rounded-lg"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-center flex-col">
                <h2 className="text-xl text-gray-200 font-bold max-sm:h-fit max-sm:break-words">
                    {name as string}
                </h2>
                <p className="text-customYellow text-sm">
                    Max Supply {Number(maximumSupply)}
                </p>
            </CardFooter>
        </Card>
    );
};

export default CollectionCard;
