import Link from "next/link";

export default function Default() {
  return (
    <div>
      <Link href="/user">User</Link>
      <Link href="/star">Star</Link>
      <Link href="/fish">Fish</Link>
    </div>
  );
}
