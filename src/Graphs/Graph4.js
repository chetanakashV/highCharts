import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock';
import Navbar4 from '../Components/Navbar1';

var urlWeekDay = "https://d7c1608d-d3f8-4e94-85fe-132d8bcfdc56.mock.pstmn.io/getExpCompDW"; 
var urlMonthYear = "https://d7c1608d-d3f8-4e94-85fe-132d8bcfdc56.mock.pstmn.io/getExpCompMY"; 


const Graph4 = () => {
    const [location, setLocation] = useState("All locations"); 
    const [division, setDivision] = useState("thisWeek"); 
    const [category, setCategory] = useState("byDay"); 

    const handleSetLocation = (loc) => {
        if(loc === "") setLocation("All locations")
        else setLocation(loc); 
    }

    const handleSetDivision = (div) => {
        setDivision(div); 
    }

    const handleSetCategory = (cat) => {
        setCategory(cat); 
    }


    const [options, setOptions] = useState(
        {    
            title: {
                text: ' ',
                align :'left',
                style: {
                  fontWeight: "normal", 
                }, 
                floating: true
            },
            chart: {
                  type: "line", 
                  zoomType: 'xy'
            },
            series: [
                {
                    name: "expected", 
                    data: []
                },{
                    name: "implemented",
                    data: []
                }
            ], 
            credits: {
                enabled: false, 
                href: "https://www.linkedin.com/in/chetanakash-vankadara-3a0548217/", 
                text: 'creator'
            }, 
            legend: {
                align: 'center', 
                floating: false,
                squareSymbole: true,
                bubbleLegend: {
                  enabled: true
                },
            //     labelFormatter: function () {
            //       return '<div >' +
            //                  "<span style=' font-family:proximaNovaBold; '> " + this.name + " " + this.y + "%"+  " </span>" +
            //              '</div>'
            //   }
            }, 
            plotOptions: {
                  series: {
                    states: {
                      hover: {
                        halo: {
                          opacity: 1
                        }
                      },
                      inactive: {
                        opacity :1
                      }, 
                      active: {
                        opacity: 1
                      }
                    }
                  },
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true,
                        borderRadius: '0px',
                        borderWidth: '1',
                        borderColor: 'null', 
                        depth: '1.5',
                        opacity: 1, 
                        animation: true,
                        size: '100%',
                        slicedOffset: '10'
                    },
                  
            },
            // tooltip: {
            //           distance: 16,
            //           backgroundColor: 'none',
            //           maxSize: '10px',
            //           shadow: false,
            //           useHTML: true,
            //           outside: true,
            //           followPointer: false,
            //           positioner: function() {
            //             var point = this;
            //             var chart = point.chart;
            //             var chartPosition = chart.pointer.getChartPosition();
            //             var distance = point.distance;
            
            //             var containerScaling = chart.containerScaling;
            //                 var scaleX = function (val) {
            //                     return (containerScaling ? val * containerScaling.scaleX : val);
            //                 };
            //                 var scaleY = function (val) {
            //                     return (containerScaling ? val * containerScaling.scaleY : val);
            //                 };
            
            //                 return {
            //                     x: chartPosition.left - distance + scaleX(chart.plotLeft),
            //                     y: chartPosition.top - distance + scaleY(chart.plotTop) - point.label.height
            //                 }
            //           },
            //           formatter() {
            //             return `<span class = "tool"> <b>${this.point.name} ${this.y}% </b><br>${this.point.description} 
            //             ${this.point.x}
            //             </span>`
            //           }
            // }, 
            navigation: {
                  buttonOptions: {
                      enabled: true, 
                      align: 'right', 
                      floating: false, 
                      useHtml: true, 
                  }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'menuball', 
                        symbolStroke: 'black',
                        symbolFill: 'blue'
                    }
                }
            },
            responsive: {  
                rules: [{  
                  condition: {  
                    maxWidth: 500  
                  },  
                  chartOptions: {  
                    legend: {  
                      enabled: false  
                    }  
                  }  
                }]  
            },
            yAxis: {
                  min: 0, 
                  max: 10,
                  scrollbar: {
                    enabled: false
                  },
            },
            xAxis:[ {
                  scrollbar: {
                    enabled: false
                  }, 
                  type: 'category'
            }],
                        }
    )
    var series1 = [], series2 = [], responseData, loaded = false; 
    const weekDays = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]; 

    const fetchWeekDay = () => {
        
        Axios.get(urlWeekDay).then(response =>{
            responseData = response.data; console.log(response.data); return responseData;
        }).then((responseData) => {
            responseData.forEach((dataEl, index)=>{
                if(dataEl.location === location)  
            {
                dataEl.data.forEach((key, index) => {
                    var dat = new Date(key.date)
                    series1.push( [ weekDays[dat.getDay()] ,
                    Math.round(key.expected_inspections / key.completed_inspections * 100 ) ] ); 
                })
               
            }
            })
            return "done"; 
        }).then(() => { 
            const newLoadData = [
                {
                    name: "Inspection Scores",
                    data: series1, 
                    color: '#4285F4'
                },
            ]
            const newYAxis = {
                min: 0, 
                max: 100,
                scrollbar: {
                  enabled: false
                },
            }
            const newXAxis = {
                type: 'category', 
                max: 6
            }
            const newOptions = {series: newLoadData, yAxis: newYAxis, xAxis: newXAxis}; 
            setOptions(newOptions); 
         }); 
    }

    const fetchMonthYear = () => {
        Axios.get(urlMonthYear).then(response =>{
            responseData = response.data; console.log(response.data); return responseData;
        }).then((responseData) => {
            responseData.forEach((dataEl, index)=>{
                    console.log(dataEl.location)
                if(dataEl.location === location)  
            {
                dataEl.data.forEach((key, index) => {
                    console.log(key.month); 
                    series1.push( [ key.month ,
                        Math.round(key.expected_inspections/ key.completed_inspections  * 100)] );  
                })
               
            }
            })
            return "done"; 
        }).then(() => { 
            const newLoadData = [
                {
                    name: "Inspection Scores",
                    data: series1, 
                    color: '#4285F4'
                },
            ]
            const newYAxis = {
                min: 0, 
                max: 100,
                scrollbar: {
                  enabled: false
                },
            }
            const newXAxis = {
                type: 'category',
                max: 11
            }
            const newOptions = {series: newLoadData,  yAxis: newYAxis, xAxis: newXAxis}; 
            setOptions(newOptions); 
         }); 
    }

    useEffect(() => {
        if(category == "byDay" && division == "thisWeek") fetchWeekDay(); 
        else if(category == "byMonth" && division == "thisYear") fetchMonthYear();
    }, [location, division, category])



//   const options = {    
//     title: {
//         text: 'Inspections',
//         align :'center',
//         style: {
//           fontWeight: "normal", 
//         }
//     },
//     chart: {
//           type: "column", 
//           zoomType: 'xy'
//     },
//     series: [series1, series2], 
//     credits: {
//         enabled: false, 
//         href: "https://www.linkedin.com/in/chetanakash-vankadara-3a0548217/", 
//         text: 'creator'
//     }, 
//     legend: {
//         align: 'right', 
//         floating: false,
//         squareSymbole: true,
//         bubbleLegend: {
//           enabled: true
//         },
//     //     labelFormatter: function () {
//     //       return '<div >' +
//     //                  "<span style=' font-family:proximaNovaBold; '> " + this.name + " " + this.y + "%"+  " </span>" +
//     //              '</div>'
//     //   }
//     }, 
//     plotOptions: {
//           series: {
//             states: {
//               hover: {
//                 halo: {
//                   opacity: 1
//                 }
//               },
//               inactive: {
//                 opacity :1
//               }, 
//               active: {
//                 opacity: 1
//               }
//             }
//           },
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 showInLegend: true,
//                 borderRadius: '0px',
//                 borderWidth: '1',
//                 borderColor: 'null', 
//                 depth: '1.5',
//                 opacity: 1, 
//                 animation: true,
//                 size: '100%',
//                 slicedOffset: '10'
//             },
          
//     },
//     tooltip: {
//               distance: 16,
//               backgroundColor: 'none',
//               maxSize: '10px',
//               shadow: false,
//               useHTML: true,
//               outside: true,
//               followPointer: false,
//               positioner: function() {
//                 var point = this;
//                 var chart = point.chart;
//                 var chartPosition = chart.pointer.getChartPosition();
//                 var distance = point.distance;
    
//                 var containerScaling = chart.containerScaling;
//                     var scaleX = function (val) {
//                         return (containerScaling ? val * containerScaling.scaleX : val);
//                     };
//                     var scaleY = function (val) {
//                         return (containerScaling ? val * containerScaling.scaleY : val);
//                     };
    
//                     return {
//                         x: chartPosition.left - distance + scaleX(chart.plotLeft),
//                         y: chartPosition.top - distance + scaleY(chart.plotTop) - point.label.height
//                     }
//               },
//               formatter() {
//                 return `<span class = "tool"> <b>${this.point.name} ${this.y}% </b><br>${this.point.description} 
//                 ${this.point.x}
//                 </span>`
//               }
//     }, 
//     navigation: {
//           buttonOptions: {
//               enabled: true, 
//               align: 'right', 
//               floating: false, 
//               useHtml: true, 
//           }
//     },
//     exporting: {
//         buttons: {
//             contextButton: {
//                 symbol: 'menuball', 
//                 symbolStroke: 'black',
//                 symbolFill: 'blue'
//             }
//         }
//     },
//     responsive: {  
//         rules: [{  
//           condition: {  
//             maxWidth: 500  
//           },  
//           chartOptions: {  
//             legend: {  
//               enabled: false  
//             }  
//           }  
//         }]  
//     },
//     yAxis: {
//           min: 0, 
//           max: 30,
//           title: {text: "Amount"},
//           scrollbar: {
//             enabled: 'true'
//           },
//     },
//     xAxis:[ {
//           title: {text: "x axis values"}
//     }],
//                 }
    

    return(
            <div className='Component'>
               <Navbar4
                handleSetLocation = {handleSetLocation}
                handleSetCategory = {handleSetCategory}
                handleSetDivision = {handleSetDivision}
                division 
                category
               /> 
               <HighchartsReact
                highcharts = {Highcharts}
                options = {options}
                containerProps = {{
                    style: { width:"100%" , marginTop: "20px" }
                }}/>
            </div>
    )
}

export default Graph4; 