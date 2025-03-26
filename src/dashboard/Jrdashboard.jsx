import { useState } from "react";
import AuthNavbar from "../components/Authnavbar";
import { IoDocumentAttach } from "react-icons/io5";

function Jrdashboard() {
  const [seniorname, setSeniorname] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:3000/Jrdashboard?seniorname=${seniorname}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to fetch files. Please try again.");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!seniorname.trim()) {
      setError("Please enter the senior's name");
      return;
    }
    setError("");
    fetchFiles();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100">
      <AuthNavbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900">Junior Dashboard</h1>
          <p className="text-gray-700 mt-2">
            Securely manage and view files uploaded by seniors
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-300"
        >
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-800 mb-2"
            >
              Senior's Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full rounded-lg border-gray-300 focus:border-blue-600 focus:ring-blue-600 p-3"
              placeholder="Enter the senior's username"
              value={seniorname}
              onChange={(e) => setSeniorname(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
        <div className="mt-12 ml-[200px]  bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Uploaded Files
          </h1>
          {loading ? (
            <p className="text-gray-500">Loading files...</p>
          ) : files.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
                >
                  <h1 className="text-xl font-semibold text-gray-800 mb-2">
                    {file.subject}
                  </h1>
                  <p className="text-gray-500">Uploaded by: {file.username}</p>
                  <p className="text-gray-500">Files:</p>
                  <ul>
                    {file.file_paths.map((path, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <IoDocumentAttach className="text-3xl text-blue-500" />
                        <a
                          href={`http://localhost:3000/${path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {path.split("/").pop()}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {file.links && (
                    <div className="mt-4">
                      <p className="text-gray-500">Links:</p>
                      <a
                        href={file.links}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {file.links}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No files found for the specified senior.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jrdashboard;
