import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import TemplateGrid from '@/components/templates/TemplateGrid';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import ContactForm from '@/components/contact/ContactForm';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>EleganVite - Template Undangan Pernikahan Online</title>
        <meta name="description" content="Template undangan pernikahan digital yang elegan dengan berbagai fitur menarik. Buat undangan pernikahan digital yang indah dengan mudah." />
        <meta property="og:title" content="EleganVite - Template Undangan Pernikahan Online" />
        <meta property="og:description" content="Template undangan pernikahan digital yang elegan dengan berbagai fitur menarik. Buat undangan pernikahan digital yang indah dengan mudah." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      
      <Hero />
      
      <Features />
      
      <section id="template" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h6 className="font-script text-primary text-2xl mb-2">Koleksi Kami</h6>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">Template Undangan Pernikahan</h2>
            <p className="text-secondary-light max-w-3xl mx-auto">
              Pilih dari berbagai desain template undangan pernikahan digital yang elegan dan modern untuk momen spesial Anda.
            </p>
          </div>
          
          <TemplateGrid limit={6} showAllLink={true} />
        </div>
      </section>
      
      <Testimonials />
      
      <CallToAction />
      
      <section id="kontak" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h6 className="font-script text-primary text-2xl mb-2">Hubungi Kami</h6>
              <h2 className="font-heading text-3xl font-bold text-secondary mb-6">
                Punya Pertanyaan? Kami Siap Membantu
              </h2>
              <p className="text-secondary-light mb-8">
                Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan tentang template undangan atau layanan kami.
              </p>
              
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <i className="ri-map-pin-line text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-medium text-secondary mb-1">Lokasi</h4>
                  <p className="text-secondary-light">Jl. Wedding Digital No. 123, Jakarta Selatan</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <i className="ri-mail-line text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-medium text-secondary mb-1">Email</h4>
                  <p className="text-secondary-light">hello@eleganvite.com</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <i className="ri-phone-line text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-medium text-secondary mb-1">Telepon</h4>
                  <p className="text-secondary-light">+62 812 3456 7890</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <a href="#" className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="#" className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="#" className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                  <i className="ri-twitter-fill"></i>
                </a>
                <a href="#" className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                  <i className="ri-whatsapp-line"></i>
                </a>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Home;
