import "./globals.css";
import ApolloProvider from '../components/ApolloProvider';


export const metadata = {
  title: 'End Unemployment Challenge',
  description: 'GraphQL Challenge using Apollo Client',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ApolloProvider>
        {children}
      </ApolloProvider>
      </body>
    </html>
  );
}
