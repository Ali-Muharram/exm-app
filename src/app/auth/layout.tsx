import BrandingSection from "@/app/auth/_components/branding-section";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
      <BrandingSection />
      <section className="flex min-h-dvh w-full justify-center lg:w-full lg:px-[8.4rem]">{children}</section>
    </main>
  );
}
