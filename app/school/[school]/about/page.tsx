export default async function About(
  props: PageProps<"/school/[school]/about">,
) {
  const { school } = await props.params;
  return <>This is the about page for {school}</>;
}
