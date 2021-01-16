import { 
    FaGift,
    FaShoppingBag,
    FaFire
} from 'react-icons/fa'

const FormContainer = ({ children }) => {
    return (
        <div className="mt-16 text-defaultSize flex items-center justify-center">
            <div className="flex flex-wrap -mx-4 bg-white rounded-md shadow">
                <div className="w-full lg:w-3/6 md:mb-0 mb-5 p-8 lg:p-20">
                    <div className="flex flex-col">
                        {children}
                    </div>
                </div>
                <div className="w-full lg:w-3/6 mt-10 lg:mt-0 p-8 lg:p-20 bg-gray-700">
                    <div className="flex flex-col">
                        <div className="flex mb-10">
                            <FaGift className="w-10 h-10 text-primary" />
                            <div className="ml-4">
                                <h3 className="text-gray-100">New offers</h3>
                                <p className="leading-relaxed mt-2 text-gray-500">We usually annouce for new offers every month</p>
                            </div>
                        </div>
                        <div className="flex mb-10">
                            <FaFire className="w-10 h-10 text-primary" />
                            <div className="ml-3">
                                <h3 className=" text-gray-100">Trending products</h3>
                                <p className="leading-relaxed mt-2 text-gray-500">Find the products that suit for all</p>
                            </div>
                        </div>
                        <div className="flex">
                            <FaShoppingBag className="w-10 h-10 text-primary" />
                            <div className="ml-3">
                                <h3 className="text-gray-100">Updates</h3>
                                <p className="leading-relaxed mt-2 text-gray-500">You'll be updated with the new products and offers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormContainer;
