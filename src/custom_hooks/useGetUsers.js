/* This custome hook is used to fetch the data from the json file and 
return the data in the format that is required by the CustomerList component. */
import axios from "axios";
import { useEffect, useState } from "react";
const fetch_url = "http://localhost:3001/customers";
const useGetUsers = (lastThreeMonths) => {
  const [result, setResult] = useState([]); //state is used to store the data fetched from the json file

  // This method is used to filter the transactions based on the last three months
  const filterTransactions = (transactions, lastThreeMonths) => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.toLocaleString("default", { month: "long" });
      return lastThreeMonths.includes(transactionMonth);
    });
  };

  // This method is used to get the transaction amount based on the month
  const getTransactionsByMonth = (transaction) => {
    const monthName = new Date(transaction.date).toLocaleString("default", { month: "long" });
    return {
      month: monthName.toLowerCase(),
      amount: transaction.amount,
    };
  };

  // This method is used to fetch the data from the json file and store it in the state
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const response = await axios.get(fetch_url);
      if (response?.data?.length > 0) {
        setResult(
          response?.data?.map((customer) => {
            const filteredTransactions = filterTransactions(customer.transactions, lastThreeMonths);
            const transactionsByMonth = filteredTransactions.reduce((acc, transaction) => {
              const { month, amount } = getTransactionsByMonth(transaction);
              acc[month] = amount;
              return acc;
            }, {});

            return {
              id: customer?.customer_id,
              userName: customer?.name || "",
              transactions: {
                [lastThreeMonths[0]]: transactionsByMonth[lastThreeMonths[0].toLowerCase()] || 0,
                [lastThreeMonths[1]]: transactionsByMonth[lastThreeMonths[1].toLowerCase()] || 0,
                [lastThreeMonths[2]]: transactionsByMonth[lastThreeMonths[2].toLowerCase()] || 0,
              },
            };
          })
        );
      } else {
        setResult([]);
      }
    };
    fetchCustomerDetails();
  }, [lastThreeMonths]);

  return result;
};

export default useGetUsers;
