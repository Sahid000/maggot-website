"use client";
import { Button } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { BsCartCheckFill } from 'react-icons/bs';

const OrderNowButton = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();
    const { replace } = router;

    const showOrderNowButton = (() => {
        const text = "Now";
        const params = new URLSearchParams(searchParams);
        if (text) {
            params.set("order", text); // Use the dynamic "order"
        } else {
            params.delete("order"); // Remove the dynamic "order" if text is empty
        }
        replace(`${pathName}?${params.toString()}`, { scroll: false });
    });
    return (
        <span>
            <Button onClick={showOrderNowButton} className="group flex items-center !py-4 !px-2 gap-1 border-2 !border-secondary-color !bg-secondary-color !text-primary-color rounded-full">
                <p className="font-semibold mt-1">অর্ডার করতে চাই</p>
                <BsCartCheckFill className=" text-xl text-primary-color" />
            </Button>
        </span>
    );
};

export default OrderNowButton;