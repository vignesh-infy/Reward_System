/* This component is used to render the customer details in table
It takes two props
users: this is prop is used to get the user details in an array format 
onclick: this prop is used to handle the user selection and show the selected user details */
import PropTypes from "prop-types";
import "./Table.css";
import { useState } from "react";

const Table = ({ users, onClick, monthNames }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);// for getting the selected user id
  
  // this method is used to calculate the total rewards points for each user
  const getTotalAmount = (user) => {
    return user[monthNames[0]] + user[monthNames[1]] + user[monthNames[2]];
  };

  const handleRowClick = (user) => {
    setSelectedUserId(user.id);
    onClick(user);
  };
  return (
    <table className="table-row">
      <thead className="table-head">
        <tr>
          <th>User Name</th>
          <th>{monthNames[0]}</th>
          <th>{monthNames[1]}</th>
          <th>{monthNames[2]}</th>
          <th>Total Rewards</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="table-body">
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id} className={selectedUserId === user.id ? "highlight" : ""}>
              <td>{user.userName}</td>
              <td>{user[monthNames[0]]}</td>
              <td>{user[monthNames[1]]}</td>
              <td>{user[monthNames[2]]}</td>
              <td>{getTotalAmount(user)}</td>
              <td>
                <button className="btn_class" onClick={() => handleRowClick(user)}>
                  View Details
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="empty-row">
              No Data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  users: PropTypes.array,
  onClick: PropTypes.func,
  monthNames: PropTypes.array
};

export default Table;
