import left_tool_small from '../assets/images/LeftTool_small.png'
import right_tool_small from '../assets/images/RightTool_small.png'
import background_surg from '../assets/images/background_surg.png'
import '../styles/screens/StrainSim.css';

import React, { useEffect, useState } from 'react';
import * as root from "react-dom";
import styled from 'styled-components';

function StrainSim() {

{/* Setting all of our constants here */}
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);


  function increment(x) {
        return x + 1;
  }


  function decrement(x) {
        return x - 1;
  }



  const actionXMap = {
        a: decrement,
        d: increment
  }

  const actionHorizontalMap = {
        l: increment,
        j: decrement
  }
  const actionYMap = {
        s: increment,
        w: decrement
  }
  const actionVerticalMap = {
        i: decrement,
        k: increment
  }

  function handleKeyPress(e) {
    const actionX = actionXMap[e.key];
    const actionY = actionYMap[e.key];
    const actionHorizontal = actionHorizontalMap[e.key];
    const actionVertical = actionVerticalMap[e.key];

    actionX && setX(actionX);
    actionY && setY(actionY);
    actionHorizontal && setHorizontal(actionHorizontal);
    actionVertical && setVertical(actionVertical);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    }, [])

  return (
    <>
      <div className="StrainSim">
        <header className="StrainSim-header">
          <p>
              Strain Simulator
          </p>

        </header>
      </div>
        <div style={{ display: "flex" }}>
            <StyledBoard onKeyPress={handleKeyPress}>
                <LeftToolNew x={x} y={y}></LeftToolNew>
                <RightToolNew horizontal={horizontal} vertical={vertical}></RightToolNew>
            </StyledBoard>
        </div>
    </>
  );
}

export default StrainSim

const LeftToolNew = styled.div`
  background-image: url(${left_tool_small});
  width: 800px;
  height: 800px;
  left: ${({x}) => x + 'rem'};
  top: ${({y}) => y + 'rem'};
  position:absolute;`

const RightToolNew = styled.div`
  background-image: url(${right_tool_small});
  width: 700px;
  height: 800px;
  left: ${({horizontal}) => horizontal + 'rem'};
  top: ${({vertical}) => vertical + 'rem'};
  position:absolute;`

const StyledBoard = styled.section`
 background-image: url(${background_surg});
 width: 1464px;
 height: 724px;
 position:relative;`