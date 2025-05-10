import { Link } from 'wouter';

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Untuk Membuat Undangan Pernikahan Digital?
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-8">
            Pilih template yang sesuai dengan tema pernikahan Anda dan buat undangan pernikahan digital yang akan mengesankan para tamu.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/templates">
              <a className="py-3 px-6 bg-white text-primary hover:bg-gray-100 rounded-md transition-colors duration-300 inline-flex items-center justify-center">
                <i className="ri-shopping-bag-line mr-2"></i>
                Lihat Template
              </a>
            </Link>
            <Link href="/contact">
              <a className="py-3 px-6 border border-white text-white hover:bg-white hover:text-primary rounded-md transition-colors duration-300 inline-flex items-center justify-center">
                <i className="ri-customer-service-2-line mr-2"></i>
                Hubungi Kami
              </a>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4"></div>
    </section>
  );
};

export default CallToAction;
