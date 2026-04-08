/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import GObject from 'gi://GObject';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {
    QuickToggle,
    SystemIndicator,
} from 'resource:///org/gnome/shell/ui/quickSettings.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

let _indicator = null;

const RygelToggle = GObject.registerClass(
class RygelToggle extends QuickToggle {
    constructor(rygelIcon) {
        super({
            title: 'Rygel',
            gicon: rygelIcon,
            toggleMode: true,
            subtitle: 'Loading',
        });

        // Store the icon for later use
        this._rygelIcon = rygelIcon;

        // Initialize timeout source IDs
        this._startTimeoutId = null;
        this._stopTimeoutId = null;

        // Connect toggle clicked signal
        this.connect('clicked', () => {
            if (this.checked) {
                this._startRygel();
            } else {
                this._stopRygel();
            }
        });
    }

		_isRygelRunning(callback) {
			try {
				let stdout = [];
				let [success, pid, stdinFd, stdoutFd, stderrFd] = GLib.spawn_async_with_pipes(
					null,
					['pgrep', '-x', 'rygel'],
					null,
					GLib.SpawnFlags.SEARCH_PATH,
					null
				);

				if (success) {
					let stdoutStream = new Gio.UnixInputStream({ fd: stdoutFd, close_fd: true });
					let dataInputStream = new Gio.DataInputStream({ base_stream: stdoutStream });

					const readStream = () => {
						dataInputStream.read_line_async(GLib.PRIORITY_DEFAULT, null, (source, result) => {
							let [line, length] = source.read_line_finish(result);
							if (line !== null) {
								stdout.push(line);
								readStream();
							} else {
								// Done reading
								GLib.spawn_close_pid(pid);
								if (callback) {
									callback(stdout.length > 0);
								}
							}
						});
					};
					readStream();
				} else {
					if (callback) {
						callback(false);
					}
				}
			} catch (e) {
				if (callback) {
					callback(false);
				}
			}
		}

		_startRygel() {
			try {
				GLib.spawn_async(
					null,
					['rygel'],
					null,
					GLib.SpawnFlags.SEARCH_PATH,
					null
				);
				// Wait a moment and then check status
				this._startTimeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, () => {
					this._checkRygelStatus();
					this._startTimeoutId = null;
					return GLib.SOURCE_REMOVE;
				});
			} catch (e) {
				logError(e, 'Failed to start Rygel');
			}
		}

		_stopRygel() {
			try {
				GLib.spawn_async(
					null,
					['rygel', '-s'],
					null,
					GLib.SpawnFlags.SEARCH_PATH,
					null
				);
				// Wait a moment and then check status
				this._stopTimeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, () => {
					this._checkRygelStatus();
					this._stopTimeoutId = null;
					return GLib.SOURCE_REMOVE;
				});
			} catch (e) {
				logError(e, 'Failed to stop Rygel');
			}
		}

		_checkRygelStatus() {
			this._isRygelRunning((running) => {
				this._rygelRunning = running;
				this._updateButtonState();
			});
		}

		_updateButtonState() {
			// Update icon and state
			if (this._rygelRunning) {
				this.gicon = this._rygelIcon;
				this.set({ checked: true, subtitle: 'Running' });
			} else {
				this.gicon = this._rygelIcon;
				this.set({ checked: false, subtitle: 'Stopped' });
			}
		}

		destroy() {
			// Clean up timeout sources
			if (this._startTimeoutId !== null) {
				GLib.source_remove(this._startTimeoutId);
				this._startTimeoutId = null;
			}
			if (this._stopTimeoutId !== null) {
				GLib.source_remove(this._stopTimeoutId);
				this._stopTimeoutId = null;
			}

			super.destroy();
		}
	}
);

const RygelIndicator = GObject.registerClass(
	class RygelIndicator extends SystemIndicator {
		constructor(extensionObject) {
			super();

			// Load the color icon for QuickSettings toggle
			const colorIconPath = GLib.build_filenamev([extensionObject.path, 'icons', 'rygel.png']);
			const colorIcon = Gio.icon_new_for_string(colorIconPath);

			// Load the symbolic icon for status panel indicator
			const symbolicIconPath = GLib.build_filenamev([extensionObject.path, 'icons', 'rygel-symbolic.svg']);
			const symbolicIcon = Gio.icon_new_for_string(symbolicIconPath);

			// Create the indicator icon (uses symbolic icon for better visibility on dark panels)
			this._indicator = this._addIndicator();
			this._indicator.gicon = symbolicIcon;

			// Create the toggle (uses color icon)
			this._toggle = new RygelToggle(colorIcon);
			this.quickSettingsItems.push(this._toggle);

			// Initial status check
			this._checkRygelStatus();

			// Set up periodic status check (every 2 seconds)
			this._statusCheckId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 2, () => {
				this._checkRygelStatus();
				return GLib.SOURCE_CONTINUE;
			});
		}

		_isRygelRunning(callback) {
			try {
				let stdout = [];
				let [success, pid, stdinFd, stdoutFd, stderrFd] = GLib.spawn_async_with_pipes(
					null,
					['pgrep', '-x', 'rygel'],
					null,
					GLib.SpawnFlags.SEARCH_PATH,
					null
				);

				if (success) {
					let stdoutStream = new Gio.UnixInputStream({ fd: stdoutFd, close_fd: true });
					let dataInputStream = new Gio.DataInputStream({ base_stream: stdoutStream });

					const readStream = () => {
						dataInputStream.read_line_async(GLib.PRIORITY_DEFAULT, null, (source, result) => {
							let [line, length] = source.read_line_finish(result);
							if (line !== null) {
								stdout.push(line);
								readStream();
							} else {
								// Done reading
								GLib.spawn_close_pid(pid);
								if (callback) {
									callback(stdout.length > 0);
								}
							}
						});
					};
					readStream();
				} else {
					if (callback) {
						callback(false);
					}
				}
			} catch (e) {
				if (callback) {
					callback(false);
				}
			}
		}

		_checkRygelStatus() {
			this._isRygelRunning((running) => {
				this._rygelRunning = running;
				this._updateButtonState();
			});
		}

		_updateButtonState() {
			// Update indicator visibility
			this._indicator.visible = this._rygelRunning;

			// Update toggle state
			if (this._rygelRunning) {
				this._toggle.set({ checked: true, subtitle: 'Running' });
			} else {
				this._toggle.set({ checked: false, subtitle: 'Stopped' });
			}
		}

		destroy() {
			// Clean up periodic status check
			if (this._statusCheckId !== null) {
				GLib.source_remove(this._statusCheckId);
				this._statusCheckId = null;
			}

			super.destroy();
		}
	}
);

export default class extends Extension {
	enable() {
		_indicator = new RygelIndicator(this);
		Main.panel.statusArea.quickSettings.addExternalIndicator(_indicator);
	}

	disable() {
		if (_indicator) {
			_indicator.quickSettingsItems.forEach(item => item.destroy());
			_indicator.destroy();
			_indicator = null;
		}
	}
}
