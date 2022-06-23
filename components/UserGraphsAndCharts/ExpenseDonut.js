import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend);
import GraphColors from './GraphColors'
import Category from '../Category'


const categorySumHelper = (transactions, category ) => {
   const selectedTransact = transactions.filter(transaction => transaction.Category == category)
   if (selectedTransact.length == 0) return 0
   return selectedTransact.map(transaction =>
      transaction.Price).reduce((acc, amount) => acc + amount)
}

const ExpenseDonut = ({ transactions }) => {  
   const output = transactions
   return (
      <div>
         <Doughnut
            data = {{labels: Category,
                     datasets: [{
                        data: Category.map(cat => (categorySumHelper(output, cat))),
                        backgroundColor: GraphColors
                     }],
                   }}
         
            width = {330}
            
            options={{
               plugins: {
                  legend: {
                     labels: {
                        font: { size: 13,
                                family: 'Quicksand' }
                     }
                  },

                  title: {
                     display: true,
                     text: 'Spending By Category',
                     font: { size: 20 }
                  },
               }
            }} />
      </div>
   );
}
 
export default ExpenseDonut;