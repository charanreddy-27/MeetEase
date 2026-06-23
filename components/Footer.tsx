import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Github, Globe, Calendar } from 'lucide-react';

import { developer, project } from '@/lib/site';

const footerSections = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Join a meeting', href: '/meeting/join' },
      { label: 'Recordings', href: '/recordings' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    title: 'The Project',
    links: [
      { label: 'About the build', href: '/about-project' },
      { label: 'About the developer', href: '/about' },
      { label: 'Source code', href: project.repo, external: true },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Portfolio', href: developer.portfolio, external: true },
      { label: 'Book a call', href: developer.bookACall, external: true },
      { label: 'LinkedIn', href: developer.linkedin, external: true },
      { label: 'GitHub', href: developer.github, external: true },
    ],
  },
];

const socials = [
  { label: 'Portfolio', href: developer.portfolio, Icon: Globe },
  { label: 'LinkedIn', href: developer.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: developer.github, Icon: Github },
  { label: 'Book a call', href: developer.bookACall, Icon: Calendar },
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
                  alt=""
                  className="relative z-10 p-1.5"
                />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight gradient-text">
                MeetEase
              </span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              An AI-native take on video conferencing — HD calls, in-browser live
              transcription, and a Claude-powered copilot that actually reads the
              room. Built as a portfolio project by {developer.shortName}.
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glassmorphic-icon"
                  aria-label={label}
                >
                  <Icon className="size-5 text-muted-foreground transition-colors hover:text-primary-400" />
                </a>
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
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground transition-colors hover:text-primary-400"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary-400"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MeetEase. Crafted with intent by{' '}
            <a
              href={developer.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors hover:text-primary-400"
            >
              {developer.name}
            </a>
            .
          </p>
          <p className="text-sm text-muted-foreground">
            Available for new projects.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
