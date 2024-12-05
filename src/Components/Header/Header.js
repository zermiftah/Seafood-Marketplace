import axios from "axios";
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Tab, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

import SeafoodLogo2 from "../../Assets/img/Seafood_Logo2.png"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('');
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

    const uniqueCategories = [...new Set(data.map(item => item.Product_Category))];

    const groupedCategories = data.reduce((acc, item) => {
        if (!acc[item.Product_Category]) {
            acc[item.Product_Category] = [];
        }
        acc[item.Product_Category].push(item);
        return acc;
    }, {});

    useEffect(() => {
        const storedUsername = localStorage.getItem('usernameFishMarketplace');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('usernameFishMarketplace');
        localStorage.removeItem('passwordFishMarketplace');

        window.location.href = '/';
    };
    return (
        <div className="bg-white">
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {uniqueCategories.map((category) => (
                                                <Tab
                                                    key={category}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-900',
                                                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {Object.keys(groupedCategories).map((category) => (
                                            <Tab.Panel key={category} className="space-y-12 px-4 py-6">
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                                                    {groupedCategories[category].map((item) => (
                                                        <div key={item.Product_Name} className="group relative">
                                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                                <img
                                                                    src={item.Product_Image}
                                                                    alt={item.Product_Name}
                                                                    className="object-cover object-center w-full h-full"
                                                                />
                                                            </div>
                                                            <a href="#" className="mt-6 block text-sm font-medium text-gray-900">
                                                                {item.Product_Name}
                                                            </a>
                                                            <div className="mt-1 text-sm">
                                                                {item.Discount > 0 ? (
                                                                    <>
                                                                        <span className="text-gray-400 line-through">${item.Product_Price.toFixed(2)}</span>
                                                                        <span className="ml-2 text-red-600">${(item.Product_Price * (1 - item.Discount / 100)).toFixed(2)}</span>
                                                                        <span className="ml-2 text-green-600">{item.Discount}% Off</span>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-gray-900">${item.Product_Price.toFixed(2)}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative">
                <nav aria-label="Top">
                    <div className="bg-gray-900">
                        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center space-x-6 ml-auto">
                                {username ? (
                                    <>
                                        <span className="text-sm font-medium text-white">
                                            Hello, {username} 😊
                                        </span>
                                        <button
                                            onClick={handleLogout}
                                            className="text-sm font-medium text-white hover:text-gray-100"
                                        >
                                            Log Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                            Sign in
                                        </a>
                                        <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                            Create an account
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                    <a href="/MainPage">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            className="h-16 w-40 rounded-md" 
                                            src={SeafoodLogo2}
                                            alt="Seafood Marketplace Logo"
                                        />
                                    </a>
                                </div>

                                <div className="flex flex-1 items-center lg:hidden">
                                    <button
                                        type="button"
                                        className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setOpen(true)}
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                <a href="\MainPage" className="lg:hidden">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        src={SeafoodLogo2}
                                        alt=""
                                        className="h-12 w-auto rounded-md"
                                    />
                                </a>

                                <div className="flex flex-1 items-center justify-end">
                                    <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                                        Search
                                    </a>

                                    <div className="flex items-center lg:ml-8">
                                        <a href="#" className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                                            <span className="sr-only">Help</span>
                                            <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                                        </a>
                                        <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                                            Help
                                        </a>

                                        {/* Cart */}
                                        <div className="ml-4 flow-root lg:ml-8">
                                            <a href="#" className="group -m-2 flex items-center p-2">
                                                <ShoppingBagIcon
                                                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                                <span className="sr-only">items in cart, view bag</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

        </div>
    )
}
