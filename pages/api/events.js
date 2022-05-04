import {
	ApolloClient,
	gql,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const query = gql`
	query {
		news_And_Events {
			eventTitle
			eventSlug
			eventTags
			eventContent {
				markdown
			}
			eventAuthors {
				name
			}
			id
		}
	}
`;

const httpLink = createHttpLink({
	uri: process.env.GraphCMS_ContentAPI,
});

const authLink = setContext((_, { headers }) => {
	const token = process.env.GraphCMS_EventsToken;
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

export const getEvent = async (e) => {
	const { data } = await _ApolloClient.query({
		query,
	});

	if (data) {
		return data;
	}
	return {};
};

const fetchData = async (req, res) => {
	const data = await getEvent();
	res.status(200).json(data);
};

export default fetchData;
