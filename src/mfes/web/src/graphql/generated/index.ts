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


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, name: string } };


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
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;