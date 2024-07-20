"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CollectionContractAbi } from '../../constants';
import { useAccount, useReadContract } from 'wagmi';
import { useRouter } from "next/router";
import { Address } from '../../types/solidity-native';
import { ethers } from 'ethers';

export enum FilterType {
    ALL,
    MINTABLE,
}

const ProfileCard = ({ contractAdr }: { contractAdr: Address }) => {
    const router = useRouter();
    const account = useAccount();
    const [filteredTokenIds, setFilteredTokenIds] = useState<number[]>([]);
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
        data: getAllNftInMarket,
        isLoading: getAllNftInMarketLoading,
        refetch: getAllNftInMarketRefetch,
        error: getAllNftInMarketError,
    } = useReadContract({
        ...contractConfig,
        functionName: "getAllNftInMarket",
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
        getAllNftInMarketRefetch();
    }, [contractAdr]);

    useEffect(() => {
        if (getAllNftInMarket && account.address) {
            const filtered = getAllNftInMarket
                .filter(nft => nft.from === account.address)
                .map(nft => nft.tokenId);
            setFilteredTokenIds(filtered);
        }
    }, [getAllNftInMarket, account.address]);

    if (nftUrlLoading || getNftIdForWalletLoading || nameLoading || getAllNftInMarketLoading) {
        return "loading";
    }

    const combinedTokenIds = [...nftIdForWallet, ...filteredTokenIds].sort();

    return (
        <>
            {combinedTokenIds.length > 0 ? (
                combinedTokenIds.map((id: number) => {
                    const nft = getAllNftInMarket.find(nft => nft.tokenId === id && nft.from === account.address);
                    const isListed = !  !nft;
                    const price = isListed ? Number(ethers.utils.formatEther(nft.price)) : null;

                    return (
                        <div
                            className="nft-item p-4 rounded-lg bg-cardBg cursor-pointer"
                            key={id}
                            onClick={() => {
                                router.push('./collection/' + contractAdr + '/' + id);
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
                            <h3>
                                {isListed && `Listed ${price} ETH`}
                            </h3>
                        </div>
                    );
                })
            ) : (
                ''
            )}
        </>
    );
};

export default ProfileCard;
