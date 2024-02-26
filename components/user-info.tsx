import React from 'react'
import Image from "next/image";

const UserInfoSection = () => {
  return (
    <div className="w-full flex items-center justify-center gap-4 p-1 bg-white dark:bg-black rounded-lg">
    <div className="relative">
      <Image
        src="/person.png"
        alt="User Profile Photo"
        width={100}
        height={100}
        className="h-10 w-10 rounded-full shrink-0"
      />
      <div className="absolute left-1 top-0 h-2 w-2 rounded-full bg-green-500" />
    </div>
    <h3 className="text-xl font-semibold">User&apos;s Name</h3>
  </div>  )
}

export default UserInfoSection