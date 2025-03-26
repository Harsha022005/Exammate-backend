import { useEffect, useState } from "react";
import AuthNavbar from "../components/Authnavbar";
import { IoDocumentAttach } from "react-icons/io5";

function Explore() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all files on page load
  const fetchAllFiles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/explore");
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError(`Failed to fetch files: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
      {/* <AuthNavbar /> Uncommented to include the navbar */}
      <div className="container mx-auto px-6 py-16 flex-1">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Explore Files
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
            Discover uploaded files and insights shared by seniors
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-center">
            <p className="text-gray-500 text-lg animate-pulse">Loading files...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 bg-red-50 p-4 rounded-md inline-block">{error}</p>
          </div>
        ) : files.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-200"
              >
                <h1 className="text-xl font-semibold text-gray-800 mb-3 truncate">
                  {file.subject}
                </h1>
                <p className="text-sm text-gray-600 mb-2">
                  Uploaded by: <span className="font-medium">{file.username}</span>
                </p>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-medium mb-1">Files:</p>
                  {file.file_paths.map((path, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition duration-150"
                    >
                      <IoDocumentAttach className="text-indigo-500 mr-2 w-5 h-5" />
                      <a
                        href={`http://localhost:3000/${path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 text-sm truncate"
                      >
                        {path.split("/").pop()}
                      </a>
                    </div>
                  ))}
                </div>
                {file.links && (
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Links:</p>
                    <a
                      href={file.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 text-sm block break-all"
                    >
                      {file.links}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 text-lg">No files found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;