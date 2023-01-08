import { ObjectId } from "mongodb"

import type { IGraphQLContext } from "./graphql-context"
import type { core, connectionPluginCore } from "nexus"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import type { QueryComplexity } from "nexus/dist/plugins/queryComplexityPlugin"

declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateOneUserInput: { // input type
    createdAt?: NexusGenScalars['Date'] | null; // Date
    email?: string | null; // String
    firstName?: string | null; // String
    lastName?: string | null; // String
    password?: string | null; // String
    updatedAt?: NexusGenScalars['Date'] | null; // Date
  }
  FilterFindManyUserEmailOperatorsInput: { // input type
    exists?: boolean | null; // Boolean
    gt?: string | null; // String
    gte?: string | null; // String
    in?: Array<string | null> | null; // [String]
    lt?: string | null; // String
    lte?: string | null; // String
    ne?: string | null; // String
    nin?: Array<string | null> | null; // [String]
    regex?: NexusGenScalars['RegExpAsString'] | null; // RegExpAsString
  }
  FilterFindManyUserFirstNameOperatorsInput: { // input type
    exists?: boolean | null; // Boolean
    gt?: string | null; // String
    gte?: string | null; // String
    in?: Array<string | null> | null; // [String]
    lt?: string | null; // String
    lte?: string | null; // String
    ne?: string | null; // String
    nin?: Array<string | null> | null; // [String]
    regex?: NexusGenScalars['RegExpAsString'] | null; // RegExpAsString
  }
  FilterFindManyUserInput: { // input type
    AND?: NexusGenInputs['FilterFindManyUserInput'][] | null; // [FilterFindManyUserInput!]
    OR?: NexusGenInputs['FilterFindManyUserInput'][] | null; // [FilterFindManyUserInput!]
    _id?: NexusGenScalars['MongoID'] | null; // MongoID
    _operators?: NexusGenInputs['FilterFindManyUserOperatorsInput'] | null; // FilterFindManyUserOperatorsInput
    createdAt?: NexusGenScalars['Date'] | null; // Date
    email?: string | null; // String
    firstName?: string | null; // String
    lastName?: string | null; // String
    password?: string | null; // String
    updatedAt?: NexusGenScalars['Date'] | null; // Date
  }
  FilterFindManyUserLastNameOperatorsInput: { // input type
    exists?: boolean | null; // Boolean
    gt?: string | null; // String
    gte?: string | null; // String
    in?: Array<string | null> | null; // [String]
    lt?: string | null; // String
    lte?: string | null; // String
    ne?: string | null; // String
    nin?: Array<string | null> | null; // [String]
    regex?: NexusGenScalars['RegExpAsString'] | null; // RegExpAsString
  }
  FilterFindManyUserOperatorsInput: { // input type
    _id?: NexusGenInputs['FilterFindManyUser_idOperatorsInput'] | null; // FilterFindManyUser_idOperatorsInput
    email?: NexusGenInputs['FilterFindManyUserEmailOperatorsInput'] | null; // FilterFindManyUserEmailOperatorsInput
    firstName?: NexusGenInputs['FilterFindManyUserFirstNameOperatorsInput'] | null; // FilterFindManyUserFirstNameOperatorsInput
    lastName?: NexusGenInputs['FilterFindManyUserLastNameOperatorsInput'] | null; // FilterFindManyUserLastNameOperatorsInput
  }
  FilterFindManyUser_idOperatorsInput: { // input type
    exists?: boolean | null; // Boolean
    gt?: NexusGenScalars['MongoID'] | null; // MongoID
    gte?: NexusGenScalars['MongoID'] | null; // MongoID
    in?: Array<NexusGenScalars['MongoID'] | null> | null; // [MongoID]
    lt?: NexusGenScalars['MongoID'] | null; // MongoID
    lte?: NexusGenScalars['MongoID'] | null; // MongoID
    ne?: NexusGenScalars['MongoID'] | null; // MongoID
    nin?: Array<NexusGenScalars['MongoID'] | null> | null; // [MongoID]
  }
  UpdateByIdUserInput: { // input type
    createdAt?: NexusGenScalars['Date'] | null; // Date
    email?: string | null; // String
    firstName?: string | null; // String
    lastName?: string | null; // String
    password?: string | null; // String
    updatedAt?: NexusGenScalars['Date'] | null; // Date
  }
}

export interface NexusGenEnums {
  SortFindManyUserInput: {"email":1} | {"email":-1} | {"firstName":1} | {"firstName":-1} | {"lastName":1} | {"lastName":-1} | {"_id":1} | {"_id":-1}
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: Date | string
  JSON: any
  MongoID: ObjectId | string
  RegExpAsString: any
}

export interface NexusGenObjects {
  CreateOneUserPayload: { // root type
    error?: NexusGenRootTypes['ErrorInterface'] | null; // ErrorInterface
    record?: NexusGenRootTypes['User'] | null; // User
  }
  MongoError: { // root type
    code?: number | null; // Int
    message?: string | null; // String
  }
  Mutation: {};
  Query: {};
  RuntimeError: { // root type
    message?: string | null; // String
  }
  UpdateByIdUserPayload: { // root type
    error?: NexusGenRootTypes['ErrorInterface'] | null; // ErrorInterface
    record?: NexusGenRootTypes['User'] | null; // User
  }
  User: { // root type
    _id: NexusGenScalars['MongoID']; // MongoID!
    createdAt?: NexusGenScalars['Date'] | null; // Date
    email?: string | null; // String
    firstName?: string | null; // String
    lastName?: string | null; // String
    password?: string | null; // String
    updatedAt?: NexusGenScalars['Date'] | null; // Date
  }
  ValidationError: { // root type
    errors?: NexusGenRootTypes['ValidatorError'][] | null; // [ValidatorError!]
    message?: string | null; // String
  }
  ValidatorError: { // root type
    message?: string | null; // String
    path?: string | null; // String
    value?: NexusGenScalars['JSON'] | null; // JSON
  }
}

export interface NexusGenInterfaces {
  ErrorInterface: NexusGenRootTypes['MongoError'] | NexusGenRootTypes['RuntimeError'] | NexusGenRootTypes['ValidationError'];
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  CreateOneUserPayload: { // field return type
    error: NexusGenRootTypes['ErrorInterface'] | null; // ErrorInterface
    record: NexusGenRootTypes['User'] | null; // User
    recordId: NexusGenScalars['MongoID'] | null; // MongoID
  }
  MongoError: { // field return type
    code: number | null; // Int
    message: string | null; // String
  }
  Mutation: { // field return type
    createUser: NexusGenRootTypes['CreateOneUserPayload'] | null; // CreateOneUserPayload
    udpateUserById: NexusGenRootTypes['UpdateByIdUserPayload'] | null; // UpdateByIdUserPayload
  }
  Query: { // field return type
    userById: NexusGenRootTypes['User'] | null; // User
    userList: NexusGenRootTypes['User'][]; // [User!]!
  }
  RuntimeError: { // field return type
    message: string | null; // String
  }
  UpdateByIdUserPayload: { // field return type
    error: NexusGenRootTypes['ErrorInterface'] | null; // ErrorInterface
    record: NexusGenRootTypes['User'] | null; // User
    recordId: NexusGenScalars['MongoID'] | null; // MongoID
  }
  User: { // field return type
    _id: NexusGenScalars['MongoID']; // MongoID!
    createdAt: NexusGenScalars['Date'] | null; // Date
    email: string | null; // String
    firstName: string | null; // String
    lastName: string | null; // String
    password: string | null; // String
    updatedAt: NexusGenScalars['Date'] | null; // Date
  }
  ValidationError: { // field return type
    errors: NexusGenRootTypes['ValidatorError'][] | null; // [ValidatorError!]
    message: string | null; // String
  }
  ValidatorError: { // field return type
    idx: number; // Int!
    message: string | null; // String
    path: string | null; // String
    value: NexusGenScalars['JSON'] | null; // JSON
  }
  ErrorInterface: { // field return type
    message: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  CreateOneUserPayload: { // field return type name
    error: 'ErrorInterface'
    record: 'User'
    recordId: 'MongoID'
  }
  MongoError: { // field return type name
    code: 'Int'
    message: 'String'
  }
  Mutation: { // field return type name
    createUser: 'CreateOneUserPayload'
    udpateUserById: 'UpdateByIdUserPayload'
  }
  Query: { // field return type name
    userById: 'User'
    userList: 'User'
  }
  RuntimeError: { // field return type name
    message: 'String'
  }
  UpdateByIdUserPayload: { // field return type name
    error: 'ErrorInterface'
    record: 'User'
    recordId: 'MongoID'
  }
  User: { // field return type name
    _id: 'MongoID'
    createdAt: 'Date'
    email: 'String'
    firstName: 'String'
    lastName: 'String'
    password: 'String'
    updatedAt: 'Date'
  }
  ValidationError: { // field return type name
    errors: 'ValidatorError'
    message: 'String'
  }
  ValidatorError: { // field return type name
    idx: 'Int'
    message: 'String'
    path: 'String'
    value: 'JSON'
  }
  ErrorInterface: { // field return type name
    message: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      record: NexusGenInputs['CreateOneUserInput']; // CreateOneUserInput!
    }
    udpateUserById: { // args
      _id: NexusGenScalars['MongoID']; // MongoID!
      record: NexusGenInputs['UpdateByIdUserInput']; // UpdateByIdUserInput!
    }
  }
  Query: {
    userById: { // args
      _id: NexusGenScalars['MongoID']; // MongoID!
    }
    userList: { // args
      filter?: NexusGenInputs['FilterFindManyUserInput'] | null; // FilterFindManyUserInput
      limit: number | null; // Int
      skip?: number | null; // Int
      sort?: NexusGenEnums['SortFindManyUserInput'] | null; // SortFindManyUserInput
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  ErrorInterface: "MongoError" | "RuntimeError" | "ValidationError"
}

export interface NexusGenTypeInterfaces {
  MongoError: "ErrorInterface"
  RuntimeError: "ErrorInterface"
  ValidationError: "ErrorInterface"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "ErrorInterface";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: IGraphQLContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
    
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
    /**
     * The complexity for an individual field. Return a number
     * or a function that returns a number to specify the
     * complexity for this field.
     */
    complexity?: QueryComplexity<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}