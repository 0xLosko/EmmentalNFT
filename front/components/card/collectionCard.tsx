import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import { CollectionContractAbi } from "../../constants";
import { BusyBox } from "../ui/busy-box";
import Card from "../ui/card";

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
        <></>
    );
}
