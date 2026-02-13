import dynamic from 'next/dynamic';
import Head from 'next/head';
import { EmployerCTA } from '../components/EmployerCTA/EmployerCTA';
import { Features } from '../components/Features/Features';
import { Footer } from '../components/Footer/Footer';
import { Hero } from '../components/Hero/Hero';
import { HowItWorks } from '../components/HowItWorks/HowItWorks';
import { Pricing } from '../components/Pricing/Pricing';
import { Testimonial } from '../components/Testimonial/Testimonial';

const LazyAgentWorkspace = dynamic(
  () => import('../components/AgentWorkspace/AgentWorkspace').then((mod) => mod.AgentWorkspace),
  {
    ssr: false,
    loading: () => (
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <p className="text-sm text-slate-500">Loading agent workspace panels…</p>
      </section>
    )
  }
);

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Stu | Early-Talent Alignment Platform</title>
        <meta
          name="description"
          content="Stu translates employer hiring standards into measurable student capability pathways before hiring begins."
        />
      </Head>
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <Hero />
        <Features />
        <HowItWorks />
        <LazyAgentWorkspace />
        <Pricing />
        <EmployerCTA />
        <Testimonial />
      </main>
      <Footer />
    </>
  );
}
