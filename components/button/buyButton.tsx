import * as React from "react";
import { Button } from "../ui/button";
import { Address } from "../../types/solidity-native";
import { useRouter } from "next/router";
import { CollectionContractAbi } from "../../constants";
import { useAccount, useWriteContract } from "wagmi";

export function BuyButton({
    price,
    text,
    disabled,
}: {
    price: number;
    text: string;
    disabled?: boolean;
}) {
    const router = useRouter();
    const tokenId = router.query.tokenId;
    const { address } = useAccount();
    const contractConfig = {
        address: router.query.contractId as Address,
        abi: CollectionContractAbi,
    };
    const {
        data: hash,
        error: buyError,
        isPending,
        writeContract,
    } = useWriteContract();
    const buyNft = async (price: bigint) => {
        writeContract({
            ...contractConfig,
            functionName: "buyNft",
            account: address,
            args: [tokenId],
            value: price,
        });
    };
    return (
        <Button
            disabled={disabled}
            className="ml-auto bg-customYellow/80 hover:bg-customYellow"
            onClick={() => {
                buyNft(price);
            }}
        >
            {text}
        </Button>
    );
}
