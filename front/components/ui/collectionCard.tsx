import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import { CollectionContractAbi } from "../../constants";
import { BusyBox } from "./busy-box";
import { Card } from "./card";

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
    //
    const {
        data: NbMint,
        isLoading: NbMintLoading,
        refetch: refetchNbMint,
        error: err,
    } = useReadContract({
        address: address,
        abi: CollectionContractAbi,
        functionName: "getNbMint",
    });

    const {
        data: maximumSupply,
        isLoading: maximumSupplyLoading,
        refetch: refetchMaximumSupply,
    } = useReadContract({
        address: address,
        abi: CollectionContractAbi,
        functionName: "getMaximumSupply",
    });

    const {
        data: name,
        isLoading: nameLoading,
        refetch: refetchName,
    } = useReadContract({
        address: address,
        abi: CollectionContractAbi,
        functionName: "name",
    });

    useEffect(() => {
        refetchNbMint();
        refetchMaximumSupply();
        refetchName();
    }, []);

    if (NbMintLoading || maximumSupplyLoading || nameLoading || err) {
        return <BusyBox />;
    }
    return (
        <Card
            title={name as string}
            description={`${(NbMint as BigInt).toString()} of ${(
                maximumSupply as BigInt
            ).toString()}`}
            imageSrc="ico/logo.svg"
        />
    );
}
