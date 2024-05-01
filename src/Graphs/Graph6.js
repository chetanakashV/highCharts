import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock';
import Navbar4 from '../Components/Navbar1';

const locations = new Map(); 


const Graph6 = (props) => {
    const [division, setDivision] = useState("thisWeek"); 
    const [category, setCategory] = useState("byDay"); 


    const handleSetDivision = (div) => {
        setDivision(div); 
    }

    const handleSetCategory = (cat) => {
        setCategory(cat); 
    }


    const [options, setOptions] = useState(
        {    
            title: {
                text: 'Completed vs Target By Location',
                align :'left',
                style: {
                    fontWeight: "normal", 
                    color: "gray"
                }, 
                floating: false,
            },
            chart: {
                  type: "column", 
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
                layout: "vertical",
                align: 'left',
                verticalAlign: 'middle' ,
                floating: false,
                itemMarginTop: 0
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
    var series1 = [], series2 = [], series3 = [], responseData, loaded = false; 
    const weekDays = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]; 

    const fetchToday = () => {
        Axios.get(props.url).then((response) => {
            console.log(response.data); responseData = response.data;
            return "done"  
        }).then(() => {
            let i = 0;
            responseData.forEach((dataEl) => {
                if(!locations.has(dataEl.location)){
                    locations.set(dataEl.location, i); i++; 
                }
            })
            return "done"; 
        }).then(() => {
            locations.forEach((value, key) => {
                series1.push([key, 0])
                series2.push([key, 0])
                series3.push([key, 0])
            })

            return "done"
        }).then(() => {
            responseData.forEach((dataEl) => {
                let ind = locations.get(dataEl.location); 
                series1[ind][1] += dataEl.data.NoShow;
                series2[ind][1] += dataEl.data.Completed;
                series3[ind][1] += dataEl.data.Total;
            })
            return "done"
        }).then(() => {
            var newLoadData = [
                {
                    name: "No Show", 
                    data: series1,
                    color: "#FF0000"
                },
                {
                    name: "Completed",
                    data: series2,
                    color: "#93C47D"
                }, 
                {
                    name: "Total",
                    data: series3, 
                    color: "#4A86E8"
                }
            ];
            var newYAxis = {
                max: 100,
                title: {
                    text: null
                }
            }
            setOptions({series: newLoadData, yAxis: newYAxis})
        })
    }
    const fetchWeek = () => {
        Axios.get(props.url2).then((response) => {
            console.log(response.data); responseData = response.data;
            return "done"  
        }).then(() => {
            let i = 0;
            responseData.forEach((dataEl) => {
                if(!locations.has(dataEl.location)){
                    locations.set(dataEl.location, i); i++; 
                }
            })
            return "done"; 
        }).then(() => {
            locations.forEach((value, key) => {
                series1.push([key, 0])
                series2.push([key, 0])
                series3.push([key, 0])
            })

            return "done"
        }).then(() => {
            responseData.forEach((dataEl) => {
                let ind = locations.get(dataEl.location); 
                series1[ind][1] += dataEl.data.NoShow;
                series2[ind][1] += dataEl.data.Completed;
                series3[ind][1] += dataEl.data.Total;
            })
            return "done"
        }).then(() => {
            var newLoadData = [
                {
                    name: "No Show", 
                    data: series1,
                    color: "#FF0000"
                },
                {
                    name: "Completed",
                    data: series2,
                    color: "#93C47D"
                }, 
                {
                    name: "Total",
                    data: series3, 
                    color: "#4A86E8"
                }
            ];
            var newYAxis = {
                max: 100,
                title: {
                    text: null
                }
            }
            setOptions({series: newLoadData, yAxis: newYAxis})
        })
    }
    const fetchMonth = () => {
        Axios.get(props.url3).then((response) => {
            console.log(response.data); responseData = response.data;
            return "done"  
        }).then(() => {
            let i = 0;
            responseData.forEach((dataEl) => {
                if(!locations.has(dataEl.location)){
                    locations.set(dataEl.location, i); i++; 
                }
            })
            return "done"; 
        }).then(() => {
            locations.forEach((value, key) => {
                series1.push([key, 0])
                series2.push([key, 0])
                series3.push([key, 0])
            })

            return "done"
        }).then(() => {
            responseData.forEach((dataEl) => {
                let ind = locations.get(dataEl.location); 
                series1[ind][1] += dataEl.data.NoShow;
                series2[ind][1] += dataEl.data.Completed;
                series3[ind][1] += dataEl.data.Total;
            })
            return "done"
        }).then(() => {
            var newLoadData = [
                {
                    name: "No Show", 
                    data: series1,
                    color: "#FF0000"
                },
                {
                    name: "Completed",
                    data: series2,
                    color: "#93C47D"
                }, 
                {
                    name: "Total",
                    data: series3, 
                    color: "#4A86E8"
                }
            ];
            var newYAxis = {
                max: 100,
                title: {
                    text: null
                }
            }
            setOptions({series: newLoadData, yAxis: newYAxis})
        })
    }
    const fetchQuarter = () => {
        Axios.get(props.url4).then((response) => {
            console.log(response.data); responseData = response.data;
            return "done"  
        }).then(() => {
            let i = 0;
            responseData.forEach((dataEl) => {
                if(!locations.has(dataEl.location)){
                    locations.set(dataEl.location, i); i++; 
                }
            })
            return "done"; 
        }).then(() => {
            locations.forEach((value, key) => {
                series1.push([key, 0])
                series2.push([key, 0])
                series3.push([key, 0])
            })

            return "done"
        }).then(() => {
            responseData.forEach((dataEl) => {
                let ind = locations.get(dataEl.location); 
                series1[ind][1] += dataEl.data.NoShow;
                series2[ind][1] += dataEl.data.Completed;
                series3[ind][1] += dataEl.data.Total;
            })
            return "done"
        }).then(() => {
            var newLoadData = [
                {
                    name: "No Show", 
                    data: series1,
                    color: "#FF0000"
                },
                {
                    name: "Completed",
                    data: series2,
                    color: "#93C47D"
                }, 
                {
                    name: "Total",
                    data: series3, 
                    color: "#4A86E8"
                }
            ];
            var newYAxis = {
                max: 200,
                title: {
                    text: null
                }
            }
            setOptions({series: newLoadData, yAxis: newYAxis})
        })
    }


    useEffect(() => {
        if(props.division == "today") fetchToday(); 
        else if(props.division == "thisWeek") fetchWeek(); 
        else if(props.division == "thisMonth") fetchMonth(); 
        else  fetchQuarter(); 
    }, [props.division])


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
            <div className='Component' style  = {{margin: "0 300px"}} >
               <HighchartsReact
                highcharts = {Highcharts}
                options = {options}
                containerProps = {{
                    style: { width:"100%" , marginTop: "20px" }
                }}/>
            </div>
    )
}

export default Graph6; 