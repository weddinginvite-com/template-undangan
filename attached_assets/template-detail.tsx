import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { Helmet } from 'react-helmet';
import { Template } from '@shared/schema';
import { calculateRatingStars, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const TemplateDetail = () => {
  const [match, params] = useRoute('/templates/:id');
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const { addToCart } = useCart();
  
  const { data: template, isLoading, error } = useQuery<Template>({
    queryKey: [`/api/templates/${params?.id}`],
    enabled: !!params?.id,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="text-center py-20 container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold text-secondary mb-4">
          Template Tidak Ditemukan
        </h1>
        <p className="text-secondary-light mb-8">
          Maaf, template yang Anda cari tidak ditemukan atau telah dihapus.
        </p>
        <Button asChild className="bg-primary hover:bg-primary-dark text-white">
          <a href="/templates">Kembali ke Daftar Template</a>
        </Button>
      </div>
    );
  }

  const stars = calculateRatingStars(template.rating);

  const handleAddToCart = () => {
    addToCart(template);
  };

  return (
    <>
      <Helmet>
        <title>{template.name} - Template Undangan Pernikahan | EleganVite</title>
        <meta name="description" content={template.description} />
        <meta property="og:title" content={`${template.name} - Template Undangan Pernikahan | EleganVite`} />
        <meta property="og:description" content={template.description} />
        <meta property="og:image" content={template.imageUrl} />
        <meta property="og:type" content="product" />
      </Helmet>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="rounded-lg overflow-hidden h-96 bg-white shadow-md mb-4">
                <img 
                  src={template.thumbnails[selectedThumbnail]} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {template.thumbnails.map((thumbnail, index) => (
                  <div 
                    key={index}
                    className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 flex-shrink-0 ${
                      index === selectedThumbnail ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedThumbnail(index)}
                  >
                    <img 
                      src={thumbnail} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h1 className="font-heading text-3xl font-bold text-secondary mb-2">{template.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {stars.map((star, index) => (
                    <i 
                      key={index} 
                      className={`${
                        star === 'full' ? 'ri-star-fill' : 
                        star === 'half' ? 'ri-star-half-fill' : 
                        'ri-star-line'
                      } text-yellow-400`}
                    ></i>
                  ))}
                </div>
                <span className="text-secondary-light">({template.reviews} reviews)</span>
              </div>
              
              <div className="mb-6">
                <span className="text-primary font-semibold text-3xl">{formatCurrency(template.price)}</span>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="font-heading text-xl font-semibold text-secondary mb-4">Deskripsi</h2>
                <p className="text-secondary-light mb-6">{template.description}</p>
                
                <h2 className="font-heading text-xl font-semibold text-secondary mb-4">Fitur Template</h2>
                <ul className="space-y-3 mb-6">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-primary mt-1"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-primary hover:bg-primary-dark text-white flex-1 gap-2"
                    onClick={handleAddToCart}
                  >
                    <i className="ri-shopping-cart-line"></i>
                    Tambahkan ke Keranjang
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/5 flex-1"
                  >
                    Lihat Demo
                  </Button>
                </div>
              </div>
              
              <div className="bg-accent rounded-lg p-6">
                <h2 className="font-heading text-xl font-semibold text-secondary mb-4">
                  Butuh Bantuan?
                </h2>
                <p className="text-secondary-light mb-4">
                  Jika Anda memiliki pertanyaan tentang template ini atau membutuhkan bantuan, jangan ragu untuk menghubungi tim dukungan kami.
                </p>
                <div className="flex gap-4">
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    <a href="/contact">Hubungi Kami</a>
                  </Button>
                  <Button asChild variant="ghost" className="text-primary hover:text-primary-dark hover:bg-primary/5">
                    <a href="#">
                      <i className="ri-whatsapp-line mr-2"></i>
                      Chat WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TemplateDetail;
