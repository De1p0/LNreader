# Urayomi (lnreader)

A desktop reader application built with React + Vite and bundled with Tauri. This repository contains the UI and Tauri integration for a lightweight, themed desktop app.

## Features

## Prerequisites

- Node.js (recommended 18+)
- npm (or yarn)
- Rust (for building the Tauri native bundle)
- Tauri CLI (optional; can use `cargo tauri`)

## Install

```bash
# from project root
npm install
```

## Development

Run the frontend dev server (Vite):

```bash
npm run dev
```

To run the full Tauri application in dev mode you can either use the Tauri CLI directly or via npm:

```bash
# using npm wrapper (passes args to tauri)
npm run tauri -- dev

# or via cargo (if you have Rust + tauri-cli installed)
cargo tauri dev
```

## Build

Build the web assets and then create a Tauri release bundle:

```bash
npm run build
# then
npm run tauri -- build
# or
cargo tauri build
```

## Project structure (key files)

## Contributing

Contributions are welcome. Please open issues or PRs. For local development, follow the steps in the Development section.

## License

This project does not include a license file. Add one if you plan to publish or share the code.
