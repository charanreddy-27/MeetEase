import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-secondary-950 to-secondary-900 border-t border-secondary-800/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative size-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-accent-500 rounded-lg" />
                <Image
                  src="/icons/logo.svg"
                  width={40}
                  height={40}
                  alt="MeetEase"
                  className="relative z-10 p-1.5"
                />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-accent-400">
                MeetEase
              </span>
            </Link>
            <p className="text-secondary-400 mb-6 max-w-md">
              Next-generation video conferencing with AI-powered features, real-time collaboration tools, and enterprise-grade security.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon="/icons/twitter.svg" label="Twitter" />
              <SocialLink href="#" icon="/icons/linkedin.svg" label="LinkedIn" />
              <SocialLink href="#" icon="/icons/github.svg" label="GitHub" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/integrations">Integrations</FooterLink>
              <FooterLink href="/changelog">Changelog</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">
            &copy; {new Date().getFullYear()} MeetEase. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <FooterLink href="/privacy" small>Privacy Policy</FooterLink>
            <FooterLink href="/terms" small>Terms of Service</FooterLink>
            <FooterLink href="/cookies" small>Cookie Policy</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  small?: boolean;
}

const FooterLink = ({ href, children, small = false }: FooterLinkProps) => {
  return (
    <li>
      <Link 
        href={href} 
        className={`text-secondary-400 hover:text-purple-400 transition-colors ${small ? 'text-sm' : ''}`}
      >
        {children}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  icon: string;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <Link 
      href={href}
      className="size-10 rounded-full bg-secondary-800/80 flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 border border-transparent transition-all"
      aria-label={label}
    >
      <Image 
        src={icon} 
        width={20} 
        height={20} 
        alt={label}
        className="brightness-110" 
      />
    </Link>
  );
};

export default Footer; 