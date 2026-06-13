"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { ResolvedGalleryImage } from "@/lib/projects";
import styles from "./ProjectGallery.module.css";

interface ProjectGalleryProps {
  items: ResolvedGalleryImage[];
  projectTitle: string;
}

function layoutClass(index: number, total: number): string {
  if (total === 1) return styles.galleryItemWide;
  if (index % 5 === 0) return styles.galleryItemWide;
  if (index % 5 === 2) return styles.galleryItemTall;
  return "";
}

interface GalleryThumbnailProps {
  item: ResolvedGalleryImage;
  index: number;
  total: number;
  projectTitle: string;
  onOpen: () => void;
}

function GalleryThumbnail({ item, index, total, projectTitle, onOpen }: GalleryThumbnailProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: index === 0 ? "320px 0px" : "180px 0px",
  });

  return (
    <figure
      ref={ref}
      className={`${styles.galleryItem} ${layoutClass(index, total)}`}
    >
      <button
        type="button"
        className={styles.galleryTrigger}
        onClick={onOpen}
        aria-label={`${projectTitle} — ${index + 1} / ${total}`}
      >
        <div className={styles.galleryMedia}>
          {isInView ? (
            <Image
              src={item.src}
              alt={item.altLabel}
              fill
              className={styles.galleryImage}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
              loading="lazy"
            />
          ) : (
            <div className={styles.galleryPlaceholder} aria-hidden />
          )}
          <span className={styles.galleryZoomHint} aria-hidden>
            +
          </span>
        </div>
      </button>
    </figure>
  );
}

export default function ProjectGallery({ items, projectTitle }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + items.length) % items.length
    );
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % items.length
    );
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrev]);

  if (items.length === 0) {
    return null;
  }

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      <div className={styles.gallery}>
        {items.map((item, index) => (
          <GalleryThumbnail
            key={`${item.src}-${index}`}
            item={item}
            index={index}
            total={items.length}
            projectTitle={projectTitle}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeItem && activeIndex !== null && (
          <motion.div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.altLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeLightbox}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={closeLightbox}
                aria-label="Close"
              >
                ×
              </button>

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                    onClick={showPrev}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                    onClick={showNext}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}

              <div className={styles.lightboxMedia}>
                <Image
                  src={activeItem.src}
                  alt={activeItem.altLabel}
                  fill
                  className={styles.lightboxImage}
                  sizes="100vw"
                  loading="eager"
                />
              </div>

              <p className={styles.lightboxCaption}>
                {activeIndex + 1} / {items.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
