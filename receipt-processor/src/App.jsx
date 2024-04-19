import { useState } from "react";
import "./App.css";

function App() {
  const [receiptJSON, setReceiptJSON] = useState("");

  function ProcessReceipt() {
    console.log(receiptJSON);
    fetch("http://localhost:4000/receipts/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receiptJSON),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="container">
      Put your receipt in JSON format in the text box below!
      <textarea
        value={receiptJSON}
        onChange={(e) => setReceiptJSON(e.target.value)}
      ></textarea>
      <div>
        <button onClick={() => ProcessReceipt()}>Process Receipt</button>
      </div>
    </div>
  );
}

export default App;
