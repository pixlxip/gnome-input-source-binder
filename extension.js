/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
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
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const SHORTCUT_PREFIX = "switch-to-input-source-"

const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const { Meta, Shell } = imports.gi;
const InputSourceManager = imports.ui.status.keyboard.getInputSourceManager();

function setInputSource(index) {
    return () => {
        InputSourceManager.inputSources[index].activate()
    };
}


class Extension {

    enable() {
        const source_number = Object.keys(InputSourceManager.inputSources).length;
        this.input_source_count = Math.min(5, source_number)
        
        const settings = ExtensionUtils.getSettings()

        for (let i = 0; i < this.input_source_count; i++) {
            Main.wm.addKeybinding(
                SHORTCUT_PREFIX + (i + 1), settings,
                Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
                Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
                setInputSource(i));
        }
    }

    disable() {
        for (let i = 0; i < this.input_count; i++) {
            Main.wm.removeKeyBinding(SHORTCUT_PREFIX + (i + 1));
        }
    }
}

function init() {
    return new Extension();
}