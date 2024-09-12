import React, { useState } from "react";

const Demo = () => {
  const [file, setFile] = useState(null);

  const handleInput = (event) => {
    const selectedFile = event.target.files[0]; // Get the first selected file
    setFile(selectedFile); // Optionally update state with the file
    // console.log(selectedFile); // Log the selected file object
    if (selectedFile) {
      console.log("./src/assets/" + selectedFile.name); // Log the file name
    }
  };

  return (
    <div>
      <input
        type="file"
        className="form-control"
        name="address"
        placeholder="Enter Address"
        onChange={handleInput} // No need for value={file} in a file input
      />
    </div>
  );
};

export default Demo;
