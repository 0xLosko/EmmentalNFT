"use client"

import * as React from "react";

import { cn } from "../../lib/utils";
import { useRef, useState } from "react";

interface ev {
    target: {value: string}
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onCIDLoaded: (event: ev) => void;
}

const ImageFileInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ onCIDLoaded, className, ...props }, ref) => {

        const inputFile = useRef(null);

        const uploadFile = async (fileToUpload: File) => {
            try {
                // setUploading(() => true);
                const data = new FormData();
                data.set("file", fileToUpload);
                const res = await fetch("/api/files", {
                    method: "POST",
                    body: data,
                });
                const resData = await res.json();
                onCIDLoaded({ target: { value: "https://ipfs.io/ipfs/" + resData.IpfsHash } });
                console.log(resData.IpfsHash);
                // setUploading(() => false);
            } catch (e) {
                console.log(e);
                // setUploading(() => false);
                alert("Trouble uploading file");
            }
        };

        const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
            e
        ) => {
            if (e.target.files) {
                uploadFile(e.target.files[0]);
            }
        };

        return (
            <div
                className={cn(
                    "flex items-center justify-center w-full h-full",
                    className
                )}
            >
                <label
                    html-for="dropzone-file"
                    className="flex flex-col items-center justify-center w-full border-dashed rounded-lg cursor-pointer bg-customYellow/80 hover:bg-customYellow dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                        </p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        ref={ref}
                        {...props}
                        className="hidden"
                        onChange={handleChange}
                    />
                </label>
            </div>
        );
    }
);
ImageFileInput.displayName = "ImageFileInput";

export { ImageFileInput };
