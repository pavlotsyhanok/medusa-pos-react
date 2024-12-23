import React from 'react'
import ActiveCartElement from './ActiveCartElement'

function ActveCartsList() {
  const carts = Array(6).fill(null)

  return (
    <div className="w-full overflow-x-auto p-[2px]">
      <div className="flex gap-4 w-max">
        {carts.map((_, index) => (
          <ActiveCartElement key={index} />
        ))}
      </div>
    </div>
  )
}

export default ActveCartsList