const Features = () => {
  const features = [
    {
      icon: "ri-palette-line",
      title: "Desain Elegan",
      description: "Template dengan desain professional dan berkualitas tinggi yang dapat disesuaikan dengan tema pernikahan Anda."
    },
    {
      icon: "ri-smartphone-line",
      title: "Responsif di Semua Perangkat",
      description: "Tampilan yang sempurna di semua ukuran layar, baik di smartphone, tablet, maupun desktop."
    },
    {
      icon: "ri-gallery-line",
      title: "Galeri Foto & Video",
      description: "Tampilkan momen-momen spesial Anda dengan galeri foto dan video yang menarik."
    },
    {
      icon: "ri-map-pin-line",
      title: "Peta Lokasi",
      description: "Petunjuk arah dan lokasi acara yang terintegrasi dengan Google Maps untuk memudahkan tamu Anda."
    },
    {
      icon: "ri-user-heart-line",
      title: "RSVP Online",
      description: "Fitur konfirmasi kehadiran online yang memudahkan manajemen daftar tamu Anda."
    },
    {
      icon: "ri-gift-line",
      title: "Amplop Digital",
      description: "Terima hadiah pernikahan secara digital melalui berbagai metode pembayaran."
    }
  ];

  return (
    <section id="fitur" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="font-script text-primary text-2xl mb-2">Fitur Utama</h6>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">Mengapa Memilih EleganVite?</h2>
          <p className="text-secondary-light max-w-3xl mx-auto">
            Template undangan pernikahan kami dilengkapi dengan berbagai fitur menarik untuk memberikan pengalaman terbaik bagi Anda dan tamu undangan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <i className={`${feature.icon} text-primary text-2xl`}></i>
              </div>
              <h3 className="font-heading text-xl font-semibold text-secondary mb-3">{feature.title}</h3>
              <p className="text-secondary-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
