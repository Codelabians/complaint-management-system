import Heading from "@/common/Heading";
import Button from "@/ui/Button";
import { ChevronDown, Edit3, Search } from "lucide-react";
import React, { useState } from "react";


const Faqs = () => {
   const [activeTab, setActiveTab] = useState('All Questions');
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
    'All Questions',
    'Pool & Amenities', 
    'Facilities',
    'Maintenance',
    'Safety & Security'
  ];

   const faqData = {
    'All Questions': [
      {
        id: 1,
        question: 'How do we sign pool waivers and get a pool fob?',
        answer: 'Pool waivers can be signed at the community office during business hours. You\'ll need to bring a valid ID and proof of residency. Pool fobs are issued after completing the waiver process and paying the required deposit.'
      },
      {
        id: 2,
        question: 'How do I request a pool party?',
        answer: 'Pool party requests must be submitted at least 2 weeks in advance through the community office. There\'s a reservation fee and specific guidelines regarding guest limits, hours, and cleanup requirements.'
      },
      {
        id: 3,
        question: 'How do I reserve the clubhouse?',
        answer: 'Clubhouse reservations can be made through the community office or online portal. Reservations require a deposit and must be made at least 1 week in advance. Different rates apply for residents vs. non-residents.'
      },
      {
        id: 4,
        question: 'How do I access the tennis and pickleball courts (Carrington or Emerywood) and the Ballfield?',
        answer: 'Court access is available to residents with valid community IDs. Courts operate on a first-come, first-served basis during designated hours. For tournaments or extended use, advance reservations may be required.'
      },
      {
        id: 5,
        question: 'What to do when a tree falls on the road?',
        answer: 'Immediately contact the community management office and local authorities if the road is blocked. For emergency situations, call 911. Non-emergency tree removal requests should be submitted through the maintenance portal.'
      },
      {
        id: 6,
        question: 'Where can I learn about dealing with concerning wildlife?',
        answer: 'Wildlife safety information is available on our community website and through local animal control services. For immediate concerns, contact animal control. Never approach or feed wild animals.'
      },
      {
        id: 7,
        question: 'How do I get a deer or large animal removed that has died on my property?',
        answer: 'Contact the community maintenance department for dead animal removal services. There may be a fee depending on the size and location. For animals on roadways, contact local authorities immediately.'
      },
      {
        id: 8,
        question: 'Who do I contact if I see suspicious activity?',
        answer: 'For immediate threats, call 911. For non-emergency suspicious activity, contact community security or the local police non-emergency line. You can also report through our community app or website.'
      }
    ]
  };

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFAQs = faqData[activeTab]?.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];


  return (
    <div className="w-full md:w-[90%] mx-auto">
      <Heading heading="Frequently Asked Questions" />

      {/* <div className="min-h-screen bg-gray-50"> */}
   

      {/* <div className="max-w-4xl mx-auto px-6 py-8"> */}
        {/* Search Bar */}
        <div className="relative mb-8 flex justify-end gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <Button>
            <Edit3 />
            Edit
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-5 rounded-md">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-white  hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 bg-white p-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform flex-shrink-0 ${
                      openItems[faq.id] ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openItems[faq.id] && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <div className="pt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="text-gray-500 mb-2">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            </div>
          )}
        </div>
      {/* </div> */}
    {/* </div> */}
    </div>
  );
};

export default Faqs;
