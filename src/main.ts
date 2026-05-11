import { Command, Plugin } from "obsidian";
import type { ChatViewSettings } from "settings";
import { ChatViewSettingTab, DEFAULT_SETTINGS } from "settings";

class ChatView extends Plugin {
    settings: ChatViewSettings;

    async onload() {
        console.log("Loading ChatView plugin");

        await this.loadSettings();

        this.addSettingTab(new ChatViewSettingTab(this.app, this));

        this.addCommand({
            id: "chatview-apply-custom-prompt",
            name: "ChatView: Apply custom prompt",
        });
    }

    async onunload() {
        console.log("Unloading ChatView plugin");
    }

    /**
     * Load settings from `data.json` or default values.
     */
    async loadSettings() {
        // Later source overwite earlier ones
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            await this.loadData(),
        );
    }

    /**
     * Save settings to `data.json`.
     */
    async saveSettings() {
        await this.saveData(this.settings);
    }
}

export { ChatView as default };
