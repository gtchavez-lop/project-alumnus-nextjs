import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const query = gql`
	{
		alumniLists {
			id
			surname
			givenName
			alumniDisplayPhoto {
				url
			}
			birthDate
			createdAt
			slug
			currentEmail
			currentLocation
			programCompleted
			graduationDate
			isCurrentlyWorking
			company
			workPosition
		}
	}
`;

const _ApolloClient = new ApolloClient({
	uri: process.env.GraphCMS_ContentAPI,
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

export const getAlumniList = async (e) => {
	const { data } = await _ApolloClient.query({
		query,
	});
	return data;
};

const fetchData = async (req, res) => {
	const { data } = await _ApolloClient.query({
		query,
	});
	res.status(200).json(data);
};

export default fetchData;
