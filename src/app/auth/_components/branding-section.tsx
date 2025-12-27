import ProjectName from "@/components/shared/project-name";
import React from "react";
import { brandingSection } from "@/lib/constants/branding-section.constants";
export default function BrandingSection() {
  return (
    <section className="hidden h-full w-full items-center justify-center lg:flex">
      <div className="relative h-full w-full overflow-hidden bg-blue-50">
        <div className="absolute -right-20 top-10 h-[25rem] w-[25rem] rounded-full bg-blue-400/25 blur-xl" />
        <div className="absolute -bottom-28 left-2 h-[25rem] w-[25rem] rounded-full bg-blue-400/25 blur-xl" />
        <div className="h-full w-full backdrop-blur-2xl">
          <div className="absolute z-10 my-28 flex w-full flex-col px-[8.2rem]">
            <ProjectName />
            <section className="space-y-6 pt-[8.5rem]">
              {/*  ---------------------------------- title ---------------------------------  */}
              <h2 className="font-inter text-3xl font-bold">
                {brandingSection.title}
              </h2>
              <div className="grid gap-8 pt-6">
                {/*  -------------------------------- feactures -------------------------------  */}
                {brandingSection.features.map((feature) => (
                  <div key={feature.id} className="flex items-start gap-5">
                    {/* icons */}
                    <div className="flex items-center justify-center border-[0.1rem] border-primary p-1.5 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    {/* text */}
                    <div className="space-y-2.5">
                      <h4 className="align-middle text-xl font-semibold leading-[100%] tracking-normal text-primary">
                        {feature.title}
                      </h4>
                      <p className="text-md w-[25rem]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
