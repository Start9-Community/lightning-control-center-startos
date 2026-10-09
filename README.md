<p align="center">
  <img src="icon.png" alt="Lightning Control Center Logo" width="21%">
</p>

# Lightning Control Center on StartOS

> Everything not listed in this document should behave the same as upstream
> Lightning Control Center. If a feature, setting, or behavior is not mentioned
> here, the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Lightning Control Center](https://github.com/lioranecho-cpu/lightning-control-center) (LCC) is a web dashboard for managing an LND node: channels, routing income, fees, rebalancing and the on-chain wallet. This package runs it against the StartOS LND service, with the connection to LND and the login password managed by StartOS.

- **Upstream repo:** <https://github.com/lioranecho-cpu/lightning-control-center>
- **Wrapper repo:** <https://github.com/Start9-Community/lightning-control-center-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The upstream image, unmodified, pinned by digest.

| Property      | Value                                                     |
| ------------- | --------------------------------------------------------- |
| Image         | `sparkielabs/lightning-control-center` (Docker Hub)       |
| Architectures | x86_64, aarch64                                           |
| Entrypoint    | The image's own (`uvicorn` serving the FastAPI app), via `sdk.useEntrypoint()` |

| Subcontainer | Purpose                                                            |
| ------------ | ------------------------------------------------------------------ |
| `lcc`        | The whole application: web UI, API and its background automation  |

## Volume and Data Layout

One volume of its own, plus LND's volume mounted read-only.

| Volume                | Mount Point | Purpose                                                                                     |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `lcc-data`            | `/data`     | LCC's data directory (`LCC_DATA_DIR`) and the package's `store.json`                        |
| LND's `main` (read-only) | `/mnt/lnd` | Source of LND's `tls.cert` and the mainnet `admin.macaroon`                               |

LCC writes everything it keeps to `/data`: `data.json` (settings, per-channel strategies and automation), `journal.json` (the node journal) and `nwc_connections.json`. There is no database.

## File Models

Two models, both on `lcc-data`.

| File         | Format | Written by                                       |
| ------------ | ------ | ------------------------------------------------ |
| `store.json` | JSON   | Init (session secret) and the Set Login Password action |
| `data.json`  | JSON   | LCC itself; init seeds it if missing             |

- **`store.json`** holds `lccPassword` and `sessionSecret`, StartOS-side state LCC has no way to create for itself. Both reach LCC as environment variables (`LCC_PASSWORD`, `LCC_SESSION_SECRET`) and are read reactively, so changing either restarts LCC. Init generates `sessionSecret` if it is missing and never touches `lccPassword`; only the action sets that.
- **`data.json`** belongs to LCC. Init seeds it as `{}` if it does not exist, preserving existing settings. LCC can also create it itself.

`LCC_PASSWORD_MANAGED=1` disables in-app password changes and makes `LCC_PASSWORD` authoritative, even if `data.json` contains an upstream password hash. LCC reads the environment password on every start.

## Dependencies

LND is required.

| Dependency | Required | Kind      | Health checks           | Mount                          |
| ---------- | -------- | --------- | ----------------------- | ------------------------------ |
| LND        | Yes      | `running` | `lnd`, `sync-progress`  | `main` at `/mnt/lnd`, read-only |

LCC talks to LND's REST API over the internal StartOS bridge (`LND_REST_HOST`), authenticates with LND's `admin.macaroon`, and verifies TLS against LND's `tls.cert`, which chains to the same StartOS root CA as the bridge's certificate. The admin macaroon is what lets LCC open and close channels, change fees, pay invoices and rebalance — it has full control of the node.

If LND's REST binding does not exist yet, `main` refuses to start with an error naming LND, and starts once LND is running.

## Network Access and Interfaces

One interface.

| Interface     | Id     | Type | Port | Protocol | Purpose                    |
| ------------- | ------ | ---- | ---- | -------- | -------------------------- |
| Web Interface | `main` | ui   | 8765 | HTTP     | The LCC dashboard and API  |

Bound on the `lcc-ui` host. Dashboard pages and management API routes require a session cookie; password login endpoints, icons and Nostr authentication endpoints are public. The cookie is marked `Secure`, so sign in over an HTTPS address.

LCC makes outbound requests of its own: `mempool.space` for fee rates and the BTC/USD price, and `api.ipify.org` for the IP check.

## Installation and First-Run Flow

Install creates the data files and a session secret, but no password, so a fresh install shows one critical task and nothing else. LCC's own first-run state does not apply: there is no setup wizard and no default password.

1. Run **Set Login Password** from the task. It returns the password.
2. Start the service and sign in to the web interface with that password.

LND must be installed, running and synced before LCC can show anything useful; until then the dashboard's LND requests fail.

## Actions

One user-facing action.

### Set Login Password

Generates a new random login password and returns it. Run it from the install task, or later when the password is lost or should be rotated.

- **What it changes:** `lccPassword` and `sessionSecret` in `store.json`. Rotating the session secret invalidates every existing session.
- **Cost:** a running LCC restarts to load the new password, a few seconds of downtime.
- **Repeat safety:** safe to repeat; each run replaces the password and the previous one stops working.
- **Outputs:** the new password, shown once. StartOS does not show it again — run the action again for a new one.

## Tasks

One task, created by the package.

| Task               | Severity   | Raised when                  | Cleared when            |
| ------------------ | ---------- | ---------------------------- | ----------------------- |
| Set Login Password | `critical` | `store.json` has no password | The action runs         |

It is checked on every init, not only at install, so a store without a password always brings it back. A restored backup carries the password, so restore does not raise it.

## Health Checks

One check.

| Check | Displayed as  | Method                 |
| ----- | ------------- | ---------------------- |
| `lcc` | Web Interface | Port 8765 is listening |

The check passes as soon as uvicorn is serving and says nothing about LND. A green check with an empty or erroring dashboard means LCC cannot reach LND — check that LND is running and its own health checks are green.

## Backups and Restore

The `lcc-data` volume is copied wholesale (`sdk.Backups.ofVolumes('lcc-data')`): LCC's settings, strategies, journal, NWC connections, and the login password and session secret.

A restored instance needs no setup of its own and raises no task. The existing password keeps working, and sessions signed before the backup remain valid. LND must be present on the restored server; LCC's channel and routing history is read live from LND, not from the backup.

## Limitations and Differences

1. **Mainnet only.** The macaroon path is LND's mainnet one.
2. **Mining and Bitcoin Core statistics do not work.** The Mining page and Bitcoin Core figures need a local `bitcoin-cli` or Bitcoin Core RPC, which the package does not provide.
3. **Loop is unavailable.** Loop Out and the Loop monitor need the Loop daemon, which is not wired up; the Loop pages show errors.
4. **Nostr Wallet Connect does not serve requests.** Connections can be created on the NWC page, but the NWC listener is a separate process that the package does not run.
5. **The IP check's "fix" does not work.** It edits a host `lnd.conf` and restarts LND with `systemctl`, neither of which exist here. Set LND's external address in LND's own StartOS configuration instead.
6. **The in-app Update Password form does not change the password.** Use the Set Login Password action.

---

## Quick Reference for AI Consumers

```yaml
package_id: lightning-control-center
image: sparkielabs/lightning-control-center
architectures: [x86_64, aarch64]
subcontainers:
  - lcc
volumes:
  lcc-data: /data
file_models:
  - store.json
  - data.json
startos_managed_env_vars:
  - LCC_DATA_DIR
  - LND_REST_HOST
  - LND_MACAROON_PATH
  - LND_TLS_CERT_PATH
  - LCC_PASSWORD_MANAGED
  - LCC_PASSWORD
  - LCC_SESSION_SECRET
dependencies:
  - lnd
interfaces:
  main: { type: ui, port: 8765 }
actions:
  - set-login-password
tasks:
  - { action: set-login-password, severity: critical }
health_checks:
  - lcc
```
