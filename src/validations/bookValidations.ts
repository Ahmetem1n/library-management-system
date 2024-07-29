import { customNumberSchema, customStringSchema } from "./customValidations";

const getBookSchema = {
  params: {
    bookId: customNumberSchema.integer(),
  },
};

const addBookSchema = {
  body: {
    name: customStringSchema,
  },
};

export { getBookSchema, addBookSchema };
