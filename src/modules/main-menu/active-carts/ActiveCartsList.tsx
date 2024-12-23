import React from 'react'
import ActiveCartElement from './ActiveCartElement'

function ActiveCartsList() {
  const carts = Array(6).fill(null)

  return (
    <div className="w-[100vw] lg:w-full lg:px-0 overflow-x-auto p-[2px] pb-[3px] lg:px-[1px]">
      <div className="flex gap-4 w-max">
        {carts.map((_, index) => (
          <ActiveCartElement key={index} isActive={index === 0} />
        ))}
      </div>
    </div>
  )
}

export default ActiveCartsList