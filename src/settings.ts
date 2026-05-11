import type ChatView from "main";
import type { App } from "obsidian";
import { PluginSettingTab, Setting } from "obsidian";

interface ChatViewSettings {
    apiKey: string;
    baseURL: string;
}

const DEFAULT_SETTINGS: ChatViewSettings = {
    apiKey: "",
    baseURL: "",
};

class ChatViewSettingTab extends PluginSettingTab {
    plugin: ChatView;

    constructor(app: App, plugin: ChatView) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        // The constructor of `Setting` will create an element for itself
        // and append this element to the passed-in container element
        // then return the created element

        // After construction, populate the setting value
        // and watch for modification for saving
        new Setting(containerEl)
            .setName("Api Key")
            .setDesc("Example: sk-thisIsAnExampleApiKey")
            .addText((text) =>
                text
                    .setValue(this.plugin.settings.apiKey)
                    .onChange(async (value) => {
                        this.plugin.settings.apiKey = value;
                        await this.plugin.saveSettings();
                    }),
            );

        new Setting(containerEl)
            .setName("Base URL")
            .setDesc(
                "Example: https://dashscope.aliyuncs.com/compatible-mode/v1",
            )
            .addText((text) =>
                text
                    .setValue(this.plugin.settings.baseURL)
                    .onChange(async (value) => {
                        this.plugin.settings.baseURL = value;
                        await this.plugin.saveSettings();
                    }),
            );
    }
}

export type { ChatViewSettings };
export { ChatViewSettingTab, DEFAULT_SETTINGS };
