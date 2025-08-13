"use client";
import React, { useState } from "react";
import Accordion from "../ui/Accordion";

const FAQGenerate = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const accordionsData = [
    {
      title: "ম্যাগট-ফ্রি রেসকিউ কিট কি?",
      content:
        "এটি একটি সম্পূর্ণ চিকিৎসা কিট যা কুকুর ও বিড়ালের ম্যাগট আক্রমণ দ্রুত ও কার্যকরভাবে দূর করতে সহায়তা করে। এতে ক্ষত পরিষ্কার, জীবাণুমুক্ত ও সংক্রমণ প্রতিরোধের জন্য প্রয়োজনীয় সব উপকরণ রয়েছে।",
    },
    {
      title: "এই কিট কারা ব্যবহার করতে পারবেন?",
      content:
        "যে কেউ, এমনকি পেশাদার চিকিৎসা জ্ঞান ছাড়াও, কিটের সাথে দেওয়া ধাপে ধাপে নির্দেশিকা মেনে সহজেই ব্যবহার করতে পারবেন।",
    },
    {
      title: "কিটে কী কী থাকবে?",
      content:
        "কিটে A-Mectin Vet Ivermectin Drop, Alice 12mg ট্যাবলেট, Scabo 6mg ট্যাবলেট, Moxacil 500mg Capsule, Nebanol Powder, Profenid-E 50mg Tablet এবং Step-by-step Guide Book অন্তর্ভুক্ত।",
    },
    {
      title: "এটি কি প্রাণীর জন্য নিরাপদ?",
      content:
        "হ্যাঁ, কিটের প্রতিটি পণ্য কুকুর ও বিড়ালের জন্য পরীক্ষিত, নিরাপদ এবং কার্যকরী।",
    },
    {
      title: "বাংলাদেশের যেকোনো জায়গায় কি ডেলিভারি পাওয়া যাবে?",
      content:
        "হ্যাঁ, আমরা সারা বাংলাদেশে কুরিয়ার সার্ভিসের মাধ্যমে ডেলিভারি দিয়ে থাকি।",
    },
    {
      title: "কিভাবে অর্ডার করব?",
      content:
        "আপনি আমাদের ওয়েবসাইটের ‘অর্ডার করতে চাই’ পেজে গিয়ে অনলাইনে অর্ডার করতে পারবেন অথবা আমাদের ফোন নম্বরে যোগাযোগ করতে পারবেন।",
    },
    {
      title: "ডেলিভারির সময় কত দিন লাগবে?",
      content:
        "সাধারণত ২-৫ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়, তবে গ্রামীণ বা দূরবর্তী এলাকায় কিছুটা সময় বেশি লাগতে পারে।",
    },
  ];

  return (
    <div>
      {accordionsData.map((item, index) => (
        <Accordion
          key={index}
          title={item.title}
          content={item.content}
          isOpen={activeIndex === index}
          onToggle={() =>
            setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
          }
        />
      ))}
    </div>
  );
};

export default FAQGenerate;
