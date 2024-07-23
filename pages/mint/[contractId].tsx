import { Button } from "../../components/ui/button"
import {NextPageWithLayout} from "../_app"
import Image from 'next/image'
import {
    useAccount,
    useReadContract,
    type BaseError,
    useWriteContract,
    useWatchContractEvent,
} from "wagmi";
import { CollectionContractAbi } from "../../constants"
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {Progress} from "../../components/ui/progress";
import contractId from "../collection/[contractId]";
import { Address } from "../../types/solidity-native"

const Mint: NextPageWithLayout = () => {
    const { address } = useAccount()
    const { data: hash, error: mintError, isPending, writeContract } = useWriteContract()
    const router = useRouter()

    const contractConfig = {
        address: router.query.contractId as Address,
        abi: CollectionContractAbi,
    };

    const mintNft = async() => {
        writeContract({
            ...contractConfig,
            functionName: "mint",
            account: address,
        });
    }
    const {
        data: desc,
        isLoading: descLoading,
        refetch: refetchDesc,
        error: descError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'description',
    });
    const {
        data: name,
        isLoading: nameLoading,
        refetch: refetchName,
        error: nameError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'name',
    });

    const {
        data: nbMint,
        isLoading: nbMintLoading,
        refetch: refetchNbMint,
        error: nbMintError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'getNbMint',
    });

    const {
        data: maximumSupply,
        isLoading: maximumSupplyLoading,
        refetch: refetchMaximumSupply,
        error: maximumSupplyError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'getMaximumSupply',
    });

    const {
        data: nftUrl,
        isLoading: nftUrlLoading,
        refetch: refetchNftUrl,
        error: nftUrlError,
    } = useReadContract({
        ...contractConfig,
        functionName: 'getBaseUri',
    });

    useWatchContractEvent({
        ...contractConfig,
        eventName: "NftMinted",
        onLogs(log) {
            refetchNbMint();
        },
    });

    useEffect(() => {
        refetchName();
        refetchMaximumSupply();
        refetchNftUrl();
        refetchDesc();
    }, [contractId]);

    if (mintError) {
        return <div>Erreur lors de la tentative de mint: {mintError.message}</div>;
    }
    return (
        <div className="flex items-center justify-center gap-9 min-h[500px] mb-16">
            <div className="flex justify-center items-center bg-amber-400 rounded-2xl">
                <Image src={nftUrl as string} alt="Logo"
                       width={0}
                       height={0}
                       sizes="100vw"
                       style={{ width: '400px', height: 'auto', borderRadius: '12px'}}/>
            </div>
            <div className="flex justify-center flex-col min-h-[500px] p-3 max-w-[50%]">
                <h1 className="text-4xl w-fit">{name as string}</h1>
                <h3 className="m-w-4/5 mt-9">
                    {desc&& desc}
                </h3>
                <div className="flex flex-row items-center justify-center bg-cardBg h-14 mt-9 rounded-xl p-3">
                    <div className="w-3/4 flex flex-col items-center justify-center">
                        <p className="text-white text-lg">{`${nbMint} / ${maximumSupply}`}</p>
                        <Progress value={Number(nbMint) / Number(maximumSupply) * 100}/>
                    </div>
                    <Button className="ml-auto bg-customYellow/80 hover:bg-customYellow" onClick={() => mintNft()}>Mint</Button>
                </div>
            </div>
        </div>
    )
};

export default Mint;
