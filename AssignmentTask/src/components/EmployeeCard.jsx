import React from 'react'
import mail from "../assets/mail.png"
import { FiEdit } from 'react-icons/fi'
import { useState } from 'react'
import EditEmployeeForm from './EditEmployee'



const EmployeeCard = ({ employee }) => {
    
  const [showModal, setShowModal] = useState(false);
  


    return (
        

    <div className="flex justify-center items-center ">
      <div className="flip-card w-[300px] h-[500px]">
        <div className="flip-card-inner relative w-full h-full">
          {/* FRONT SIDE */}
          <div className="flip-card-front absolute w-full h-full bg-white rounded-xl overflow-hidden shadow-xl border">
            <div className="bg-[#043e6d] h-24 relative">
              <div className="text-white text-center py-4">
                <h2 className="text-lg font-bold">COMPANY NAME</h2>
                <p className="text-sm">TAG LINE GOES HERE</p>
              </div>
              <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white object-cover"
                />
              </div>
            </div>

            <div className="mt-16 px-4 text-center">
              <h3 className="font-bold text-lg text-[#801b3b]">JOHN DOE</h3>
              <p className="text-sm text-gray-600 font-semibold">DESIGNER</p>
              <div className="text-sm mt-4 text-left text-gray-700">
                <p><span className="font-semibold">ID NO</span> : 905750250</p>
                <p><span className="font-semibold">DOB</span> : DD/MM/YEAR</p>
                <p><span className="font-semibold">Blood</span> : A+</p>
                <p><span className="font-semibold">Phone</span> : 1201248510</p>
                <p><span className="font-semibold">E-mail</span> : email@yourdomin.com</p>
              </div>

           
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="flip-card-back absolute w-full h-full bg-white rounded-xl overflow-hidden shadow-xl border">
            <div className="bg-[#043e6d] h-20 text-white text-center py-3">
              <h2 className="text-lg font-bold">COMPANY NAME</h2>
              <p className="text-sm">TAG LINE GOES HERE</p>
            </div>

            <div className="px-4 py-6 text-sm text-gray-700">
              <h3 className="text-[#1da1f2] font-semibold mb-2">TERMS AND CONDITIONS</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Lorem ipsum dolor sit amet, consectetur elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur elit.</li>
              </ul>

              <p><span className="font-semibold">Join Date</span> : DD/MM/YEAR</p>
              <p><span className="font-semibold">Expire Date</span> : DD/MM/YEAR</p>

              <div className="mt-4 text-center text-gray-600">
                <p className="mb-1">------------------------</p>
                <p className="text-sm font-medium">Your Signature</p>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                <p>Your address goes here</p>
                <p>125 Street, USA</p>
              </div>
                 <div className="mt-5 flex gap-4 justify-between">
               <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 cursor-pointer"  onClick={() => setShowModal(true)}>
                        Edit
                   </button>
                   <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 cursor-pointer"  onClick={() => setShowModal(true)}>
                        view Details
                   </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
      <EditEmployeeForm
          onSave={(values) => {
            console.log('Saved values:', values);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        /> 
      )}
    </div>
 
    )
}


export default EmployeeCard