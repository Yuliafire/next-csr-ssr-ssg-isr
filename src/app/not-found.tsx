import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h2>Oooops!</h2>
      <p>СPage is not found!</p>
      <Link href="/">Home</Link>
    </main>
  );
}
