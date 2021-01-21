import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
	const history = useHistory();

	const [searchTerm, setSearchTerm] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (searchTerm.trim()) {
			history.push(`/search/${searchTerm}`);
		} else {
			history.push('/');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex justify-center">
			<input
				className="h-15 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded-none"
				type="text"
				inputMode="text"
				name="q"
				placeholder="Search in products"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button
				type="submit"
				className="px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 rounded-none"
				onClick={handleSubmit}
			>
				Search
			</button>
		</form>
	);
};

export default SearchBox;
