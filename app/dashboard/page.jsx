import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'


function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-extrabold text-2xl' style={{ color: '#dc1a1a' }}>Dashboard</h2>
      <h2 className=' font-semibold text-lg text-white'>Create and Start your AI Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
      </div> 
    </div>
  )
}

export default Dashboard
