import { Container } from '@medusajs/ui'
import React from 'react'

function ActiveCartElement() {
  return (
    <Container className='h-32 w-64'>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full">
          <h1>Active Cart</h1>
        </div>
      </div>
    </Container>
  )
}

export default ActiveCartElement