import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";

const HomePage = () => {
  const [newFolder, setNewFolder] = useState("");
<<<<<<< HEAD
  const inputRef = useRef(null); //doesnt rerender component but remembers old value
=======
>>>>>>> parent of 147dfaf (uploading files)
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const { createFolder } = useCreateFolder();
  const [folderStructure, setFolderStructure] = useState([{ _id: null }]);
  const { getFileFolders, fileFolders } = useGetFileFolders();
  const parentFolder = folderStructure[folderStructure.length - 1];

  const handleDoubleClick = (elem) => {
    if (elem.type == "folder") {
        setFolderStructure([...folderStructure, elem]);
    } else {
        window.open(elem.link);
    }
};

  console.log(fileFolders);

  const handleAllowCreateFolder = () => {

      setShowCreateFolder(true);
  };

  const handleCreateFolder = async () => {
    if (newFolder.length > 0) {
      await createFolder({ name: newFolder, parentId: parentFolder._id });
      getFileFolders(parentFolder._id);
      setShowCreateFolder(false);
    }
  };

  useEffect(() => {
    getFileFolders(parentFolder._id);
  }, [folderStructure]);
<<<<<<< HEAD

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.filter(
      (elem, idx) => idx <= clickIdx
    );
    setFolderStructure(newFolderStructure);
  };

  const { uploadFile, isUploadAllowed } = useUploadFile();

  const handleFileUpload = async (e) => {
    if (isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({ file: file[0], parentId: parentFolder._id });
      getFileFolders(parentFolder._id);
    } else {
      alert("Uploading is already in progress. Please wait...");
    }
  };

=======
>>>>>>> parent of 147dfaf (uploading files)
  return (
    <div>
      <Navbar />
      <div className="homepage-main-container">
        <h3>Welcome to Cloud Home</h3>
        <button onClick={handleAllowCreateFolder}>Create Folder</button>
        <button>Upload File</button>
        <h4>Cloud Home</h4>
        <div>
          {showCreateFolder && (
            <div
              style={{
                margin: "24px",
                padding: "24px",
                backgroundColor: "yellow",
              }}
            >
              <input
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
              />
              <button onClick={handleCreateFolder}>Create</button>
              <button onClick={() => setShowCreateFolder(false)}>Cancel</button>
            </div>
          )}
        </div>
        <div>
          {fileFolders.map((elem) => {
            return <div onDoubleClick={()=>handleDoubleClick(elem)}>{elem.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
