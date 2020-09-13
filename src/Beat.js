import React from "react";
import "./Beat.css";

export default function Beat(props) {
  let defaultType = props.type ? props.type : "full";
  const activate = () => {
    console.log("go", props.beats);
    let newArr = props.beats;
    newArr[props.index] = {
      type: props.beats[props.index].type,
      state: !props.beats[props.index].state,
    };
    props.set(newArr);
  };
  return (
    <div
      onClick={activate}
      className={`${defaultType} ${props.beats[props.index].state} i${
        props.index
      }`}
    ></div>
  );
}
