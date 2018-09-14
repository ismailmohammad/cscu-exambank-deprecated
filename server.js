const dotenv = require('dotenv');
dotenv.load();

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const models = require('./models/all');
const middlewares = require('./middlewares/all')(models);
const portNumber = process.env.port || process.env.PORT || 3000;
const depthLimit = require('graphql-depth-limit');


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB.");
    });

let controllers = require('./controllers/all')(models);
const typeDefs = require('./graphql/typeDefs');

const resolvers = {
    Query: {
        exam: controllers.ExamController.getExam
    },
    Mutation: {
        // Exam CRUD
        createExam: controllers.ExamController.create,
        updateExam: controllers.ExamController.update,
        deleteExam: controllers.ExamController.delete,
    }
    // Exams: {
    //     exams: controllers.ExamController.exams,
    //     created_at: controllers.DateController.createdAtToISOHelper,
    //     updated_at: controllers.DateController.updatedAtToISOHelper
    // },
};


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(middlewares.bearerAuthenticationMiddleware);
app.use(middlewares.gateInitializationMiddleware);
app.use(middlewares.masterAuthenticationMiddleware);
app.use(middlewares.requestIdentifierMiddleware);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        master: req.master,
        student: req.student,
        admin: req.admin,
        body: req.body,
        headers: req.headers,
        connection: req.connection,
        identifier: req.identifier
    }),
    validationRules: [depthLimit(10)]
});
server.applyMiddleware({ app });

app.use('/version', controllers.DateController.version);

// Start the server
app.listen(portNumber, () => {
    console.log('Go to http://localhost:3000/graphql to run queries!')
});