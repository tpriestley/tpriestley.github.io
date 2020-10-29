import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo";
import List from "./List";
import withListLoading from "./withListLoading";

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
];

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home() {
  const [tasks, setTasks] = useState(DATA);
  const [filter, setFilter] = useState('All');
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    const data = localStorage.getItem('listOfTasks')
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listOfTasks', JSON.stringify(tasks));
  });

  
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  const taskList = tasks
  .filter(task => FILTER_MAP[filter](task))
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
            }
      return task;
    });
    setTasks(editedTaskList);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }
  function clearStorage() {
    localStorage.clear();
    window.location.reload();
    setTasks([]);
  }

  useEffect(() => {
    setAppState({ loading: true});
    const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [setAppState]);


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <main>
      <div className='container'>
      <h1>My Repositories</h1>
      </div>
      <div>
      <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
      <div className="todoapp stack-large">
        <Form addTask={addTask} />
        <button onClick={clearStorage} type="button" className="btn btn__secondary btn__lg">
          Clear
        </button>
        <div className="filters btn-group stack-exception">
        {filterList}
        </div>
        <h3 id="list-heading">{headingText}</h3>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
          </ul>
          </div>
    </main>
    
  );
}

export default Home;