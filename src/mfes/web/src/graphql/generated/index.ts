import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Decimal: { input: any; output: any; }
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  inStock: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  productById?: Maybe<Product>;
  products: Array<Product>;
  searchProducts: Array<Product>;
  stats: Stats;
  user: User;
  userById?: Maybe<User>;
  users: Array<User>;
};


export type QueryProductByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySearchProductsArgs = {
  searchTerm: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type Stats = {
  __typename?: 'Stats';
  activeUsers: Scalars['Int']['output'];
  productsInStock: Scalars['Int']['output'];
  totalProducts: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, name: string, email: string, age: number, isActive: boolean } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, name: string, email: string, age: number, isActive: boolean }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', userById?: { __typename?: 'User', id: number, name: string, email: string, age: number, isActive: boolean } | null };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, price: any, inStock: boolean, category: string }> };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', productById?: { __typename?: 'Product', id: number, name: string, price: any, inStock: boolean, category: string } | null };

export type SearchProductsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type SearchProductsQuery = { __typename?: 'Query', searchProducts: Array<{ __typename?: 'Product', id: number, name: string, price: any, inStock: boolean, category: string }> };

export type GetStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatsQuery = { __typename?: 'Query', stats: { __typename?: 'Stats', totalUsers: number, activeUsers: number, totalProducts: number, productsInStock: number } };


export const HelloDocument = gql`
    query Hello {
  hello
}
    `;
export const GetUserDocument = gql`
    query GetUser {
  user {
    id
    name
    email
    age
    isActive
  }
}
    `;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    name
    email
    age
    isActive
  }
}
    `;
export const GetUserByIdDocument = gql`
    query GetUserById($id: Int!) {
  userById(id: $id) {
    id
    name
    email
    age
    isActive
  }
}
    `;
export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    name
    price
    inStock
    category
  }
}
    `;
export const GetProductByIdDocument = gql`
    query GetProductById($id: Int!) {
  productById(id: $id) {
    id
    name
    price
    inStock
    category
  }
}
    `;
export const SearchProductsDocument = gql`
    query SearchProducts($searchTerm: String!) {
  searchProducts(searchTerm: $searchTerm) {
    id
    name
    price
    inStock
    category
  }
}
    `;
export const GetStatsDocument = gql`
    query GetStats {
  stats {
    totalUsers
    activeUsers
    totalProducts
    productsInStock
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Hello(variables?: HelloQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<HelloQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HelloQuery>({ document: HelloDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Hello', 'query', variables);
    },
    GetUser(variables?: GetUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>({ document: GetUserDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetUser', 'query', variables);
    },
    GetUsers(variables?: GetUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>({ document: GetUsersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetUsers', 'query', variables);
    },
    GetUserById(variables: GetUserByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetUserByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByIdQuery>({ document: GetUserByIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetUserById', 'query', variables);
    },
    GetProducts(variables?: GetProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsQuery>({ document: GetProductsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetProducts', 'query', variables);
    },
    GetProductById(variables: GetProductByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetProductByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductByIdQuery>({ document: GetProductByIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetProductById', 'query', variables);
    },
    SearchProducts(variables: SearchProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SearchProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchProductsQuery>({ document: SearchProductsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SearchProducts', 'query', variables);
    },
    GetStats(variables?: GetStatsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetStatsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStatsQuery>({ document: GetStatsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetStats', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;