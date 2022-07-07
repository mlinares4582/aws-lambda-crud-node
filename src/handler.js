"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "HELLO WORLD",
        input: event,
      },
      null,
      2
    ),
  };
};
