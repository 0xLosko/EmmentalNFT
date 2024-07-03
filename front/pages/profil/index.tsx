import { NextPageWithLayout } from "../_app";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { contractAddress, contractAbi } from "../../constants";
import Image from 'next/image'
const Profil: NextPageWithLayout = () => {
    const { address } = useAccount();
    const [nft, setNft] = useState<number[]>([]);

    const { data, isLoading: viewNftLoading, refetch, error: readError } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getNftIdForWallet',
        account: address
    });

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
            if (Array.isArray(data)) {
                const nftIds = data.map(id => Number(id));
                setNft(nftIds);
            }
        };
        fetchData();
    }, [address, refetch]);

    if (viewNftLoading) {
        return <p>Loading...</p>;
    }

    if (readError) {
        return <p>Error: {readError.message}</p>;
    }

    return (
        <div className="flex gap-3">
            {nft.map((tokenId, index) => (
                <div key={index} className="flex flex-col w-[350px] h-[350px] bg-amber-400 rounded-3xl flex justify-center items-center">
                    <Image src="ico/logo.svg" alt="" height={100} width={100}/>
                    <h2>#{tokenId}</h2>
                </div>
            ))}
        </div>
    );
};

export default Profil;
