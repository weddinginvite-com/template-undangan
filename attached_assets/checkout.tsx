import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { useCart } from '@/context/CartContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { Button } from '@/components/ui/button';

const Checkout = () => {
  const { cart } = useCart();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold text-secondary mb-4">
          Keranjang Belanja Kosong
        </h1>
        <p className="text-secondary-light mb-8">
          Keranjang belanja Anda kosong. Silakan tambahkan template ke keranjang terlebih dahulu.
        </p>
        <Button asChild className="bg-primary hover:bg-primary-dark text-white">
          <span onClick={() => setLocation('/templates')} className="cursor-pointer">Lihat Template</span>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - EleganVite</title>
        <meta name="description" content="Checkout dan pembayaran template undangan pernikahan digital. Lengkapi pesanan Anda dan buat undangan pernikahan digital yang indah." />
        <meta property="og:title" content="Checkout - EleganVite" />
        <meta property="og:description" content="Checkout dan pembayaran template undangan pernikahan digital. Lengkapi pesanan Anda dan buat undangan pernikahan digital yang indah." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-secondary mb-8 text-center">
            Checkout
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-6xl mx-auto">
            <CheckoutForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
