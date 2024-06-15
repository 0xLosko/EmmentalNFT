import { Button } from "../../components/ui/button"
import {NextPageWithLayout} from "../_app";
import Image from 'next/image'

const Mint: NextPageWithLayout = () => {
    return (
        <div className="flex items-center justify-center gap-9 min-h-[500px]">
            <div className="bg-amber-400 rounded-xl">
                <Image
                    src="/profile.png"
                    width={400}
                    height={500}
                    alt="NFT Template"
                />
            </div>
            <div className="min-h-[500px] p-3 max-w-[50%]">
                <h1 className="text-4xl w-fit">NFT CHEESY MINTPAGE</h1>
                <h3 className="w-4/5 mt-9">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                    Aldus PageMaker including versions of Lorem Ipsum.
                </h3>
                <div className="flex flex-row items-center justify-center bg-amber-400 h-14 mt-9 rounded-xl p-3">
                    <div className="ml-[20%] flex">
                        <h4>Price: </h4>
                        <h3>FREE</h3>
                    </div>
                    <div className="flex ml-5">
                        <h4>Minted: </h4>
                        <h3>xxx</h3>
                    </div>
                    <Button className="ml-auto">Mint</Button>
                </div>
            </div>
        </div>
    )
};

export default Mint;
