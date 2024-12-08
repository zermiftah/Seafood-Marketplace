import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, StarIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';
import { useLocation } from 'react-router-dom';
import SplashPhoto from "../../Assets/img/SplashPhoto.png"

const reviews = { average: 4, totalCount: 1624 };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DetailProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("usernameFishMarketplace");
    if (!username) {
      navigate("/");
    }
  }, [navigate]);

  const [product, setProduct] = useState(null);
  const [updating, setUpdating] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productNameFromQuery = queryParams.get('product_name');
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUpdating(true);
        const response = await axios.get("https://seafood-marketplace-backend.glitch.me/data");
        const filteredProduct = response.data.find((prod) => prod.Product_Name === productNameFromQuery);
        if (filteredProduct) {
          setProduct(filteredProduct);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setUpdating(false);
      }
    };
    fetchData();
  }, [productNameFromQuery]);

  const discountedPrice = product?.Categories === "Discount"
    ? product?.Product_Price - (product?.Product_Price * product?.Discount) / 100
    : product?.Product_Price;


  const username = localStorage.getItem('usernameFishMarketplace');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    if (!username) {
      alert('Username is not set. Please log in first.');
      return;
    }

    try {
      const newProduct = {
        Username: username,
        Product_Name: product?.Product_Name,
        Product_Category: product?.Product_Category,
        Product_Image: product?.Product_Image.replace('http://seafood-marketplace-backend.glitch.me/img/', ''),
        Product_Price: product?.Product_Price,
        Count: quantity,
        Discount: product?.Discount || 0,
      };

      const response = await axios.post('https://seafood-marketplace-backend.glitch.me/add-to-freezer', newProduct);

      if (response.status === 200) {
        alert('Product added to freezer successfully!');
      }
    } catch (error) {
      console.error('Error adding product to freezer:', error);
      alert('Failed to add product to freezer. Please try again later.');
    }
  };


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
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-12">
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product?.Product_Name}</h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">
                  {product?.Categories === "Discount" ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">${product?.Product_Price.toFixed(2)}</span>
                      <span className="text-green-500 font-semibold">${discountedPrice.toFixed(2)}</span>
                      <span className="ml-2 text-xs font-medium text-red-500">-{product?.Discount}% Off</span>
                    </>
                  ) : (
                    `$${product?.Product_Price.toFixed(2)}`
                  )}
                </p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{reviews.average} out of 5 stars</p>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{product?.Description}</p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img src={product?.Product_Image} alt={product?.Product_Name} className="h-full w-full object-cover object-center" />
            </div>
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <form>
                <div className="mt-4 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-12 rounded-md border border-gray-300 px-2 py-1 text-sm text-center text-gray-700 appearance-none focus:outline-none"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex w-full items-center justify-center rounded-md inline-block border border-transparent bg-sky-100 px-8 py-3 text-center font-medium text-sky-700 hover:bg-sky-300 hover:text-white"
                  >
                    Add to freezer
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <a href="#" className="group inline-flex text-base font-medium">
                    <ShieldCheckIcon
                      className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="text-gray-500 hover:text-gray-700">One Week Guarantee</span>
                  </a>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
