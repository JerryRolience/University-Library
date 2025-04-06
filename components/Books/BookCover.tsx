"use client";

import { cn } from "@/lib/utils";
import React from "react";
import BookCoverSvg from "./BookCoverSvg";
import { BookCoverProps, BookCoverVariant } from "@/types";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400*600.png",
}: BookCoverProps) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10 "
        style={{ left: "12%", width: "87.58%", height: "88%" }}
      >
        <IKImage
          path={coverImage}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          // lqip={{ active: true }}
        />
      </div>
    </div>
  );
};

export default BookCover;
