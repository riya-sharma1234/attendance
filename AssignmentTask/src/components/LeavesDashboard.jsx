
// import React, { useEffect } from "react";
// import {
//   FaUmbrellaBeach,
//   FaCalendarCheck,
//   FaSadTear,
//   FaLaptopHouse,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLeaveBalances } from "../redux/LeaveSlice";

// const LeaveCard = ({ type, balance, consumed, icon: Icon, btnText, onApply }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg flex flex-col p-4">
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="text-lg font-bold capitalize">{type}</h2>
//         <Icon className="text-3xl text-black" />
//       </div>
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col">
//           {balance !== null && (
//             <p className="text-sm">
//               Balance: <b>{balance}</b>
//             </p>
//           )}
//           <p className="text-sm">
//             Consumed: <b>{consumed}</b>
//           </p>
//         </div>
//         <button
//           onClick={onApply}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm rounded mt-2 cursor-pointer"
//         >
//           {btnText}
//         </button>
//       </div>
//     </div>
//   );
// };

// const LeavesDashboard = ({ user }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // redux state
//   const { consumedLeaves, balance } = useSelector((state) => state.leave);

//   useEffect(() => {
//     if (!user) {
//       // agar props me user nahi aaya hai to redux ka API call kare
//       dispatch(fetchLeaveBalances());
//     }
//   }, [dispatch, user]);

//   const handleApply = (leaveType) => {
//     navigate("/apply-leave", { state: { leaveType, userId: user?._id } });
//   };

//   const leaveTypes = [
//     { type: "casual", icon: FaUmbrellaBeach, btnText: "Apply CL" },
//     { type: "planned", icon: FaCalendarCheck, btnText: "Apply PL" },
//     { type: "sick", icon: FaSadTear, btnText: "Apply SL" },
//     { type: "wfh", icon: FaLaptopHouse, btnText: "Apply WFH" },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
//       {leaveTypes.map((leave) => (
//         <LeaveCard
//           key={leave.type}
//           type={leave.type}
//           consumed={
//             user?.consumedLeaves?.[leave.type] ||
//             consumedLeaves?.[leave.type] ||
//             0
//           }
//           balance={
//             user?.leaveLimits?.[leave.type] ||
//             balance?.[leave.type] ||
//             (leave.type === "wfh" ? "Unlimited" : 0)
//           }
//           icon={leave.icon}
//           btnText={leave.btnText}
//           onApply={() => handleApply(leave.type)}
//         />
//       ))}
//     </div>
//   );
// };

// export default LeavesDashboard;




import React, { useEffect } from "react";
import {
  FaUmbrellaBeach,
  FaCalendarCheck,
  FaSadTear,
  FaLaptopHouse,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveBalances } from "../redux/LeaveSlice";

const LeaveCard = ({ type, balance, consumed, icon: Icon, btnText, onApply }) => {
  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold capitalize">{type}</h2>
        <Icon className="text-3xl text-black" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          {balance !== null && (
            <p className="text-sm">
              Balance: <b>{balance}</b>
            </p>
          )}
          <p className="text-sm">
            Consumed: <b>{consumed}</b>
          </p>
        </div>
        <button
          onClick={onApply}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm rounded mt-2 cursor-pointer"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

const LeavesDashboard = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state: consumedLeaves and balance
  const { consumedLeaves, balance } = useSelector((state) => state.leave);

  // Fetch latest balances on mount if no user passed
  useEffect(() => {
    dispatch(fetchLeaveBalances());
  }, [dispatch]);

  const handleApply = (leaveType) => {
    navigate("/apply-leave", { state: { leaveType, userId: user?._id } });
  };

  const leaveTypes = [
    { type: "casual", icon: FaUmbrellaBeach, btnText: "Apply CL" },
    { type: "planned", icon: FaCalendarCheck, btnText: "Apply PL" },
    { type: "sick", icon: FaSadTear, btnText: "Apply SL" },
    { type: "wfh", icon: FaLaptopHouse, btnText: "Apply WFH" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {leaveTypes.map((leave) => {
        const type = leave.type;

        // Determine consumed and balance from Redux first, fallback to user prop
        const consumed =
          consumedLeaves?.[type] ?? user?.consumedLeaves?.[type] ?? 0;

        let leaveBalance =
          balance?.[type] ?? user?.balance?.[type] ?? user?.leaveLimits?.[type];

        // If WFH type is unlimited
        if (type === "wfh" && leaveBalance === undefined) leaveBalance = "Unlimited";

        return (
          <LeaveCard
            key={type}
            type={type}
            consumed={consumed}
            balance={leaveBalance}
            icon={leave.icon}
            btnText={leave.btnText}
            onApply={() => handleApply(type)}
          />
        );
      })}
    </div>
  );
};

export default LeavesDashboard;

