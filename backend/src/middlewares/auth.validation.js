import joi from "joi";

// validate from entering wrong data into the database
const Signupvalidation = (req, res, next) => {
  const Schema = joi.object({
    farmersName: joi.string().min(3).max(100).required(),
    farmersEmail: joi.string().email().required(),
    farmersPhone: joi.string().min(10).max(10).required(),
    password: joi.string().min(6).max(30).required()
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const Schema = joi.object({
    farmersEmail: joi.string().email(),
    farmersPhone: joi.string().min(10).max(10),
    password: joi.string().min(6).max(30).required()
  }).or('farmersEmail', 'farmersPhone');

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export { Signupvalidation, loginValidation };