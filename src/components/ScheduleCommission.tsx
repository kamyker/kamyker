const ScheduleCommission = () => {
  return (
    <section id="schedule" className="relative">
      {/* Top gradient transition */}
      <div className="h-24 bg-gradient-to-b from-background to-white" />
      
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Schedule Commission
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to bring your vision to life? Fill out the form below to get started.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full max-w-2xl rounded-xl overflow-hidden">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLScFnOC4NRp51Ec8xdOPfiwQarGT1AMRrFBxAgCr_USVLIhiRw/viewform?embedded=true" 
                width="100%" 
                height="600" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                className="bg-white"
                title="Schedule Commission Form"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient transition */}
      <div className="h-24 bg-gradient-to-b from-white to-background" />
    </section>
  );
};

export default ScheduleCommission;
