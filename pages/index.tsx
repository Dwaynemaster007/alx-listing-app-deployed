import React from 'react'
const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`);

const index = () => {
  return (
    <div>
      <h2>This is the entry point of the app</h2>
    </div>
  )
}

export default index
