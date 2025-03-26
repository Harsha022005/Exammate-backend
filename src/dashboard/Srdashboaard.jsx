import { useState } from "react";
import AuthNavbar from "../components/Authnavbar";
import { IoAddCircle, IoDocumentAttach, IoTrashBin } from "react-icons/io5";
import axios from "axios";

function Srdashboard() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [links, setLinks] = useState("");
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedLinks, setUploadedLinks] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password || !subject || files.length === 0) {
      setError("Please fill all fields and upload at least one file");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("subject", subject);
    formData.append("links", links);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("http://localhost:3000/SrDashboard", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Success:", response.data);
      setError("");

     
      const newFiles = response.data.files || [];
      const newLinks = response.data.links || "";

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      if (newLinks) {
        setUploadedLinks((prevLinks) => (prevLinks ? `${prevLinks}, ${newLinks}` : newLinks));
      }
      setFiles([]);
      setLinks("");
      setSubject("");
      setPassword("");
      setUsername("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError("File upload failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">
      <AuthNavbar />
      <div className="container mx-auto px-6 py-16 flex-1">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Senior Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
            Securely manage and upload your subject files with ease
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8 transform transition-all hover:shadow-2xl"
        >
          {error && (
            <p className="text-red-500 bg-red-50 p-3 rounded-md mb-6 text-center font-medium">
              {error}
            </p>
          )}

          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150"
              placeholder="Enter the subject"
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Add Files</p>
            <label
              htmlFor="fileinput"
              className="flex items-center justify-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md cursor-pointer transition duration-200 ease-in-out"
            >
              <IoAddCircle className="w-5 h-5 mr-2" />
              Upload Files
              <input
                type="file"
                id="fileinput"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
            <div className="mt-4 space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition duration-150"
                >
                  <div className="flex items-center">
                    <IoDocumentAttach className="text-indigo-500 mr-2 w-5 h-5" />
                    <span className="text-gray-800 text-sm truncate max-w-xs">{file.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700 transition duration-150"
                  >
                    <IoTrashBin className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="block text-sm font-semibold text-gray-700 mb-2">Add Reference Links</p>
            <input
              type="url"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              placeholder="Enter reference link"
              className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-lg font-medium transition duration-200 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>

        {/* Display Uploaded Files and Links */}
        {(uploadedFiles.length > 0 || uploadedLinks) && (
          <div className="mt-12 max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Uploaded Content</h2>

            {uploadedFiles.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Files</h3>
                <ul className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition duration-150"
                    >
                      <IoDocumentAttach className="text-indigo-500 mr-3 w-5 h-5" />
                      <a
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 text-sm truncate"
                      >
                        {file}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {uploadedLinks && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Links</h3>
                <div className="space-y-2">
                  {uploadedLinks.split(", ").map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 text-sm block break-all"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Srdashboard;