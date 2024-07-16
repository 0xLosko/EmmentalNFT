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

const MintCard = ({ contractAdr }: { contractAdr: string }) => {
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
        data: maximumSupply,
        isLoading: maximumSupplyLoading,
        refetch: refetchMaximumSupply,
        error: maximumSupplyError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'getMaximumSupply',
    });

    useEffect(() => {
        refetchName();
        refetchNbMint();
        refetchMaximumSupply();
    }, [contractAdr]);

    return (
        <Card className="w-full min-h-96 bg-cardBg border-0 hover:cursor-pointer opacity-85
            transition-opacity duration-300 hover:opacity-100 hover:shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl text-gray-200">{name}</CardTitle>
                <CardDescription className="text-xl">Rajouter un champs description dans le sc</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
                <div className="flex justify-center h-full">
                    <Image src="/ico/logo.svg" alt="Logo" height={100} width={100} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <div className="flex flex-row w-1/6 items-center gap-3">
                    <div className="w-full">
                        <p className="text-customYellow">{`${nbMint} / ${maximumSupply}`}</p>
                        <Progress value={Number(nbMint) / Number(maximumSupply) * 100} />
                    </div>
                    <Button className="bg-customYellow/80 hover:bg-customYellow" onClick={() => router.push(`mint/${contractAdr}`)}>Mint</Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default MintCard;
