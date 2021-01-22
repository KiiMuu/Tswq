import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, searchTerm = '' }) => {
	return (
		pages > 1 && (
			<div className="text-defaultSize">
				<nav
					className="relative z-0 inline-flex shadow-sm -space-x-px"
					aria-label="Pagination"
				>
					{[...Array(pages).keys()].map((x) => (
						<Link
							key={x + 1}
							to={
								!isAdmin
									? searchTerm
										? `/search/${searchTerm}/page/${x + 1}`
										: `/page/${x + 1}`
									: `/admin/products/${x + 1}`
							}
						>
							<span
								className={`relative inline-flex items-center px-6 py-1 border border-gray-300 bg-white hover:bg-gray-50 ${
									x + 1 === page
										? 'bg-primary text-white hover:text-white hover:bg-primary'
										: ''
								}`}
							>
								{x + 1}
							</span>
						</Link>
					))}
				</nav>
			</div>
		)
	);
};

export default Paginate;
