const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const urlValidator = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error("string.uri");
  }
  return value;
};

const validateUpdateProfile = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(urlValidator).messages({
        "string.empty": 'The "avatar" field must be filled in',
        "string.uri": 'the "avatar" field must be a valid url',
      }),
    })
    .min(1),
});

const validateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    weather: Joi.string().valid("hot", "cold", "warm").required(),
    imageUrl: Joi.string().required().custom(urlValidator).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(urlValidator).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateItem,
  validateItemId,
  validateSignup,
  validateSignin,
  validateUpdateProfile,
};
