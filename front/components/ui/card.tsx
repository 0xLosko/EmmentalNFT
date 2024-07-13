import React from "react";
import { Button } from "./button";
import Image from "next/image";

export const Card = ({
    title,
    description,
    imageSrc,
    action,
    actionTitle="action",
}: {
    title: string;
    description: string;
    imageSrc: string;
    action?: React.EffectCallback;
    actionTitle?: string;
}) => {
    return (
        <div className="grid w-[250px] h-[250px] bg-amber-400/[.4] rounded-3xl justify-center items-center">
            <Image src={imageSrc} alt="NFT" height={200} width={200} />

            <h4 className="mb-0 text-2xl font-bold tracking-tight text-white">
                {title}
            </h4>
            <div className="p-2 justify-self-stretch grid grid-rows-1 grid-flow-col justify-between items-center">
                <small className="text-default-500 text-[#CCC28F]">
                    {description}
                </small>
                {action && (
                    <Button className="" onClick={action}>
                        {actionTitle}
                    </Button>
                )}
            </div>
        </div>
    );
};
