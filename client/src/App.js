import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const getsBooksQuery = gql`
  {
    books {
      name,
      genre,
      id
    }
  }
`;

export const App = () => {
  const { loading, error, data } = useQuery(getsBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Books graphql</h1>

        {data.books.map(item => <div key={item.id}>
          <div>Book name is : {item.name}</div>
          <div>Book genre is : {item.genre}</div>
        </div>)}
      </header>
    </div>
  );
};

export const Wrapper = () => {
  return <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
};
