import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import _ from "lodash"
import ListItem from './components/ListItem';
import {Routes, Route, Link, NavLink} from "react-router-dom";
import Events from "./views/Events";
import AddEvent from "./views/AddEvent";
import EditEvent from "./views/EditEvent";
import axios from "axios";


function App() {



const [api, setApi] = useState([]);
const[postsToUse, setPostsToUse] = useState([]);

const link = "http://localhost:9000/api/group";


useEffect(() => {
  // Axios code to fetch data from the API
  axios.get(link)
    .then(response => {
      // Update the state with the fetched data
      setApi(response.data);
      setPostsToUse(JSON.parse(JSON.stringify(response.data)));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);



function renderTable(posts){
  if(document.getElementById("postTable"))
    return;
  let table = document.createElement("table");
  let tableHeader = document.createElement("thead");
  let tableBody = document.createElement("tbody");

  let headerRow = document.createElement("tr");

  for(let prop in posts[0]){
    let columnHeader = document.createElement("th");
    columnHeader.appendChild(document.createTextNode(prop));
    headerRow.appendChild(columnHeader);
  }

  tableHeader.appendChild(headerRow);

  posts.forEach((post) => {

    let bodyRow = document.createElement("tr");

    for (let prop in post){
        let columnBody = document.createElement("td");
        columnBody.appendChild(document.createTextNode(post[prop]));
        bodyRow.appendChild(columnBody);
    }

    tableBody.appendChild(bodyRow);
    })

    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    table.id = "postTable";

    document.body.appendChild(table);
}

  return (
    <div className="App">
{/*       
    <h1> Chores </h1>

    <ul>
      {state.chores.map(chore => (
        <ListItem key={chore.id}
        id={chore.id}
        name={chore.name}
        completed={chore.completed}
        description={chore.description}
        handleOnClick={handleOnClick}
        />
      ))}
    </ul>

     {JSON.stringify(state)};
     {JSON.stringify(api)}; */}

     <div>
      <nav>
        <ul>
        <li>
            <NavLink to="/" style={({isActive}) =>{
              return isActive ? {color: "red"} : {}
            }}>Main Page</NavLink>
          </li>
          <li>
            <NavLink to="/new" style={({isActive}) =>{
              return isActive ? {color: "red"} : {}
            }}>Add a new event</NavLink>
          </li>
        </ul>
      </nav>
     </div>


     <Routes>
      <Route path="/" element = {<Events/>}/>
      <Route path="/new" element = {<AddEvent/>}/>
      <Route path="/:id" element = {<EditEvent/>}/>
     </Routes>

     {/* {postsToUse.length > 0 && renderTable(postsToUse)} */}

     {console.log(postsToUse)}

    </div>
  );
}

export default App;
