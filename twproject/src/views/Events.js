import {react, useEffect, useState} from "react";
import ListItem from "../components/ListItem";
import axios from "axios";
import QRCode from "qrcode.react";

export default function Event(){

    const [api, setApi] = useState([]);
    const[postsToUse, setPostsToUse] = useState([]);
    const [showTable, setShowTable] = useState(true);
    const [selectedGrupaEventsID, setSelectedGrupaEventsID] = useState(null);
    const link = "http://localhost:9000/api/group";


useEffect(() => {

  axios.get(link)
    .then(response => {

      setApi(response.data);
      setPostsToUse(JSON.parse(JSON.stringify(response.data)));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    return () => {
        
        removeTable();
      };
}, []);

useEffect(() => {
    checkTable();
  }, [showTable, postsToUse]);


function renderTable(posts) {
    if(document.getElementById("postTable") || !showTable)
     return;
    const table = document.createElement('table');

    for (const grupa of posts) {
        const rowGrupa = table.insertRow();
        for (const prop in grupa) {
          if (grupa.hasOwnProperty(prop)) {
            const cell = rowGrupa.insertCell();
            cell.textContent = formatTableCell(grupa[prop]);
          }
        }
    
        for (const eveniment of grupa.Evenimente) {
          const rowEveniment = table.insertRow();
          for (const prop in eveniment) {
            if (eveniment.hasOwnProperty(prop)) {
              const cell = rowEveniment.insertCell();
              cell.textContent = formatTableCell(eveniment[prop]);
            }
          }
        }
        if (grupa.GrupaEventsClosed === 'Open') {
        const buttonCell = rowGrupa.insertCell();
        const button = document.createElement('input');
        button.type = 'button';
        button.value = 'Enroll!';
        button.addEventListener('click', ()=>
           handleButtonClick(grupa.GrupaEventsID));
        buttonCell.appendChild(button);

        
        }
      }
    table.id = "postTable";
    document.body.appendChild(table);
}

function handleButtonClick(grupaEventsID){
    setSelectedGrupaEventsID(grupaEventsID);
}

function formatTableCell(value) {
    
    if (typeof value === 'object' && value !== null) {
      return 'Evenimente';
    }
    
    return String(value);
  }

  function checkTable() {
    if (showTable && postsToUse.length > 0) {
      renderTable(postsToUse);
    } else {
      removeTable();
    }
  }

  function removeTable() {
    const existingTable = document.getElementById('postTable');
    if (existingTable) {
      existingTable.remove();
    }
  }
  

    return(
    <div>
    <h2>Event List</h2>
    <div>
    {postsToUse.length > 0 && renderTable(postsToUse)}
    {selectedGrupaEventsID && (
          <QRCode
            value={`you have been registered for Activity No.: ${selectedGrupaEventsID}`}
          />
        )}
    </div>
    </div>
    )
}