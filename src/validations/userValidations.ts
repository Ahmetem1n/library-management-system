import { customStringSchema, customNumberSchema } from "./customValidations";

const getUserSchema = {
  params: {
    userId: customNumberSchema.integer(),
  },
};

const addUserSchema = {
  body: {
    name: customStringSchema,
  },
};

const borrowBookSchema = {
  params: {
    userId: customNumberSchema.integer(),
    bookId: customNumberSchema.integer(),
  },
};

const returnBookSchema = {
  params: {
    userId: customNumberSchema.integer(),
    bookId: customNumberSchema.integer(),
  },
  body: {
    score: customNumberSchema.integer().min(1).max(10),
  },
};

export { getUserSchema, addUserSchema, borrowBookSchema, returnBookSchema };
