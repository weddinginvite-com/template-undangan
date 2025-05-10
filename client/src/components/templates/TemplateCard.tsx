import { useState } from "react";
import { Link } from "wouter";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Template } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { formatCurrency, calculateRatingStars, truncateText } from "@/lib/utils";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const stars = calculateRatingStars(template.rating / 10);

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={template.imageUrl}
          alt={template.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {template.isFeatured && (
            <Badge variant="default" className="bg-amber-500">Featured</Badge>
          )}
          {template.isNew && (
            <Badge variant="default" className="bg-teal-500">New</Badge>
          )}
          {template.isBestseller && (
            <Badge variant="default" className="bg-rose-500">Bestseller</Badge>
          )}
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-2 left-2 bg-white/80 rounded-full hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="capitalize">
            {template.category}
          </Badge>
        </div>
        
        <Link href={`/templates/${template.id}`}>
          <h3 className="text-lg font-semibold mb-1 hover:text-primary cursor-pointer">
            {template.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2">
          {truncateText(template.description, 100)}
        </p>
        
        <div className="flex items-center mb-3">
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
            ({template.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(template.price)}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full gap-2"
          onClick={() => addToCart(template)}
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;