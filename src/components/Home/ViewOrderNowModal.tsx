/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Form, Modal } from "antd";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReuseSelect from "@/components/ui/Form/ReuseSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ViewOrderNowModal = ({
    isModalVisible,
}: {
    isModalVisible: boolean;
}) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();
    const { replace } = router;
    const [form] = Form.useForm();

    const handleCancel = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("order");
        replace(`${pathName}?${params.toString()}`, { scroll: false });
    }

    const handleSubmit = async (values: any) => {

        console.log(values)
        // const res = await tryCatchWrapper(
        //     updateJobPost,
        //     { body: payload, params: currentRecord?._id },
        //     "Updating Job Post...",
        //     "Job post updated successfully!",
        //     "Something went wrong! Please try again."
        // );

        // console.log(res);

        // if (res?.success) {
        //     form.resetFields();
        //     handleCancel();
        // }
    };

    return (
        <Modal
            open={isModalVisible}
            onCancel={() => {
                handleCancel();
                form.resetFields();
            }}
            footer={null}
            centered
            width={900}
            className="z-[9999]"
            title={null}
        >
            <div className="p-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-secondary-color mb-8">
                    Edit Job Post
                </h2>

                <ReusableForm form={form} handleFinish={handleSubmit}>
                    <div className="space-y-8">
                        {/* Job Title */}
                        <ReuseInput
                            name="title"
                            label="Candidate Required"
                            placeholder="Enter Candidate Required"
                            rules={[{ required: true, message: "Candidate Required is required" }]}
                            Typolevel={4}
                            labelClassName="!font-medium text-sm"
                            inputClassName="!py-3"
                        />

                        {/* Job type - Work arrangement */}
                        <ReuseSelect
                            name="jobType"
                            label="Work arrangement"
                            placeholder="Select Work arrangement"
                            options={[
                                {
                                    value: "Onsite",
                                    label: "Onsite",
                                },
                                {
                                    value: "Remote",
                                    label: "Remote",
                                },
                                {
                                    value: "Hybrid",
                                    label: "Hybrid",
                                },
                            ]}
                            Typolevel={4}
                            rules={[{ required: true }]}
                            labelClassName="!font-medium text-sm"
                        />

                        {/* Submit Button */}
                        <div className="flex justify-end mt-10">
                            <ReuseButton
                                htmlType="submit"
                                variant="secondary"
                                className="px-12 py-3 text-lg font-medium"
                            >
                                Update this Project
                            </ReuseButton>
                        </div>
                    </div>
                </ReusableForm>
            </div>
        </Modal>
    );
};

export default ViewOrderNowModal;
