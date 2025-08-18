import React from 'react'

const UserData = () => {
    return (
        <div className=" bg-[#0d1321] flex justify-center items-center p-1 mx-20">
            <div className="flex flex-col md:flex-row gap-10">

               
                <div className="w-70 bg-white rounded-xl shadow-xl transition-transform hover:scale-105">
                    <div className="bg-[#043e6d] h-20 rounded-t-xl relative">
                        <div className="text-white text-center py-1">
                            <h2 className="text-xl font-bold tracking-wide">Octaads Media</h2>
                        </div>
                        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
                            />
                        </div>
                    </div>

                    <div className="mt-12 px-4 pb-4 text-center">
                        <h3 className="font-bold text-lg text-black">Name</h3>
                        <p className="text-sm text-gray-600 font-semibold">DESIGNER</p>
                        <div className="text-sm mt-3 text-left text-gray-700 space-y-1">
                            <p><span className="font-semibold">DOB</span>: DD/MM/YEAR</p>
                            <p><span className="font-semibold">Phone</span>: 1201248510</p>
                            <p><span className="font-semibold">E-mail</span>: email@yourdomain.com</p>
                             <p><span className="font-semibold">salary</span>: 15000</p>
                        </div>
                    </div>
                </div>

                
                <div className="w-70 bg-white rounded-xl shadow-xl transition-transform hover:scale-105">
                    <div className="bg-[#043e6d] h-18 text-white text-center py-2 rounded-t-xl">
                        <h2 className="text-xl font-bold tracking-wide">Octaads Media</h2>
                    </div>

                    <div className="px-4 py-5 text-sm text-gray-700 space-y-3">
                        <p><span className="font-semibold">Join Date</span>: DD/MM/YEAR</p>
                        <p><span className="font-semibold">Expire Date</span>: DD/MM/YEAR</p>

                        <div className="text-center text-gray-600">
                            <p className="mb-1">------------------------</p>
                            <p className="text-sm font-medium">Your Signature</p>
                        </div>

                        <div className="text-center text-xs text-gray-500 pt-3">
                            <p>Your address goes here</p>
                            <p>125 Street, USA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

}

export default UserData