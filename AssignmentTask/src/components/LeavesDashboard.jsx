import React from 'react'
import {
  FaUmbrellaBeach,      
  FaCalendarCheck,      
  FaSadTear,            
  FaLaptopHouse         
} from "react-icons/fa";

const LeaveCard = ({ type, balance, consumed, icon: Icon, btnText }) => (
  <div className="bg-white shadow-md rounded-lg flex flex-col p-4 ">
    <div className='flex justify-between items-center mb-2'>
      <h2 className="text-lg font-bold">{type}</h2>
      <Icon className="text-3xl text-black" />
    </div>
    <div className='flex justify-between items-center'>
      <div className='flex flex-col'>
        {balance !== null && <p className="text-sm">Balance: <b>{balance}</b></p>}
        <p className="text-sm">Consumed: <b>{consumed}</b></p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm rounded mt-2 cursor-pointer">
        {btnText}
      </button>
    </div>
  </div>
);

const LeavesDashboard = () => {
    return (
      <div className="grid grid-cols-4 gap-6 flex-wrap justify-center mt-6">
      <LeaveCard
        type="Casual Leaves"
        balance={0}
        consumed={0}
        icon={FaUmbrellaBeach}
        btnText="Apply CL"
      />
      <LeaveCard
        type="Planned Leaves"
        balance={0}
        consumed={0}
        icon={FaCalendarCheck}
        btnText="Apply PL"
      />
      <LeaveCard
        type="Sick Leaves"
        balance={0}
        consumed={0}
        icon={FaSadTear}
        btnText="Apply SL"
      />
      <LeaveCard
        type="WFH"
        balance={null}
        consumed={0}
        icon={FaLaptopHouse}
        btnText="Apply WFH"
      />
    </div>
    )
}

export default LeavesDashboard