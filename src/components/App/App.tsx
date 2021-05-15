
import { useState, useEffect } from 'react';
import Lane from '../Lane';
import './styles.css';

const App = () => {
  const [store, setStore] = useState({
    ToDo: [],
    InProgress: [],
    Qa: [],
    Done: [],
  })
  const [dragged, setDragged] = useState<null | {lane: string, index: number, value: string}>(null);

  

  useEffect(() => {
    const ondrop = (event: any) => {
      if (event.target.className === "list") {
        const targetLane = event.target.id;
        event.target.style.borderColor = "#9D695A";
        console.log(event, dragged);
        if (dragged && targetLane !== dragged.lane) {
          let local: any = store;
          local[dragged.lane].splice(dragged.index, 1);
          local[targetLane].push({ name: dragged.value });
          setStore(local);
          setDragged(null);
        }
      }
    };
    const ondragstart = (event: any) => {
      event.target.style.opacity = .5;
    };
    const ondragend = (event: any) => {
      event.target.style.opacity = "";
    };
    const ondragenter = (event: any) => {
      if (event.target.className === "list") {
        event.target.style.borderColor = "black";
      }
    };
    const ondragover = (event: any) => {
      event.preventDefault();
    };
    const ondragleave = (event: any) => {
      if (event.target.className === "list") {
        event.target.style.borderColor = "#9D695A";
      }
    };

    document.addEventListener("drop", ondrop, false); 
    document.addEventListener("dragstart", ondragstart, false);
    document.addEventListener("dragend", ondragend, false);
    document.addEventListener("dragenter", ondragenter, false);
    document.addEventListener("dragover", ondragover, false);
    document.addEventListener("dragleave", ondragleave, false);
    return () => {
      document.removeEventListener("drop", ondrop); 
      document.removeEventListener("dragstart", ondragstart);
      document.removeEventListener("dragend", ondragend);
      document.removeEventListener("dragenter", ondragenter);
      document.removeEventListener("dragover", ondragover);
      document.removeEventListener("dragleave", ondragleave);
    };
  }, [dragged, store]);

  const handleDragStart = (lane: string, index: number) => (value: string) => {
    setDragged({ lane, index, value });
  };

  const handleAdd = (lane: string, name: string) => {
    const local: any = store;
    local[lane].push({ name });
    setStore(local);
  };

  return (
    <div className="App">
      <div className="lanes-container">
        <Lane
          id="ToDo"
          title="To Do"
          data={store.ToDo}
          onDragStart={handleDragStart}
          onAdd={handleAdd}
        />
        <Lane
          id="InProgress"
          title="In Progress"
          data={store.InProgress}
          onDragStart={handleDragStart}
          onAdd={handleAdd}
        />
        <Lane
          id="Qa"
          title="QA"
          data={store.Qa}
          onDragStart={handleDragStart}
          onAdd={handleAdd}
        />
        <Lane
          id="Done"
          title="Done"
          data={store.Done}
          onDragStart={handleDragStart}
          onAdd={handleAdd}
        />
      </div>
    </div>
  );
}

export default App;
