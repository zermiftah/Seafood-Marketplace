import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SplashPhoto from "../../Assets/img/SplashPhoto.png"

export default function MainPage() {

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
            try {
                setUpdating(true);
                const response = await axios.get("https://seafood-marketplace-backend.glitch.me/data");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setUpdating(false);
            }
        };
        fetchData();
    }, []);

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
                                src={product.Product_Image}
                                alt={product.Product_Name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">
                            <a href={`#/DetailProduct?product_name=${encodeURIComponent(product.Product_Name)}`}>
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
                <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6  lg:max-w-7xl lg:px-8">
                    {Object.entries(categorizedData).map(([category, products]) => (
                        products.length > 0 && (
                            <div key={category} className="mb-12">
                                <div className="md:flex md:items-center md:justify-between">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                        {category}
                                    </h2>
                                    <a
                                        href={`#/ProductList?recommended=${encodeURIComponent(category)}`}
                                        className={`hidden text-sm font-medium ${category === 'New Arrival' || category === 'Discount' ? 'text-blue-600 hover:text-indigo-500' : 'text-gray-600 hover:text-gray-800'
                                            } md:block`}
                                    >
                                        {category === 'New Arrival' || category === 'Discount' ? 'See All' : 'Explore'}
                                        <span aria-hidden="true"> &rarr;</span>
                                    </a>
                                </div>
                                {renderProductList(products)}
                            </div>
                        )
                    ))}
                    <div className="mt-8 text-sm md:hidden">
                        <a href="#/ProductList" className="font-medium text-blue-600 hover:text-indigo-500">
                            See All Products
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
