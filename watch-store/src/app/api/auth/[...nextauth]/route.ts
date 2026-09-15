import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
    FacebookProvider({
      clientId: "",
      clientSecret: "",
    }),
  ]
});

export { handler as GET, handler as POST }