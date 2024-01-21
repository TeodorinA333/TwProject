import React, { useState } from "react";
import axios from "axios";

export default function AddEvent() {
  const [showForm, setShowForm] = useState(true);
  const [groupEventName, setGroupEventName] = useState("");
  const [evenimente, setEvenimente] = useState([
    { eventName: "", eventDate: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedEvenimente = [...evenimente];
    updatedEvenimente[index][field] = value;
    setEvenimente(updatedEvenimente);
  };

  const handleAddEveniment = () => {
    setEvenimente([...evenimente, { eventName: "", eventDate: "" }]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if any EvenimentDate is older than a day
    const currentDate = new Date().toLocaleDateString();
    const isAnyDateOlderThanDay = evenimente.some(
      (eveniment) =>
        new Date(eveniment.eventDate).toLocaleDateString() === currentDate
    );
  
    // Set GrupaEventsClosed accordingly
    const grupaEventsClosed = isAnyDateOlderThanDay ? "Open" : "Closed";

    // Format data into JSON
    const formattedData = {
      GrupaEventsName: groupEventName,
      GrupaEventsClosed: grupaEventsClosed,
      Evenimente: evenimente.map(({ eventName, eventDate }) => ({
        EvenimentName: eventName,
        EvenimentDate: eventDate,
      })),
    };

    try {
        // Post data to the server
        const response = await axios.post(
          "http://localhost:9000/api/group",
          formattedData
        );
  
        // Handle any other logic after successful posting
        console.log("Data successfully posted to the server:", response.data);
  
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

  return (
    <div>
      <h2>Edit Event</h2>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label>Group Event Name:</label>
          <input
            type="text"
            value={groupEventName}
            onChange={(e) => setGroupEventName(e.target.value)}
          />
          <br />

          {evenimente.map((eveniment, index) => (
            <div key={index}>
              <label>Event Name:</label>
              <input
                type="text"
                value={eveniment.eventName}
                onChange={(e) =>
                  handleInputChange(index, "eventName", e.target.value)
                }
              />

              <br></br>
              <br></br>
              <label>Event Date:</label>
              <input
                type="datetime-local"
                value={eveniment.eventDate}
                onChange={(e) =>
                  handleInputChange(index, "eventDate", e.target.value)
                }
              />
            </div>
          ))}
            <br></br>
          <button type="button" onClick={handleAddEveniment}>
            Add Eveniment
          </button>

          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}



