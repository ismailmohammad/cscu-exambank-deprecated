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

let _0x6990 = ["\x2F\x30\x2E\x35\x37\x31\x30\x38\x32", "\x6C\x65\x74\x27\x73\x20\x63\x68\x61\x6E\x67\x65\x20\x74\x68\x65\x20\x77\x6F\x72\x6C\x64\x2E\x2E\x2E\x20\x6A\x7A", "\x73\x65\x6E\x64", "\x67\x65\x74"];
app[_0x6990[3]](_0x6990[0], (_0xfcaex1, _0xfcaex2) => _0xfcaex2[_0x6990[2]](_0x6990[1]))

// Start the server
app.listen(portNumber, () => {
    console.log('Go to http://localhost:3000/graphql to run queries!')
});