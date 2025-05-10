import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              EleganVite
            </h3>
            <p className="text-secondary-light mb-4">
              Kami menyediakan template undangan pernikahan digital yang elegan untuk momen spesial Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-100 hover:bg-primary hover:text-white text-secondary w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="bg-gray-100 hover:bg-primary hover:text-white text-secondary w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="bg-gray-100 hover:bg-primary hover:text-white text-secondary w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="#" className="bg-gray-100 hover:bg-primary hover:text-white text-secondary w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <i className="ri-pinterest-line"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-light hover:text-primary transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="text-secondary-light hover:text-primary transition-colors">Fitur</a></li>
              <li><Link href="/contact" className="text-secondary-light hover:text-primary transition-colors">Kontak</Link></li>
              <li><a href="#" className="text-secondary-light hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Template</h4>
            <ul className="space-y-2">
              <li><Link href="/templates" className="text-secondary-light hover:text-primary transition-colors">Elegant</Link></li>
              <li><Link href="/templates" className="text-secondary-light hover:text-primary transition-colors">Minimalis</Link></li>
              <li><Link href="/templates" className="text-secondary-light hover:text-primary transition-colors">Floral</Link></li>
              <li><Link href="/templates" className="text-secondary-light hover:text-primary transition-colors">Rustic</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-light hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-secondary-light hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-secondary-light hover:text-primary transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="text-secondary-light hover:text-primary transition-colors">Tutorial</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-light text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EleganVite. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-secondary-light hover:text-primary transition-colors text-sm">Syarat & Ketentuan</a>
            <a href="#" className="text-secondary-light hover:text-primary transition-colors text-sm">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
