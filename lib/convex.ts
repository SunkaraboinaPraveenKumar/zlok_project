import { ConvexHttpClient } from "convex/browser";// "use client";



const api = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);// import { ConvexProvider, ConvexReactClient } from "convex/react";

// import { ReactNode } from "react";

export { api };
// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export function ConvexClientProvider({ children }: { children: ReactNode }) {
//   return <ConvexProvider client={convex}>{children}</ConvexProvider>;
// }

// export { convex };