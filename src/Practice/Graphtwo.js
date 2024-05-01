import React, {useEffect,useState} from "react";
import Axios from 'axios'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock';

var stockData ; 
const Graphtwo = () =>{
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';

    const [options, setOptions] = useState({
        title: {
            text: 'Chart with time'
          },
          xAxis: {
            type: 'category',
            min: 0, 
            max: 5,
            scrollbar: {
              enabled: true
            }
          },
          chart: {
            type: 'column', 
            zoomType: 'xy'
         }, series: [{ data: stockData }]
    })

    useEffect(() => {
        Axios.get(url).then(data => {
            stockData = data.data['Time Series (Daily)']
            setOptions({ series: [{ data: data.data['Time Series (Daily)'] }] });
        })
    }, [])

    var chartType = 'column'



    return(
        <>
          <HighchartsReact 
             highcharts={Highcharts}
             jsonData = {stockData}
             options = {options}
          />
        </>
    )
}

export default Graphtwo; 