import {
	ApolloClient,
	InMemoryCache,
	gql,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../firebaseConfig';

const { currentUser } = getAuth(firebaseApp);

const query = gql`
	query {
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

const httpLink = createHttpLink({
	uri: process.env.GraphCMS_ContentAPI,
});

const authLink = setContext((_, { headers }) => {
	const token = process.env.GraphCMS_MutationToken;
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const _ApolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

export const getAlumniList = async (e) => {
	const { data } = await _ApolloClient.query({
		query,
	});
	if (data) {
		return data;
	} else {
		return {};
	}
};

const fetchData = async (req, res) => {
	const data = await getAlumniList();
	res.status(200).json(data);
};

export default fetchData;
