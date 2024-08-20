/*
This component is used to display the month wise data of the user. 
It takes month, amount and rewards as props and displays them in a table format.
*/
import PropTypes from "prop-types";
const MonthData = ({ month, amount, rewards }) => (
  <span className="month-row">
    <tr className="title">{month}</tr>
    <tr>
      <tr>
        <td className="title">Amount spent: </td>
        <td>{amount}</td>
      </tr>
      <tr>
        <td className="title">Rewards earned: </td>
        <td>{rewards}</td>
      </tr>
    </tr>
  </span>
);
MonthData.propTypes = {
  month: PropTypes.string,
  amount: PropTypes.number,
  rewards: PropTypes.number
};
export default MonthData;
