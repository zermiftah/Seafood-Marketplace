import { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';

export default function Freezer() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem('usernameFishMarketplace'); // Ambil username dari localStorage

            if (!username) {
                setError("Username not found in localStorage");
                return;
            }

            try {
                const response = await axios.post(
                    "https://seafood-marketplace-backend.glitch.me/freezer", 
                    { Username: username }  // Kirim username dalam body request
                );
                setData(response.data); // Set data ke state
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data from the server");
            }
        };

        fetchData();
    }, []);

    const calculateDiscountedPrice = (price, discount) => price - price * (discount / 100);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Freezer List</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {data.map((item, index) => {
                                const product = item.Freezer;
                                const discountedPrice = calculateDiscountedPrice(product.Product_Price, product.Discount);

                                return (
                                    <li key={index} className="flex py-6 sm:py-10">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.Product_Image}
                                                alt={product.Product_Name}
                                                className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <span className="font-medium text-gray-700 hover:text-gray-800">
                                                                {product.Product_Name}
                                                            </span>
                                                        </h3>
                                                    </div>
                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-gray-500">{product.Product_Category}</p>
                                                    </div>
                                                    <div className="mt-1 text-sm font-medium text-gray-900">
                                                        {product.Discount > 0 ? (
                                                            <>
                                                                <span className="line-through text-gray-500 mr-2">
                                                                    ${product.Product_Price.toFixed(2)}
                                                                </span>
                                                                <span className="text-red-600">{product.Discount}% off</span>
                                                                <p className="mt-1 text-sm font-medium text-gray-900">
                                                                    ${discountedPrice.toFixed(2)}
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <p>${product.Product_Price.toFixed(2)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                                {product.Count > 0 ? (
                                                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                                ) : (
                                                    <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                                                )}
                                                <span>{product.Count > 0 ? `${product.Count} available` : 'Out of stock'}</span>
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Order summary</h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    ${data.reduce((total, item) => total + calculateDiscountedPrice(item.Freezer.Product_Price, item.Freezer.Discount) * item.Freezer.Count, 0).toFixed(2)}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how shipping is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">
                                    ${(
                                        data.reduce(
                                            (total, item) =>
                                                total + calculateDiscountedPrice(item.Freezer.Product_Price, item.Freezer.Discount) * item.Freezer.Count,
                                            0
                                        ) + 5.0
                                    ).toFixed(2)}
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Checkout
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
}
