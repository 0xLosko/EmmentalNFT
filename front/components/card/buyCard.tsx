import * as React from "react";

import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ethers } from "ethers";
import { Address } from "../../types/solidity-native";
import { useRouter } from "next/router";
import { CollectionContractAbi } from "../../constants";
import { useAccount, useWriteContract } from "wagmi";

export function BuyCard({ price }: { price: bigint }) {
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
            value: price ,
        });
    };
    return (
        <div className="ml-4 rounded-2xl p-px bg-gradient-to-b from-gray-500 to-[#24210F] w-full ">
            <Card className="border-0 rounded-2xl p-px bg-gradient-to-b from-gray-800 to-[#24210F] w-full ">
                <CardHeader>
                    <CardTitle className="text-gray-200">
                        Listed on the market
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        The cheese's priced for{" "}
                        <span className="text-amber-400">
                            {ethers.utils.formatEther(price)}
                        </span>{" "}
                        ETH
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                    {/* <Button variant="outline">Cancel</Button> */}
                    <Button
                        className="ml-auto bg-customYellow/80 hover:bg-customYellow"
                        onClick={() => buyNft(price)}
                    >
                        Buy
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
