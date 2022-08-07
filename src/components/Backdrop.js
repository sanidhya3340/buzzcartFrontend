import React from 'react'

export default function Backdrop({show,click}) {
    return show && <div className="w-full h-screen z-10 fixed top-0 left-0 bg-gray-600 opacity-40 cursor-pointer" onClick={click} >
            
        </div>
    
}
