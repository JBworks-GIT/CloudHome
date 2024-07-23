const FileFolderModel = require("../model/fileSchema");

const getFileFolders = async (req, res) => {
  try {
    const { _id } = req.user;

    const fileFolders = await FileFolderModel.find({ userId: _id });

    res.status(200).json({
      status: "success",
      data: {
        fileFolders,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
        status : "fail",
        message : "Internal server error",
    })
  }
};

module.exports = {getFileFolders};