import { Avatar, Image } from '@nextui-org/react'
import React from 'react'

export default function Header() {
    return <>
    <div className="bg-white w-full h-16 p-4 fixed top-0 z-50 flex justify-between items-center border-b-1 border-slate-100">
        <Image src="Images/smf logo.png" className="w-11 h-11"/>

        <div className="flex items-center ">
            <Avatar color="default" className="w-10 h-10" src="https://i.pravatar.cc/150?u=a042581f4e29026704d"/>
            <div className="ms-2 leading-none">
                <h5 className="text-small text-foreground">mariam</h5>
                <p className= "text-tiny text-foreground-400">Student</p>
            </div>
        </div>
    </div>
    </>
}
