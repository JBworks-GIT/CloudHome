import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useUploadFile from "../hooks/useUploadFile";

const HomePage = () => {
  const [newFolder, setNewFolder] = useState("");
  const inputRef = useRef(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const { createFolder } = useCreateFolder();
  const [folderStructure, setFolderStructure] = useState([
    { _id: null, name: "Cloud Home" },
  ]);
  const { getFileFolders, fileFolders } = useGetFileFolders();
  const parentFolder = folderStructure[folderStructure.length - 1];

  const handleDoubleClick = (elem) => {
    if (elem.type === "folder") {
      setFolderStructure([...folderStructure, elem]);
    } else {
      window.open(elem.link);
    }
  };

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

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.filter(
      (elem, idx) => idx <= clickIdx
    );
    setFolderStructure(newFolderStructure);
  };

  //-----------------------------------------------------------------------
  const { isUploadAllowed, uploadFile } = useUploadFile();
  const handleFileUpload = async (e) => {
    if (isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({
        file: file[0],
        parentId: parentFolder._id,
      });
      getFileFolders(parentFolder._id);
    } else {
      alert("Uploading is already in progress. Please wait...");
    }
  };
  //-----------------------------------------------------------------------

  return (
    <div>
      <Navbar />
      <div style={{
        padding: "20px",
        backgroundColor: "#f7f7f7",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}>
        <h3 style={{ textAlign: "center", color: "#333" }}>Welcome to Cloud Home</h3>
        <button style={{
          padding: "10px 20px",
          margin: "10px 0",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }} onClick={handleAllowCreateFolder}>
          Create Folder
        </button>
        <input
          className="file-upload-input"
          ref={inputRef}
          type="file"
          onChange={handleFileUpload}
          style={{
            display: "block",
            margin: "20px auto",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <ul style={{
          display: "flex",
          justifyContent: "center",
          padding: "24px",
          gap: "24px",
          listStyle: "none",
        }}>
          {folderStructure.map((elem, idx) => (
            <li key={idx} onClick={() => handleBackClick(idx)} style={{
              cursor: "pointer",
              padding: "10px 20px",
              border: "1px solid #007bff",
              borderRadius: "5px",
              backgroundColor: "#e7f1ff",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}>
              {elem.name}
            </li>
          ))}
        </ul>
        <div>
          {showCreateFolder && (
            <div style={{
              margin: "24px",
              padding: "24px",
              backgroundColor: "#ffeb3b",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
              <input
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              />
              <div style={{
                display: "flex",
                gap: "10px",
              }}>
                <button onClick={handleCreateFolder} style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}>
                  Create
                </button>
                <button onClick={() => setShowCreateFolder(false)} style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          {fileFolders.map((elem, idx) => (
            <div
              key={idx}
              onDoubleClick={() => handleDoubleClick(elem)}
              style={{
                cursor: "pointer",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                margin: "5px 0",
                backgroundColor: elem.type === "folder" ? "#cfe2ff" : "#f8d7da",
                transition: "background-color 0.3s ease",
              }}
            >
              {elem.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
