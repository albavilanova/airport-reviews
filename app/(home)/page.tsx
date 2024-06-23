import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1>Airport Reviews</h1>
      <Link href="/map">Go to map</Link>
    </main>
  );
}
