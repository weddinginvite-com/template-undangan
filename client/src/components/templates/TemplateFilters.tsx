import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { templateCategories } from "@shared/schema";

interface TemplateFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const TemplateFilters = ({ selectedCategory, onCategoryChange }: TemplateFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Search</h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Categories</h3>
        <RadioGroup
          value={selectedCategory}
          onValueChange={onCategoryChange}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="cursor-pointer capitalize">All Templates</Label>
          </div>
          
          {templateCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category} id={category} />
              <Label htmlFor={category} className="cursor-pointer capitalize">
                {category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Special Collections</h3>
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => onCategoryChange("featured")}
          >
            Featured
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => onCategoryChange("new")}
          >
            New Arrivals
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => onCategoryChange("bestseller")}
          >
            Bestsellers
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="min-price">Min</Label>
            <Input id="min-price" type="number" placeholder="0" />
          </div>
          <div>
            <Label htmlFor="max-price">Max</Label>
            <Input id="max-price" type="number" placeholder="500000" />
          </div>
        </div>
        <Button className="w-full">Apply Filter</Button>
      </div>
      
      <div className="pt-4">
        <Button variant="outline" className="w-full" onClick={() => {
          setSearchTerm("");
          onCategoryChange("all");
        }}>
          Reset All Filters
        </Button>
      </div>
    </div>
  );
};

export default TemplateFilters;