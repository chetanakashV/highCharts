import React, {useState, useEffect} from "react";
import Axios from 'axios'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock';
import Navbar3 from "../Components/Navbar3";

var urlMonth = 'https://3cdf8e47-b98c-4b2e-9021-28efd7de2764.mock.pstmn.io/getInspections'; 
var urlYear = 'https://71970720-b242-41b8-bb24-fd1293bd6dc0.mock.pstmn.io/getInspectionsByYear';

const Graph3 = () => {
    const [location, setLocation] = useState("All locations"); 
    const [division, setDivision] = useState("thisWeek"); 
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
                  type: "pie", 
                  zoomType: 'xy'
            },
            series: [
                {
                    name: "Inspections", 
                    data: [
                    {
                            name: "Passed",
                            y: 40, 
                            color: "#4285F4"
                    }, 
                    {
                            name: "Failed", 
                            y: 53.7, 
                            color: "#EA4335"
                    },
                    
                    {
                        name: "Pending",
                        y: 106.6, 
                        color: "#FBBC04"
                    }, 
                    
                ]}
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
                    animation: true,
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
                            enabled: true, 
                            connectorColor: "black"
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

    const handleSetLocation = (loc) => {
        if(loc === "") setLocation("All locations")
        else setLocation(loc); 
    }

    const handleSetDivision = (div) => {
        setDivision(div)
    }

    var responseData, series1 = []; 

    const fetchMonth = () => {
        Axios.get(urlMonth).then((response) => {
            console.log(response.data);
            responseData = response.data; 
            return "done";  
        }).then(() => {
            responseData.forEach((dataEl) =>{
                if(dataEl.location === location) {
                   
                        series1.push(dataEl.data.passed)
                        series1.push(dataEl.data.failed)
                        series1.push(dataEl.data.pending)
                }
            })
            return "done"; 
        }
        ).then(() => {
            const newLoadData = [
                {
                    name: "Inspections",
                    data: [
                        {
                            name: "Passed", 
                            color: "#4285F4",
                            y:series1[0]
                        }, 
                        {
                            name: "Failed",
                            color: "#EA4335",
                            y: series1[1]
                        },
                        {
                            name: "Pending",
                            color: "#FBBC04",
                            y: series1[2]
                        }
                    ],
                }
            ]
            setOptions({series: newLoadData})
        })
    }

    const fetchYear = () => {
        Axios.get(urlYear).then((response) => {
            console.log(response.data);
            responseData = response.data; 
            return "done";  
        }).then(() => {
            responseData.forEach((dataEl) =>{
                if(dataEl.location === location) {
                   
                        series1.push(dataEl.data.passed)
                        series1.push(dataEl.data.failed)
                        series1.push(dataEl.data.pending)
                }
            })
            return "done"; 
        }
        ).then(() => {
            const newLoadData = [
                {
                    name: "Inspections",
                    data: [
                        {
                            name: "Passed", 
                            color: "#4285F4",
                            y:series1[0]
                        }, 
                        {
                            name: "Failed",
                            color: "#EA4335",
                            y: series1[1]
                        },
                        {
                            name: "Pending",
                            color: "#FBBC04",
                            y: series1[2]
                        }
                    ],
                }
            ]
            setOptions({series: newLoadData})
        })
    }


    useEffect(() => {
        if(division == "thisMonth") fetchMonth();
        else if(division == "thisYear") fetchYear(); 

    }, [location, division])

    return(
        <div>
            <Navbar3
                handleSetLocation = {handleSetLocation}
                handleSetDivision = {handleSetDivision}
            />
            <HighchartsReact
                highcharts = {Highcharts}
                options = {options}
                containerProps = {{
                    style: {width: '510px', marginTop: '20px', marginLeft: "110px"}
                }}
            />
        </div>   
    )
}

export default Graph3; 