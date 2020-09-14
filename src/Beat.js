import React from "react";
import "./Beat.css";
const Mapping = {
  tttt: "A/A/A/A/",
  tttf: "A/A/A/",
  ttff: "A/A/",
  tfff: "A",
  tftf: "AA",
  tftt: "A/z/A/A",
  fttt: "z/A/A/A/",
  ftff: "zA",
  fftf: "zzA/z",
  fftt: "zzA/A/",
  ffft: "zzzA/",
  ffff: "z",
};
export default function Beat(props) {
  let defaultType = props.type ? props.type : "full";
  const [count, setCount] = React.useState(0);
  const [classList, setClassList] = React.useState(
    `${props.beats[props.index].state} ${defaultType} i${props.index}`
  );
  const generateNotes = (beats) => {
    let abc = "";
    console.log("changed beats");
    let notes = "";
    let allnotes = [];
    let round = 0;
    beats.forEach((beat, i) => {
      if (i % 4 === 0) {
        allnotes.push(notes);
        notes = "";
        round = round + 1;
      }
      const value = beat.state ? "t" : "f";
      notes = notes + value;
    });
    allnotes.shift();
    allnotes.push(notes);
    allnotes.forEach((note) => {
      abc = abc + Mapping[note] + " ";
    });
    console.log(abc);
    props.setChord(abc);
  };

  const activate = () => {
    setCount(count + 1);
    console.log("go", props.beats);
    let newArr = props.beats;
    newArr[props.index] = {
      type: props.beats[props.index].type,
      state: !props.beats[props.index].state,
    };
    props.set(newArr);
    console.log(!props.beats[props.index].state);
    generateNotes(newArr);
    setClassList(`${newArr[props.index].state} ${defaultType} i${props.index}`);
  };

  return <div onClick={activate} className={classList}></div>;
}
