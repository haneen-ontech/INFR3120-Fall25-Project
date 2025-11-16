//Accessing our mongodb database with URI, using a variable to keep password hidden, use .env to hide information and add it to .gitignore so that private info isn't pushed to git repo
module.exports = {
  mongoURI: process.env.URI
};