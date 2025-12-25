const ScheduleCommission = () => {
  return (
    <section id="schedule" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Schedule Commission
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Fill out the form below to get started.
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="w-full max-w-2xl bg-card rounded-xl border border-border/50 overflow-hidden shadow-lg">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLScFnOC4NRp51Ec8xdOPfiwQarGT1AMRrFBxAgCr_USVLIhiRw/viewform?embedded=true" 
              width="100%" 
              height="600" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              className="bg-background"
              title="Schedule Commission Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleCommission;
