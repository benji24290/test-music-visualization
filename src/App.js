import React, { useEffect, useState } from "react";
import "./App.css";
import abcjs from "abcjs";
import "abcjs/abcjs-audio.css";
import Beat from "./Beat";
var myContext = new AudioContext();
/*
const example1 = `X:1
L:1/8
K:D
z AA AA A2
`;
let example3 = `X:2
L:1/8
AA A/A/A/A/ AA A2
`;
const example4 = `X:2
L:1/8
AA A/A/A/A/ AA A2
`;
const example2 = `K:Am
"Am"A2AA c2dd|e2eg e2dc|A2AA c2dd|e2cc A2cc|"Em (G)"B2BB B2BB|
B2BB B2BB|"Am"A2AA c2dd|e2eg e2c2|"D"d2dd d2dd|d2dd d2cd|
"Am"e2cc A2c2|"G"BAG2 BAG2|"Am"A2AA A2AA|A2AA A2AA|:"Am"e4 a3e|"G"g2d2- d2eg|
"Am"a2aa ged2|"Em"e2ee e2ee|"Am"e4 a3e|"G"g2d2- d2Bc|"Em"d2e2 dcB2|"Am"A2AA A2AA:|`;

*/
function App() {
  const [synth, setSynth] = useState(null);
  //const [stop, setStop] = useState(false);
  const [chord, setChord] = useState("z z z z");
  const [beats, setBeats] = useState([
    { state: false, type: "full" },
    { state: false, type: "quarter" },
    { state: false, type: "half" },
    { state: false, type: "quarter" },
    { state: false, type: "full" },
    { state: false, type: "quarter" },
    { state: false, type: "half" },
    { state: false, type: "quarter" },
    { state: false, type: "full" },
    { state: false, type: "quarter" },
    { state: false, type: "half" },
    { state: false, type: "quarter" },
    { state: false, type: "full" },
    { state: false, type: "quarter" },
    { state: false, type: "half" },
    { state: false, type: "quarter" },
  ]);
  useEffect(() => {
    console.log("render");

    var synth = new abcjs.synth.CreateSynth();
    var visualObj = abcjs.renderAbc("paper", chord);
    console.log(abcjs);
    synth
      .init({
        audioContext: myContext,
        visualObj: visualObj[0],
        millisecondsPerMeasure: 4000,
        options: {
          soundFontUrl: "https:/path/to/soundfont/folder",
          pan: [-0.3, 0.3],
        },
        onEnded: () => {
          //restart(synth);
        },
      })
      .then(() => {
        synth
          .prime(() => {
            console.log("prime");
          })
          .then(() => {
            setSynth(synth);
          });
      });
  }, [chord]);
  /*
  const restart = (s) => {
    console.log(stop);
    if (!stop) {
      if (synth) {
        synth.start();
      } else {
        s.start();
      }
    }
  };*/

  return (
    <div className="App">
      <div id="round">
        {beats.map((beat, i) => {
          return (
            <Beat
              type={beat.type}
              active={beat.state}
              key={i}
              index={i}
              set={setBeats}
              beats={beats}
              setChord={setChord}
            ></Beat>
          );
        })}
      </div>
      {synth && (
        <button
          onClick={() => {
            if (false) {
              /*synth.stop();
              //setStop(true);
              console.log("stop", stop);</div>*/
            } else {
              synth.stop();
              synth.start();
              //console.log("start", stop);
            }
          }}
        >
          Start
        </button>
      )}
      <div id="paper"></div>
    </div>
  );
}

export default App;
