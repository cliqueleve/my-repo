import { useState } from 'react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [
    {
      url: 'https://static.wixstatic.com/media/da404b_f04ef27e0ec04372baf0851bbfd85395~mv2.png',
      alt: 'Aparador de Sobrancelhas Traço Fino - Caneta aberta com tampa ao lado'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 1. GALERIA E FICHA COMERCIAL */}
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Galeria - Mobile: abaixo do nome/headline */}
            <div className="order-2 md:order-1">
              <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <Image
                  src={productImages[currentImageIndex].url}
                  alt={productImages[currentImageIndex].alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain p-8"
                />
              </div>

              {/* Miniaturas - acessíveis por toque e teclado */}
              {productImages.length > 1 && (
                <div className="flex gap-3 mt-4 justify-center md:justify-start">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setCurrentImageIndex(idx);
                        }
                      }}
                      className={`w-16 h-16 rounded border-2 transition-all ${
                        idx === currentImageIndex
                          ? 'border-primary bg-gray-50'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                      aria-label={`Imagem ${idx + 1}`}
                      aria-current={idx === currentImageIndex}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Controles de navegação */}
              {productImages.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center md:justify-start">
                  <button
                    onClick={prevImage}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        prevImage();
                      }
                    }}
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        nextImage();
                      }
                    }}
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Ficha Comercial - Mobile: nome e headline acima da galeria */}
            <div className="order-1 md:order-2 flex flex-col justify-center">
              <h1 className="font-heading font-semibold text-4xl md:text-5xl text-foreground mb-4">
                Aparador de Sobrancelhas em Caneta Traço Fino
              </h1>

              <p className="font-heading font-semibold text-2xl md:text-3xl text-primary mb-6">
                O desenho tá pronto. Só falta o retoque.
              </p>

              <p className="font-paragraph text-base md:text-lg text-foreground mb-8 leading-relaxed">
                Use a ponta da Traço Fino para aparar os fios soltos ao redor do contorno, direto no espelho.
              </p>

              <div className="mb-8">
                <p className="font-heading font-semibold text-3xl md:text-4xl text-primary">
                  R$ 179,90
                </p>
              </div>

              <Button
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-heading font-semibold text-lg py-6 px-8 rounded-lg transition-colors"
              >
                Quero minha Traço Fino
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEMA */}
      <section className="w-full bg-secondary py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Texto - Desktop: esquerda, Mobile: acima */}
            <div className="order-1">
              <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground mb-6">
                Guarda a pinça.
              </h2>

              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed">
                Você chega perto do espelho e vê aqueles fios que cresceram entre as sobrancelhas. O desenho continua do jeito que você gosta. É só aquela parte que pede um retoque.
              </p>
            </div>

            {/* Mídia - Desktop: direita, Mobile: abaixo */}
            <div className="order-2 bg-gray-100 rounded-lg aspect-square flex items-center justify-center min-h-[300px] md:min-h-auto">
              <div className="text-center text-muted-foreground">
                <p className="font-paragraph text-sm">Foto: pessoa com pinça diante do espelho</p>
                <p className="font-paragraph text-xs mt-2">(Espaço reservado para mídia)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUÇÃO E BENEFÍCIOS */}
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Mídia - Desktop: esquerda, Mobile: abaixo */}
            <div className="order-2 md:order-1 bg-gray-50 rounded-lg aspect-square flex items-center justify-center min-h-[300px] md:min-h-auto">
              <Image
                src="https://static.wixstatic.com/media/da404b_f04ef27e0ec04372baf0851bbfd85395~mv2.png"
                alt="Detalhe da ponta do aparador Traço Fino"
                width={400}
                height={400}
                className="w-full h-full object-contain p-8"
              />
            </div>

            {/* Texto e Destaques - Desktop: direita, Mobile: acima */}
            <div className="order-1 md:order-2">
              <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground mb-6">
                Apare só onde precisa.
              </h2>

              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed mb-8">
                Com a Traço Fino, você apara os fios fora do contorno sem arrancar um por um. O formato de caneta ajuda a direcionar a ponta para a área que você quer retocar.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="font-paragraph text-base text-foreground">Retoque pontual</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="font-paragraph text-base text-foreground">Formato de caneta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MODO DE USO */}
      <section className="w-full bg-secondary py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Como fazer o retoque
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Etapa 1 */}
            <div className="bg-white rounded-lg p-6 md:p-8 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-semibold text-lg mb-4">
                1
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                Identifique os fios
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed mb-6 flex-grow">
                Com boa iluminação, identifique os fios que ficaram fora do desenho.
              </p>
              <div className="bg-gray-100 rounded aspect-square flex items-center justify-center">
                <p className="text-center text-muted-foreground text-sm">Espaço para mídia</p>
              </div>
            </div>

            {/* Etapa 2 */}
            <div className="bg-white rounded-lg p-6 md:p-8 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-semibold text-lg mb-4">
                2
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                Use o aparador
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed mb-6 flex-grow">
                Retire a tampa e use o aparador conforme as instruções do fabricante, somente na área que deseja retocar.
              </p>
              <div className="bg-gray-100 rounded aspect-square flex items-center justify-center">
                <Image
                  src="https://static.wixstatic.com/media/da404b_f04ef27e0ec04372baf0851bbfd85395~mv2.png"
                  alt="Aparador de Sobrancelhas com tampa removida"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            {/* Etapa 3 */}
            <div className="bg-white rounded-lg p-6 md:p-8 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-semibold text-lg mb-4">
                3
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                Confira o acabamento
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed mb-6 flex-grow">
                Confira o acabamento no espelho e limpe o cabeçote conforme o manual.
              </p>
              <div className="bg-gray-100 rounded aspect-square flex items-center justify-center">
                <p className="text-center text-muted-foreground text-sm">Espaço para mídia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DETALHES DO PRODUTO */}
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Texto - Desktop: esquerda, Mobile: acima */}
            <div className="order-1">
              <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground mb-6">
                O que vem na compra
              </h2>

              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed">
                1 aparador Traço Fino em formato de caneta, com corpo branco, acabamento rosé e tampa protetora.
              </p>
            </div>

            {/* Mídia - Desktop: direita, Mobile: abaixo */}
            <div className="order-2 bg-gray-50 rounded-lg aspect-square flex items-center justify-center min-h-[300px] md:min-h-auto">
              <Image
                src="https://static.wixstatic.com/media/da404b_f04ef27e0ec04372baf0851bbfd85395~mv2.png"
                alt="Aparador Traço Fino com tampa separada"
                width={400}
                height={400}
                className="w-full h-full object-contain p-8"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
