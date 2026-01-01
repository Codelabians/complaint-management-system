import React, { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Clock, MapPin, User } from 'lucide-react';

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Graduation party',
      start: '2025-07-01T18:00:00',
      end: '2025-07-01T22:00:00',
      backgroundColor: '#8B5CF6',
      borderColor: '#8B5CF6',
      extendedProps: {
        location: 'Community Hall',
        attendees: ['John', 'Sarah', 'Mike']
      }
    },
    {
      id: '2', 
      title: 'Maj Jong Class',
      start: '2025-07-01T14:00:00',
      end: '2025-07-01T16:00:00',
      backgroundColor: '#10B981',
      borderColor: '#10B981',
      extendedProps: {
        location: 'Recreation Center',
        attendees: ['Team A']
      }
    },
    {
      id: '3',
      title: 'Artist Open Studio',
      start: '2025-07-01T10:00:00',
      end: '2025-07-01T12:00:00',
      backgroundColor: '#3B82F6',
      borderColor: '#3B82F6',
      extendedProps: {
        location: 'Art Gallery',
        attendees: ['Artists Group']
      }
    },
    {
      id: '4',
      title: 'Team Meeting',
      start: '2025-07-09T10:00:00',
      end: '2025-07-09T11:00:00',
      backgroundColor: '#EF4444',
      borderColor: '#EF4444',
      extendedProps: {
        location: 'Conference Room',
        attendees: ['Development Team']
      }
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [eventForm, setEventForm] = useState({
    title: '',
    start: '',
    end: '',
    location: '',
    attendees: '',
    color: '#3B82F6'
  });

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#6B7280'];

  const resetForm = () => {
    setEventForm({
      title: '',
      start: '',
      end: '',
      location: '',
      attendees: '',
      color: '#3B82F6'
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
    setIsEditing(false);
  };

  const handleDateClick = (date) => {
    const dateStr = date.toISOString().slice(0, 16);
    setEventForm({ ...eventForm, start: dateStr, end: dateStr });
    setSelectedEvent(null);
    setIsEditing(true);
    setShowEventModal(true);
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      setEventForm({
        title: selectedEvent.title,
        start: selectedEvent.start,
        end: selectedEvent.end,
        location: selectedEvent.extendedProps?.location || '',
        attendees: selectedEvent.extendedProps?.attendees?.join(', ') || '',
        color: selectedEvent.backgroundColor || '#3B82F6'
      });
      setIsEditing(true);
    }
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.start) return;
    const newEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title: eventForm.title,
      start: eventForm.start,
      end: eventForm.end || eventForm.start,
      backgroundColor: eventForm.color,
      borderColor: eventForm.color,
      extendedProps: {
        location: eventForm.location,
        attendees: eventForm.attendees.split(',').map(a => a.trim()).filter(a => a)
      }
    };

    if (selectedEvent) {
      setEvents(events.map(event => event.id === selectedEvent.id ? newEvent : event));
    } else {
      setEvents([...events, newEvent]);
    }

    setShowEventModal(false);
    setSelectedEvent(null);
    resetForm();
  };

  const renderCalendarGrid = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const lastDay = new Date(year, month + 1, 0).getDate();
      const days = [];

      for (let i = 0; i < firstDay; i++) days.push(null);
      for (let i = 1; i <= lastDay; i++) days.push(i);
      return days;
    };

    const days = getDaysInMonth(currentDate);

    const getEventsForDate = (day) => {
      if (!day) return [];
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
      return events.filter(event => new Date(event.start).toISOString().split('T')[0] === date);
    };

    const navigateMonth = (direction) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + direction);
      setCurrentDate(newDate);
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg">‹</button>
            <h2 className="text-lg sm:text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg">›</button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDateClick(new Date())}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Add Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-gray-200 text-xs sm:text-sm">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center font-medium text-gray-600 border-r border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px] grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className={`p-2 border-r border-b border-gray-200 last:border-r-0
                  ${day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'}
                  min-h-32 sm:min-h-40 md:min-h-48 lg:min-h-56 overflow-y-auto`}
                onClick={() => day && handleDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
              >
                {day && (
                  <>
                    <div className="text-[12px] md:text-sm font-medium text-gray-800 mb-1">{day}</div>
                    <div className="space-y-1 max-h-28 overflow-hidden">
                      {(() => {
                        const eventList = getEventsForDate(day);
                        const visibleEvents = eventList.slice(0, 2);
                        const hiddenCount = eventList.length - visibleEvents.length;

                        return (
                          <>
                            {visibleEvents.map((event) => (
                              <div
                                key={event.id}
                                className="text-[10px] sm:text-xs px-2 py-1 rounded text-white font-medium cursor-pointer hover:opacity-80"
                                style={{ backgroundColor: event.backgroundColor }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event);
                                }}
                              >
                                {event.title}
                              </div>
                            ))}
                            {hiddenCount > 0 && (
                              <div className="text-[10px] text-blue-600 cursor-pointer hover:underline">
                                +{hiddenCount} more
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:w-[90%] mx-auto p-4 sm:p-6">
      {renderCalendarGrid()}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {isEditing ? (selectedEvent ? 'Edit Event' : 'Add Event') : 'Event Details'}
              </h2>
              <button onClick={() => setShowEventModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <input type="text" placeholder="Event Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="datetime-local" value={eventForm.start} onChange={(e) => setEventForm({ ...eventForm, start: e.target.value })} className="p-2 border border-gray-300 rounded-lg" />
                  <input type="datetime-local" value={eventForm.end} onChange={(e) => setEventForm({ ...eventForm, end: e.target.value })} className="p-2 border border-gray-300 rounded-lg" />
                </div>
                <input type="text" placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" />
                <input type="text" placeholder="Attendees (comma-separated)" value={eventForm.attendees} onChange={(e) => setEventForm({ ...eventForm, attendees: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" />

                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button key={color} onClick={() => setEventForm({ ...eventForm, color })} className={`w-8 h-8 rounded-full border-2 ${eventForm.color === color ? 'border-gray-800' : 'border-gray-300'}`} style={{ backgroundColor: color }} />
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowEventModal(false)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button onClick={handleSaveEvent} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-700">
                <h3 className="text-lg font-semibold">{selectedEvent?.title}</h3>
                <div className="flex items-center gap-2"><Clock size={16} /> {new Date(selectedEvent?.start).toLocaleString()}</div>
                {selectedEvent?.extendedProps?.location && <div className="flex items-center gap-2"><MapPin size={16} /> {selectedEvent.extendedProps.location}</div>}
                {selectedEvent?.extendedProps?.attendees?.length > 0 && <div className="flex items-center gap-2"><User size={16} /> {selectedEvent.extendedProps.attendees.join(', ')}</div>}
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={handleEditEvent} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"><Edit size={16} /> Edit</button>
                  <button onClick={handleDeleteEvent} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"><Trash2 size={16} /> Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
