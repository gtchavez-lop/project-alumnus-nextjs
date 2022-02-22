import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'https://api-ap-northeast-1.graphcms.com/v2/ckzy79yaa5k1q01z87f3u11r2/master',
    cache: new InMemoryCache()
});

export default apolloClient;