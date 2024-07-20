"use client";
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
import { useAccount, useReadContract } from 'wagmi';
import { useRouter } from "next/router";
import { Address } from '../../types/solidity-native';
import { BuyButton } from "../button/buyButton";

export enum FilterType {
    ALL,
    MINTABLE,
}

const ProfileCard = ({ contractAdr }: { contractAdr: Address }) => {
    const router = useRouter();
    const account = useAccount();
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
        data: nftIdForWallet,
        isLoading: getNftIdForWalletLoading,
        refetch: getNftIdForWalletRefetch,
        error: readError,
    } = useReadContract({
        ...contractConfig,
        functionName: "getNftIdForWallet",
        account: router.query.adr ? router.query.adr : account.address,
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
        refetchNftUrl();
        getNftIdForWalletRefetch();
    }, [contractAdr]);

    if (nftUrlLoading || getNftIdForWalletLoading || nameLoading) {
        return "loading";
    }

    return (
        <>
            {nftIdForWallet && (nftIdForWallet as []).length > 0 ? (
                (nftIdForWallet as []).map((id: number) => (
                    <div
                        className="nft-item p-4 rounded-lg bg-cardBg cursor-pointer"
                        key={id}
                        onClick={() => {
                            router.push( './collection/' + contractAdr + '/' + id);
                        }}
                    >
                        <Image
                            src={nftUrl as string}
                            alt={`NFT ${id}`}
                            width={300}
                            height={300}
                            sizes="100vw"
                            style={{
                                width: "300px",
                                height: "auto",
                                borderRadius: "12px",
                            }}
                        />
                        <h2 className="py-2 font-bold min-h-24 flex">
                            {name + " #" + id}
                        </h2>
                    </div>
                ))
            ) : ( ''
            )}
        </>
    );
};

export default ProfileCard;
