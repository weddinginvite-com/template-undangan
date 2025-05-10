import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Template, TemplateCategory } from "@shared/schema";
import TemplateCard from "./TemplateCard";
import TemplateFilters from "./TemplateFilters";
import { getQueryFn } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";

interface TemplateGridProps {
  limit?: number;
  showAllLink?: boolean;
}

const TemplateGrid = ({ limit, showAllLink = false }: TemplateGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Fetch all templates
  const {
    data: templates,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['/api/templates'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Fetch templates by category
  const {
    data: categoryTemplates,
    isLoading: isCategoryLoading,
    isError: isCategoryError
  } = useQuery({
    queryKey: ['/api/templates/category', selectedCategory],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: selectedCategory !== "all" && 
             selectedCategory !== "featured" && 
             selectedCategory !== "new" && 
             selectedCategory !== "bestseller",
  });

  // Fetch featured templates
  const {
    data: featuredTemplates,
    isLoading: isFeaturedLoading,
    isError: isFeaturedError
  } = useQuery({
    queryKey: ['/api/templates/featured'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: selectedCategory === "featured",
  });

  // Fetch new templates
  const {
    data: newTemplates,
    isLoading: isNewLoading,
    isError: isNewError
  } = useQuery({
    queryKey: ['/api/templates/new'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: selectedCategory === "new",
  });

  // Fetch bestseller templates
  const {
    data: bestsellerTemplates,
    isLoading: isBestsellerLoading,
    isError: isBestsellerError
  } = useQuery({
    queryKey: ['/api/templates/bestseller'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: selectedCategory === "bestseller",
  });

  // Loading logic
  const isLoadingData = isLoading || 
                  (selectedCategory !== "all" && 
                  ((selectedCategory === "featured" && isFeaturedLoading) ||
                  (selectedCategory === "new" && isNewLoading) ||
                  (selectedCategory === "bestseller" && isBestsellerLoading) ||
                  (selectedCategory !== "featured" && 
                   selectedCategory !== "new" && 
                   selectedCategory !== "bestseller" && 
                   isCategoryLoading)));

  // Error handling
  const hasError = isError || 
                  (selectedCategory !== "all" && 
                  ((selectedCategory === "featured" && isFeaturedError) ||
                  (selectedCategory === "new" && isNewError) ||
                  (selectedCategory === "bestseller" && isBestsellerError) ||
                  (selectedCategory !== "featured" && 
                   selectedCategory !== "new" && 
                   selectedCategory !== "bestseller" && 
                   isCategoryError)));

  // Determine which templates to display
  let displayedTemplates: Template[] = [];
  
  if (selectedCategory === "all") {
    displayedTemplates = templates || [];
  } else if (selectedCategory === "featured") {
    displayedTemplates = featuredTemplates || [];
  } else if (selectedCategory === "new") {
    displayedTemplates = newTemplates || [];
  } else if (selectedCategory === "bestseller") {
    displayedTemplates = bestsellerTemplates || [];
  } else {
    displayedTemplates = categoryTemplates || [];
  }

  // Apply limit if specified
  if (limit && displayedTemplates.length > limit) {
    displayedTemplates = displayedTemplates.slice(0, limit);
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      <div className="md:col-span-1">
        <TemplateFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      
      <div className="md:col-span-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {selectedCategory === "all" 
              ? "All Templates" 
              : selectedCategory === "featured"
              ? "Featured Templates"
              : selectedCategory === "new"
              ? "New Templates"
              : selectedCategory === "bestseller"
              ? "Bestseller Templates"
              : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Templates`}
          </h2>
          {showAllLink && (
            <a href="/templates" className="text-primary hover:underline">
              View All
            </a>
          )}
        </div>
        
        {isLoadingData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : hasError ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Gagal memuat data template</h3>
            <p className="text-gray-600">Maaf, terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              onClick={() => window.location.reload()}
            >
              Coba Lagi
            </button>
          </div>
        ) : displayedTemplates.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Tidak ada template</h3>
            <p className="text-gray-600">
              Tidak ada template ditemukan dalam kategori ini. Silakan pilih kategori lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateGrid;