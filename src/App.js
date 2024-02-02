import React, { useState, useEffect } from "react";
import "./App.css";

const initialData = [
  {
    name: "Netflix",
    url: ["https://www.netflix.com"],
  },
  {
    name: "YouTube",
    url: ["https://www.youtube.com"],
  },
  {
    name: "Job",
    url: ["https://www.github.com", "https://www.linkedin.com"],
  },
];

function App() {
  const [list, setList] = useState(() => {
    const storedData = localStorage.getItem("favTabsData"); //функция обратного вызова, чтобы получить данные из localStorage
    return storedData ? JSON.parse(storedData) : initialData;
  });

  const [newTabName, setNewTabName] = useState("");
  const [newTabUrls, setNewTabUrls] = useState("");

  useEffect(() => {
    localStorage.setItem("favTabsData", JSON.stringify(list)); //сохранить данные в localStorage при изменении списка табов
  }, [list]);

  const openFavTab = (url) => {
    for (const link of url) {
      window.open(link, "_blank");
    }
  };

  const addNewTab = () => {
    if (newTabName && newTabUrls) {
      const newTab = {
        name: newTabName,
        url: newTabUrls.split(",").map((url) => url.trim()),
      };

      setList([...list, newTab]);
      setNewTabName("");
      setNewTabUrls("");
    }
  };

  const removeTab = (index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  const resetToInitialState = () => {
    setList(initialData);
  };

  return (
    <div className="App">
      <h3>Your FavTabs:</h3>
      <div>
        {list.map((item, index) => (
          <div className="tabField" key={index}>
            <button
              onClick={() => {
                openFavTab(item.url);
              }}
            >
              {item.name}
            </button>
            <button
              className="removeButton"
              onClick={() => removeTab(index)}
            ></button>
          </div>
        ))}
      </div>

      <div>
        <h3>Add New Tab:</h3>
        <input
          type="text"
          placeholder="Tab Name"
          value={newTabName}
          onChange={(e) => setNewTabName(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          value={newTabUrls}
          onChange={(e) => setNewTabUrls(e.target.value)}
        />
      </div>
      <div className="tabField">
        <div>{""}</div>
        <button className="addButton" onClick={addNewTab}></button>
      </div>
      <div className="emptySpace" />
      <button onClick={resetToInitialState}>Reset to Initial State</button>
    </div>
  );
}

export default App;
