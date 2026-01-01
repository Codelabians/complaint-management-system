import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/public/img/c5ac3a0637af85f91c5e3cc40d117dcb4503aabd.jpg')`
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your{' '}
            <span className="text-orange">Community</span>
            {' '}Hub
          </h1>
          
          <p className="text-xl md:text-2xl text-white text-center leading-relaxed max-w-3xl mx-auto">
            Stay connected with neighborhood events, important updates, and community resources
          </p>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent opacity-50" />
      
      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-orange-500 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-white rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-40 left-20 w-4 h-4 bg-orange-400 rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-60 right-10 w-2 h-2 bg-white rounded-full animate-pulse opacity-50" />
    </section>
  );
};

export default HeroSection;