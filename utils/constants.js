// Error codes

const BAD_REQUEST_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const CONFLICT_ERROR_CODE = 409;

// Error messages//

const errorMessages = {
  // Message for UNAUTHORIZED_CODE (401) //
  UNAUTHORIZED:
    "Incorrect email or password.",
  // Message for NOT_FOUND_ERROR_CODE (404)//
  NOT_FOUND:
    "There is no user or clothing item with the requested id of the request was sent to a non-existent address.",

  // Message for BAD_REQUEST_ERROR_CODE (400)//
  BAD_REQUEST:
    "Invalid data passed to the methods for creating and item/user or updating an item.",

  // Message for INTERNAL_SERVER_ERROR_CODE (500)//
  INTERNAL_SERVER_ERROR: "An error has occurred on the server.",

  // Message for FORBIDDEN_ERROR_CODE (403)//
  FORBIDDEN: "Forbidden. You do not have permission to perform this action.",

  // Message for CONFLICT_ERROR_CODE (409)//
  CONFLICT: "A user with this email address already exists.",
};

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  errorMessages,
};
