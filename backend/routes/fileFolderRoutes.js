const express = require("express");
const { getFileFolders } = require("../controllers/fileFolderControllers");

const fileFolderRouter = express.Router();

fileFolderRouter.route("/").post(getFileFolders);

module.exports = fileFolderRouter;
