import Link from "next/link";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import React from "react";
const Navbar = () => {
    return (
        <div className="flex justify-between items-center h-32 mt-10 px-32 max-lg:px-4 max-lg:py-0 max-lg:mt-0">
            <div className="w-6/12 flex flex-row max-lg:w-1/4">
                <Link href="/"><img className="rounded-lg cursor-pointer max-lg:w-14" src="/ico/logo.svg"/></Link>
                <h2 className="my-auto ml-4 text-3xl max-lg:hidden">EmmentalNFT</h2>
            </div>
            <div className="w-2/4 flex gap-5 px-4 max-lg:px-4 max-lg:py-0 max-lg:mt-0 text-lg">
                <Link href="/">Discover</Link>
                <Link href="/profil">My Profile</Link>
                <Link href="/create">Create new collection</Link>
            </div>
            <div className="w-6/12 flex flex-row justify-end max-lg:w-screen max-lg:justify-normal max-lg:ml-4">
                <ConnectButton/>
            </div>
        </div>
    )
}
export default Navbar
