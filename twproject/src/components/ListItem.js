import React from "react";
import ListBody from "./ListBody";
import PropTypes from "prop-types";

const styles = {
    li: {
      display: "flex",
      justifyContent: "flex-start",
      background: "white",
      boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
      color: "#707070",
      marginBottom: "1em",
      cursor: "pointer"
    },
    leftWall: color => ({
      width: "0.5em",
      backgroundColor: color
    })
  };

export default function ListItem({GrupaEventsId, GrupaEventsName, GrupaEventsClosed, handleOnClick}){
    return(
        <li style={styles.li} onClick={()=>handleOnClick(GrupaEventsId)}>
            <div style={styles.leftWall(GrupaEventsClosed == "Open" ? "green" : "red")}> 
            </div>
            <ListBody GrupaEventsName={GrupaEventsName}></ListBody>
        </li>
    )
}

ListItem.propTypes = {
    GrupaEventsId: PropTypes.number.isRequired,
    GrupaEventsName: PropTypes.string.isRequired,
    GrupaEventsClosed: PropTypes.string.isRequired,
    handleOnClick: PropTypes.func.isRequired
}