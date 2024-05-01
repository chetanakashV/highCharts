// import HighchartsReact from 'highcharts-react-official'
// import Highcharts from 'highcharts/highstock';
// import React, {useState, useEffect, useCallback, useRef} from 'react'
// import { ArcherContainer, ArcherElement } from 'react-archer';
// import { useSvgDrawing } from "react-hooks-svgdrawing";
// import 'reactflow/dist/style.css';
// import ReactFlow, { addEdge, useNodesState, useEdgesState } from 'reactflow';
// import CustomEdge from './CustomEdge';
// import ArrowCanvas from './Test';
// import './Graphs.css'
// import 'reactflow/dist/style.css';
// require("highcharts/modules/exporting")(Highcharts);

// var centerx = 650, centery = 280; 

// const Graphtest = () =>{
//   const graphRef = useRef(null);
//   const overlayRef = useRef(null);
//     const [chartType, setChartType] = useState("pie");
//     const [position, setPosition] = useState({x: 0, y: 0})
//     const [x, setX] = useState(0)
//     const [y, setY] = useState(0)


//     const handleMouseMove2 = (event) => {
//         setX(event.clientX); setY(event.clientY);
//     }
    
//     useEffect(() => {
//       const graphElement = graphRef.current;
//       const overlayCanvas = overlayRef.current;
//       const context = overlayCanvas.getContext('2d');
  
//       const handleMouseMove = (event) => {
//         const rect = overlayCanvas.getBoundingClientRect();
//         const mouseX = event.clientX - rect.left;
//         const mouseY = event.clientY - rect.top;
  
//         // Clear the overlay canvas
//         context.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  
//         // Fixed point to draw the arrow to
//         const fixedPoint = { x: overlayCanvas.width / 2, y: overlayCanvas.height / 2 };
  
//         // Draw the arrow
//         drawArrow(context, mouseX, mouseY, fixedPoint.x, fixedPoint.y);
//       };
  
//       // Attach event listener to the graph (not the overlay)
//       graphElement.addEventListener('mousemove', handleMouseMove);
  
//       return () => {
//         graphElement.removeEventListener('mousemove', handleMouseMove);
//       };
//     }, []);

//     const drawArrow = (context, fromX, fromY, toX, toY) => {
//       const arrowLength = 10; // Length of the arrowhead
//       const angle = Math.atan2(toY - fromX, toX - fromY);
  
//       // Draw the line
//       context.beginPath();
//       context.moveTo(fromX, fromY);
//       context.lineTo(toX, toY);
//       context.strokeStyle = 'black';
//       context.lineWidth = 2;
//       context.stroke();
  
//       // Draw the arrowhead
//       context.beginPath();
//       context.moveTo(toX, toY);
//       context.lineTo(
//         toX - arrowLength * Math.cos(angle - Math.PI / 6),
//         toY - arrowLength * Math.sin(angle - Math.PI / 6)
//       );
//       context.lineTo(
//         toX - arrowLength * Math.cos(angle + Math.PI / 6),
//         toY - arrowLength * Math.sin(angle + Math.PI / 6)
//       );
//       context.closePath();
//       context.fillStyle = 'black';
//       context.fill();
//     };
  
// const options = {

//   title: {
//     text: 'Title loremipsm',
//     align :'center',
//     // margin: '1.5',
//     style: {
//       fontWeight: "normal", 
//     }
//   },
//    chart: {
//       type: chartType, 
//       zoomType: 'xy'
//    },
//   series: [
//     {
//         id: 'animals', 
//         name: 'Title',
//         data: [{
//           y: 5 , 
//           name: "Lorem"
//           ,description: "This is Lorem"
//         },  {
//           y: 10 , 
//           name: "Ipsum"
//           ,description: "This is Ipsum"
//         }, {
//           y: 20 , 
//           name: "Design"
//           ,description: "This is Design"
//         },{
//           y: 40 , 
//           name: "Work"
//           ,description: "This is Work"
//         },{
//           y: 25 , 
//           name: "Others"
//           ,description: "This is Others"
//           }],
//       legendSymbol: 'rectangle'
//       },
      
//   ], 
//   // To remove the watermark of the graph
//   credits: {
//     enabled: false, 
//     href: "https://www.linkedin.com/in/chetanakash-vankadara-3a0548217/", 
//     text: 'creator'
//   }, 
//   // For showing legend 
//   legend: {
//     align: 'right', 
//     floating: true,
//     squareSymbole: true,
//     bubbleLegend: {
//       enabled: true
//     },
//     labelFormatter: function () {
//       return '<div >' +
//                  "<span style=' font-family:proximaNovaBold; '> " + this.name + " " + this.y + "%"+  " </span>" +
//              '</div>'
//   }
//   }, 

//     plotOptions: {
//       series: {
//         states: {
//           hover: {
//             halo: {
//               opacity: 1
//             }
//           },
//           inactive: {
//             opacity :1
//           }, 
//           active: {
//             opacity: 1
//           }
//         }
//       },
//         pie: {
//             allowPointSelect: true,
//             cursor: 'pointer',
//             dataLabels: {
//                 enabled: false
//             },
//             showInLegend: true,
//             borderRadius: '0px',
//             borderWidth: '1',
//             borderColor: 'null', 
//             depth: '1.5',
//             opacity: 1, 
//             animation: true,
//             size: '100%',
//             slicedOffset: '10'
//         },
      
//     },
//    tooltip: {
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

//             //Position relative to renderTo container

//             var newX, newY; 
//             var top, left; 

//             if(position.x > centerx){ newX = 850; left = false; }
//             else {newX = 250; left = true; }
//             if(position.y > centery) {newY = 300; top = false; } 
//             else {newY = 50; top = true;  }

            

//             return {
//                 x: newX,
//                 y: newY
//             }

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
//         },
   
//   xAxis: {
//      gridLineWidth: 0,
//      minorTickInterval: 0,
//      type: 'category',
//      min: 1, 
//      max: 2,
//      range: 0.1,
//      scrollbar: {
//       enabled: true,
//     }
//     },

    
//   navigation: {
//       buttonOptions: {
//           enabled: true, 
//           align: 'right', 
//           floating: false, 
//           useHtml: true, 
//       }
//   },
//   exporting: {
//     buttons: {
//         contextButton: {
//             symbol: 'menuball', 
//             symbolStroke: 'black',
//             symbolFill: 'blue'
//         }
//     }
// },
//   responsive: {  
//     rules: [{  
//       condition: {  
//         maxWidth: 500  
//       },  
//       chartOptions: {  
//         legend: {  
//           enabled: false  
//         }  
//       }  
//     }]  
//   },

//     yAxis: {
//       min: 0, 
//       max: 30,
//       title: {text: "Amount"},
//       scrollbar: {
//         enabled: 'true'
//       },
//     },
   

//    xAxis:[ {
//       title: {text: "x axis values"}
//    }],
   

   
// }

// const initialNodes = [
//   { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
//   { id: 'b', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
// ];

// const initialEdges = [
//   { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
// ];

// const edgeTypes = {
//   'custom-edge': CustomEdge,
// };

// const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
// const onConnect = useCallback(
//   (connection) => {
//     const edge = { ...connection, type: 'custom-edge' };
//     setEdges((eds) => addEdge(edge, eds));
//   },
//   [setEdges],
// );


//     return (
//       <div
//         style={{ height: "750px", width: "100%", position: "relative" }} onMouseMove={handleMouseMove2}
//       >

//                {x} {y}    
//             <div ref={graphRef} style={{ width: 1000, height: 1000, backgroundColor: 'lightgray' }}>
//             <div className="container" style={{ textAlign: "right" }}>
//              <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options}
//                 containerProps={{
//                   style: { width: "100%", border: "2px", borderColor: "blue", backgroundColor: 'none' },
//                 }}
//               />
//             </div>

//             <canvas
//                ref={overlayRef}
//                width={1000}
//                 height={1000}
//                 style={{ position: 'absolute', top: -287, left: -8, backgroundColor: 'none', pointerEvents: 'none'}}>

//             </canvas>

//             </div>



//       </div>
//     );

// }

// export default Graphtest; 