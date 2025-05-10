import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Hubungi Kami - EleganVite</title>
        <meta name="description" content="Hubungi kami untuk informasi lebih lanjut tentang template undangan pernikahan digital kami. Tim dukungan kami siap membantu menjawab pertanyaan Anda." />
        <meta property="og:title" content="Hubungi Kami - EleganVite" />
        <meta property="og:description" content="Hubungi kami untuk informasi lebih lanjut tentang template undangan pernikahan digital kami. Tim dukungan kami siap membantu menjawab pertanyaan Anda." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
              Hubungi Kami
            </h1>
            <p className="text-secondary-light max-w-3xl mx-auto">
              Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan tentang template undangan atau layanan kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <div className="bg-white p-8 rounded-xl shadow-sm h-full">
                <h2 className="font-heading text-2xl font-bold text-secondary mb-6">
                  Informasi Kontak
                </h2>
                
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
                
                <div className="flex items-start mb-8">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <i className="ri-time-line text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-medium text-secondary mb-1">Jam Operasional</h4>
                    <p className="text-secondary-light">Senin - Jumat: 09:00 - 17:00</p>
                    <p className="text-secondary-light">Sabtu: 09:00 - 14:00</p>
                    <p className="text-secondary-light">Minggu: Tutup</p>
                  </div>
                </div>
                
                <h4 className="font-heading text-lg font-medium text-secondary mb-3">Ikuti Kami</h4>
                <div className="flex space-x-4">
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
            </div>
            
            <div>
              <ContactForm />
              
              <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-heading text-lg font-medium text-secondary mb-3">Pertanyaan Umum</h4>
                <p className="text-secondary-light mb-4">
                  Untuk pertanyaan seputar template, custom order, atau kerjasama, silakan kirim email ke <span className="text-primary">support@eleganvite.com</span> atau hubungi nomor telepon kami.
                </p>
                <p className="text-secondary-light">
                  Untuk pertanyaan teknis atau bantuan penggunaan template, silakan kunjungi halaman <a href="#" className="text-primary hover:underline">FAQ</a> terlebih dahulu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
