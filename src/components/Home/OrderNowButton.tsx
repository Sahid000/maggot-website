import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import { BsCartCheckFill } from 'react-icons/bs';

const OrderNowButton = () => {

    return (
        <Link href="/order">
            <Button className="group flex items-center !py-4 !px-2 gap-1 border-2 !border-secondary-color !bg-secondary-color !text-primary-color rounded-full">
                <p className="font-semibold mt-1">অর্ডার করতে চাই</p>
                <BsCartCheckFill className=" text-xl text-primary-color" />
            </Button>
        </Link>
    );
};

export default OrderNowButton;
