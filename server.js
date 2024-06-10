const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const { connection } = require('./database/util');
const { graphqlUploadExpress } = require('graphql-upload');
const path = require('path');

// Load environment variables from .env file
dotEnv.config();

// Database connectivity
connection();

// Construct a schema, using GraphQL schema language
const typeDefs = require('./typeDefs');

// Provide resolver functions for your schema fields
const resolvers = require('./resolver');

const app = express();

// Enable CORS
app.use(cors());

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

// Serve static files from the uploads directory
app.use('/data', express.static(path.join(__dirname, '/data')));

// Body parser middleware
app.use(express.json());

async function startServer() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
    });

    // Ensure the server is started before applying middleware
    await apolloServer.start();

    // Apply Apollo GraphQL middleware to the Express app
    apolloServer.applyMiddleware({ app, path: '/graphql' });

    const PORT = process.env.PORT || 3000;

    // Default route
    app.use('/', (req, res) => {
        res.send({ message: 'Hello' });
    });

    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Server listening on PORT: ${PORT}`);
        console.log(`GraphQL Endpoint: ${apolloServer.graphqlPath}`);
    });
}

// Start the server and handle any errors
startServer().catch(error => {
    console.error('Error starting the server:', error);
});
