import { NextPageWithLayout } from "../_app";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import {contractAddress, CollectionContractAbi, FactoryContractAbi} from "../../constants";
import Image from 'next/image'
import {FilterType} from "../index";
import ProfilCard from "../../components/card/profilCard";
import {Address} from "../../types/solidity-native";
const Profil: NextPageWithLayout = () => {
    const { address } = useAccount();
    const [nft, setNft] = useState<number[]>([]);

    const contractConfig = {
        address: contractAddress as Address,
        abi: FactoryContractAbi,
    };

    const {
        data: collectionList,
        isLoading: collectionListLoading,
        refetch: refetchcollectionList,
        error: collectionErr,
    } = useReadContract({
        ...contractConfig,
        functionName: "getCollections",
        args: [FilterType.ALL],
    });

    useWatchContractEvent({
        ...contractConfig,
        eventName: "CollectionCreated",
        onLogs(log) {
            refetchcollectionList();
        },
    });


    useEffect(() => {
        refetchcollectionList()
    }, []);

    if(collectionListLoading) {
        return "";
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
                ""
            }
        </div>
    );
};

export default Profil;
