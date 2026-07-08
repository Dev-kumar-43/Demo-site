import { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLList, 
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

// Mock data
const mockUser = { id: 1, name: 'Admin User', email: 'admin@sparky.monster' };
const mockCustomer = { id: 101, name: 'Alice Customer', balance: 500.00 };
const mockTransaction = { id: 5001, amount: 150.00, status: 'Completed' };
const mockPayment = { id: 9001, method: 'Credit Card', last4: '4242' };
const mockAdmin = { id: 1, role: 'SuperAdmin', permissions: 'ALL' };

// Define Types lazily to support circular references
const PaymentType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Payment',
  fields: () => ({
    id: { type: GraphQLInt },
    method: { type: GraphQLString },
    last4: { type: GraphQLString },
    transaction: { type: TransactionType, resolve: () => mockTransaction }
  })
});

const TransactionType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLInt },
    amount: { type: GraphQLFloat },
    status: { type: GraphQLString },
    customer: { type: CustomerType, resolve: () => mockCustomer },
    payment: { type: PaymentType, resolve: () => mockPayment }
  })
});

const CustomerType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    transactions: { type: new GraphQLList(TransactionType), resolve: () => [mockTransaction, mockTransaction] }
  })
});

const AdminType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Admin',
  fields: () => ({
    id: { type: GraphQLInt },
    role: { type: GraphQLString },
    permissions: { type: GraphQLString },
    manages: { type: new GraphQLList(UserType), resolve: () => [mockUser, mockUser] }
  })
});

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
      resolve: (_: any, args: any) => [mockUser, mockUser]
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve: () => [mockCustomer]
    }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (_: any, args: any) => mockUser
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLInt } },
      resolve: () => mockCustomer
    },
    admin: {
      type: AdminType,
      args: { id: { type: GraphQLInt } },
      resolve: () => mockAdmin
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
});
