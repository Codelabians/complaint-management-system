import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetQuery } from '@/services/apiService';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  FileText, 
  Image,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  PackageCheck,
  CheckCircle2,
  Archive
} from 'lucide-react';
import Loader from '@/components/common/Loader';

const ComplaintDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: response, isLoading } = useGetQuery({
    path: `/dc/complaints/${id}`,
  });

  const complaint = response?.complaint;

  const statusSteps = [
    { key: 'pending',           label: 'Submitted / Pending', icon: Clock },
    { key: 'progress',          label: 'In Progress',         icon: TrendingUp },
    { key: 'resolveByEmployee', label: 'Resolved by Employee', icon: CheckCircle },
    { key: 'resolved',          label: 'Resolved',            icon: PackageCheck },
    { key: 'completed',         label: 'Completed',           icon: CheckCircle2 },
    { key: 'closed',            label: 'Closed',              icon: Archive },
    { key: 'delayed',           label: 'Delayed',             icon: AlertCircle },
    { key: 'rejected',          label: 'Rejected',            icon: XCircle },
  ];

  const getCurrentStepIndex = (status) => {
    if (!status) return 0;

    const normalized = status.toLowerCase();

    const index = statusSteps.findIndex(step => step.key.toLowerCase() === normalized);
    
    if (index === -1) {
      if (normalized.includes('reject')) return statusSteps.length - 1; 
      if (normalized.includes('delay')) return statusSteps.length - 2;  
    }

    return index >= 0 ? index : 0;
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Complaint not found</p>
          <button 
            onClick={() => navigate('/portal/complaints')}
            className="mt-4 px-6 py-2 bg-greenDarkest text-white rounded-lg hover:bg-greenDark transition-colors"
          >
            Back to Complaints
          </button>
        </div>
      </div>
    );
  }

  const currentStep = getCurrentStepIndex(complaint.status);
  const isRejected = complaint.status.toLowerCase() === 'rejected';

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/portal/complaints')}
            className="flex items-center gap-2 text-gray-600 hover:text-greenDarkest transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Complaints</span>
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{complaint.title}</h1>
              <p className="text-sm text-gray-500 mt-1">ID: {complaint._id}</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                isRejected 
                  ? 'bg-red-100 text-red-700'
                  : complaint.status.toLowerCase() === 'resolved' || complaint.status.toLowerCase() === 'completed' || complaint.status.toLowerCase() === 'closed'
                  ? 'bg-green-100 text-green-700'
                  : complaint.status.toLowerCase() === 'progress'
                  ? 'bg-blue-100 text-blue-700'
                  : complaint.status.toLowerCase() === 'delayed'
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {isRejected ? <XCircle className="w-4 h-4" /> : 
                 complaint.status.toLowerCase() === 'resolved' ? <CheckCircle className="w-4 h-4" /> :
                 <Clock className="w-4 h-4" />}
                {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        {!isRejected && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-8">Complaint Status</h2>
            
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200" style={{ zIndex: 0 }}>
                <div 
                  className="h-full bg-gradient-to-r from-greenDarkest to-greenLight transition-all duration-500"
                  style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                ></div>
              </div>

              <div className="relative flex justify-between" style={{ zIndex: 1 }}>
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index <= currentStep;
                  const isCurrent = index === currentStep;

                  return (
                    <div key={step.key} className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-greenDarkest to-greenLight text-white shadow-lg scale-110' 
                          : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-greenLight ring-opacity-30' : ''}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-semibold text-center ${
                        isCompleted ? 'text-greenDarkest' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                      {isCompleted && (
                        <span className="text-xs text-gray-500 mt-1">
                          {index === currentStep ? 'Current' : 'Completed'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {isRejected && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-1">Complaint Rejected</h3>
                <p className="text-red-700 text-sm">
                  This complaint has been reviewed and rejected. Please contact support for more information.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-greenDarkest" />
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
            </div>

            {complaint.images && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Image className="w-5 h-5 text-greenDarkest" />
                  Complaint Images
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group"
                    onClick={() => handleImageClick(complaint.images)}
                  >
                    <img 
                      src={complaint.images} 
                      alt="Complaint" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <Image className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(complaint.resolutionNote || complaint.resolutionImage) && (
              <div className="bg-green-50 border border-green-200 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Resolution Details
                </h3>
                {complaint.resolutionNote && (
                  <p className="text-green-800 mb-4">{complaint.resolutionNote}</p>
                )}
                {complaint.resolutionImage && (
                  <div 
                    className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity max-w-md"
                    onClick={() => handleImageClick(complaint.resolutionImage)}
                  >
                    <img 
                      src={complaint.resolutionImage} 
                      alt="Resolution" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-greenDarkest" />
                Location
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Address</p>
                  <p className="text-gray-900 font-medium">{complaint.locationName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Area Type</p>
                  <p className="text-gray-900 font-medium">{complaint.areaType}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-greenDarkest" />
                Category
              </h3>
              <span className="inline-block px-3 py-1.5 bg-greenBackground text-greenDarkest rounded-lg font-semibold text-sm">
                {complaint.categoryId?.name || 'Uncategorized'}
              </span>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-greenDarkest" />
                Submitted By
              </h3>
              <div className="space-y-2">
                <p className="text-gray-900 font-semibold">{complaint.createdByVolunteerId?.name}</p>
                <p className="text-sm text-gray-600">@{complaint.createdByVolunteerId?.username}</p>
                <p className="text-sm text-gray-600">{complaint.createdByVolunteerId?.phone}</p>
              </div>
            </div>

            {complaint.assignedToUserId && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-greenDarkest" />
                  Assigned To
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold">{complaint.assignedToUserId.name}</p>
                  <p className="text-sm text-gray-600">@{complaint.assignedToUserId.username}</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-greenDarkest" />
                Timeline
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Submitted</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(complaint.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Last Updated</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(complaint.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      {showImageModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setShowImageModal(false)}
          >
            <XCircle className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ComplaintDetailView;