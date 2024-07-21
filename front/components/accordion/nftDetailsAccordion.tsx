import { CheeseMetadata, INftDetails } from "../../types/nft-metadata";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

export function NftDetailsAccordion({
    description,
    attributes,
    details,
}: {
    description: string;
    attributes: CheeseMetadata;
    details: INftDetails;
    }) {
    return (
        <div className="rounded-2xl p-px ml-4 bg-gradient-to-b from-[#414141] to-[#24210F] hover:to-[#414141] h-72 w-[700px] max-sm:w-full max-sm:ml-0 max-sm:my-8">
            <div className="rounded-2xl p-px bg-gradient-to-b from-[#2c2c2c] to-[#24210F] hover:to-[#2c2c2c] w-full h-full">
                <Accordion type="single" collapsible className="m-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Description</AccordionTrigger>
                        <AccordionContent>{description}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Attributes</AccordionTrigger>
                        <AccordionContent>
                            Production year:{" "}
                            {attributes.productionYear.toString()}
                        </AccordionContent>
                        <AccordionContent>
                            Shape: {attributes.shape.toString()}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Details</AccordionTrigger>
                        <AccordionContent>
                            Contract address: {details.contractAddress}
                        </AccordionContent>
                        <AccordionContent>
                            Token Id: {details.tokenId}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
