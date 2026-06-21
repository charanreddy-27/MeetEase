import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github } from 'lucide-react';

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Licenses', href: '/licenses' },
    ],
  },
];

const socials = [
  { label: 'Twitter', href: '#', Icon: Twitter },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
  { label: 'GitHub', href: '#', Icon: Github },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-background/80 backdrop-blur-lg md:ml-[240px]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative size-10 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500" />
                <Image
                  src="/icons/logo.svg"
                  width={40}
                  height={40}
                  alt="MeetEase"
                  className="relative z-10 p-1.5"
                />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight gradient-text">
                MeetEase
              </span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Next-generation video conferencing with AI-powered features, real-time
              collaboration tools, and enterprise-grade security.
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="glassmorphic-icon"
                  aria-label={label}
                >
                  <Icon className="size-5 text-muted-foreground transition-colors hover:text-primary-400" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MeetEase. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-primary-400"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-primary-400"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
