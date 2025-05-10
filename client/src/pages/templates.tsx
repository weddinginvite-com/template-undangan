import { Helmet } from "react-helmet";
import TemplateGrid from "@/components/templates/TemplateGrid";

export default function Templates() {
  return (
    <>
      <Helmet>
        <title>Wedding Template Collection | Template Undangan Pernikahan Digital</title>
        <meta 
          name="description" 
          content="Temukan template undangan pernikahan digital dengan berbagai gaya: elegant, floral, rustic, dan minimalist. Buat undangan pernikahan online yang berkesan." 
        />
        <meta property="og:title" content="Wedding Template Collection | Template Undangan Pernikahan Digital" />
        <meta property="og:description" content="Temukan template undangan pernikahan digital dengan berbagai gaya: elegant, floral, rustic, dan minimalist. Buat undangan pernikahan online yang berkesan." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Koleksi Template Undangan Pernikahan
          </h1>
          <p className="text-muted-foreground">
            Temukan template undangan pernikahan digital yang sempurna untuk hari spesial Anda.
            Kami menawarkan berbagai macam desain yang elegan dan modern.
          </p>
        </div>
        
        <TemplateGrid />
      </div>
    </>
  );
}