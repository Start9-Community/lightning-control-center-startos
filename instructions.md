# Lightning Control Center

Lightning Control Center (LCC) is a dashboard for running your LND node. It shows your channels, routing income, fees and wallet in one place, and it helps you rebalance channels and set fees.

## Documentation

- [README](https://github.com/lioranecho-cpu/lightning-control-center#readme): an overview of the features and editions.
- [User Manual](https://github.com/lioranecho-cpu/lightning-control-center/blob/main/MANUAL.md): a full guide to every page, plus a beginner-friendly explanation of how Lightning routing works.
- [StartOS package issues](https://github.com/lioranecho-cpu/lightning-control-center-startos/issues): report problems specific to this StartOS package.

## What you get on StartOS

- **Web interface**: open it from the **Interfaces** tab. It is password protected.
- **Automatic LND connection**: LCC connects to your StartOS LND service over REST using LND's certificate and macaroon. There is nothing to configure.
- **Generated login password**: StartOS creates a strong random password when you install. See it with **Actions → Show Login Password**.
- **Persistent data**: your settings, journal and history are stored in the service's data volume and are kept through updates.
- **Automation starts off**: auto-rebalance, automatic fee changes and auto-reconnect do nothing until you switch them on.

Not available on StartOS yet:

- The Mining page and Bitcoin Core statistics, which need a Bitcoin Core connection.
- Loop Out swaps, which need the Loop daemon.

## Getting set up

1. Make sure **LND** is installed, running and fully synced.
2. Go to **Actions → Show Login Password** and copy the password.
3. Open the web interface from the **Interfaces** tab and sign in.
4. Explore the **Dashboard**, **Channels**, **Routing** and **Wallet** pages to see your node's state.
5. Optional: in **Settings**, turn on the automation you want:
   - **Auto-reconnect**: reconnects to channel peers that drop offline. Recommended for routing nodes.
   - **Auto-rebalance** and **Auto Fee**: set them up per channel on the **Channels** page.
6. Optional: to unlock Personal or Pro features, enter your license key in **Settings**.

## Resetting your password

Go to **Actions → Reset Login Password**. This creates a new password, signs everyone out and restarts LCC. The old password stops working immediately.
