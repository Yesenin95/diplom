import { Product } from '../components/ProductCard';

export function filterProductsByPrice(
   cookies: Product[],
   minPrice: string,
   maxPrice: string
): Product[] {
   if (!minPrice && !maxPrice) {
      return cookies;
   } else {
      return cookies.filter((cookie) => {
         const price = cookie.price;
         if (minPrice && maxPrice) {
            return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
         } else if (minPrice) {
            return price >= parseFloat(minPrice);
         } else if (maxPrice) {
            return price <= parseFloat(maxPrice);
         }
      });
   }
}
