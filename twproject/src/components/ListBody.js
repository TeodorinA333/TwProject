import React from "react";

const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "1em"
    },
    name: {
      fontSize: "2em"
    },
    description: {
      fontSize: "0.8em"
    }
  };

export default function ListBody({GrupaEventsName}){
    return (<div style={styles.wrapper}>
        <span style={styles.GrupaEventsName}>{GrupaEventsName}</span>
        {/* <span style={styles.description}>{description}</span> */}
    </div>)
}