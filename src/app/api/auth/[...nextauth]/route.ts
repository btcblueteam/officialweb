import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0", // Essential for Twitter API v2
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "users.read tweet.write offline.access",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any, account: any }) {
      // Persist the OAuth access_token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken as string;
      session.user.id = token.providerAccountId as string;
      return session;
    },
  },
  pages: {
    signIn: "/portal",
    error: "/portal",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
