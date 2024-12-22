import React from 'react'
import { Loader } from '@medusajs/icons'

function PageLoader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin" />
    </div>
  )
}

export default PageLoader