# compute-e2e-multi-app

End-to-end fixture for the Prisma Compute build pipeline (see
`services/build-runner/scripts/e2e/README.md` in `pdp-control-plane`).

A repo whose root `prisma.compute.json` declares **two apps** (`web` and
`api`, both minimal [Hono](https://hono.dev) servers). A build dispatched for
this repo must:

1. discover the multi-app config and fan out one targeted build per app,
2. retire the discovering build as `cancelled`
   (`Multi-app config: dispatched one build per app (web, api)`),
3. produce two `succeeded` builds — an app per target, with `api` carrying its
   configured display name `multi-app-api` — each answering `/health` on its
   deployed URL,
4. leave no branch-named placeholder app behind.

Both apps bind Hono's framework-led port (`:3000`, not `:8080` — the
customer-app deploy path does not inject `PORT`). The config deliberately sets
no `region`/`httpPort` overrides so the fixture stays deterministic across
preview and production; exercise region fidelity with a temporary branch that
adds an override.
