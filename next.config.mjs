/** @type {import('next').NextConfig} */
const nextConfig = {
    output : "standalone",
    publicRuntimeConfig: {
        companyId :"2422107b-7011-48bb-8366-735e927271f2",
        skApiKey :"67325a24e28d69f37f5c49a66cfe4771d5ad368e0a7641c20b099418f69fcc28bfaf7bd2e0d2c0ef5f0eb42e722efd2354b2b4d6ef67c1f5426dc39ba3af8180b5e8ef2007e596822ce0d31a037baa0b674c7468e7a1ed7628cfdfecb8ecce5db58597dbab62944c0f431ef8fe94797f9968f0980678bd610973d25df2e34c13",
        apiRoot: "https://auth.pingone.com/",
        method: "runFlow",
        orchestrateApiUrl :"https://orchestrate-api.pingone.com"
    }
};

export default nextConfig;
