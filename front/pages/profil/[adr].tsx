import { NextPageWithLayout } from "../_app";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import {contractAddress, CollectionContractAbi, FactoryContractAbi} from "../../constants";
import Image from 'next/image'
import {FilterType} from "../index";
import ProfilCard from "../../components/card/profilCard";
import {Address} from "../../types/solidity-native";
const Profil: NextPageWithLayout = () => {
    const { address } = useAccount();
    const [nft, setNft] = useState<number[]>([]);
    const {
        data: collectionList,
        isLoading: collectionListLoading,
        refetch: refetchcollectionList,
        error: collectionErr,
    } = useReadContract({
        address: contractAddress,
        abi: FactoryContractAbi,
        functionName: "getCollections",
        args: [FilterType.ALL],
    });


    useEffect(() => {
        refetchcollectionList()
    }, []);

    if(collectionListLoading) {
        return ("Loading");
    }
    return (
        <div className="flex gap-3">
            {nft.map((tokenId, index) => (
                <div key={index} className="flex flex-col w-[350px] h-[350px] bg-amber-400 rounded-3xl justify-center items-center">
                    <Image src="/ico/logo.svg" alt="" height={100} width={100}/>
                    <h2>#{tokenId}</h2>
                </div>
            ))}

            {(collectionList as []).length > 0 ? (
                    <div className="flex gap-y-9 flex-col">
                        {(collectionList as Address[]).map((item, index) => (
                            <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
                                <ProfilCard contractAdr={item.toString() as Address} />
                            </div>
                        ))}
                    </div>
                )
                :
                "pas de nft"
            }
        </div>
    );
};

export default Profil;
