
import data from "../../Assets/data.json";

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'


export default function ProductList() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [], 
        type: "",
    });
    const products = data;

    const filters = [
        {
            id: 'Recomemended For You',
            name: 'Recomemended For You',
            options: [
                { value: 'New Arrival', label: 'All New Arrivals' },
                { value: 'Discount', label: 'All New Discount' },
            ],
        },
        {
            id: 'Categories',
            name: 'Categories',
            options: [
                { value: 'Fish', label: 'Fish' },
                { value: 'Shrimp', label: 'Shrimp' },
                { value: 'Mussets', label: 'Mussets' },
            ],
        },
    ]


    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedFilters.categories.length === 0 ||
            selectedFilters.categories.includes(product.Product_Category);

        const matchesType =
            !selectedFilters.type || product.Categories === selectedFilters.type;

        return matchesCategory && matchesType;
    });

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="bg-white">
            <div>
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <form className="mt-4">
                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.name} className="border-t border-gray-200 pb-4 pt-4">
                                                {({ open }) => (
                                                    <fieldset>
                                                        <legend className="w-full px-2">
                                                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                                                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex h-7 items-center">
                                                                    <ChevronDownIcon
                                                                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </Disclosure.Button>
                                                        </legend>
                                                        <Disclosure.Panel className="px-4 pb-2 pt-4">
                                                            <div className="space-y-6">
                                                                {section.options.map((option) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`${section.id}-${option.value}`}
                                                                            name={section.id}
                                                                            type="checkbox"
                                                                            value={option.value}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            checked={
                                                                                section.id === "Recomemended For You"
                                                                                    ? selectedFilters.type === option.value
                                                                                    : selectedFilters.categories.includes(option.value)
                                                                            }
                                                                            onChange={() => {
                                                                                setSelectedFilters((prevFilters) => {
                                                                                    if (section.id === "Recomemended For You") {
                                                                                        // Toggle tipe produk
                                                                                        return {
                                                                                            ...prevFilters,
                                                                                            type:
                                                                                                prevFilters.type === option.value
                                                                                                    ? ""
                                                                                                    : option.value,
                                                                                        };
                                                                                    } else {
                                                                                        // Toggle kategori produk
                                                                                        const newCategories = prevFilters.categories.includes(option.value)
                                                                                            ? prevFilters.categories.filter(
                                                                                                (category) => category !== option.value
                                                                                            )
                                                                                            : [...prevFilters.categories, option.value];
                                                                                        return { ...prevFilters, categories: newCategories };
                                                                                    }
                                                                                });
                                                                            }}
                                                                        />
                                                                        <label
                                                                            htmlFor={`${section.id}-${option.value}`}
                                                                            className="ml-3 text-sm text-gray-600"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </fieldset>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    <div className="border-b border-gray-200 pb-10 pt-12">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Seafood Delights</h1>
                        <p className="mt-4 text-base text-gray-500">
                            Dive into our freshest catch yet! Explore our latest selection of premium seafood, now with added flavors and variety!
                        </p>
                    </div>

                    <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <aside>
                            <h2 className="sr-only">Filters</h2>

                            <button
                                type="button"
                                className="inline-flex items-center lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="text-sm font-medium text-gray-700">Filters</span>
                                <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            </button>

                            <div className="hidden lg:block">
                                <form className="space-y-10 divide-y divide-gray-200">
                                    {filters.map((section, sectionIdx) => (
                                        <div key={section.name} className={sectionIdx === 0 ? null : "pt-10"}>
                                            <fieldset>
                                                <legend className="block text-sm font-medium text-gray-900">
                                                    {section.name}
                                                </legend>
                                                <div className="space-y-3 pt-6">
                                                    {section.options.map((option) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`${section.id}-${option.value}`}
                                                                name={section.id}
                                                                type="checkbox"
                                                                value={option.value}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                checked={
                                                                    section.id === "Recomemended For You"
                                                                        ? selectedFilters.type === option.value
                                                                        : selectedFilters.categories.includes(option.value)
                                                                }
                                                                onChange={() => {
                                                                    setSelectedFilters((prevFilters) => {
                                                                        if (section.id === "Recomemended For You") {
                                                                            return {
                                                                                ...prevFilters,
                                                                                type:
                                                                                    prevFilters.type === option.value
                                                                                        ? ""
                                                                                        : option.value,
                                                                            };
                                                                        } else {
                                                                            const newCategories = prevFilters.categories.includes(option.value)
                                                                                ? prevFilters.categories.filter(
                                                                                    (category) => category !== option.value
                                                                                )
                                                                                : [...prevFilters.categories, option.value];
                                                                            return { ...prevFilters, categories: newCategories };
                                                                        }
                                                                    });
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={`${section.id}-${option.value}`}
                                                                className="ml-3 text-sm text-gray-600"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>
                                    ))}
                                </form>
                            </div>
                        </aside>

                        <section
                            aria-labelledby="product-heading"
                            className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
                        >
                            <h2 id="product-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.Product_Name}
                                        className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                                    >
                                        <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                                            <img
                                                src={`/img/${product.Product_Image}`}
                                                alt={product.Product_Name}
                                                className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col space-y-2 p-4">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                {product.Product_Name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {product.Description}
                                            </p>
                                            <div className="flex flex-1 flex-col justify-end">
                                                {product.Categories === "Discount" ? (
                                                    <>
                                                        <div className="flex items-center">
                                                            <p className="text-sm text-gray-500 line-through mr-2">
                                                                ${product.Product_Price.toFixed(2)}
                                                            </p>
                                                            <p className="text-sm font-medium text-green-600">
                                                                {product.Discount}% Off
                                                            </p>
                                                        </div>
                                                        <p className="text-base font-medium text-red-600">
                                                            ${(
                                                                product.Product_Price *
                                                                (1 - product.Discount / 100)
                                                            ).toFixed(2)}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <p className="text-base font-medium text-gray-900">
                                                        ${product.Product_Price.toFixed(2)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>

            </div>
        </div>
    )
}
