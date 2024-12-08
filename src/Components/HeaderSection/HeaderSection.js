import axios from "axios";
import { useState, useEffect } from 'react'

export default function HeaderSection() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://seafood-marketplace-backend.glitch.me/data");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="bg-white">
            <main>
                <div className="relative overflow-hidden bg-white">
                    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                            <div className="sm:max-w-lg">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Indulge in Fresh & Flavorful Seafood
                                </h1>
                                <p className="mt-4 text-xl text-gray-500">
                                    Dive into our premium selection of freshly caught seafood, crafted to delight your taste buds with the ocean's finest flavors.
                                </p>
                            </div>
                            <div>
                                <div className="mt-10">
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                    >
                                        <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                            <div className="flex items-center space-x-6 lg:space-x-8">
                                                <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                        <img
                                                            alt=""
                                                            src={data[0]?.Product_Image}
                                                            className="size-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img
                                                            alt=""
                                                            src={data[1]?.Product_Image}
                                                            className="size-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img
                                                            alt=""
                                                            src={data[2]?.Product_Image}
                                                            className="size-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img
                                                            alt=""
                                                            src={data[3]?.Product_Image}
                                                            className="size-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img
                                                            alt=""
                                                            src={data[4]?.Product_Image}
                                                            className="size-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img
                                                            alt=""
                                                            src={data[5]?.Product_Image}
                                                            className="size-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img
                                                            alt=""
                                                            src={data[6]?.Product_Image}
                                                            className="size-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href="#/ProductList"
                                        className="inline-block rounded-md border border-transparent bg-sky-100 px-8 py-3 text-center font-medium text-sky-700 hover:bg-sky-300 hover:text-white"
                                    >
                                        See All Products
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
