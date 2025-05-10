const Testimonials = () => {
  const testimonials = [
    {
      name: "Andi & Bunga",
      role: "Pengantin",
      image: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "Template undangan digital dari EleganVite sangat membantu kami dalam persiapan pernikahan. Desainnya elegan dan fiturnya lengkap. Tamu undangan kami juga banyak yang memuji undangannya."
    },
    {
      name: "Dimas & Ratu",
      role: "Pengantin",
      image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "Proses pembuatannya mudah dan hasilnya sesuai dengan ekspektasi kami. Fitur RSVP online dan amplop digital sangat praktis. Terima kasih EleganVite!"
    },
    {
      name: "Fadli & Ayu",
      role: "Pengantin",
      image: "https://images.unsplash.com/photo-1623766182250-d1b5f5b83282?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "Saya sangat senang dengan template yang kami pilih. Tampilannya responsif di semua perangkat dan kami mendapatkan banyak pujian dari tamu undangan. Layak untuk direkomendasikan!"
    }
  ];

  return (
    <section className="py-20 bg-accent-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="font-script text-primary text-2xl mb-2">Testimoni</h6>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">Apa Kata Mereka?</h2>
          <p className="text-secondary-light max-w-3xl mx-auto">
            Berbagai pasangan telah menggunakan template undangan pernikahan digital kami. Berikut adalah pengalaman mereka.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-secondary">{testimonial.name}</h4>
                  <p className="text-primary text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-secondary-light">"{testimonial.quote}"</p>
              <div className="flex mt-4">
                <i className="ri-star-fill text-yellow-400"></i>
                <i className="ri-star-fill text-yellow-400"></i>
                <i className="ri-star-fill text-yellow-400"></i>
                <i className="ri-star-fill text-yellow-400"></i>
                <i className="ri-star-fill text-yellow-400"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
