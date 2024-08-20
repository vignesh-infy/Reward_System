/*
This component is used to display the list of customers and their transaction details.
It uses the useGetUsers custom hook to fetch the data from the json file and
 then calculate the rewards points for each customer based on their transaction amount.
*/
import { useMemo, useState } from "react";
import Table from "./Table";
import useGetUsers from "../custom_hooks/useGetUsers";
import "../App.css";
import SelectedUserData from "./SelectedUserData";

const CustomerList = () => {
  const [users, setUsers] = useState([]); // for storing the user data with reward points
  const [selectedUser, setSelectedUser] = useState(null); // for showing selected user details

  // This method is used to get the last three months name
  const lastThreeMonths = useMemo(() => {
    const monthNames = [];
    for (let i = 1; i < 4; i++) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      monthNames.push(d.toLocaleString("default", { month: "long" }));
    }
    return monthNames.reverse();
  }, []);
  const User_List = useGetUsers(lastThreeMonths);
  // This method is used to calculate the reward points based on the transaction amount
  const calculateRewardPoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2;
      amount = 100;
    }
    if (amount > 50) {
      points += (amount - 50) * 1;
    }
    return points;
  };
  // This method is used to handle the user selection and show the selected user details
  const handleUserSelection = (user) => {
    const userData = User_List.find((customer) => customer.id === user.id);

    setSelectedUser(<SelectedUserData user={user} userData={userData} monthNames={lastThreeMonths} />);
  };
  useMemo(() => {
    if (User_List.length > 0) {
      const usersData = User_List.map((customer) => {
        return {
          id: customer?.id,
          userName: customer?.userName,
          [lastThreeMonths[0]]: calculateRewardPoints(customer?.transactions?.[lastThreeMonths[0]]),
          [lastThreeMonths[1]]: calculateRewardPoints(customer?.transactions?.[lastThreeMonths[1]]),
          [lastThreeMonths[2]]: calculateRewardPoints(customer?.transactions?.[lastThreeMonths[2]]),
        };
      });
      setUsers(usersData);
    }
  }, [User_List, lastThreeMonths]);
  return (
    <div className="container">
      <Table users={users} onClick={handleUserSelection} monthNames={lastThreeMonths} />
      {selectedUser}
    </div>
  );
};

export default CustomerList;
