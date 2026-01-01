import Heading from '@/common/Heading';
import Button from '@/ui/Button';
import React, { useState } from 'react';

const preferencesList = Array(7).fill({
  email: "Enewsletter@communityconnects.org",
  title: "Electronic Newsletter",
  description:
    "By selecting this option, you are agreeing to receive an E-mail notice whenever an issue of the Stonebridge News is posted to the Website and is ready for download. Once every registered account at your address chooses electronic delivery, you will no longer receive a printed newsletter via US Postal Service.",
});

const EmailPreference = () => {
  const [checkedItems, setCheckedItems] = useState(Array(preferencesList.length).fill(false));

  const handleCheckboxChange = (index) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Preferences updated:", checkedItems);
  };

  return (
    <div className="w-full md:w-[90%] mx-auto px-4 py-6">
      <Heading heading="Email Preference" />

      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        {preferencesList.map((item, index) => (
          <div
            key={index}
            className="p-6 md:p-8 border border-gray-200 rounded-md bg-white shadow-sm transition hover:shadow-md"
          >
            <label className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
                className="h-5 w-5 text-orange border-gray-300 rounded mb-3 sm:mb-0 mt-1"
              />
              <div>
                <p className="text-blue-500 text-sm sm:text-base overflow-hidden">{item.email}</p>
                <p className=" font-semibold mt-1 text-gray-800">{item.title}</p>
                <p className="mt-1 ">{item.description}</p>
              </div>
            </label>
          </div>
        ))}

        <div className="float-right">
          <Button>
            Update Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailPreference;
