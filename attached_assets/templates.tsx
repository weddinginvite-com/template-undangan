import { Helmet } from 'react-helmet';
import TemplateGrid from '@/components/templates/TemplateGrid';

const Templates = () => {
  return (
    <>
      <Helmet>
        <title>Template Undangan Pernikahan - EleganVite</title>
        <meta name="description" content="Koleksi template undangan pernikahan digital elegan dengan berbagai pilihan desain dan gaya. Pilih template yang sesuai dengan tema pernikahan Anda." />
        <meta property="og:title" content="Template Undangan Pernikahan - EleganVite" />
        <meta property="og:description" content="Koleksi template undangan pernikahan digital elegan dengan berbagai pilihan desain dan gaya. Pilih template yang sesuai dengan tema pernikahan Anda." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
              Template Undangan Pernikahan
            </h1>
            <p className="text-secondary-light max-w-3xl mx-auto">
              Pilih dari berbagai desain template undangan pernikahan digital yang elegan dan modern untuk momen spesial Anda.
            </p>
          </div>
          
          <TemplateGrid />
        </div>
      </section>
    </>
  );
};

export default Templates;
