"use client";
import React, { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function BreadcrumbHeader() {
  const pathname = usePathname();
  const pages = pathname.split("/").slice(1);
  const links = [...pages];
  pages[0] = "Home";

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {pages.map((Item, index) => (
              <Fragment key={index}>
                {index > 0 && "/"}
                <Link
                  className={`${
                    pages.length - 1 === index ? "text-primary hover:text-primary-hover" : "text-muted-foreground"
                  } text-sm font-normal`}
                  href={`/${links.slice(0, index + 1).join("/")}`}
                >
                  {Item.replace("-", " ")}
                </Link>
              </Fragment>
            ))}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
