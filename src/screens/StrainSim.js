import React, {useRef, useEffect, useState} from "react";
import Plot from 'react-plotly.js';
import '../styles/screens/StrainSim.css';



// constants for arduino port
//const SerialPort = require("serialport");

//const parsers = SerialPort.parsers;
//const parser = new parsers.Readline({
//  delimiter: '\r\n'
//});



// this is the main function of the code, the strain camera
function StrainCamera() {


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

    // collect the current video camera display
    useEffect(() => {
        getVideo();
    }, [videoRef])

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

     // handle socket
     //let socket = io();
       // socket.on('data', function(data) {
         //   console.log(data);
        //});

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


//let io = require('socket.io').listen(app);

//io.on('connection',function(socket){
//  console.log('node is listening to port');
//});

//parser.on('data', function(data){

//console.log(data);

//});

export default StrainCamera;
