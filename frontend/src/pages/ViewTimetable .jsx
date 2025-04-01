import React, { useState, useEffect } from "react";
import { fetchTimetableByName } from "../api/timetableApi";

const ViewTimetable = () => {
  const [timetableTitle, setTimetableTitle] = useState(""); // State for timetable title
  const [timetable, setTimetable] = useState(null); // State to store the fetched timetable
  const [error, setError] = useState(""); // Error state

  const handleViewTimetable = async () => {
    if (!timetableTitle.trim()) {
      setError("Please enter a timetable title.");
      return;
    }

    try {
      const fetchedTimetable = await fetchTimetableByName(timetableTitle);
      setTimetable(fetchedTimetable);
      setError("");
    } catch (error) {
      setError("Error fetching timetable. Please check the title.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">View Timetable</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Enter Timetable Title:</label>
        <input
          type="text"
          value={timetableTitle}
          onChange={(e) => setTimetableTitle(e.target.value)}
          placeholder="Enter timetable title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleViewTimetable}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        View Timetable
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {timetable && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Timetable: {timetable.title}</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Module</th>
                <th className="px-4 py-2 border-b">Classroom</th>
                <th className="px-4 py-2 border-b">Faculty</th>
                <th className="px-4 py-2 border-b">Time Slot</th>
              </tr>
            </thead>
            <tbody>
              {timetable.entries.map((entry, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{entry.module?.title}</td>
                  <td className="px-4 py-2 border-b">{entry.classroom ? entry.classroom.roomNumber : "N/A"}</td>
                  <td className="px-4 py-2 border-b">{entry.faculty?.name}</td>
                  <td className="px-4 py-2 border-b">{entry.timeSlot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTimetable;
