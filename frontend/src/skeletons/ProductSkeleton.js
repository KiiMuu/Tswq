import SkeletonEffect from './SkeletonEffect';
import SkeletonElement from './SkeletonElement';
import './Skeletons.scss';

const ProductSkeleton = () => {
    return (
        <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-3/6 md:mb-0 mb-8 px-4">
                <div className="skeleton-wrapper">
                    <div className="skeleton-product">
                        <SkeletonElement element="product-image" />
                    </div>
                    <SkeletonEffect />
                </div>
            </div>
            <div className="w-full md:w-3/6 md:mb-0 mb-8 px-4">
                <div className="skeleton-wrapper">
                    <div className="skeleton-product">
                        <SkeletonElement element="product-info" />
                    </div>
                    <SkeletonEffect />
                </div>
            </div>
            <div className="w-full md:w-3/6 mt-5 px-4">
                <div className="skeleton-wrapper">
                    <div className="skeleton-product">
                        <SkeletonElement element="cart" />
                    </div>
                    <SkeletonEffect />
                </div>
            </div>
        </div>
    )
}

export default ProductSkeleton;
