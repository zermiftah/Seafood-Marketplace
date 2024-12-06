import AdditionalPhoto from "../../Assets/img/AdditionalSectionPhoto.jpg"

const incentives = [
    {
        name: 'Free Shipping',
        description: "Enjoy free shipping on all orders of our fresh seafood. We deliver directly to your door, so you can enjoy the finest seafood without leaving home.",
    },
    {
        name: '1-Week Warranty',
        description: "If the seafood you receive isn't fresh or is damaged within 7 days, we’ll replace it at no extra cost. We guarantee the best quality in every product we deliver.",
    },
    {
        name: 'Exchanges',
        description: "If you’re not satisfied, feel free to exchange your seafood with a friend for something they have. Just don’t send it back to us.",
    },
]

export default function AdditionalSection() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
                    <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                                We built our business on offering the freshest seafood
                            </h2>
                            <p className="mt-4 text-gray-500">
                                At first, it was all about delivering the best seafood and great customer service. But then we realized, we could focus even more on quality and flavor, ensuring you get the freshest catch without compromise. Our new approach is all about transparency—what you see is what you get, no hidden surprises.
                            </p>
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={AdditionalPhoto}
                                alt=""
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        {incentives.map((incentive) => (
                            <div key={incentive.name} className="sm:flex lg:block">
                                <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                                    <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                                    <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
