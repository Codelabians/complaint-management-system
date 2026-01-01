import React from 'react';
import { Download, FileText } from 'lucide-react';
import Heading from '@/common/Heading';
import Button from '@/ui/Button';

const SwimTeamInfo = () => {
  // Download items array
  const downloadItems = [
    {
      title: "Swim Practice",
      subtitle: "2025",
      fileName: "Swim Practice 2025"
    },
    {
      title: "Swim Team",
      subtitle: "FAQ",
      fileName: "Swim Team FAQ"
    }
  ];

  const handleDownload = (fileName) => {
      console.log(`Downloading ${fileName}...`);
  };

  return (
    <div className="w-full md:w-[90%] mx-auto p-6 ">
      {/* Header */}
      <Heading heading="Stingrays Swim Team"/>
      <div className="mb-8 bg-white px-8 py-4 border rounded-lg">
        {/* Main content paragraphs */}
        <div className="space-y-4  leading-relaxed">
          <p>
            The Stonebridge Stingrays Swim Team is a community-based, self-funded, volunteer-run team. The goal of this 
            program is to provide a fun way for children ages 4 - 18 to develop swimming skills in a competitive atmosphere. All 
            swimmers are welcome to join the team regardless of skill level. The team begins practice the last week of May and 
            hosts home meets throughout the summer. The Stingrays compete against other Collin County neighborhood swim 
            pools.
          </p>
          
          <p>
            We also offer in-water and dryland training to improve skills related to each individual swimmer's goals. Our team 
            consists of 8 weeks of instruction and 6 meets. All skill levels are welcome, we only ask that our 6 and under 
            swimmers be able to swim 15 meters unassisted. Any stroke (including doggy paddle) is allowed as long as they 
            can get to the 15-meter mark. Assessments will be made at Meet the Coaches. Communication will be provided 
            separately about the date and time of Meet the Coaches.
          </p>
          
          <p>
            To find out more about the Stingrays Swim Team, please visit our website at{' '}
            <a 
              href="https://www.communityswimteams.com" 
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.communityswimteams.com
            </a>
          </p>
        </div>
      </div>

      {/* Download Section */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {downloadItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-6 text-center border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12  rounded flex items-center justify-center mb-4">
                <FileText size={40} />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-xs  mb-4">{item.subtitle}</p>
              <button
                onClick={() => handleDownload(item.fileName)}
                className="w-full bg-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
        <div className="float-right mt-4">
          <Button
          >
            <span >Swim Team Org</span>
          </Button>
        </div>
    </div>
  );
};

export default SwimTeamInfo;