import {NavIt} from "./nav-it";
import Link from "next/link";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import React from "react";
const Navbar = () => {
    return (
        <div className="flex justify-between w-screen items-center h-32 mt-10 px-32 max-lg:px-4 max-lg:py-0 max-lg:mt-0">
            <div className="w-6/12 flex flex-row max-lg:w-1/4">
                <Link href="/"><img className="rounded-lg cursor-pointer max-lg:w-14" src="ico/logo.png"/></Link>
                <h2 className="my-auto ml-4 text-3xl max-lg:hidden">EmmentalNFT</h2>
            </div>
            <div className="w-6/12 flex flex-row justify-end max-lg:w-screen max-lg:justify-normal max-lg:ml-4">
                {/*<NavIt text="About us" link="/"/>*/}
                <ConnectButton />
            </div>
        </div>
    )
}
export default Navbar
