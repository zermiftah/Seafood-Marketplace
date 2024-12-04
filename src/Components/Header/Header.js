import data from "../../Assets/data.json";
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

const uniqueCategories = [...new Set(data.map(item => item.Product_Category))];

const groupedCategories = data.reduce((acc, item) => {
    if (!acc[item.Product_Category]) {
        acc[item.Product_Category] = [];
    }
    acc[item.Product_Category].push(item);
    return acc;
}, {});

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Cek apakah ada username yang tersimpan di localStorage
        const storedUsername = localStorage.getItem('usernameFishMarketplace');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        // Hapus username dan password dari localStorage
        localStorage.removeItem('usernameFishMarketplace');
        localStorage.removeItem('passwordFishMarketplace');
        // Redirect ke halaman utama
        window.location.href = '/'; // Anda bisa mengganti dengan URL halaman utama yang sesuai
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
                                                            <div
                                                                className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75"
                                                                style={{ height: '250px' }}
                                                            >
                                                                <img
                                                                    src={`/img/${item.Product_Image}`}
                                                                    alt={item.Product_Name}
                                                                    className="object-cover object-center w-full h-full"
                                                                />
                                                            </div>
                                                            <a href="#" className="mt-6 block text-sm font-medium text-gray-900">
                                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                {item.Product_Name}
                                                            </a>

                                                            {/* Price and Discount handling */}
                                                            <div className="mt-1 text-sm">
                                                                {item.Discount > 0 ? (
                                                                    <>
                                                                        {/* Original price (struck-through) */}
                                                                        <span className="text-gray-400 line-through">
                                                                            ${item.Product_Price.toFixed(2)}
                                                                        </span>
                                                                        {/* Discounted price */}
                                                                        <span className="ml-2 text-red-600">
                                                                            ${((item.Product_Price * (1 - item.Discount / 100)).toFixed(2))}
                                                                        </span>
                                                                        {/* Display discount percentage */}
                                                                        <span className="ml-2 text-green-600">
                                                                            {item.Discount}% Off
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    // If no discount, show the regular price
                                                                    <span className="text-gray-900">
                                                                        ${item.Product_Price.toFixed(2)}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <p aria-hidden="true" className="mt-1 text-sm text-gray-500">
                                                                Buy now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>
                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {username ? (
                                        <div className="flow-root">
                                            <span className="-m-2 block p-2 font-medium text-gray-900">
                                                Hello, {username} 😊
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flow-root">
                                                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Create an account
                                                </a>
                                            </div>
                                            <div className="flow-root">
                                                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Sign in
                                                </a>
                                            </div>
                                        </>
                                    )}
                                    {username && (
                                        <div className="flow-root">
                                            <button
                                                onClick={handleLogout}
                                                className="-m-2 block p-2 font-medium text-gray-900 hover:text-gray-700"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative">
                <nav aria-label="Top">
                    <div className="bg-gray-900">
                        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center space-x-6">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                    <a href="#">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt=""
                                        />
                                    </a>
                                </div>
                            </div>
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
                                    <a href="#">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt=""
                                        />
                                    </a>
                                </div>

                                <div className="hidden h-full lg:flex">
                                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                                        <div className="flex h-full justify-center space-x-8">
                                            {Object.keys(groupedCategories).map((category) => (
                                                <Popover key={category} className="flex">
                                                    {({ open }) => (
                                                        <>
                                                            <div className="relative flex">
                                                                <Popover.Button
                                                                    className={classNames(
                                                                        open ? 'text-blue-600' : 'text-gray-700 hover:text-gray-800',
                                                                        'relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out'
                                                                    )}
                                                                >
                                                                    {category}
                                                                    <span
                                                                        className={classNames(
                                                                            open ? 'bg-blue-600' : '',
                                                                            'absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                </Popover.Button>
                                                            </div>

                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-200"
                                                                enterFrom="opacity-0"
                                                                enterTo="opacity-100"
                                                                leave="transition ease-in duration-150"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <Popover.Panel className="absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500">
                                                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                                                    <div
                                                                        className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                                                        aria-hidden="true"
                                                                    >
                                                                        <div
                                                                            className={classNames(
                                                                                open ? 'bg-gray-200' : 'bg-transparent',
                                                                                'h-px w-full transition-colors duration-200 ease-out'
                                                                            )}
                                                                        />
                                                                    </div>

                                                                    <div className="relative">
                                                                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                                            <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                                                                {groupedCategories[category].map((item) => (
                                                                                    <div key={item.Product_Name} className="group relative">
                                                                                        <div
                                                                                            className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75"
                                                                                            style={{ height: '250px' }}
                                                                                        >
                                                                                            <img
                                                                                                src={`/img/${item.Product_Image}`}
                                                                                                alt={item.Product_Name}
                                                                                                className="object-cover object-center w-full h-full"
                                                                                            />
                                                                                        </div>
                                                                                        <a href="#" className="mt-4 block font-medium text-gray-900">
                                                                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                            {item.Product_Name}
                                                                                        </a>
                                                                                        <div className="mt-1 flex items-center">
                                                                                            {item.Discount > 0 ? (
                                                                                                <>
                                                                                                    {/* Original price (struck-through) */}
                                                                                                    <span className="text-sm font-medium text-gray-400 line-through">
                                                                                                        ${item.Product_Price.toFixed(2)}
                                                                                                    </span>
                                                                                                    {/* Discounted price */}
                                                                                                    <span className="ml-2 text-sm font-medium text-red-600">
                                                                                                        ${((item.Product_Price * (1 - item.Discount / 100)).toFixed(2))}
                                                                                                    </span>
                                                                                                    {/* Display discount percentage */}
                                                                                                    <span className="ml-2 text-sm font-medium text-green-600">
                                                                                                        {item.Discount}% Off
                                                                                                    </span>
                                                                                                </>
                                                                                            ) : (
                                                                                                // If no discount, just show the regular price
                                                                                                <span className="text-sm font-medium text-gray-900">
                                                                                                    ${item.Product_Price.toFixed(2)}
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                        <p aria-hidden="true" className="mt-1">
                                                                                            Buy now
                                                                                        </p>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Panel>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Popover>
                                            ))}
                                        </div>
                                    </Popover.Group>
                                </div>

                                {/* Mobile menu and search (lg-) */}
                                <div className="flex flex-1 items-center lg:hidden">
                                    <button
                                        type="button"
                                        className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setOpen(true)}
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Search */}
                                    <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* Logo (lg-) */}
                                <a href="#" className="lg:hidden">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt=""
                                        className="h-8 w-auto"
                                    />
                                </a>

                                <div className="flex flex-1 items-center justify-end">
                                    <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                                        Search
                                    </a>

                                    <div className="flex items-center lg:ml-8">
                                        {/* Help */}
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
