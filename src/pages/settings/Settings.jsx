import Heading from '@/common/Heading';
import Button from '@/ui/Button';
import React, { useState } from 'react';

const Settings = () => {
  const [ballotHeading, setBallotHeading] = useState('User Details');
  const [description, setDescription] = useState('The Stonebridge Homeowners\' Association By-Laws defines that the Board consists of at least three directors, and as many as seven directors, with each director serving a three-year term.');
  const [votingEnabled, setVotingEnabled] = useState(true);
  const [nominationEnabled, setNominationEnabled] = useState(false);

  const handleSubmit = () => {
    console.log('Configuration submitted:', {
      ballotHeading,
      description,
      votingEnabled,
      nominationEnabled
    });
    alert('Configuration saved successfully!');
  };

  const ToggleSwitch = ({ enabled, onChange, label, description, enabledText, disabledText }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-900">{label}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div className="relative inline-flex items-center">
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
              enabled ? 'bg-orange' : 'bg-gray-300'
            }`}
            onClick={() => onChange(!enabled)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      <div className="flex">
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            enabled
              ? 'bg-green '
              : 'bg-pink '
          }`}
        >
          {enabled ? enabledText : disabledText}
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Heading heading="Settings"/>
      <div className="mx-auto bg-white rounded-lg shadow-sm">
        
        <div className="p-6">
          {/* Header */}
          <h1 className="text-xl font-semibold text-gray-900 mb-6">
            Board member Configuration
          </h1>

          {/* Form Content */}
          <div className="space-y-6">
            {/* Ballot Heading */}
            <div>
              <label className="block  font-medium  mb-2">
                Ballot Heading
              </label>
              <input
                type="text"
                value={ballotHeading}
                onChange={(e) => setBallotHeading(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent "
                placeholder="Enter ballot heading"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block  font-medium  mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                placeholder="Enter description"
              />
            </div>

            {/* Voting System Toggle */}
            <div className="border p-6 rounded-lg">
              <ToggleSwitch
                enabled={votingEnabled}
                onChange={setVotingEnabled}
                label="Voting System"
                description="Enable or disable the voting functionality for residents"
                enabledText="Voting enabled"
                disabledText="Voting disabled"
              />
            </div>

            {/* Nomination System Toggle */}
            <div className="border p-6 rounded-lg">
              <ToggleSwitch
                enabled={nominationEnabled}
                onChange={setNominationEnabled}
                label="Nomination System"
                description="Allow residents to submit nominations for board positions"
                enabledText="Nominations Enabled"
                disabledText="Nominations Disabled"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 ">
          <Button>
            Submit
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;