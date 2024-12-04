import data from "../../Assets/data.json";

export default function MainPage() {
    const imageBasePath = "/img/";

    const categorizedData = {
        "New Arrival": data.filter((product) => product.Categories === "New Arrival"),
        Discount: data.filter((product) => product.Categories === "Discount"),
    };
    const renderProductList = (products) => (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.slice(0, 4).map((product) => {
                const discountedPrice =
                    product.Categories === "Discount"
                        ? product.Product_Price - (product.Product_Price * product.Discount) / 100
                        : null;

                return (
                    <div key={product.Product_Name} className="group relative">
                        <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                            <img
                                src={`${imageBasePath}${product.Product_Image}`}
                                alt={product.Product_Name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">
                            <a href="#">
                                <span className="absolute inset-0" />
                                {product.Product_Name}
                            </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {product.Product_Category}
                            {product.Categories === "Discount" && (
                                <span className="ml-2 text-xs font-medium text-red-500">
                                    -{product.Discount}%
                                </span>
                            )}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                            {product.Categories === "Discount" ? (
                                <>
                                    <span className="line-through text-gray-500 mr-2">
                                        ${product.Product_Price.toFixed(2)}
                                    </span>
                                    <span>${discountedPrice.toFixed(2)}</span>
                                </>
                            ) : (
                                `$${product.Product_Price.toFixed(2)}`
                            )}
                        </p>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {Object.entries(categorizedData).map(([category, products]) => (
                    products.length > 0 && (
                        <div key={category} className="mb-12">
                            <div className="md:flex md:items-center md:justify-between">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                    {category}
                                </h2>
                                <a
                                    href="#"
                                    className="hidden text-sm font-medium text-blue-600 hover:text-indigo-500 md:block"
                                >
                                    See All
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </div>
                            {renderProductList(products)}
                        </div>
                    )
                ))}
                <div className="mt-8 text-sm md:hidden">
                    <a href="#" className="font-medium text-blue-600 hover:text-indigo-500">
                        See All Products
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
