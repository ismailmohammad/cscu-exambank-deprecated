module.exports = `
type Mutation {
    createExam(exam: CreateExamInput!): Exam
    updateExam(id: String!, exam: UpdateExamInput!): Exam
    deleteExam(id: String!): String
}
`;