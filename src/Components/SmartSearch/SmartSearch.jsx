import { Input } from '@nextui-org/react';
import React from 'react'

export default function SmartSearch({
    searchQuery, 
    handleInputChange =()=>{}
}) {

        return (
            <Input
                // label="Email"
                placeholder="اكتب اسم الترنيمة"
                value={searchQuery}
                onChange={handleInputChange}
                radius='sm'
                classNames={{
                    input: "text-right",
                }}
            />
        );
}
