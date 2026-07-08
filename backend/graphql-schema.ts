import { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLList, 
  GraphQLInt 
} from 'graphql';

// Mock data
const mockUser = {
  id: 1,
  name: 'Admin User',
  email: 'admin@sparky.monster',
};

// Recursive User Type to allow infinite depth testing
const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    // A nested list of users allowing infinitely deep nested queries
    friends: {
      type: new GraphQLList(UserType),
      resolve: () => [mockUser, mockUser]
    }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (_: any, args: any) => {
        return mockUser;
      }
    },
    // Introspection query is inherently allowed by default in graphql.js
  }
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
});
