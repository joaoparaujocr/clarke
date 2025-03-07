/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n      type\n    }\n  }\n": typeof types.MeDocument,
    "\n  query Suppliers($search: Float) {\n    suppliers(search: $search) {\n      costPerKwh\n      evaluationAverage\n      id\n      logoUrl\n      minimumKwhLimit\n      name\n      state\n    }\n  }\n": typeof types.SuppliersDocument,
    "\n  mutation AuthCustomer($authCustomerData: AuthCustomerInput!) {\n    authCustomer(data: $authCustomerData) {\n      token\n      customer {\n        email\n      }\n    }\n  }\n": typeof types.AuthCustomerDocument,
    "\n  mutation CreateCustomer($data: CreateCustomerInput!) {\n    createCustomer(data: $data) {\n      email\n      firstName\n      lastName\n    }\n  }\n": typeof types.CreateCustomerDocument,
    "\n  mutation CreateSupplier($data: CreateSupplierInput!) {\n    createSupplier(data: $data) {\n      id\n    }\n  }\n": typeof types.CreateSupplierDocument,
};
const documents: Documents = {
    "\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n      type\n    }\n  }\n": types.MeDocument,
    "\n  query Suppliers($search: Float) {\n    suppliers(search: $search) {\n      costPerKwh\n      evaluationAverage\n      id\n      logoUrl\n      minimumKwhLimit\n      name\n      state\n    }\n  }\n": types.SuppliersDocument,
    "\n  mutation AuthCustomer($authCustomerData: AuthCustomerInput!) {\n    authCustomer(data: $authCustomerData) {\n      token\n      customer {\n        email\n      }\n    }\n  }\n": types.AuthCustomerDocument,
    "\n  mutation CreateCustomer($data: CreateCustomerInput!) {\n    createCustomer(data: $data) {\n      email\n      firstName\n      lastName\n    }\n  }\n": types.CreateCustomerDocument,
    "\n  mutation CreateSupplier($data: CreateSupplierInput!) {\n    createSupplier(data: $data) {\n      id\n    }\n  }\n": types.CreateSupplierDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n      type\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Suppliers($search: Float) {\n    suppliers(search: $search) {\n      costPerKwh\n      evaluationAverage\n      id\n      logoUrl\n      minimumKwhLimit\n      name\n      state\n    }\n  }\n"): (typeof documents)["\n  query Suppliers($search: Float) {\n    suppliers(search: $search) {\n      costPerKwh\n      evaluationAverage\n      id\n      logoUrl\n      minimumKwhLimit\n      name\n      state\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthCustomer($authCustomerData: AuthCustomerInput!) {\n    authCustomer(data: $authCustomerData) {\n      token\n      customer {\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AuthCustomer($authCustomerData: AuthCustomerInput!) {\n    authCustomer(data: $authCustomerData) {\n      token\n      customer {\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCustomer($data: CreateCustomerInput!) {\n    createCustomer(data: $data) {\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCustomer($data: CreateCustomerInput!) {\n    createCustomer(data: $data) {\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSupplier($data: CreateSupplierInput!) {\n    createSupplier(data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSupplier($data: CreateSupplierInput!) {\n    createSupplier(data: $data) {\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;