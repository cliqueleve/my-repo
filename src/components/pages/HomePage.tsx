// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Produtos, ProductBenefits, MododeUso, PerguntasFrequentes } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { ChevronLeft, ChevronRight, Sparkles, Droplet, Award, Battery, Plus, Minus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

// --- Animation Components ---

const AnimatedElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}> = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 scale-100';
    switch (direction) {
      case 'up': return 'translate-y-8 scale-95';
      case 'left': return '-translate-x-8';
      case 'right': return 'translate-x-8';
      case 'none': return 'scale-95';
      default: return 'translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const [product, setProduct] = useState<Produtos | null>(null);
  const [benefits, setBenefits] = useState<ProductBenefits[]>([]);
  const [usageSteps, setUsageSteps] = useState<MododeUso[]>([]);
  const [faqs, setFaqs] = useState<PerguntasFrequentes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('DESCRIPTION');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [productsResult, benefitsResult, usageResult, faqsResult] = await Promise.all([
        BaseCrudService.getAll<Produtos>('produtos', {}, { limit: 1 }),
        BaseCrudService.getAll<ProductBenefits>('beneficios'),
        BaseCrudService.getAll<MododeUso>('mododeuso'),
        BaseCrudService.getAll<PerguntasFrequentes>('faq')
      ]);

      if (productsResult.items.length > 0) {
        setProduct(productsResult.items[0]);
      }
      
      setBenefits(benefitsResult.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      setUsageSteps(usageResult.items.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)));
      setFaqs(faqsResult.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const productImages = product ? [
    product.itemImage,
    product.galleryImage1,
    product.galleryImage2,
    product.galleryImage3
  ].filter(Boolean) as string[] : [];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);

  // Fallback content based on scraped data if dynamic is missing
  const fallbackDescription = `Introducing Finishing Touch Flawless™ Brows 3.0 – the innovative beauty tool for all your brow needs!

This precision tool quickly, effortlessly and painlessly removes unwanted hair for stunning eyebrows. With state-of-the-art technology and a hypo-allergenic 18-karat gold-plated head, you can instantly and shape hair above, below and between brows with no risk of pain or irritation. Finishing Touch Flawless removes the pain of waxing, shaving and threading for an easy, pain-free solution to perfectly shaped brows.

With the sleek and feminine design, the Flawless Brows can be slipped into your beauty bag for easy hair removal anywhere, anytime. The integrated LED light also illuminates the area, making sure you never miss a hair.`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-paragraph text-foreground selection:bg-primary/30">
      {/* Top Notice Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2.5 px-4 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase w-full z-50 relative">
        NOTICE: OUR PRODUCTS ARE NO LONGER AVAILABLE TO BUY VIA OUR WEBSITE. PLEASE VISIT YOUR NEAREST RETAILER
      </div>

      <Header />
      <Cart />
      
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-8 pt-8 pb-4">
          <AnimatedElement direction="none">
            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="hover:text-primary cursor-pointer transition-colors">HOME</span>
              <span>/</span>
              <span className="hover:text-primary cursor-pointer transition-colors">PRODUCTS</span>
              <span>/</span>
              <span className="text-foreground font-semibold">{product?.itemName || 'FLAWLESS BROWS 3.0 RECHARGEABLE'}</span>
            </div>
          </AnimatedElement>
        </div>

        {/* Hero Section - Product Detail */}
        <section className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          {product ? (
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-start">
              
              {/* Left Column: Images & Icons */}
              <div className="flex flex-col gap-12">
                {/* Main Image Gallery */}
                <AnimatedElement direction="right" className="relative group">
                  <div className="relative aspect-[4/5] sm:aspect-square bg-white rounded-sm overflow-hidden flex items-center justify-center p-8">
                    {productImages.length > 0 && (
                      <Image
                        src={productImages[currentImageIndex]}
                        alt={product.itemName || 'Product'}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        width={800}
                      />
                    )}
                    
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-2 opacity-0 group-hover:opacity-100 duration-300"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-8 h-8 stroke-[1.5]" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-2 opacity-0 group-hover:opacity-100 duration-300"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-8 h-8 stroke-[1.5]" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnails */}
                  {productImages.length > 1 && (
                    <div className="flex justify-center gap-4 mt-6">
                      {productImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative w-20 h-24 sm:w-24 sm:h-28 bg-white rounded-sm overflow-hidden transition-all duration-300 ${
                            idx === currentImageIndex 
                              ? 'ring-1 ring-primary ring-offset-2 opacity-100' 
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-contain p-2"
                            width={100}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </AnimatedElement>

                {/* Feature Icons (Below Images) */}
                <AnimatedElement delay={200} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border/40">
                  {[
                    { icon: Sparkles, label: 'Painless' },
                    { icon: Droplet, label: 'No Soap Or Water' },
                    { icon: Award, label: 'Gold Plated' },
                    { icon: Battery, label: 'Rechargeable' }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center gap-4 group">
                      <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors duration-300">
                        <feature.icon className="w-8 h-8 stroke-[1]" />
                      </div>
                      <span className="text-xs font-semibold tracking-wide text-foreground/80">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </AnimatedElement>
              </div>

              {/* Right Column: Product Info */}
              <AnimatedElement direction="left" delay={100} className="lg:sticky lg:top-32">
                <div className="bg-[#FDFBFB] p-8 md:p-12 rounded-sm border border-border/20 shadow-sm">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading uppercase tracking-widest text-foreground mb-8 leading-tight">
                    {product.itemName}
                  </h1>
                  
                  <div className="flex justify-between items-start border-t border-border/40 pt-8">
                    <span className="text-3xl font-bold text-foreground">
                      {formatPrice(product.itemPrice || 29.99, currency ?? DEFAULT_CURRENCY)}
                    </span>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Out of stock</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">SKU: 506357</span>
                    </div>
                  </div>

                  {/* Functional Add to Cart (Maintained for functionality despite "Out of stock" visual) */}
                  <button
                    onClick={() => actions.addToCart({ collectionId: 'produtos', itemId: product._id })}
                    disabled={addingItemId === product._id}
                    className="w-full mt-10 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-bold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {addingItemId === product._id ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </AnimatedElement>

            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Product not found</p>
            </div>
          )}
        </section>

        {/* Tabs Section */}
        <section className="py-16 md:py-24 bg-white border-t border-border/20">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <AnimatedElement>
              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                {['DESCRIPTION', 'SPECIFICATIONS', 'FEATURES & BENEFITS', 'REVIEWS'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'bg-[#F9F2F2] text-foreground/70 hover:bg-primary/20 hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Area */}
              <div className="min-h-[300px] animate-in fade-in duration-500">
                {activeTab === 'DESCRIPTION' && (
                  <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed">
                    <p className="font-bold text-foreground mb-6 text-lg">
                      {product?.productHeadline || 'Introducing Finishing Touch Flawless™ Brows 3.0 – the innovative beauty tool for all your brow needs!'}
                    </p>
                    <div className="whitespace-pre-line">
                      {product?.itemDescription || fallbackDescription}
                    </div>
                  </div>
                )}

                {activeTab === 'SPECIFICATIONS' && (
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    <h3 className="md:col-span-2 font-bold text-lg mb-4 uppercase tracking-wider border-b border-border/40 pb-2">Item Specifications</h3>
                    {[
                      { label: 'Model No', value: 'FTFB3R-5' },
                      { label: 'Product Type', value: 'Hair Removal' },
                      { label: 'LED Beauty light', value: 'Yes' },
                      { label: 'Waterproof', value: 'No' },
                      { label: 'Rechargeable', value: 'Yes - Standard charging system' },
                      { label: 'Replaceable', value: 'No' },
                      { label: 'Battery Type', value: 'Lithium Ion' },
                      { label: 'Unit Weight (kg)', value: '0.125' }
                    ].map((spec, idx) => (
                      <div key={idx} className="flex justify-between py-2 border-b border-border/20">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-foreground text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'FEATURES & BENEFITS' && (
                  <div className="space-y-12">
                    {benefits.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-8">
                        {benefits.map((benefit, idx) => (
                          <div key={benefit._id} className="bg-[#FDFBFB] p-6 rounded-sm border border-border/30 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg mb-3 text-primary">{benefit.benefitTitle}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {benefit.shortDescription || benefit.problemSolutionDescription}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-12">
                        <div>
                          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider border-b border-border/40 pb-2">Product Benefits</h3>
                          <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Discrete and portable design</li>
                            <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Instant and painless brow shaping</li>
                            <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Safe to the touch</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider border-b border-border/40 pb-2">Product Features</h3>
                          <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start gap-3"><Award className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Hypo-allergenic, 18-karat gold plated head</li>
                            <li className="flex items-start gap-3"><Battery className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Built-in LED light for precision use</li>
                            <li className="flex items-start gap-3"><Battery className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Conveniently rechargeable</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'REVIEWS' && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Customer Reviews</h3>
                    <p className="text-muted-foreground">Reviews are currently being updated. Check back soon!</p>
                  </div>
                )}
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* How to Use Section (If data exists) */}
        {usageSteps.length > 0 && (
          <section className="py-20 bg-[#FDFBFB] border-t border-border/20">
            <div className="container mx-auto px-4 md:px-8 max-w-5xl">
              <AnimatedElement>
                <h2 className="text-2xl md:text-3xl font-heading uppercase tracking-widest text-center mb-16">
                  How to Use
                </h2>
              </AnimatedElement>
              
              <div className="space-y-16">
                {usageSteps.map((step, idx) => (
                  <AnimatedElement key={step._id} direction={idx % 2 === 0 ? 'right' : 'left'}>
                    <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}>
                      {step.stepImage && (
                        <div className="w-full md:w-1/2">
                          <div className="relative aspect-square rounded-sm overflow-hidden bg-white shadow-sm border border-border/20 p-4">
                            <Image
                              src={step.stepImage}
                              alt={step.stepTitle || `Step ${step.stepNumber}`}
                              className="w-full h-full object-cover rounded-sm"
                              width={500}
                            />
                          </div>
                        </div>
                      )}
                      <div className="w-full md:w-1/2 space-y-6">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg border border-primary/20">
                            {step.stepNumber}
                          </span>
                          <h3 className="text-xl font-heading font-bold uppercase tracking-wide">
                            {step.stepTitle}
                          </h3>
                        </div>
                        {step.detailedInstruction && (
                          <p className="text-muted-foreground leading-relaxed">
                            {step.detailedInstruction}
                          </p>
                        )}
                        {step.proTip && (
                          <div className="bg-white rounded-sm p-5 border-l-2 border-primary shadow-sm">
                            <p className="text-sm text-foreground/80">
                              <span className="font-bold text-primary uppercase tracking-wider text-xs mr-2">Pro Tip:</span> 
                              {step.proTip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section (If data exists) */}
        {faqs.length > 0 && (
          <section className="py-20 bg-white border-t border-border/20">
            <div className="container mx-auto px-4 md:px-8 max-w-3xl">
              <AnimatedElement>
                <h2 className="text-2xl md:text-3xl font-heading uppercase tracking-widest text-center mb-12">
                  Frequently Asked Questions
                </h2>
              </AnimatedElement>
              
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AnimatedElement key={faq._id} delay={idx * 100}>
                    <div className="border border-border/40 rounded-sm overflow-hidden bg-[#FDFBFB] transition-all duration-300 hover:border-primary/30">
                      <button
                        onClick={() => setActiveFaq(activeFaq === faq._id ? null : faq._id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                      >
                        <span className="font-bold text-sm md:text-base pr-4">
                          {faq.question}
                        </span>
                        <span className="text-primary shrink-0">
                          {activeFaq === faq._id ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </span>
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          activeFaq === faq._id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/20 pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}