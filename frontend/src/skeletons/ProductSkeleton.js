import SkeletonEffect from './SkeletonEffect';
import SkeletonElement from './SkeletonElement';
import './Skeletons.scss';

const ProductSkeleton = () => {
    return (
        <div className="w-full md:w-3/6 lg:w-2/6 mb-8 px-4">
            <div className="skeleton-wrapper">
                <div className="skeleton-product">
                    <SkeletonElement element="image" />
                    <SkeletonElement element="title" />
                    <SkeletonElement element="rating" />
                    <SkeletonElement element="price" />
                </div>
                <SkeletonEffect />
            </div>
        </div>
    )
}

export default ProductSkeleton;
