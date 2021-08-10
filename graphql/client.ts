import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const PURPLSHIP_API_URL = process.env.PURPLSHIP_API_URL || 'https://api.purplship.com';
const httpLink = createHttpLink({ uri: `${PURPLSHIP_API_URL}/graphql` });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false })
});

export default graphqlClient;
