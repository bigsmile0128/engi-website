import AunthenticationCheck from '~/components/AuthenticationCheck';

export default function GithubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-expect-error Server Component
  return <AunthenticationCheck>{children}</AunthenticationCheck>;
}
