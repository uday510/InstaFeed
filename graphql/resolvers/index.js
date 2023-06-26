const authResolver = require("./auth");
const postController = require("./post");

const rootResolver = {
  ...authResolver,
  ...postController,
};

module.exports = rootResolver;
