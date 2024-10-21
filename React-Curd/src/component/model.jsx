import React from "react";

function model({ details }) {
  console.log("details------....>>>>", details);

  return (
    <>
      {details.map((detail) => (
        <div className="bg-slate-300 mt-11 ">
          <p></p>
          <h2>{detail.title}</h2>
          <p>{detail.description}</p>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Edit 
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
             Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default model;
