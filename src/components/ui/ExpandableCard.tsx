"use client";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type ProjectCategory = 'cli-tool' | 'web-app' | 'mobile-app' | 'extension' | 'other';

interface Project {
  title: string;
  time: string;
  description: string;
  shortDescription?: string;
  image?: string;
  technologies?: string[];
  category?: ProjectCategory;
  links?: {
    github?: string;
    website?: string;
    demo?: string;
    article?: string;
  };
}

const categoryLabels: Record<ProjectCategory, string> = {
  'cli-tool': 'CLI',
  'web-app': 'Web',
  'mobile-app': 'Mobile',
  'extension': 'Extension',
  'other': 'Other',
};

const categoryClasses: Record<ProjectCategory, string> = {
  'cli-tool': 'bg-brand-blue text-white',
  'web-app': 'bg-brand-green text-white',
  'mobile-app': 'bg-brand-orange text-white',
  'extension': 'bg-brand-purple text-white',
  'other': 'bg-brand-brown text-white',
};

interface ExpandableCardsProps {
  projects: Project[];
}

export function ExpandableCards({ projects }: ExpandableCardsProps) {
  const [active, setActive] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const modalContent = (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[101] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-base-100 rounded-full h-8 w-8 z-10"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-4xl h-full md:h-fit md:max-h-[85%] flex flex-col bg-base-100 rounded-2xl overflow-hidden border-2 border-base-300 shadow-2xl"
            >
              {/* Header */}
              <motion.div
                layoutId={`header-${active.title}-${id}`}
                className="p-6 border-b border-base-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-2xl font-bold text-base-content"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`time-${active.title}-${id}`}
                      className="text-sm text-base-content/60 mt-1"
                    >
                      {active.time}
                    </motion.p>
                  </div>
                  {active.category && (
                    <motion.span
                      layoutId={`category-${active.title}-${id}`}
                      className={cn(
                        "text-xs font-semibold px-3 py-1.5 rounded-full shrink-0",
                        categoryClasses[active.category]
                      )}
                    >
                      {categoryLabels[active.category]}
                    </motion.span>
                  )}
                </div>
              </motion.div>

              {/* Content */}
              <div className="p-6 overflow-auto flex-1">
                <motion.p
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-base text-base-content/80 leading-relaxed mb-6"
                >
                  {active.description}
                </motion.p>

                {active.technologies && active.technologies.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <h4 className="text-sm font-semibold text-base-content mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {active.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-sm rounded-full border bg-base-100 text-base-content border-brand-blue"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {active.links && Object.keys(active.links).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-sm font-semibold text-base-content mb-3">Links</h4>
                    <div className="flex flex-wrap gap-3">
                      {active.links.github && (
                        <a
                          href={active.links.github}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-base-200 hover:bg-base-300 text-base-content transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GitHubIcon />
                          GitHub
                        </a>
                      )}
                      {active.links.website && (
                        <a
                          href={active.links.website}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-brand-green text-white hover:opacity-90 transition-opacity"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GlobeIcon />
                          Website
                        </a>
                      )}
                      {active.links.demo && (
                        <a
                          href={active.links.demo}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-brand-blue text-white hover:opacity-90 transition-opacity"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalIcon />
                          {active.links.demo.includes('marketplace') ? 'Marketplace' : active.links.demo.includes('apple') ? 'App Store' : 'Demo'}
                        </a>
                      )}
                      {active.links.article && (
                        <a
                          href={active.links.article}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-base-200 hover:bg-base-300 text-base-content transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ArticleIcon />
                          記事
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {/* Modal rendered via portal to avoid blur effect from drawer-content */}
      {mounted && createPortal(modalContent, document.body)}

      {/* Card Grid */}
      <LayoutGroup id={`cards-${id}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
          const shortDesc = project.shortDescription || project.description.slice(0, 60) + (project.description.length > 60 ? '...' : '');
          return (
            <div
              key={`card-wrapper-${project.title}-${id}`}
              className="relative p-1"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover Background Animation */}
              <AnimatePresence mode="wait">
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-base-300 block rounded-2xl shadow-lg"
                    layoutId={`hoverBackground-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.1 },
                    }}
                    style={{ zIndex: 0 }}
                  />
                )}
              </AnimatePresence>
              <motion.div
                layoutId={`card-${project.title}-${id}`}
                onClick={() => setActive(project)}
                className="cursor-pointer group relative"
                style={{ zIndex: 1 }}
              >
                <div className="rounded-xl overflow-hidden bg-base-100 border-2 border-base-300 group-hover:border-brand-green/60 transition-all duration-300 group-hover:shadow-lg">
                  {/* Image or Placeholder */}
                  <div className="relative aspect-[16/9] bg-base-200 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
                        <span className="text-4xl opacity-30">
                          {project.category === 'cli-tool' ? '>' :
                           project.category === 'web-app' ? '{ }' :
                           project.category === 'mobile-app' ? '📱' :
                           project.category === 'extension' ? '🔌' : '📁'}
                        </span>
                      </div>
                    )}
                    {/* Category Badge */}
                    {project.category && (
                      <motion.span
                        layoutId={`category-${project.title}-${id}`}
                        className={cn(
                          "absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full",
                          categoryClasses[project.category]
                        )}
                      >
                        {categoryLabels[project.category]}
                      </motion.span>
                    )}
                  </div>

                  {/* Content */}
                  <motion.div
                    layoutId={`header-${project.title}-${id}`}
                    className="p-4"
                  >
                    <motion.h3
                      layoutId={`title-${project.title}-${id}`}
                      className="text-base font-bold text-base-content leading-tight line-clamp-1"
                    >
                      {project.title.split('—')[0].trim()}
                    </motion.h3>
                    <motion.p
                      layoutId={`time-${project.title}-${id}`}
                      className="text-xs text-base-content/50 mt-1"
                    >
                      {project.time}
                    </motion.p>
                    <p className="text-sm text-base-content/70 mt-2 line-clamp-1">
                      {shortDesc}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                      <p className="text-xs text-brand-blue/70 mt-2 line-clamp-1">
                        {project.technologies.slice(0, 3).map(tech => `#${tech}`).join(' ')}
                      </p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
          })}
        </div>
      </LayoutGroup>
    </>
  );
}

// Hook for outside click detection
function useOutsideClick(
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}

// Icons
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-base-content"
  >
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ArticleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
