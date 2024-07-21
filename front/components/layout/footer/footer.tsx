import React from 'react'

const Footer = () => {
    return (
        <section className="flex justify-evenly bg-cardBg border-t border-customYellow items-center h-32 mt-28 p-32 max-lg:px-4 max-lg:py-0 max-lg:mt-0 max-sm:flex-col max-sm:h-fit max-sm:justify-center max-sm:my-8 max-sm:gap-y-4">
            <div className="max-sm:w-screen max-sm:flex max-sm:items-center max-sm:justify-evenly">
                <div className="flex flex-row items-center">
                    <a href="/"><img className="rounded-lg cursor-pointer w-12 h-12" src="/ico/logo.svg"/></a>
                    <h3 className="ml-2">EmmentalNFT</h3>
                </div>
                <div>
                    <p className="text-xs text-left mt-3 text-grey-50">NFT Marketplace<br/>
                        Trade Cheese Now<br/>
                        With Low Fees.</p>
                </div>
            </div>
            <div className="flex max-sm:w-screen max-sm:justify-evenly max-sm:mt-4 gap-x-9 max-sm:gap-0">
                <div className="text-left ">
                    <h3 className="text-grey-50 text-base mb-1">Our Service</h3>
                    <ul className="text-xs space-y-0.5">
                        <li>
                            <a href="">Discover</a>
                        </li>
                        <li>
                            <a href="">My profile</a>
                        </li>
                        <li>
                            <a href="">Create</a>
                        </li>
                    </ul>
                </div>
                <div className="text-left">
                    <h3 className="text-grey-50 text-base mb-1">Company</h3>
                    <ul className="text-xs space-y-0.5">
                        <li>
                            <a href="">Terms of Use</a>
                        </li>
                        <li>
                            <a href="">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div className="text-left">
                    <h3 className="text-grey-50 text-base mb-1">Follow us</h3>
                    <ul className="text-xs space-y-0.5">
                        <li>
                            <a href="">X</a>
                        </li>
                        <li>
                            <a href="">Medium</a>
                        </li>
                        <li>
                            <a href="">Discord</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
export default Footer
