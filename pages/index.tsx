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
        <title>Stu | Hire Ready New Grads Before They Apply</title>
        <meta
          name="description"
          content="Stu helps employers define role skills, score student work, and identify hiring-ready candidates before recruiting season."
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
