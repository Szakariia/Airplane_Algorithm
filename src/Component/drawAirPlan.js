import React from 'react';
import { MdChair } from "react-icons/md"
function Draw({Obj, Arr3D}){

// check
if (!Arr3D) return ""

return(
    <div className="z-0">
        <div className='flex justify-center items-center'>
            <p className="text-xl text-gray-500 p-3 border-b border-color-500 ">
                Remaining Passengers: {Obj.Passengers}
            </p>
        </div>
        <div className='flex flex-wrap justify-center'>
      {Arr3D.map((array1, row) => (
        <div key={row} className="flex flex-col m-5">
          {array1.map((array2, col) => (
            <div key={col} className="flex flex-row" >
              {array2.map((value, index) => (
                <div key={index} className={`${-value ? 'text-gray-500' : 'text-green-500'}`}>
                <div className='relative'>
                    <MdChair size={50} />
                    <div className='absolute left-4 top-1 text-bold text-white'>
                         <p>{value ? value : ""}</p>
                    </div>    
                </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}</div>
    </div>
)
}

export default Draw;