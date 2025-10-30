import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../redux/punchSlice";

const EmployeeList = () => {
 

  const dispatch = useDispatch();
   useEffect(() => {
  console.log("👀 EmployeeList mounted");
  dispatch(fetchEmployees());
}, [dispatch]);
  const { data: punch, loading, error } = useSelector((state) => state.punch); // ✅ FIXED
  console.log(punch);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {punch.map((emp) => (
          <li key={emp.EmpID}>
            {emp.FirstName} {emp.LastName} - {emp.Designation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
