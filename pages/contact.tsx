import Head from 'next/head';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Stu</title>
      </Head>
      <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0a1f1a]">Contact Stu</h1>
        <p className="mt-4 text-[#3f5a52]">
          For pilot conversations, email{' '}
          <a href="mailto:pilot@stu.example" className="font-medium text-[#0f352a] underline">
            pilot@stu.example
          </a>
          .
        </p>
      </main>
    </>
  );
}
