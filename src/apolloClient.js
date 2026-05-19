import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://ap-south-1.cdn.hygraph.com/content/cmozhg1nt004h07upd7dyuqaa/master",
  }),
  cache: new InMemoryCache(),
});

export default client;