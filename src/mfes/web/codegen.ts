import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    // Queries & Mutations (Alarm Service)
    "src/graphql/generated/index.ts": {
      schema: "http://localhost:5186/graphql",
      documents: [
        "src/graphql/operations/**/*.graphql",
      ],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
