import { StarIcon } from '@heroicons/react/20/solid'

const reviews = {
    average: 4,
    totalCount: 1624,
    counts: [
        { rating: 5, count: 1019 },
        { rating: 4, count: 162 },
        { rating: 3, count: 97 },
        { rating: 2, count: 199 },
        { rating: 1, count: 147 },
    ],
    featured: [
        {
            id: 1,
            rating: 5,
            content: `
               <p>This is the seafood platter of my dreams. I enjoyed it on my last beach vacation and was amazed at how fresh and flavorful the shrimp, lobster, and scallops were. It was the perfect feast for the many relaxing days by the ocean.</p>
            `,
            author: 'Emily Selman',
            avatarSrc: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
        },
        {
            id: 2,
            rating: 4,
            content: `
                <p>The shrimp tacos I had at this place were absolutely delicious! The shrimp was perfectly grilled and seasoned, and the flavors came together beautifully. It's definitely a must-try for seafood lovers.</p>
            `,
            author: 'Jason Miles',
            avatarSrc: 'https://images.unsplash.com/photo-1648183185045-7a5592e66e9c?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 3,
            rating: 5,
            content: `
                <p>If you're a fan of seafood, you need to try their lobster roll. It's packed with sweet, tender lobster meat, and the bread is perfectly toasted. It’s the best I’ve had in a long time!</p>
            `,
            author: 'Samantha Brooks',
            avatarSrc: 'https://images.unsplash.com/photo-1508034567015-5fa801984b94?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 4,
            rating: 4,
            content: `
                <p>The clam chowder here is unbeatable. Creamy, rich, and filled with fresh clams, it’s the perfect comfort food. I always come back for this dish.</p>
            `,
            author: 'Nathan Scott',
            avatarSrc: 'https://images.unsplash.com/photo-1506464253090-7af30fe60a71?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 5,
            rating: 5,
            content: `
                <p>The grilled salmon at this restaurant is a game changer. The fish is perfectly cooked, flaky on the inside with a slight crisp on the outside. The seasoning is just right, not overpowering, letting the natural flavors shine through.</p>
            `,
            author: 'Olivia King',
            avatarSrc: 'https://images.unsplash.com/photo-1518825546183-853390a31be3?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 6,
            rating: 5,
            content: `
                <p>These scallops were the highlight of my meal. They were seared perfectly, and the delicate flavor of the scallops was enhanced by the subtle lemon and butter sauce. Highly recommend!</p>
            `,
            author: 'David Hayes',
            avatarSrc: 'https://plus.unsplash.com/premium_photo-1688497830987-e4f7ce4da50b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ],    
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ReviewsSection() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-1.5 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-1.5">
                <div className="lg:col-span-4">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>

                    <div className="mt-3 flex items-center">
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
                        <p className="ml-2 text-sm text-gray-900">Based on {reviews.totalCount} reviews</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Review data</h3>

                        <dl className="space-y-3">
                            {reviews.counts.map((count) => (
                                <div key={count.rating} className="flex items-center text-sm">
                                    <dt className="flex flex-1 items-center">
                                        <p className="w-3 font-medium text-gray-900">
                                            {count.rating}
                                            <span className="sr-only"> star reviews</span>
                                        </p>
                                        <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                                            <StarIcon
                                                className={classNames(
                                                    count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />

                                            <div className="relative ml-3 flex-1">
                                                <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                                {count.count > 0 ? (
                                                    <div
                                                        className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                                        style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </dt>
                                    <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                                        {Math.round((count.count / reviews.totalCount) * 100)}%
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="mt-10 mb-12">
                        <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            If you’ve used this product, share your thoughts with other customers
                        </p>

                        <a
                            href="#"
                            className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                        >
                            Write a review
                        </a>
                    </div>
                </div>

                <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0 "> 
                    <h3 className="sr-only">Recent reviews</h3>

                    <div className="flow-root mb-12">
                        <div className="-my-12 divide-y divide-gray-200">
                            {reviews.featured.map((review) => (
                                <div key={review.id} className="py-12">
                                    <div className="flex items-center">
                                        <img src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
                                        <div className="ml-4">
                                            <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                                            <div className="mt-1 flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                            'h-5 w-5 flex-shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <p className="sr-only">{review.rating} out of 5 stars</p>
                                        </div>
                                    </div>

                                    <div
                                        className="mt-4 space-y-6 text-base italic text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: review.content }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
