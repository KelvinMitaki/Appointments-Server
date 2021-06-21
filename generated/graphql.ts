import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type AppointMent = {
  __typename?: 'AppointMent';
  _id: Scalars['ID'];
  patient: User;
  doctor: Scalars['String'];
  date: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  author: User;
  post: Scalars['String'];
  message: Scalars['String'];
  likes: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Education = {
  __typename?: 'Education';
  youtubeLink: Scalars['String'];
  message: Scalars['String'];
  doctor: Scalars['String'];
};

export type HealthMessage = {
  __typename?: 'HealthMessage';
  _id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  doctor: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  sender: Scalars['String'];
  receiver: Scalars['String'];
  message: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  read: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: Token;
  loginUser: Token;
  createPost: Post;
  createComment: Comment;
  likePost: Post;
  likeComment: Comment;
  addMessage: Message;
  readMessage: Message;
  addAppointMent: AppointMent;
  addHealthMessage: HealthMessage;
  deleteHealthMessage: HealthMessage;
  editEducation: Education;
  logoutUser?: Maybe<Token>;
};


export type MutationRegisterUserArgs = {
  values: RegisterUserInput;
};


export type MutationLoginUserArgs = {
  fullName: Scalars['String'];
  civilID: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  message: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
};


export type MutationCreateCommentArgs = {
  message: Scalars['String'];
  post: Scalars['String'];
};


export type MutationLikePostArgs = {
  postID: Scalars['ID'];
};


export type MutationLikeCommentArgs = {
  commentID: Scalars['ID'];
};


export type MutationAddMessageArgs = {
  receiver: Scalars['String'];
  message: Scalars['String'];
};


export type MutationReadMessageArgs = {
  reader: Scalars['String'];
  messageID: Scalars['ID'];
};


export type MutationAddAppointMentArgs = {
  patient: Scalars['String'];
  date: Scalars['String'];
};


export type MutationAddHealthMessageArgs = {
  title: Scalars['String'];
  body: Scalars['String'];
};


export type MutationDeleteHealthMessageArgs = {
  _id: Scalars['ID'];
};


export type MutationEditEducationArgs = {
  message: Scalars['String'];
  youtubeLink: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  author: User;
  message: Scalars['String'];
  likes: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  comments: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  fetchCurrentUser?: Maybe<User>;
  fetchPosts: Array<Post>;
  fetchComments: Array<Comment>;
  fetchUsers: Array<User>;
  fetchMessages: Array<Message>;
  fetchAppointMents: Array<AppointMent>;
  fetchHealthMessages: Array<HealthMessage>;
  getSignedUrl: SignedUrl;
  fetchEducation: Education;
};


export type QueryFetchCommentsArgs = {
  postID: Scalars['ID'];
};


export type QueryFetchMessagesArgs = {
  receiverID: Scalars['ID'];
};

export type RegisterUserInput = {
  fullName: Scalars['String'];
  civilID: Scalars['ID'];
  age: Scalars['Int'];
  isDoctor: Scalars['Boolean'];
};

export type SignedUrl = {
  __typename?: 'SignedUrl';
  key: Scalars['String'];
  url: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  addMessage: Message;
};


export type SubscriptionAddMessageArgs = {
  receiverID: Scalars['ID'];
  senderID: Scalars['ID'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  fullName: Scalars['String'];
  civilID: Scalars['ID'];
  age: Scalars['Int'];
  isDoctor: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AppointMent: ResolverTypeWrapper<AppointMent>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CacheControlScope: CacheControlScope;
  Comment: ResolverTypeWrapper<Comment>;
  Education: ResolverTypeWrapper<Education>;
  HealthMessage: ResolverTypeWrapper<HealthMessage>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  SignedUrl: ResolverTypeWrapper<SignedUrl>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<Token>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AppointMent: AppointMent;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Comment: Comment;
  Education: Education;
  HealthMessage: HealthMessage;
  Message: Message;
  Mutation: {};
  Post: Post;
  Int: Scalars['Int'];
  Query: {};
  RegisterUserInput: RegisterUserInput;
  Boolean: Scalars['Boolean'];
  SignedUrl: SignedUrl;
  Subscription: {};
  Token: Token;
  Upload: Scalars['Upload'];
  User: User;
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AppointMentResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppointMent'] = ResolversParentTypes['AppointMent']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  patient?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  doctor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EducationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Education'] = ResolversParentTypes['Education']> = {
  youtubeLink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  doctor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HealthMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['HealthMessage'] = ResolversParentTypes['HealthMessage']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  doctor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  receiver?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  registerUser?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'values'>>;
  loginUser?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'fullName' | 'civilID'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'message'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'message' | 'post'>>;
  likePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'postID'>>;
  likeComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationLikeCommentArgs, 'commentID'>>;
  addMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationAddMessageArgs, 'receiver' | 'message'>>;
  readMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationReadMessageArgs, 'reader' | 'messageID'>>;
  addAppointMent?: Resolver<ResolversTypes['AppointMent'], ParentType, ContextType, RequireFields<MutationAddAppointMentArgs, 'patient' | 'date'>>;
  addHealthMessage?: Resolver<ResolversTypes['HealthMessage'], ParentType, ContextType, RequireFields<MutationAddHealthMessageArgs, 'title' | 'body'>>;
  deleteHealthMessage?: Resolver<ResolversTypes['HealthMessage'], ParentType, ContextType, RequireFields<MutationDeleteHealthMessageArgs, '_id'>>;
  editEducation?: Resolver<ResolversTypes['Education'], ParentType, ContextType, RequireFields<MutationEditEducationArgs, 'message' | 'youtubeLink'>>;
  logoutUser?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fetchCurrentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  fetchPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  fetchComments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryFetchCommentsArgs, 'postID'>>;
  fetchUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  fetchMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryFetchMessagesArgs, 'receiverID'>>;
  fetchAppointMents?: Resolver<Array<ResolversTypes['AppointMent']>, ParentType, ContextType>;
  fetchHealthMessages?: Resolver<Array<ResolversTypes['HealthMessage']>, ParentType, ContextType>;
  getSignedUrl?: Resolver<ResolversTypes['SignedUrl'], ParentType, ContextType>;
  fetchEducation?: Resolver<ResolversTypes['Education'], ParentType, ContextType>;
};

export type SignedUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignedUrl'] = ResolversParentTypes['SignedUrl']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  addMessage?: SubscriptionResolver<ResolversTypes['Message'], "addMessage", ParentType, ContextType, RequireFields<SubscriptionAddMessageArgs, 'receiverID' | 'senderID'>>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  civilID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isDoctor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AppointMent?: AppointMentResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Education?: EducationResolvers<ContextType>;
  HealthMessage?: HealthMessageResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignedUrl?: SignedUrlResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;