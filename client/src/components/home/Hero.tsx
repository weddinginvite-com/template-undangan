import { Link } from 'wouter';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-accent-light to-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h6 className="font-script text-primary text-2xl mb-3 animate-fade-in">Elegan & Menawan</h6>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 animate-slide-up">
              Template Undangan Pernikahan Digital
            </h1>
            <p className="text-secondary-light text-lg mb-8 animate-slide-up">
              Buat undangan pernikahan digital yang elegan dan personal dengan template premium dari EleganVite. Mudah digunakan dan siap dibagikan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 animate-slide-up">
              <Link href="/templates">
                <a className="py-3 px-6 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors duration-300 inline-flex items-center justify-center">
                  <i className="ri-palette-line mr-2"></i>
                  Lihat Template
                </a>
              </Link>
              <a href="#fitur" className="py-3 px-6 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors duration-300 inline-flex items-center justify-center">
                <i className="ri-information-line mr-2"></i>
                Pelajari Fitur
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1563339007-6914941e8ff7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Template Undangan Pernikahan" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/20 rounded-full z-0"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/30 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
