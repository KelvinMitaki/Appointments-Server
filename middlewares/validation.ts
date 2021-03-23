import { UserInputError } from "apollo-server-errors";
import validator from "validator";
import { UserAttrs } from "../models/User";

export const registerValidation = (values: UserAttrs) => {
  const { age, civilID, fullName, isDoctor } = values;
  if (!fullName || fullName.trim().length == 0) {
    throw new UserInputError("Invalid full name");
  }
  if (!age || (age && !validator.isNumeric(age.toString())) || age < 0) {
    throw new UserInputError("Invalid age");
  }
  if (!civilID || (civilID && !validator.isNumeric(civilID))) {
    throw new UserInputError("Invalid Civil ID");
  }
  if (typeof isDoctor !== "boolean") {
    throw new UserInputError("Invalid Doctor choice");
  }
};
