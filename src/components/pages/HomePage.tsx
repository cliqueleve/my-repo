// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Produtos, ProductBenefits, MododeUso, PerguntasFrequentes } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Plus, Minus, Award } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const productsResult = await BaseCrudService.getAll<Produtos>('produtos', {}, { limit: 1 });

      if (productsResult.items.length > 0) {
        setProduct(productsResult.items[0]);
      }
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
      <Header />
      <Cart />
      
      <main className="flex-grow">
        {/* Hero Section - Offer Presentation */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#FDFBFB] to-white border-b border-border/20">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <AnimatedElement direction="left">
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                      Traço Fino à mão para o próximo retoque.
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      Uma caneta aparadora para os fios que cresceram fora do desenho da sobrancelha.
                    </p>
                  </div>
                  
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl md:text-5xl font-bold text-primary">
                      R$ 99,90
                    </span>
                  </div>
                  
                  <button
                    onClick={() => product && actions.addToCart({ collectionId: 'produtos', itemId: product._id })}
                    disabled={addingItemId === product?._id}
                    className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {addingItemId === product?._id ? 'Adicionando...' : 'Quero minha Traço Fino'}
                  </button>
                </div>
              </AnimatedElement>
              
              {/* Right: Product Image */}
              <AnimatedElement direction="right">
                {product && productImages.length > 0 && (
                  <div className="relative aspect-square bg-white rounded-sm overflow-hidden flex items-center justify-center p-8 shadow-sm border border-border/20">
                    <Image
                      src={productImages[0]}
                      alt={product.itemName || 'Traço Fino'}
                      className="w-full h-full object-contain"
                      width={600}
                    />
                  </div>
                )}
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* PROVA REAL Section - Hidden Reviews with Video Support */}
        <section className="py-20 bg-white border-t border-border/20">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <AnimatedElement>
              <h2 className="text-2xl md:text-3xl font-heading uppercase tracking-widest text-center mb-16">
                Prova Real
              </h2>
            </AnimatedElement>
            
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Depoimentos Autênticos</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Estamos coletando depoimentos reais de clientes. Em breve você verá vídeos autênticos mostrando o retoque de perto com a Traço Fino.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section - Perguntas Frequentes */}
        <section className="py-20 bg-[#FDFBFB] border-t border-border/20">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <AnimatedElement>
              <h2 className="text-2xl md:text-3xl font-heading uppercase tracking-widest text-center mb-12">
                Perguntas Frequentes
              </h2>
            </AnimatedElement>
            
            <div className="space-y-4">
              {[
                {
                  id: 'q1',
                  question: 'Ela arranca os fios pela raiz?',
                  answer: 'A Traço Fino é um aparador. Ela apara os fios na superfície para fazer o retoque.'
                },
                {
                  id: 'q2',
                  question: 'Preciso redesenhar a sobrancelha?',
                  answer: 'Você pode manter o desenho que já tem e aparar apenas os fios que cresceram fora do contorno.'
                },
                {
                  id: 'q3',
                  question: 'Qual é o prazo de entrega?',
                  answer: 'Consulte o prazo e o valor do frete informando seu CEP no checkout.'
                },
                {
                  id: 'q4',
                  question: 'Como funciona a troca ou devolução?',
                  answer: 'Consulte a política de trocas e devoluções ou fale com nosso atendimento.'
                }
              ].map((faq, idx) => (
                <AnimatedElement key={faq.id} delay={idx * 100}>
                  <div className="border border-border/40 rounded-sm overflow-hidden bg-white transition-all duration-300 hover:border-primary/30">
                    <button
                      onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                    >
                      <span className="font-bold text-sm md:text-base pr-4">
                        {faq.question}
                      </span>
                      <span className="text-primary shrink-0">
                        {activeFaq === faq.id ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </span>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        activeFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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

        {/* Closing Section - O retoque que faltava */}
        <section className="py-20 bg-white border-t border-border/20">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <AnimatedElement direction="left">
                <div className="space-y-8">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                    O retoque que faltava no seu espelho.
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Viu um fio fora do desenho? Tenha a Traço Fino à mão para aparar só onde precisa.
                  </p>
                  
                  <button
                    onClick={() => product && actions.addToCart({ collectionId: 'produtos', itemId: product._id })}
                    disabled={addingItemId === product?._id}
                    className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {addingItemId === product?._id ? 'Adicionando...' : 'Quero minha Traço Fino'}
                  </button>
                </div>
              </AnimatedElement>
              
              {/* Right: Product Image */}
              <AnimatedElement direction="right">
                {product && productImages.length > 0 && (
                  <div className="relative aspect-square bg-white rounded-sm overflow-hidden flex items-center justify-center p-8 shadow-sm border border-border/20">
                    <Image
                      src={productImages[productImages.length > 1 ? 1 : 0]}
                      alt={product.itemName || 'Traço Fino'}
                      className="w-full h-full object-contain"
                      width={600}
                    />
                  </div>
                )}
              </AnimatedElement>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
