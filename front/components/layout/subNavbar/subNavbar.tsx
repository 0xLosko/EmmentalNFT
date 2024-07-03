import Link from "next/link";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import React from "react";
const SubNavbar = () => {
    return (
        <div className="flex gap-9 items-center h-32 mt-10 px-32 max-lg:px-4 max-lg:py-0 max-lg:mt-0">
            <Link href="/">Discover</Link>
            <Link href="/mint">Mint</Link>
            <Link href="/profil">My Profile</Link>
        </div>
    )
}
export default SubNavbar
