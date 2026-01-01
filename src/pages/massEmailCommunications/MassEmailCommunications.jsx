import React, { useState, useRef, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import Heading from '@/common/Heading';
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';
import Button from '@/ui/Button';

const MassEmailCommunication = () => {
  const [fromValue, setFromValue] = useState('HOA Board of Directors');
  const [toValue, setToValue] = useState('All Residents');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const fromOptions = [
    'HOA Board of Directors',
    'Management Company',
    'Maintenance Team',
    'Security Department'
  ];

  const toOptions = [
    'All Residents',
    'Board Members',
    'Committee Members',
    'Homeowners Only'
  ];

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }]
    ],
  }), []);

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'align', 'color', 'background'
  ];

  const handleSendMessage = () => {
    console.log('Sending message:', {
      from: fromValue,
      to: toValue,
      subject,
      message
    });
    alert('Message sent successfully!');
  };

  const DropdownSelect = ({ value, onChange, options, placeholder }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
    </div>
  );

  return (
    <div className="  p-6">
       <Heading heading="Mass Email Communication"/>
      <div className=" mx-auto bg-white rounded-lg min-h-screen">
      
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* From Field */}
            <div>
              <label className="block  font-medium  mb-2">From</label>
              <DropdownSelect
                value={fromValue}
                onChange={setFromValue}
                options={fromOptions}
              />
            </div>

            {/* To Field */}
            <div>
              <label className="block  font-medium  mb-2">To</label>
              <DropdownSelect
                value={toValue}
                onChange={setToValue}
                options={toOptions}
              />
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label className="block  font-medium  mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter subject"
            />
          </div>
        </div>

        {/* React Quill Editor */}
        <div className="p-4">
          {/* In a real project, uncomment this and remove the placeholder: */}
          
          <ReactQuill
            theme="snow"
            value={message}
            onChange={setMessage}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Type Your Message Here..."
            style={{ height: '300px' }}
          />
           <div className="flex justify-end p-6 border-t border-gray-200 mt-6">
       <Button
        onClick={handleSendMessage}
       >
          Send Message
       </Button>
        </div>
         
        </div>


       
      </div>
     
    </div>
  );
};

export default MassEmailCommunication;