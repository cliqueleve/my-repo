import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const { itemCount, actions } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-lg md:text-xl font-heading font-bold text-foreground hover:text-primary transition-colors">
            Traço Fino
          </Link>
          
          <button
            onClick={actions.toggleCart}
            className="relative p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-6 h-6 text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>
      <Cart />
    </>
  );
}
