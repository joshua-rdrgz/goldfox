import mongoose from "mongoose";

export const validateUniqueProperty = async <Interface, Methods>(
  property: string,
  model: mongoose.Model<Interface, {}, Methods>
): Promise<boolean> => {
  const modelInstance = await model.findOne({ property });
  return !modelInstance; // returns false if modelInstance is truthy (which indicates duplicate field), false throws the error
};