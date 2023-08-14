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

'use strict';

const {St, Gio, GObject, Clutter, GLib} = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

let panelButton;
let panelButtonText;
let sourceId = null;

// Start application
function init(){
    log(`initializing ${Me.metadata.name}`);
}


let windowManager

// Add the button to the panel
function enable() {
    log(`enabling ${Me.metadata.name}`);

    windowManager = new WindowManager();
    
    Main.panel.addToStatusArea(Me.metadata.name, windowManager, 1);
}

// Remove the added button from panel
function disable(){
    log(`disabling ${Me.metadata.name}`);
    
    if (windowManager) {
        windowManager.destroy();
        windowManager = null;
    }   
}

const WindowManager = GObject.registerClass({
    GTypeName: 'WindowManager'
}, class WindowManager extends PanelMenu.Button {
    _init () {
        super._init(0)
        log('epm._init')

        panelButton = new St.Bin({
            style_class : "panel-button",
        });
        this.add_child(panelButton)
        this.load_active_windows();
        
        sourceId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 3600, () => {
            this.load_active_windows();
            return GLib.SOURCE_CONTINUE;
        });
    }

    destroy() {
        super.destroy();

        if (sourceId) {
            GLib.Source.remove(sourceId);
            sourceId = null;
        }            
    }

    // List active windows
    load_active_windows(){
        // TODO

    }

})

