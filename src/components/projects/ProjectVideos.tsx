"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import type { ResolvedVideo } from "@/lib/projects";
import styles from "./ProjectVideos.module.css";

interface ProjectVideosProps {
  items: ResolvedVideo[];
}

function videoMimeType(src: string): string {
  const lower = src.toLowerCase();
  if (lower.endsWith(".webm")) return "video/webm";
  if (lower.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}

interface LazyVideoPlayerProps {
  video: ResolvedVideo;
}

function LazyVideoPlayer({ video }: LazyVideoPlayerProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });

  return (
    <figure ref={ref} className={styles.videoItem}>
      <div className={styles.videoFrame}>
        {!isInView ? (
          video.poster ? (
            <Image
              src={video.poster}
              alt=""
              fill
              className={styles.videoPoster}
              sizes="(max-width: 768px) 100vw, 80rem"
              loading="lazy"
            />
          ) : (
            <div className={styles.videoPosterFallback} aria-hidden />
          )
        ) : (
          <video
            className={styles.videoPlayer}
            controls
            playsInline
            preload="metadata"
            poster={video.poster}
            aria-label={video.titleLabel}
          >
            <source src={video.src} type={videoMimeType(video.src)} />
          </video>
        )}
      </div>
      <figcaption className={styles.videoCaption}>{video.titleLabel}</figcaption>
    </figure>
  );
}

export default function ProjectVideos({ items }: ProjectVideosProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.videoList}>
      {items.map((video) => (
        <LazyVideoPlayer key={video.src} video={video} />
      ))}
    </div>
  );
}
