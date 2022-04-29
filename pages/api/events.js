import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const _ApolloClient = new ApolloClient({
	uri: process.env.GraphCMS_ContentAPI,
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
				publishedAt
				publishedBy {
					id
				}
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
