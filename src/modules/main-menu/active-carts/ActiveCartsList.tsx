import React from 'react'
import ActiveCartElement from './ActiveCartElement'

function ActiveCartsList() {
  const carts = Array(6).fill(null)

  return (
    <div className="w-full relative">
      <div className="overflow-x-auto">
        <div className="flex gap-4 w-max p-[2px]">
          {carts.map((_, index) => (
            <ActiveCartElement key={index} isActive={index === 0} />
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-20 pointer-events-none bg-gradient-to-l from-ui-base to-transparent" />
    </div>
  )
}

export default ActiveCartsList