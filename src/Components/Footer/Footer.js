import axios from "axios";
import { useState, useEffect } from 'react'

export default function Footer() {

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

    const footerNavigation = {
        products: [...new Set(data?.map(item => item.Product_Category))] 
        .map(category => ({
            name: category,  
            href: `#/ProductList?category=${encodeURIComponent(category)}`  
        })),
        company: [
            { name: 'Who we are', href: '#' },
            { name: 'Sustainability', href: '#' },
            { name: 'Press', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Terms & Conditions', href: '#' },
            { name: 'Privacy', href: '#' },
        ],
        customerService: [
            { name: 'Contact', href: '#' },
            { name: 'Shipping', href: '#' },
            { name: 'Returns', href: '#' },
            { name: 'Warranty', href: '#' },
            { name: 'Secure Payments', href: '#' },
            { name: 'FAQ', href: '#' },
            { name: 'Find a store', href: '#' },
        ],
    }
    return (
        <div className="bg-white">
            <footer aria-labelledby="footer-heading" className="bg-gray-50">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200 py-20">
                        <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
                            <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
                                <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Products</h3>
                                        <ul role="list" className="mt-6 space-y-6">
                                            {footerNavigation.products.map((item) => (
                                                <li key={item.name} className="text-sm">
                                                    <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Company</h3>
                                        <ul role="list" className="mt-6 space-y-6">
                                            {footerNavigation.company.map((item) => (
                                                <li key={item.name} className="text-sm">
                                                    <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.customerService.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
                                <h3 className="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
                                <p className="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
                                <form className="mt-2 flex sm:max-w-md">
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <div className="ml-4 flex-shrink-0">
                                        <button
                                            type="submit"
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-base font-medium text-sky-700 shadow-sm hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 py-10 text-center">
                        <p className="text-sm text-gray-500">&copy; 2024 Seafood Marketplace, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
