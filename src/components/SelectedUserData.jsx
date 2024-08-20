/*
This component is used to display the selected user details. It takes two props:
user: This prop is used to get the selected user details.
userData: This prop is used to get the user data with transaction details.
*/
import MonthData from "./MonthData";
import PropTypes from "prop-types";
const SelectedUserData = ({ user, userData, monthNames }) => (
  <div className="selected-customer">
    <tr className="title-name">{user?.userName}</tr>
    <tr className="data-row">
      <td>
        <MonthData month={monthNames[0]} amount={userData?.transactions?.[monthNames[0]]} rewards={user?.[monthNames[0]]} />
        <MonthData month={monthNames[1]} amount={userData?.transactions?.[monthNames[1]]} rewards={user?.[monthNames[1]]} />
        <MonthData month={monthNames[2]} amount={userData?.transactions?.[monthNames[2]]} rewards={user?.[monthNames[2]]} />
      </td>
    </tr>
    <tr className="footer-row">
      <td className="title">Total Rewards: </td>
      <td>{user[monthNames[0]] + user[monthNames[1]] + user[monthNames[2]]}</td>
    </tr>
  </div>
);
SelectedUserData.propTypes = {
  user: PropTypes.object,
  userData: PropTypes.object,
  monthNames: PropTypes.array
};
export default SelectedUserData;
