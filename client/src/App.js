import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [phy, setphy] = useState("");
  const [chem, setchem] = useState("");
  const [math, setmath] = useState("");
  const [newemail, setnewemail] = useState("");

  const [list, setlist] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/read").then((res) => {
      setlist(res.data);
    });
  }, []);

  const addToList = () => {
    axios.post("http://localhost:8000/insert", {
      name,
      email,
      phone,
      phy,
      chem,
      math,
    });
  };

  const updateemail = (id) => {
    axios.put("http://localhost:8000/update", { id: id, newemail: newemail });
  };
  return (
    <div className="App">
      <h1>Student </h1>
      <label>NAME:</label>
      <input type="text" onChange={(e) => setname(e.target.value)} />

      <label>EMAIL:</label>
      <input type="text" onChange={(e) => setemail(e.target.value)} />

      <label>PHONE:</label>
      <input type="number" onChange={(e) => setphone(e.target.value)} />

      <label>PHYSICS:</label>
      <input type="number" onChange={(e) => setphy(e.target.value)} />

      <label>CHEMISTRY:</label>
      <input type="number" onChange={(e) => setchem(e.target.value)} />

      <label>MATH:</label>
      <input type="number" onChange={(e) => setmath(e.target.value)} />

      <button onClick={addToList}>Add to List</button>
      <hr />
      <h1>list</h1>
      {list.map((val, key) => {
        console.log(val, key);
        return (
          <div className="data" key={key}>
            <h3>{val.name}</h3>
            <h3>{val.email}</h3>
            <h3>{val.phone}</h3>
            <p>
              Physics :{val.physics}
              <span>, </span>
              Chemistry: {val.chemistry}
              <span>, </span>
              Math: {val.math}
            </p>

            <input
              type="text"
              placeholder="update Email"
              onChange={(e) => setnewemail(e.target.value)}
            />
            <button onClick={() => updateemail(val._id)}>Update</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
