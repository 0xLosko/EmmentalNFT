import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import { CollectionContractAbi } from "../../constants";
import { BusyBox } from "./busy-box";
import Card from "./card";

export enum FilterType {
    ALL,
    MARKET,
    OWNED,
}

export default function CollectionCard({
    address,
    filter,
}: {
    address: `0x${string}`;
    filter: FilterType;
}) {
    const contractConfig = {
        address: address,
        abi: CollectionContractAbi,
    };
    const {
        data: NbMint,
        isLoading: NbMintLoading,
        refetch: refetchNbMint,
        error: err,
    } = useReadContract({
        ...contractConfig,
        functionName: "getNbMint",
    });

    const {
        data: maximumSupply,
        isLoading: maximumSupplyLoading,
        refetch: refetchMaximumSupply,
    } = useReadContract({
        ...contractConfig,
        functionName: "getMaximumSupply",
    });

    const {
        data: name,
        isLoading: nameLoading,
        refetch: refetchName,
    } = useReadContract({
        ...contractConfig,
        functionName: "name",
    });

    useEffect(() => {
        refetchNbMint();
        refetchMaximumSupply();
        refetchName();
    }, [NbMint, maximumSupply, name]);

    return (
        <Card
            title={name as string}
            description={`${((NbMint as BigInt) || 0).toString()} of ${(
                (maximumSupply as BigInt) || 0
            ).toString()}`}
            imageSrc="ico/logo.svg"
            loading={
                NbMintLoading || maximumSupplyLoading || nameLoading || err ? true : false
            }
        />
    );
}
