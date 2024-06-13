import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import axios from 'axios';
// A REUSE DANS LE CODE SI JAMAIS
const DashNodesit = ({id, name, desc, price, imgLink }: {id: number, name: string, desc: string, price:number, imgLink:string }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState<number>(1);
    const account = useAccount();
    const { openConnectModal } = useConnectModal();


    const handleBuyClick = () => {
        setShowDetails(!showDetails);
    };
    const checkValueDuration = (duration: number) => {
        if (![1, 3, 6, 12].includes(duration)) {
            throw new Error("Invalid Duration Value");
        }
    };
    const checkValueOfferID = (propsId: number) => {
        if (id !== propsId) {
            throw new Error("Invalid Offer Id");
        }
    }
    const handleDurationClick = (duration: number) => {
        setSelectedDuration(duration);
    };



    const buyNodes = async (offerId: number, duration: number) => {
        try {
            checkValueDuration(duration);
            checkValueOfferID(offerId);

            if (!account.isConnected && openConnectModal) {

                openConnectModal();
                if(!account.isConnected){
                    return
                }
            }


            // promise solidity

            setShowDetails(false);

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div>
            <div className="flex bg-customGrayBg rounded-xl py-4 px-4 w-full max-sm:items-center hover:bg-customGrayBgHover">
                <img className="h-32 w-72 rounded-xl max-sm:w-28 max-sm:h-20" src={imgLink} alt="Nodes ico" />
                <div className="py-4 px-4 w-5/12 max-sm:w-full max-sm:p-0">
                    <h2 className="text-gray-100 font-bold mb-1 max-sm:mb-0 max-sm:text-sm max-sm:ml-2">{name}</h2>
                    <p className="text-gray-200 max-sm:hidden">{desc}</p>
                </div>
                <div className="ml-auto flex justify-end items-center mr-16 max-sm:justify-center max-sm:m-0    ">
                    <button onClick={handleBuyClick} className="transition-all text-gray-200 w-24 rounded-xl h-8 bg-blue-500 text-lg hover:border-white hover:text-white hover:h-9 hover:w-25 max-sm:h-6 max-sm:w-12 max-sm:text-sm">Buy</button>
                </div>
            </div>

            {showDetails && (
                <div className="fixed inset-0 z-10 modal w-[25%] h-3/5 bg-white rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-4 text-amber-950">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-x-2">
                            <div className="w-20 h-20 rounded bg-cover bg-center" style={{backgroundImage: `url(${imgLink})`}}/>
                            <p className="text-lg font-bold">{name}</p>
                        </div>
                        <div className="bg-customGrayBgHover rounded-xl items-center justify-center flex h-8 w-8 cursor-pointer">
                            <img className="w-6 h-6" src="ico/ico-close.svg" onClick={handleBuyClick} />
                        </div>
                    </div>
                    <div className="my-8">
                        <h2 className="mb-2">Duration (in months)</h2>
                        <div className="flex justify-evenly items-center rounded-full w-full bg-customGrayBgHover h-10 text-black">
                            {[1, 3, 6, 12].map((duration) => (
                                <div
                                    key={duration}
                                    className={`p-2 rounded-2xl cursor-pointer w-full text-center transition duration-300 ${selectedDuration === duration ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => handleDurationClick(duration)}
                                >
                                    {duration}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t ">
                        <h3 className="mt-3">Total for {name}/{selectedDuration} Month{selectedDuration === 1 ? "" : "s"}:</h3>
                        <h3>{price * selectedDuration}$</h3>
                    </div>
                    <div className="w-full flex items-center justify-center h-1/3">
                        <button onClick={() => buyNodes(id, selectedDuration)} className="w-32 rounded-xl h-10 bg-blue-500 text-white text-lg hover:text-white px-4 hover:w-34 hover:h-11 transition-all">Buy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashNodesit;
