## Overview

Dolla is a personal budget and expense tracking app built with Next.js, NextAuth, and MongoDB.

The app features a functional and interactive dashboard that is powered by Chart.js. With the dashboard, users can visualize their financial habits and better manage their spendings. Additionally, users have the option to view their spending history through a transaction table that tracks all of the users' expenses. This table contains both search and sorting functionalities, allowing users to find specific transactions quickly and efficiently.

To begin, users will sign in with their Google account in the homepage:

![homepage](https://github.com/jasonlin111/DollaFinance/blob/bd835adc55d4a55f997e0365f3b8a1e4916c135a/README_IMAGES/homepage.png)

For first-time users, they will be prompted by a notification to set up their budget when they're on the `\overview` or `\transactions` pages:

![set setting notification](https://github.com/jasonlin111/DollaFinance/blob/bd835adc55d4a55f997e0365f3b8a1e4916c135a/README_IMAGES/setSettingNotification.png)

Setting up budget in `\setting`:

![set setting/budget](https://github.com/jasonlin111/DollaFinance/blob/bd835adc55d4a55f997e0365f3b8a1e4916c135a/README_IMAGES/setting.png)

When users navigate to `\transactions` again, users will be greeted with a similar message that they need to create a transaction first:

![create transaction nottification](https://github.com/jasonlin111/DollaFinance/blob/bd835adc55d4a55f997e0365f3b8a1e4916c135a/README_IMAGES/createTransactionNotification.png)

Creating a transaction in `\create`:

![create transaction](https://github.com/jasonlin111/DollaFinance/blob/bd835adc55d4a55f997e0365f3b8a1e4916c135a/README_IMAGES/create.png)

This is what the dashboard and transactions table may look like, respectively, if the user inputted more transactions.

![dashboard](https://github.com/jasonlin111/DollaFinance/blob/bd835adc55d4a55f997e0365f3b8a1e4916c135a/README_IMAGES/dashboard.png)
![transactions table](https://github.com/jasonlin111/DollaFinance/blob/bd835adc55d4a55f997e0365f3b8a1e4916c135a/README_IMAGES/transactionTable.png)

Users can choose to edit a transaction and the change will be immediate in both the dashboard and the table.

![editing transaction](https://github.com/jasonlin111/DollaFinance/blob/bd835adc55d4a55f997e0365f3b8a1e4916c135a/README_IMAGES/editTransaction.png)

Likewise, users can edit their budget in `Setting` and the dashboard and table will reflect the change.

## Getting Started

### 1. Install the necessary dependencies
```bash
npm install
# or
yarn install
```

### 2. Configure environment variables
Rename the `.env.local.example` file to `.env.local`.

Copy over the connection string of your MongoDB server as well as your OAuth credentials (Client ID and Client Secret) from Google Developers Console.

Lastly, for NEXTAUTH_SECRET, you can get a random string by trying `openssl rand -hex 32` in the terminal. This string is used for 
cryptographic purposes.


### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to get started.
