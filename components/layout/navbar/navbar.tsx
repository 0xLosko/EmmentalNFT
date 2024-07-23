import Link from "next/link";
//import {ConnectButton} from "@rainbow-me/rainbowkit";
import { ConnectButton, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "../../ui/navigation"
import { navigationMenuTriggerStyle } from "../../ui/navigation"


const Navbar = () => {
    return (
        <div className="flex justify-between items-center h-32 mt-10 px-32 max-lg:px-4 max-lg:py-0 max-lg:mt-0
        max-sm:flex-col max-sm:justify-center max-sm:my-8 max-sm:gap-y-4">
            <div className="w-6/12 flex flex-row max-lg:w-1/4 max-sm:w-full max-sm:justify-center">
                <Link href="/"><img className="rounded-lg cursor-pointer max-lg:w-14" src="/ico/logo.svg"/></Link>
                <h2 className="my-auto ml-4 text-3xl max-lg:text-xl">EmmentalNFT</h2>
            </div>
            <div className="w-2/4 flex gap-5 px-4 max-lg:px-4 max-lg:py-0 max-lg:mt-0 text-lg max-sm:w-full">
                <NavigationMenu>
                    <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Discover
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/profil" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        My profile
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/create" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Create new collection
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="w-6/12 flex flex-row justify-end max-lg:w-screen max-lg:justify-normal max-lg:ml-4 max-sm:w-full max-sm:justify-center">
                <ConnectButton/>
            </div>
        </div>
    )
}
export default Navbar
