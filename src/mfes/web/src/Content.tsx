import { useEffect, useState } from 'react';
import { HelloDocument } from './graphql/generated';
import { useApolloClient } from '@apollo/client/react';

export function Content() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const client = useApolloClient();

  useEffect(() => {
    client.query({
      query: HelloDocument,
    }).then((result: any) => {
      setData(result.data);
      setLoading(false);
    });
  }, [client]);

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}