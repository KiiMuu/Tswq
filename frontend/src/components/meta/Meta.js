import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to TSWQ',
	description: 'we make best offers',
	keywords: 'cheapest, offers, trends',
};

export default Meta;
