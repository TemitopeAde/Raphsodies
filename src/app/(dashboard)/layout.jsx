import Dashboard from '@/components/Dashboard'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className=''>
        {children}
        <Dashboard />
    </div>
  )
}

export default layout