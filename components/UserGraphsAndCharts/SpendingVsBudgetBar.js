import { Bar } from 'react-chartjs-2'

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);
import Category from '../Category';

const categorySumHelper = (transactions, category ) => {
   const selectedTransact = transactions.filter(transaction => transaction.Category == category)
   if (selectedTransact.length == 0) return 0
   return selectedTransact.map(transaction =>
      transaction.Price).reduce((acc, amount) => acc + amount)
}


const SpendingVsBudgetBar = ({ transactions, setting }) => {
   const output1 = transactions
   const output2 = setting
   return ( 
      <div>
         <Bar
            data = {{
               labels: Category,
               datasets: [
                  {
                     label: 'Spent',
                     data: Category.map(cat => (categorySumHelper(output1, cat))),
                     backgroundColor: '#d63e69',
                     stack: 'Stack 0',
                  },

                  {
                     label: 'Budgeted',
                     data: [output2.Entertainment, output2.MedicalHealth, output2.Insurance, output2.Transportation, 
                            output2.MortgageRent, output2.Utilities, output2.Food, output2.PersonalCare, output2.Savings,
                            output2.Debt, output2.Other],
                     backgroundColor: '#546894',
                     stack: 'Stack 1',
                  },
               ],
            }}

            width = {1150}

            options = {{
               plugins: {

                  legend: {
                     labels: {
                        font: { size: 14,
                                family: 'Quicksand' }
                     }
                  },

                  title: {
                     display: true,
                     text: 'Spending vs Budget',
                     font: { size: 20 }
                  }
               },

               responsive: true,
               interaction: {
                  mode: 'index',
                  intersect: false,
               },
               scales: {
                  x: { stacked: true,
                        ticks: {
                           font: { size : 16,
                                   family: 'Quicksand'
                           }
                        } },
                  y: { stacked: true,
                     ticks: {
                        font: { size : 16,
                                family: 'Quicksand'
                        }
                     } },
               },
               
               maintainAspectRatio: false,
            }}
 
         
         
         />



      </div>
    );
}
 
export default SpendingVsBudgetBar;