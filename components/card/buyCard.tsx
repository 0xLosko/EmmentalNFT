import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { BuyButton } from "../button/buyButton";
import { useChainId, useAccount } from "wagmi";

export function BuyCard({ price }: { price: bigint }) {
    const chainId = useChainId();
    const { isConnected } = useAccount();
    
    return (
        <div className="ml-4 rounded-2xl p-px bg-gradient-to-b from-[#414141] to-[#24210F] w-full hover:to-[#414141] ">
            <Card className="border-0 rounded-2xl p-px bg-gradient-to-b from-[#2c2c2c] to-[#24210F] w-full hover:to-[#2c2c2c] ">
                <CardHeader>
                    <CardTitle className="text-gray-200">
                        Listed on the market
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        The cheese's priced for{" "}
                        <span className="text-amber-400">
                            {ethers.utils.formatEther(price)}
                        </span>{" "}
                        {chainId === 43113 ? "AVAX" : "ETH"}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                    <BuyButton disabled={!isConnected} price={Number(price)} text="Buy" />
                </CardFooter>
            </Card>
        </div>
    );
}
