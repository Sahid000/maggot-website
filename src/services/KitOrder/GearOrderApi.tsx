"use server";
import TagTypes from "@/helpers/config/TagTypes";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchWithAuth } from "@/utils/fetchWraper";
import { revalidateTag } from "next/cache";

export const gearOrder = async (
    req = {
        body: {},
        params: {},
    }
) => {
    try {
        const res = await fetchWithAuth(`/gear-order/checkout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Add content type header for JSON
            },
            body: JSON.stringify(req.body),
        });
        const result = await res.json();
        revalidateTag(TagTypes.order);

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
