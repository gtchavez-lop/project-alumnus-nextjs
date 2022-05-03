import {
	ApolloClient,
	gql,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

const fetchData = async (req, res) => {
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

	const { data } = await _ApolloClient.query({
		query,
	});

	res.status(200).json({
		data,
	});
};

export default fetchData;
