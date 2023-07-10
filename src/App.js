import { Box, TextField } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import "./App.css";

const App = () => {
  let [value, setValue] = React.useState("");
  let [data, setData] = React.useState([]);
  let [addArray, setAddArray] = React.useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) =>
        setData(
          res.data.filter((item) =>
            item.name.toLowerCase().includes(value?.toLowerCase())
          )
        )
      )
      .catch((err) => console.log(err));
  }, [value])

  const addToArray = (item) => {
    data = data.filter((singleitem) => singleitem.id !== item.id);
    setData(data);
    setAddArray([...addArray, item]);
  }

  const removeFromArray = (item) => {
    addArray = addArray.filter((singleitem) => singleitem.id !== item.id);
    setAddArray(addArray)
    setData([...data, item])
  }
  console.log(data)
  console.log(addArray)

  return (
    <div className="">
      <TextField
        id="standard-basic"
        label="Username"
        variant="standard"
        onChange={(e) => setValue(e.target.value)}
      />
      <Box className="container1">
        {data.map((item, index) => (
          <p key={index} onClick={() => addToArray(item)}>
            {item.name}
          </p>
        ))}
      </Box>

      {addArray.map((item) => (
        <p key={item.id}>
          {item.name} <CloseIcon onClick={() => removeFromArray(item)} />
        </p>
      ))}
    </div>
  );
};

export default App;
