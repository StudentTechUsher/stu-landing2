import Head from 'next/head';
import { AgentWorkspace } from '../components/AgentWorkspace/AgentWorkspace';
import { EmployerCTA } from '../components/EmployerCTA/EmployerCTA';
import { Features } from '../components/Features/Features';
import { Footer } from '../components/Footer/Footer';
import { Hero } from '../components/Hero/Hero';
import { HowItWorks } from '../components/HowItWorks/HowItWorks';

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
      <main className="min-h-screen text-[#0a1f1a]">
        <Hero />
        <Features />
        <HowItWorks />
        <AgentWorkspace />
        <EmployerCTA />
      </main>
      <Footer />
    </>
  );
}
