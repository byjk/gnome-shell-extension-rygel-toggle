# Rygel Control GNOME Extension

A simple GNOME Shell extension that provides quick access to control Rygel, the UPnP/DLNA media server for GNOME.

## Features

- **Quick Toggle**: Left-click the panel button to start or stop Rygel
- **Status Indicator**: Visual indication of Rygel's current state
  - Green tint when Rygel is running
  - Red tint when Rygel is stopped
- **Context Menu**: Right-click for additional options
  - Start Rygel
  - Stop Rygel
  - Current status display
- **Automatic Status Updates**: Checks Rygel status every 2 seconds

## Installation

### Prerequisites

- **Rygel** must be installed on your system
  - On Fedora: `sudo dnf install rygel`
  - On Ubuntu/Debian: `sudo apt install rygel`
  - On Arch Linux: `sudo pacman -S rygel`
- **GNOME Shell 46** or later

### Installing the Extension

1. Copy the extension directory to your local GNOME extensions folder:

```bash
cp -r /path/to/rygel-extension ~/.local/share/gnome-shell/extensions/rygel-toggle@byjk.github.com/
```

2. Enable the extension using one of the following methods:

   **Using GNOME Extensions app:**
   - Open the "Extensions" app
   - Find "Rygel Control" in the list
   - Toggle the switch to enable it

   **Using command line:**
   ```bash
   gnome-extensions enable rygel-toggle@byjk.github.com
   ```

3. Restart GNOME Shell for the changes to take effect:
   - Press `Alt+F2`
   - Type `r` and press `Enter`

   Or log out and log back in.

## Usage

### Starting and Stopping Rygel

- **Left-click** the Rygel button in the top panel to toggle Rygel on/off
- When the icon is green with a stop symbol, Rygel is running
- When the icon is red with a play symbol, Rygel is stopped

### Context Menu

- **Right-click** the Rygel button to open the context menu
- Select "Start Rygel" to start the media server
- Select "Stop Rygel" to stop the media server
- The status line shows the current state of Rygel

## Requirements

- GNOME Shell 46 or later
- Rygel media server (UPnP/DLNA)
- GJS (GNOME JavaScript)

## Troubleshooting

### Extension doesn't appear in the panel

1. Make sure the extension is enabled:
   ```bash
   gnome-extensions list --enabled
   ```

2. Check for errors in Looking Glass:
   - Press `Alt+F2`
   - Type `lg` and press `Enter`
   - Go to the "Extensions" tab and look for error messages

### Rygel won't start

1. Verify Rygel is installed:
   ```bash
   which rygel
   ```

2. Check if Rygel is already running:
   ```bash
   pgrep -x rygel
   ```

3. Try starting Rygel manually to see error messages:
   ```bash
   rygel
   ```

### Status indicator doesn't update

The extension checks Rygel's status every 2 seconds. If the indicator doesn't update, try:

1. Disable and re-enable the extension
2. Restart GNOME Shell
3. Check Looking Glass for JavaScript errors

## Development

To modify the extension:

1. Edit the source files in your extension directory
2. Restart GNOME Shell or use Looking Glass to reload the extension:
   - Press `Alt+F2`, type `lg`, press Enter
   - Go to the "Extensions" tab
   - Find "Rygel Control" and click the reload button

## License

MIT License

Copyright (c) 2026 Rygel Control Extension Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
