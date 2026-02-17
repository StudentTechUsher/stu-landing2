import Head from 'next/head';
import { SiteTopNav } from '../components/SiteTopNav/SiteTopNav';
import { WorkflowWalkthrough } from '../components/Walkthrough/WorkflowWalkthrough';

export default function WalkthroughPage() {
  return (
    <>
      <Head>
        <title>See How It Works | Stu</title>
        <meta
          name="description"
          content="Walk through the recruiter and student workflow from capability definition to outcome calibration."
        />
      </Head>
      <main className="min-h-screen text-[#0a1f1a]">
        <SiteTopNav context="walkthrough" />
        <WorkflowWalkthrough />
      </main>
    </>
  );
}
