const multer = require("multer");
const FileFolderModel = require("../model/fileSchema");

const createFile = async (req, res) => {
  try {
    const { parentId } = req.body;
    const data = req.file;
    const { _id } = req.user;
    console.log(data);
    const file = await FileFolderModel.create({
      name: data.originalname,
      userId: _id,
      type: "file",
      parentId: parentId === "null" ? undefined : parentId,
      metaData: { multer: data },
    });

    res.status(201);
    res.json({
      status: "in-Progress",
      data: {
        file: file,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

module.exports = { createFile };
