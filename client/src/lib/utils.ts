import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

type StarType = 'full' | 'half' | 'empty';

export function calculateRatingStars(rating: number): StarType[] {
  const stars: StarType[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push('half');
  }
  
  // Fill the rest with empty stars
  while (stars.length < 5) {
    stars.push('empty');
  }
  
  return stars;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}