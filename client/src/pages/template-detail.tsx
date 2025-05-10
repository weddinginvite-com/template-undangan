import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Heart, Share2, Star, ShoppingCart, ChevronLeft } from "lucide-react";
import { getQueryFn } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateRatingStars } from "@/lib/utils";
import TemplateGrid from "@/components/templates/TemplateGrid";

export default function TemplateDetail() {
  const [activeImage, setActiveImage] = useState(0);
  const params = useParams();
  const { addToCart } = useCart();
  const templateId = params.id ? parseInt(params.id) : 0;
  
  const {
    data: template,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['/api/templates', templateId],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: templateId > 0,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="flex space-x-2">
              <Skeleton className="h-20 w-20 rounded-md" />
              <Skeleton className="h-20 w-20 rounded-md" />
              <Skeleton className="h-20 w-20 rounded-md" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !template) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Template Tidak Ditemukan</h1>
        <p className="mb-6">Maaf, template yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link href="/templates">
          <Button className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Kembali ke Template
          </Button>
        </Link>
      </div>
    );
  }

  const stars = calculateRatingStars(template.rating / 10);
  const mainImage = template.thumbnails && template.thumbnails.length > 0 
    ? template.thumbnails[activeImage] 
    : template.imageUrl;

  return (
    <>
      <Helmet>
        <title>{template.name} | Template Undangan Pernikahan Digital</title>
        <meta 
          name="description" 
          content={`${template.description.substring(0, 160)}...`}
        />
        <meta property="og:title" content={`${template.name} | Template Undangan Pernikahan Digital`} />
        <meta property="og:description" content={template.description.substring(0, 160)} />
        <meta property="og:image" content={template.imageUrl} />
        <meta property="og:type" content="product" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/templates">
            <Button variant="link" className="gap-1 p-0 h-auto text-muted-foreground">
              <ChevronLeft className="h-4 w-4" /> Kembali ke Template
            </Button>
          </Link>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="relative h-96 overflow-hidden rounded-lg mb-4 bg-gray-100">
              <img
                src={mainImage}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 right-2 bg-white/80 rounded-full hover:bg-white"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 left-2 bg-white/80 rounded-full hover:bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            
            {template.thumbnails && template.thumbnails.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto py-2">
                {template.thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                      activeImage === index ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={thumb}
                      alt={`${template.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="capitalize">{template.category}</Badge>
              {template.isFeatured && <Badge variant="secondary">Featured</Badge>}
              {template.isNew && <Badge variant="secondary">New</Badge>}
              {template.isBestseller && <Badge variant="secondary">Bestseller</Badge>}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{template.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {stars.map((type, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      type === "full" 
                        ? "text-yellow-400 fill-current" 
                        : type === "half" 
                        ? "text-yellow-400 fill-yellow-400 stroke-yellow-400" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {template.reviews} ulasan
              </span>
            </div>
            
            <p className="text-2xl font-bold text-primary mb-4">
              {formatCurrency(template.price)}
            </p>
            
            <p className="text-gray-700 mb-6">
              {template.description}
            </p>
            
            <Button 
              className="w-full h-12 mb-4 gap-2"
              onClick={() => addToCart(template)}
            >
              <ShoppingCart className="h-5 w-5" /> Tambahkan ke Keranjang
            </Button>
            
            <Tabs defaultValue="features" className="mt-8">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="features">Fitur</TabsTrigger>
                <TabsTrigger value="details">Detail</TabsTrigger>
                <TabsTrigger value="reviews">Ulasan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="mt-4">
                <h3 className="font-semibold mb-2">Fitur Template</h3>
                {template.features && template.features.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Tidak ada informasi fitur tersedia.</p>
                )}
              </TabsContent>
              
              <TabsContent value="details" className="mt-4">
                <h3 className="font-semibold mb-2">Detail Template</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 border-b pb-2">
                    <span className="text-gray-600">Kategori</span>
                    <span className="capitalize">{template.category}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b pb-2">
                    <span className="text-gray-600">Format</span>
                    <span>Responsive Web</span>
                  </div>
                  <div className="grid grid-cols-2 border-b pb-2">
                    <span className="text-gray-600">Dukungan</span>
                    <span>6 bulan</span>
                  </div>
                  <div className="grid grid-cols-2 border-b pb-2">
                    <span className="text-gray-600">Revisi</span>
                    <span>3x</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <h3 className="font-semibold mb-2">Ulasan Pengguna</h3>
                <p className="text-gray-500">Belum ada ulasan untuk template ini.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Similar Templates */}
        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Template Serupa</h2>
          <TemplateGrid limit={3} showAllLink={true} />
        </div>
      </div>
    </>
  );
}