module.exports = `
type Exam {
    _id: String,
    name: String,
    exam_type: String,
    course: String,
    url: String,
    created_at: Date,
    updated_at: Date,
}

input CreateExamInput {
    name: String!,
    exam_type: String!,
    course: String!,
    url: String!
}

input UpdateExamInput {
    name: String,
    exam_type: String,
    course: String,
    url: String
}

type Mutation {
    createExam(exam: CreateExamInput!): Exam
    updateExam(id: String!, exam: UpdateExamInput!): Exam
    deleteExam(id: String!): String
}
`;