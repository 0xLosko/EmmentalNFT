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

export function ManageNftCard({
    listed,
    initialPrice,
}: {
    listed: boolean;
    initialPrice: bigint}) {
    const router = useRouter();
    const tokenId = router.query.tokenId;
    const { address } = useAccount();
    const contractConfig = {
        address: router.query.contractId as Address,
        abi: CollectionContractAbi,
    };
    const {
        data: hash,
        error: callError,
        isPending,
        writeContract,
    } = useWriteContract();

    const listNft = async (price: bigint) => {
        writeContract({
            ...contractConfig,
            functionName: "listNft",
            account: address,
            args: [price, tokenId],
        });
    };

    const unlistNft = async () => {
        writeContract({
            ...contractConfig,
            functionName: "unListNft",
            account: address,
            args: [tokenId],
        });
    };

    const [price, setPrice] = React.useState<number>(Number(ethers.utils.formatEther(initialPrice)));

    return (
        <div className="ml-4 rounded-2xl p-px bg-gradient-to-b from-[#414141] to-[#24210F] w-full hover:to-[#414141]">
            <Card className="border-0 rounded-2xl p-px bg-gradient-to-b from-[#2c2c2c] to-[#24210F] w-full hover:to-[#2c2c2c]">
                <CardHeader>
                    <CardTitle className="text-gray-200">
                        Manage your cheese
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        {listed
                            ? "Unlist from the market"
                            : "List on the market"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-flow-col gap-1">
                        <Input
                            type="number"
                            max={999999999999999999999}
                            min={0}
                            className="text-gray-400"
                            value={price.toString()}
                            onChange={(event) =>
                                setPrice(
                                    Number(
                                        ethers.utils.formatEther(
                                            event.target.value
                                        )
                                    )
                                )
                            }
                        />
                        <Label className="text-gray-400 pt-3"> ETH</Label>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {/* <Button variant="outline">Cancel</Button> */}
                    <Button
                        className="ml-auto bg-customYellow/80 hover:bg-customYellow"
                        onClick={() =>
                            listed
                                ? unlistNft()
                                : listNft(BigInt(price * 10 ** 18))
                        }
                    >
                        {listed ? "Unlist" : "List"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
