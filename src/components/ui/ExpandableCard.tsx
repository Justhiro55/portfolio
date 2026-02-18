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
  carousel?: boolean;
}

export function ExpandableCards({ projects, carousel = false }: ExpandableCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(300);
  const ref = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const id = useId();

  const active = activeIndex !== null ? projects[activeIndex] : null;
  const visibleCount = 3; // 表示するカード数
  const maxCarouselIndex = Math.max(0, projects.length - visibleCount);
  const cardGap = 24; // gap-6 = 24px

  // Update card width on mount and resize
  useEffect(() => {
    const updateCardWidth = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        setCardWidth((containerWidth - cardGap * (visibleCount - 1)) / visibleCount);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, [mounted]);

  const goToPrev = () => {
    if (activeIndex !== null && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex !== null && activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const goToCarouselPrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const goToCarouselNext = () => {
    setCarouselIndex((prev) => Math.min(maxCarouselIndex, prev + 1));
  };

  // Handle drag end - snap to nearest card
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
    const cardWidthWithGap = cardWidth + cardGap;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Higher threshold for better UX - require more deliberate drag
    const minDragDistance = cardWidthWithGap * 0.3; // 30% of card width
    const minVelocity = 500;

    // Calculate how many cards to move based on drag distance
    let cardsMoved = Math.max(1, Math.round(Math.abs(offset) / cardWidthWithGap));

    if (offset > minDragDistance || velocity > minVelocity) {
      // Dragged right - go to previous
      setCarouselIndex((prev) => Math.max(0, prev - cardsMoved));
    } else if (offset < -minDragDistance || velocity < -minVelocity) {
      // Dragged left - go to next
      setCarouselIndex((prev) => Math.min(maxCarouselIndex, prev + cardsMoved));
    }

    // Small delay to prevent click after drag
    setTimeout(() => setIsDragging(false), 150);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (activeIndex !== null) {
        if (event.key === "ArrowLeft") {
          goToPrev();
        }
        if (event.key === "ArrowRight") {
          goToNext();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  // Handle body scroll lock - only on modal open/close
  useEffect(() => {
    if (active) {
      // Save scroll position before locking
      scrollPositionRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
      document.body.classList.add("modal-open");
    } else {
      // Restore scroll position
      const scrollY = scrollPositionRef.current;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("modal-open");
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("modal-open");
    };
  }, [!!active]);

  useOutsideClick(ref, () => setActiveIndex(null));

  const modalContent = (
    <>
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md h-full w-full z-[100]"
            onClick={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {active && activeIndex !== null && (
          <motion.div
            key="modal-container"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.08 } }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4 md:p-8 lg:p-12 pointer-events-none"
          >
            {/* Close button (mobile) */}
            <button
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-base-100 rounded-full h-8 w-8 z-10 pointer-events-auto"
              onClick={() => setActiveIndex(null)}
            >
              <CloseIcon />
            </button>

            {/* Navigation buttons */}
            {activeIndex > 0 && (
              <button
                data-modal-nav
                className="absolute left-1 md:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-base-100 border-2 border-base-300 hover:border-brand-green/60 hover:shadow-lg transition-all pointer-events-auto"
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              >
                <ChevronLeftIcon />
              </button>
            )}
            {activeIndex < projects.length - 1 && (
              <button
                data-modal-nav
                className="absolute right-1 md:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-base-100 border-2 border-base-300 hover:border-brand-green/60 hover:shadow-lg transition-all pointer-events-auto"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
              >
                <ChevronRightIcon />
              </button>
            )}

            <div
              ref={ref}
              className="w-full max-w-4xl flex flex-col bg-base-100 rounded-2xl overflow-hidden border-2 border-base-300 shadow-2xl pointer-events-auto"
            >
              {/* Header - fixed height */}
              <div className="p-6 border-b border-base-300 shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-base-content line-clamp-2">
                      {active.title}
                    </h3>
                    <p className="text-sm text-base-content/60 mt-1">
                      {active.time}
                    </p>
                  </div>
                  {active.category && (
                    <span
                      className={cn(
                        "text-xs font-semibold px-3 py-1.5 rounded-full shrink-0",
                        categoryClasses[active.category]
                      )}
                    >
                      {categoryLabels[active.category]}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-base text-base-content/80 leading-relaxed mb-6">
                  {active.description}
                </p>

                {active.technologies && active.technologies.length > 0 && (
                  <div className="mb-6">
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
                  </div>
                )}

                {active.links && Object.keys(active.links).length > 0 && (
                  <div>
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
                          {active.links.demo.includes('marketplace') ? 'Marketplace' : active.links.demo.includes('apple') ? 'App Store' : active.links.demo.includes('crates.io') ? 'crates.io' : 'Demo'}
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
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // Card component for reuse
  const renderCard = (project: Project, idx: number) => {
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
        <div
          onClick={() => {
            if (!isDragging) {
              setActiveIndex(idx);
            }
          }}
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
                <span
                  className={cn(
                    "absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full",
                    categoryClasses[project.category]
                  )}
                >
                  {categoryLabels[project.category]}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-base font-bold text-base-content leading-tight line-clamp-1">
                {project.title.split('—')[0].trim()}
              </h3>
              <p className="text-xs text-base-content/50 mt-1">
                {project.time}
              </p>
              <p className="text-sm text-base-content/70 mt-2 line-clamp-1">
                {shortDesc}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-xs text-brand-blue/70 mt-2 line-clamp-1">
                  {project.technologies.slice(0, 3).map(tech => `#${tech}`).join(' ')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Modal rendered via portal to avoid blur effect from drawer-content */}
      {mounted && createPortal(modalContent, document.body)}

      {carousel ? (
        /* Carousel Mode */
        <div className="relative">
          {/* Navigation Buttons */}
          {carouselIndex > 0 && (
            <button
              onClick={goToCarouselPrev}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-base-100 border-2 border-base-300 hover:border-brand-green hover:bg-brand-green hover:text-white shadow-lg transition-all duration-200"
            >
              <ChevronLeftIcon />
            </button>
          )}
          {carouselIndex < maxCarouselIndex && (
            <button
              onClick={goToCarouselNext}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-base-100 border-2 border-base-300 hover:border-brand-green hover:bg-brand-green hover:text-white shadow-lg transition-all duration-200"
            >
              <ChevronRightIcon />
            </button>
          )}

          {/* Carousel Container */}
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            ref={(el) => {
              carouselRef.current = el;
              constraintsRef.current = el;
            }}
          >
            <LayoutGroup id={`cards-${id}`}>
              <motion.div
                className="flex gap-6"
                drag="x"
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                animate={{
                  x: -carouselIndex * (cardWidth + cardGap)
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ x: 0 }}
              >
                {projects.map((project, idx) => (
                  <div
                    key={`carousel-card-${project.title}-${id}`}
                    className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0"
                    onClick={(e) => {
                      // Prevent card click when dragging
                      if (isDragging) {
                        e.stopPropagation();
                        e.preventDefault();
                      }
                    }}
                  >
                    {renderCard(project, idx)}
                  </div>
                ))}
              </motion.div>
            </LayoutGroup>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxCarouselIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  idx === carouselIndex
                    ? "bg-brand-green w-6"
                    : "bg-base-300 hover:bg-base-content/30"
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Grid Mode */
        <LayoutGroup id={`cards-${id}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => renderCard(project, idx))}
          </div>
        </LayoutGroup>
      )}
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
      const target = event.target as HTMLElement;
      // Skip if clicking on navigation buttons or elements with data-modal-nav attribute
      if (target.closest('[data-modal-nav]')) {
        return;
      }
      if (ref.current && !ref.current.contains(target)) {
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

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-base-content">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-base-content">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
