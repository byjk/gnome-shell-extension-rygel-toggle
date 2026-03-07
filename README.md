# Rygel Control GNOME Extension

A simple GNOME Shell extension that provides quick access to control Rygel, the UPnP/DLNA media server for GNOME.

## Features

- **Quick Toggle**: Click the button in GNOME Quick Settings to start or stop Rygel
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

## Requirements

- GNOME Shell 46 or later
- Rygel media server (UPnP/DLNA)
- GJS (GNOME JavaScript)

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
