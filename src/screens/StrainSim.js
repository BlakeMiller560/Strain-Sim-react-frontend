import React, {useRef, useEffect, useState} from "react";
import Plot from 'react-plotly.js';
import styled from "styled-components";
import '../styles/screens/StrainSim.css';

// this is the main function of the code, the strain camera
function StrainCamera() {

    //const SerialPort = require('serialport');
    //const Readline = require('serialport/parser-readline');

    //const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
    //const parser = port.pipe(new Readline({ delimiter: '\n' }));

    const [show,setShow] = useState(true);
    // define base variables. By default, they are null
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    // setting default states
    const [hasPhoto, setHasPhoto] = useState(false);
    // setting the default video that we want. Default is a 1080P webcam display
    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({video: {width: 1280, height: 720}})

            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err =>{
                console.error(err);
            })
    }

    useEffect(() => {
        getVideo();
    }, [videoRef])
    // this part of the code is to handle the strain plot button being clicked.
    // in short, if the button is clicked, then we start displaying strain on the plot

    const handleClick = () => {
    // check for arduino input
    }
    function PlotStrain(){
        return (
            <Plot
                    // create plot
                    data={[
                      {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                      },
                      {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
                />
        )
    }



    // now for the layout. We want the strain camera, the plot, and a toggle button
    return (
        <div className='strain_camera'>
            <div className='camera' style={{ display: "flex" }}>
                <video className='video_output' ref={videoRef}> </video>
                {show ?<h1><PlotStrain/> </h1>:null}
            </div>
            <div className='plot_strain_div'>
                <button onClick={()=>setShow(true)}>Start Plot</button>
                <button onClick={()=>setShow(false)}>Stop Plot</button>

            </div>
        </div>

    );



}

export default StrainCamera;
