"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/blog-data";

interface BlogCategoryFilterProps {
  posts: BlogPost[];
}

export function BlogCategoryFilter({ posts }: BlogCategoryFilterProps) {
  const [active, setActive] = useState("Todos");

  const filtered = active === "Todos" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[2px] transition-colors ${
              active === cat
                ? "bg-petrol text-white"
                : "border border-petrol/20 text-petrol/50 hover:border-petrol/50 hover:text-petrol"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto md:grid md:grid-cols-2 md:gap-8 md:overflow-visible lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            data-cursor="hover-link"
            className="group block w-[85vw] flex-shrink-0 snap-center md:w-auto md:flex-shrink md:snap-align-none"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[2px] text-orange">{post.category}</span>
                <span className="text-[11px] text-petrol/25">{post.date}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-petrol transition-colors group-hover:text-orange">
                {post.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-petrol/50">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
