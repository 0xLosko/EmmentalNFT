"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';
import {CollectionContractAbi, contractAddress} from '../../constants';
import {useAccount, useReadContract} from 'wagmi';
import {useRouter} from "next/router";
import { Address } from '../../types/solidity-native';
export enum FilterType {
    ALL,
    MINTABLE,
}

const CollectionCard = ({ contractAdr }: { contractAdr: Address }) => {
    const router = useRouter();
    const adr = useAccount();
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
        <Card className="w-full min-h-60 opacity-80 flex justify-center flex-col bg-cardBg border-0 hover:cursor-pointer
        transition-opacity duration-300 hover:opacity-100 hover:shadow-lg"
        onClick={() => router.push(`collection/${contractAdr}`)}>
            <CardContent className="mt-4">
                <div className="flex justify-center h-full">
                    <Image src={nftUrl as string} alt="Logo"
                           width={0}
                           height={0}
                           sizes="100vw"
                           style={{ width: '200px', height: 'auto', borderRadius: '8px'}}/>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center flex-col">
                <h2 className="text-xl text-gray-200 font-bold max-sm:h-fit max-sm:break-words">{name as string}</h2>
                <p className="text-customYellow text-sm">Max Supply {Number(maximumSupply)}</p>
            </CardFooter>
        </Card>
    );
};

export default CollectionCard;
