/*
Author: Blake Miller and Zachary Flahaut
Date: 2023-12-05
Description: React component for a strain camera with real-time data plotting using Chart.js.
             It utilizes the Papaparse library to parse CSV data, and includes functionality
             for toggling the plot display and capturing video from the laparoscopic trainer camera.

*/

import React, {useRef, useEffect, useState} from "react";
import '../styles/screens/StrainSim.css';
import'../utilities/LoggerNew.py'
import Papa from "papaparse"
import testData2 from '../utilities/data.csv'
import totalData from '../utilities/total_data.csv'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    LineElement,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJs.register(
    CategoryScale, // x axis
    LinearScale, // y axis
    LineElement,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

// this is the main function of the code, the strain camera
function StrainCamera() {
    const [chartData,setChartData] = useState({
        datasets: []
    });
    const [chartOptions, setChartOptions] = useState({})
    const [chartDataTotal,setChartDataTotal] = useState({
        datasets: []
    });
    const [chartOptionsTotal, setChartOptionsTotal] = useState({})
    const [show,setShow] = useState(true);
    // define base variables. By default, they are null
    const videoRef = useRef(null);

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

    // parse instant strain data
     useEffect(()=>{
        Papa.parse(testData2,{
            download:true,
            header: true,
            dynamicTyping: true,
            delimiter: ",",
            complete: ((result) =>{
                console.log(result)
                // set test value
                let strainValue = result.data.map((item, index) =>[item['Strain_pin05']]).filter(Number)
                var colors = []
                for(var i = 0; i < strainValue.length; i++){
                   var color;
                   if(strainValue[i] < (700*0.95)) {
                       color = "blue";
                   }else{
                       color = "red";
                       }
                   colors[i] = color;
                   }
                setChartData({
                    labels:result.data.map((item, index) =>[item["time"]]).filter(String),
                    datasets: [
                        {
                            label:"Strain",
                            data: result.data.map((item, index) =>[item['Strain_pin05']]).filter(Number),
                            borderColor: "black",
                            backgroundColor: colors,
                            yaxisID: 'y'
                        }
                    ]
                });
                setChartOptions({
                    //responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title:{
                            display:true,
                            text:"Test Data"
                        },
                    }
                })
            })

        })
    }, [])

    // parse instant strain data
     useEffect(()=>{
        Papa.parse(totalData,{
            download:true,
            header: true,
            dynamicTyping: true,
            delimiter: ",",
            complete: ((result_total) =>{
                console.log(result_total)
                // set test value
                let timeValues = [];
                let strainValues = [];
                result_total.data.forEach((item) => {
                    timeValues.push(item['time']);
                    strainValues.push(item['Strain_pin05']);
                });                
                let colors = strainValues.map((value) => (value < 600 ? 'blue' : 'red'));

                setChartDataTotal({
                    labels: timeValues,
                    datasets: [
                        {
                            label: "Strain",
                            data: strainValues,
                            borderColor: "black",
                            backgroundColor: colors,
                            yaxisID: 'y',
                        },
                    ],
                });
                setChartOptionsTotal({
                    //responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title:{
                            display:true,
                            text:"Test Data"
                        },
                    }
                })
            })

        })
    }, [])

    console.log("message")

    // now for the layout. We want the strain camera, the plot, and a toggle button
    return (
        <div className='strain_camera'>
            <div className='camera' style={{ display: "flex" }}>
                <video className='video_output' ref={videoRef}> </video>
                <div>
                    <Bar className='small_plot' options={chartOptions} data={chartData} style={{display:"flex"}}/>
                    {show ?<Bar className='total_plot' options={chartOptionsTotal} data={chartDataTotal} style={{display:"flex"}}/>:null}
                </div>
            </div>
            <div className='button_div'>
                <div className='button-container'>
                    <button onClick={()=>setShow(true)}>Start Plot</button>
                    <button onClick={()=>setShow(false)}>Stop Plot</button>
                </div>
            </div>
        </div>

    );
}


export default StrainCamera;
