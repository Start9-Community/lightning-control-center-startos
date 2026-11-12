# Lightning Control Center

Install LND and let it finish syncing first — Lightning Control Center reads everything from it.

## Documentation

- [README](https://github.com/lioranecho-cpu/lightning-control-center/blob/main/README.md) — an overview of the features and editions.
- [User Manual](https://github.com/lioranecho-cpu/lightning-control-center/blob/main/MANUAL.md) — a guide to every page, plus an explanation of how Lightning routing works.

## What you get on StartOS

- **Web interface**: the Lightning Control Center dashboard, protected by a password.
- **Automatic LND connection**: Lightning Control Center connects to your LND service on its own. There is nothing to configure.
- **Automation starts off**: auto-rebalance, automatic fee changes and auto-reconnect do nothing until you switch them on.

## Getting set up

1. Run the **Set Login Password** task and copy the password it shows you.
2. Start the service, open the **Web Interface** and sign in with that password.
3. Explore the **Dashboard**, **Channels**, **Routing** and **Wallet** pages to see your node.
4. Optional: in **Settings**, turn on the automation you want:
   - **Auto-reconnect** reconnects to channel peers that drop offline. Recommended for routing nodes.
   - **Auto-rebalance** and **Auto Fee** are set up per channel on the **Channels** page.
5. Optional: to unlock Personal or Pro features, enter your license key in **Settings**.

## Using Lightning Control Center

### Actions

- **Set Login Password** creates a new password and shows it to you once. Run it whenever you lose the password or want to change it. Everyone signed in is signed out, and the old password stops working immediately.

The **Update Password** form in Lightning Control Center's own Settings page does not change your password. Use the action instead.

## Limitations

- The **Mining** page and Bitcoin Core statistics do not work.
- **Loop Out** is unavailable.
- **Nostr Wallet Connect** connections can be created but do not answer requests.
- The **fix** button on the IP check does not work. Set your node's public address in LND instead.
