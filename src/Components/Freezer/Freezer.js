import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid';
import SplashPhoto from "../../Assets/img/SplashPhoto.png"

export default function Freezer() {
    const [data, setData] = useState([]);
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem("usernameFishMarketplace");
        if (!username) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem('usernameFishMarketplace');

            if (!username) {
                console.log("Username not found in localStorage");
                return;
            }

            try {
                setUpdating(true);
                const response = await axios.post(
                    "https://seafood-marketplace-backend.glitch.me/freezer",
                    { Username: username }
                );

                // Pastikan hanya mengambil data Freezer
                if (response.data && response.data.Freezer) {
                    setData(response.data.Freezer);
                } else {
                    console.error("Freezer data not found in response");
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setUpdating(false);
            }
        };

        fetchData();
    }, []);

    const calculateDiscountedPrice = (price, discount) => price - price * (discount / 100);

    console.log('Data:', data)

    return (
        <>
            {updating && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <img
                        className="max-h-28 w-auto animate-bounce animate-infinite"
                        src={SplashPhoto}
                        alt="Your Company"
                    />
                </div>
            )}
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Freezer Cart</h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

                            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                                {data.map((product, index) => {
                                    const discountedPrice = calculateDiscountedPrice(
                                        product.Product_Price,
                                        product.Discount
                                    );

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
                                                                        ${product.Product_Price}
                                                                    </span>
                                                                    <span className="text-red-600">
                                                                        {product.Discount}% off
                                                                    </span>
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
                                                        <CheckIcon
                                                            className="h-5 w-5 flex-shrink-0 text-green-500"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <ClockIcon
                                                            className="h-5 w-5 flex-shrink-0 text-gray-300"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    <span>
                                                        {product.Count > 0
                                                            ? `${product.Count} In stock and ready to ship`
                                                            : "Out of stock"}
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>

                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                        >
                            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Order summary</h2>

                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        ${data.reduce(
                                            (total, product) =>
                                                total +
                                                calculateDiscountedPrice(
                                                    product.Product_Price,
                                                    product.Discount
                                                ) *
                                                product.Count,
                                            0
                                        ).toFixed(2)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="flex items-center text-sm text-gray-600">
                                        <span>Shipping estimate</span>
                                        <a
                                            href="#"
                                            className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">
                                                Learn more about how shipping is calculated
                                            </span>
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="flex items-center text-sm text-gray-600">
                                        <span>Tax estimate</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">$3.55</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                                    <dd className="text-base font-medium text-gray-900">
                                        ${(
                                            data.reduce(
                                                (total, product) =>
                                                    total +
                                                    calculateDiscountedPrice(
                                                        product.Product_Price,
                                                        product.Discount
                                                    ) *
                                                    product.Count,
                                                0
                                            ) + 5 + 3.55
                                        ).toFixed(2)}
                                    </dd>
                                </div>
                            </dl>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full rounded-md border border-transparent px-4 py-3 text-base font-medium shadow-sm bg-sky-100 px-8 py-3 text-center font-medium text-sky-700 hover:bg-sky-300 hover:text-white"
                                >
                                    Checkout
                                </button>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </>
    );
}
