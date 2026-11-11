/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: beneficios
 * Interface for ProductBenefits
 */
export interface ProductBenefits {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  benefitTitle?: string;
  /** @wixFieldType text */
  problemSolutionDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  illustrativeImage?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: faq
 * Interface for PerguntasFrequentes
 */
export interface PerguntasFrequentes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}


/**
 * Collection ID: mododeuso
 * Interface for MododeUso
 */
export interface MododeUso {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  stepNumber?: number;
  /** @wixFieldType text */
  stepTitle?: string;
  /** @wixFieldType text */
  detailedInstruction?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  stepImage?: string;
  /** @wixFieldType text */
  proTip?: string;
}


/**
 * Collection ID: produtos
 * @catalog This collection is an eCommerce catalog
 * Interface for Produtos
 */
export interface Produtos {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  productHeadline?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImage1?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImage2?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImage3?: string;
}
