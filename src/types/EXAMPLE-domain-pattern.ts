/**
 * EXAMPLE: Domain Model Pattern for New Features
 * 
 * This file demonstrates the recommended pattern for creating types
 * when adding new features to the application.
 */

import { BaseEntity } from './common';

// ============================================
// STEP 1: Database Type (in db-schema.ts)
// ============================================
// This would be added to db-schema.ts when the table is created
/*
export interface DBProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  cost: number;
  sku: string;
  barcode: string | null;
  
  // Internal/system fields
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string | null;
  
  // Import/migration fields
  import_legacy_id: string | null;
  import_source: string | null;
  import_date: string | null;
  
  // Tracking fields
  last_inventory_check: string | null;
  last_price_update: string | null;
  internal_notes: string | null;
  
  // Relationships
  category_id: string;
  manufacturer_id: string | null;
  supplier_id: string | null;
  
  // Status
  status: ProductStatus;
  is_active: boolean;
  is_featured: boolean;
}

export type ProductStatus = 'draft' | 'active' | 'discontinued' | 'out_of_stock';
*/

// ============================================
// STEP 2: Domain Model (in product.ts)
// ============================================
// This is what you'd create in your feature's type file

// Import the DB type (this would come from db-schema.ts)
type DBProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  cost: number;
  sku: string;
  barcode: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string | null;
  import_legacy_id: string | null;
  import_source: string | null;
  import_date: string | null;
  last_inventory_check: string | null;
  last_price_update: string | null;
  internal_notes: string | null;
  category_id: string;
  manufacturer_id: string | null;
  supplier_id: string | null;
  status: 'draft' | 'active' | 'discontinued' | 'out_of_stock';
  is_active: boolean;
  is_featured: boolean;
};

// Domain model - only expose what the application needs
export interface Product extends Pick<DBProduct,
  // Core fields
  | 'id' 
  | 'name' 
  | 'description' 
  | 'price' 
  | 'sku'
  | 'barcode'
  
  // Status fields
  | 'status' 
  | 'is_active' 
  | 'is_featured'
  
  // Timestamps (often needed for display)
  | 'created_at' 
  | 'updated_at'
  
  // Foreign keys (for loading relationships)
  | 'category_id'
  | 'manufacturer_id'
>, BaseEntity {
  // Computed properties
  margin?: number; // Calculated from price - cost
  profitPercentage?: number;
  
  // Relationships (loaded separately)
  category?: ProductCategory;
  manufacturer?: Manufacturer;
  inventory?: InventoryStatus;
  
  // UI-specific properties
  imageUrl?: string;
  thumbnailUrl?: string;
}

// Related types for this domain
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  website?: string;
}

export interface InventoryStatus {
  quantity: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  isLowStock: boolean;
}

// ============================================
// STEP 3: Type Mappers (in type-mappers.ts)
// ============================================
// Add these to type-mappers.ts

export function mapDBProductToDomain(
  dbProduct: DBProduct,
  category?: ProductCategory,
  manufacturer?: Manufacturer,
  inventory?: InventoryStatus
): Product {
  const { 
    // Exclude internal fields
    cost,
    created_by,
    updated_by,
    import_legacy_id,
    import_source,
    import_date,
    last_inventory_check,
    last_price_update,
    internal_notes,
    supplier_id,
    
    // Include everything else
    ...domainFields 
  } = dbProduct;
  
  return {
    ...domainFields,
    
    // Add computed properties
    margin: dbProduct.price - dbProduct.cost,
    profitPercentage: ((dbProduct.price - dbProduct.cost) / dbProduct.cost) * 100,
    
    // Add relationships
    category,
    manufacturer,
    inventory
  };
}

export function extractDBProductFromDomain(product: Product): Partial<DBProduct> {
  const {
    // Remove computed properties
    margin,
    profitPercentage,
    
    // Remove relationships
    category,
    manufacturer,
    inventory,
    
    // Remove UI properties
    imageUrl,
    thumbnailUrl,
    
    // Keep everything else
    ...dbFields
  } = product;
  
  return dbFields;
}

// ============================================
// USAGE EXAMPLE
// ============================================
/*
// In a custom hook
export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      // Fetch from database
      const { data: dbProduct } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          manufacturer:manufacturers(*)
        `)
        .eq('id', productId)
        .single();
      
      // Fetch inventory separately
      const inventory = await fetchInventoryStatus(productId);
      
      // Map to domain model
      return mapDBProductToDomain(
        dbProduct,
        dbProduct.category,
        dbProduct.manufacturer,
        inventory
      );
    }
  });
}

// In a mutation
export function useUpdateProduct() {
  return useMutation({
    mutationFn: async (product: Product) => {
      // Extract only DB fields
      const dbFields = extractDBProductFromDomain(product);
      
      // Update in database
      const { data } = await supabase
        .from('products')
        .update(dbFields)
        .eq('id', product.id)
        .select()
        .single();
      
      return data;
    }
  });
}
*/