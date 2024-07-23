import { ethers } from "ethers";
import { Listed } from "../../types/listed";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import Link from "next/link";
import { Address } from "../../types/solidity-native";

export function HistoryTable({ histories, address }: { histories: Listed[]; address: Address }) {
    return (
        <div className="ml-4 rounded-2xl p-px bg-gradient-to-b from-[#414141] to-[#24210F] w-full hover:to-[#414141] max-sm:ml-0 max-sm:my-8">
            <Table className="rounded-2xl p-px bg-gradient-to-b from-[#2c2c2c] to-[#24210F] w-full hover:to-[#2c2c2c]">
                <TableCaption className="self-center">
                    A list of transaction on this nft.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {histories.map((history, index) => { return history.status === 1 ? (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {new Date(
                                    Number(history.timestamp) * 1000
                                ).toLocaleString("fr-FR", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                })}
                            </TableCell>
                            <TableCell>
                                <Link href={"/profil/" + history.from}>
                                    {history.from}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={"/profil/" + history.to}>
                                    {history.to}
                                </Link>
                            </TableCell>
                            <TableCell className="text-right">
                                {ethers.utils.formatEther(history.price)} ETH
                            </TableCell>
                        </TableRow>
                    ) : undefined})}
                </TableBody>
            </Table>
        </div>
    );
}
