import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DropzoneAreaComponent from './dropzone-container.js'
import { Bar } from 'react-chartjs-2';
var _ = require('lodash');

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TaskTwo(props) {
  const classes = useStyles();
  const [chartData, setchartData] = React.useState({});

  useEffect(() => {

  }, []);

  const dropCallbackEvent = ({data, isSuccess}:cbData) => {
     console.log("data", data)
     setchartData(data);
  };

  return (
     <Container maxWidth="lg" style={{position: 'relative'}} >
      <DropzoneAreaComponent onChangeEvent={dropCallbackEvent} />

      <Bar
        data={getFormattedChartData(chartData)}
        width={100}
        height={20}
         title="My amazing data"
        color="#70CAD1"
        options={{ maintainAspectRatio: true }}
      />
    </Container>
  );
}


const getFormattedChartData = (chartData) => {
  let xAxisLabels = _.map(chartData, "KP"),
      yAxisLabels = _.map(chartData, "X");

  return {
      labels: xAxisLabels,
      datasets: [
        {
          label: 'CVS file data chart',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: yAxisLabels
        }
      ]
    }
};