import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: 'https://api-ap-northeast-1.graphcms.com/v2/ckzy79yaa5k1q01z87f3u11r2/master/',
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: process.env.GraphCMS_MutationToken
				? `Bearer ${process.env.GraphCMS_MutationToken}`
				: '',
		},
	};
});

const _ApolloClient = new ApolloClient({
	uri: process.env.GraphCMS_ContentAPI,
	cache: new InMemoryCache(),
});

export default _ApolloClient;
