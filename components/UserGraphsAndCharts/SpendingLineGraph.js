import { Line } from 'react-chartjs-2'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
 } from 'chart.js';

 ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
 );

const helper = ({ transactions }) => {
  const data = transactions

  // consulted https://stackoverflow.com/questions/19233283/sum-javascript-object-propertya-values-with-the-same-object-propertyb-in-an-arra
  let counts = data.reduce((prev, curr) => {
    let count = prev.get(curr.Date) || 0;
    prev.set(curr.Date, curr.Price + count);
    return prev;
  }, new Map());
  
  // then, map your counts object back to an array
  let reducedObjArr = [...counts].map(([Date, Price]) => {
    Date = Date.split("T")[0]
    return {Date, Price}
  })

  return reducedObjArr.sort(function(a, b){return a.Date > b.Date})

}

const SpendingLineGraph = ({ transactions }) => {
   const output = helper ({ transactions })
   return ( 
      <div>
         <Line
            data = {{
                labels: output.reduce((accumulator, cur) => {
                        accumulator.push(cur.Date);
                        return accumulator;
                        }, []),

                datasets: [
                  {label: 'Spent',
                  data: output.reduce((accumulator, cur) => {
                     accumulator.push(cur.Price);
                     return accumulator;
                     }, []),
                  borderColor: '#F5455c',
                  backgroundColor: '#F5455c',
                  lineTension: 0.3,
                  pointRadius: 2,
                  pointHitRadius: 10
                  },
                ]
              }}
            
            width = {330}

            options = {{
                plugins: {
                  legend: {
                    display: false
                  },

                  title: {
                    display: true,
                    text: 'Spending By Day',
                    font: { size: 20 }
                  },

                  tooltip: {
                    mode: 'index',
                    intersect: false
                  },
                },

                scales: {
                  x: { stacked: true,
                    ticks: {
                       font: { size : 15,
                               family: 'Quicksand'
                       }
                    } },
                  y: { stacked: true,
                     ticks: {
                        font: { size : 15,
                                family: 'Quicksand'
                        }
                     } },
                },

                maintainAspectRatio: false
                
            }}
          />
      </div>
   );
}
 
export default SpendingLineGraph;