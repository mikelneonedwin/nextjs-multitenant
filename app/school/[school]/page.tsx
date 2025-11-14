import Link from "next/link";

export default async function Slug(props: PageProps<"/school/[school]">) {
  const { school } = await props.params;
  return (
    <>
      The school is <span className="capitalize">{school}</span> go to{" "}
      <Link href={`/about`}>about</Link>
    </>
  );
}
