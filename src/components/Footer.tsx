export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">finishingtouchflawless.co.uk</h3>
            <p className="text-muted-foreground text-sm">
              Equipping women with the beauty tools they need to be their most confident selves everyday.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Contact Us</li>
              <li>Shipping Information</li>
              <li>Returns & Exchanges</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Sign up to our newsletter for news & exclusives
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 finishingtouchflawless.co.uk. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
