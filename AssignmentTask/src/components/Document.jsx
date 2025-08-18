import React, {useState} from 'react'
import { FaTrash } from 'react-icons/fa';

const Document = () => {

  const [documents, setDocuments] = useState([
    'Holiday calendar2025.pdf',
    'Invoice_OctaAds.pdf',
  ]);

  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      setDocuments([...documents, file.name]);
      setFile(null);
    }
  };

  const handleDelete = (index) => {
    const updatedDocs = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocs);
  };
    return (
        <div className=" bg-[#0d1321] p-4 space-y-4 mx-20">
            <div className="bg-white p-4 rounded shadow-md">
                <h1 className=" mb-2 text-center text-gray-900 font-bold text-xl">Upload & View Documents</h1>
                <div className="mb-4">
                    <label className=" font-semibold mb-2 text-gray-900">Upload Document:</label>
                    <input type="file" className="border p-2 rounded w-full border-blue-600" />
                </div>
                <div className="mb-6 text-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded cursor-pointer" >
                        Upload Document
                    </button>
                </div>
                <h2 className=" mb-2 text-center text-gray-900 font-bold text-xl">Documents List</h2>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {documents.map((doc, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded  border-blue-600 border-2"
                        >
                            <a
                                href={`#`} // Replace with actual document URL
                                className="text-gray-900 hover:underline "
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {doc}
                            </a>
                            <button
                                onClick={() => handleDelete(index)}
                                className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Document