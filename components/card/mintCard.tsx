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
import { CollectionContractAbi } from '../../constants';
import { useReadContract } from 'wagmi';
import {useRouter} from "next/router";
import { Address } from '../../types/solidity-native';

const MintCard = ({ contractAdr }: { contractAdr: Address }) => {
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
        data: nbMint,
        isLoading: nbMintLoading,
        refetch: refetchNbMint,
        error: nbMintError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'getNbMint',
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
        refetchNbMint();
        refetchMaximumSupply();
        refetchNftUrl();
        refetchDesc();
    }, []);
    return (
        <Card
            className="w-full min-h-96 bg-cardBg border-0 hover:cursor-pointer opacity-85
            transition-opacity duration-300 hover:opacity-100 hover:shadow-lg"
        >
            <CardHeader>
                <CardTitle className="text-3xl text-gray-200">
                    {name as string}
                </CardTitle>
                <CardDescription className="text-xl max-sm:h-fit break-words">
                    {desc ? (desc as string) : undefined}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
                <div className="flex justify-center h-full">
                    <img
                        src={nftUrl as string}
                        alt="Logo"
                        className="object-contain rounded-lg"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end max-sm:justify-center">
                <div className="flex flex-row w-1/6 items-center gap-3 max-sm:w-full">
                    <div className="w-full">
                        <p className="text-customYellow">{`${nbMint} / ${maximumSupply}`}</p>
                        <Progress
                            value={
                                (Number(nbMint) / Number(maximumSupply)) * 100
                            }
                        />
                    </div>
                    <Button
                        className="bg-customYellow/80 hover:bg-customYellow"
                        onClick={() => router.push(`mint/${contractAdr}`)}
                    >
                        Mint
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default MintCard;