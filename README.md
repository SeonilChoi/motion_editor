# Motion Editor

Next.js only motion CSV editor. There is no FastAPI or Python backend.

## Requirements

- Node.js 20.9.0 or newer
- npm

Python, FastAPI, and any backend server are not required.

## Install

### Ubuntu

Install Node.js and npm:

```bash
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

Check the installed versions:

```bash
node -v
npm -v
```

Install project packages:

```bash
cd /path/to/motion_editor
npm install
```

### Windows

Install Node.js LTS with one of these methods.

Using winget in PowerShell:

```powershell
winget install OpenJS.NodeJS.LTS
```

Or install the Node.js LTS installer from `https://nodejs.org`.

After installation, open a new PowerShell window and check:

```powershell
node -v
npm -v
```

Install project packages:

```powershell
cd C:\motion_editor
npm install
```

## Features

- Load motion CSV files where each row is one motor axis.
- Edit axes and nodes on an interactive graph.
- Add, delete, cut, rename, copy, and paste axes.
- Add, remove, shift, drag, copy, and paste nodes.
- Generate partial motion segments with interpolation modes.
- Select partial segments and edit their handles.
- Pan, zoom, fit, focus, undo, and redo graph edits.
- Save edited motion data back to CSV from the browser.

### File I/O matrix

| | Save to client | Save to server |
|---|---|---|
| **Open from client** | Open Client → Save Client | Open Client → Save Server |
| **Open from server** | Open Server → Save Client | Open Server → Save Server |

- **Open Client** — opens a local file from your browser machine (the original file picker).
- **Open Server** — lists CSV files in the server's `MOTION_DIR` folder and loads the selected file.
- **Save Client** — downloads the edited CSV to your browser machine.
- **Save Server** — writes the edited CSV back to the server's `MOTION_DIR` folder. If the file was opened from the server it overwrites in place; otherwise a file-name dialog appears.

### Server folder (MOTION_DIR)

Copy `.env.example` to `.env.local` and set `MOTION_DIR` to the absolute path of the folder that
contains motion CSV files on the server PC:

```bash
cp .env.example .env.local
# edit .env.local
MOTION_DIR=/home/hexapod/motions
```

If `MOTION_DIR` is not set, the folder `data/motions/` inside the project root is used and
created automatically on first access. Only `.csv` files in that single flat directory are
exposed; sub-directories and path traversal are blocked.

## Run

```bash
npm run dev
```

Open `http://127.0.0.1:3000`.

## Build

```bash
npm run build
```
