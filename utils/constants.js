// Error codes

const BAD_REQUEST_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;



// Error messages//

const errorMessages = {
   // Message for NOT_FOUND_ERROR_CODE (404)//
    NOT_FOUND: "There is no user or clothing item with the requested id of the request was sent to a non-existent address.",

    // Message for BAD_REQUEST_ERROR_CODE (400)//
    BAD_REQUEST: "Invalid data passed to the methods for creating and item/user or updating an item.",

    // Message for INTERNAL_SERVER_ERROR_CODE (500)//
    INTERNAL_SERVER_ERROR: "An error has occurred on the server.",
};

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  errorMessages
};
