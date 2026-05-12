import type { App, TextComponent } from "obsidian";
import { PluginSettingTab, SecretComponent, Setting } from "obsidian";
import type ChatSpace from "./main";

type settingUpdater = (value: string) => Promise<void>;

interface ChatSpaceSetting {
  apiKey: string;
  baseURL: string;
  modelName: string;
}

const DEFAULT_SETTING: ChatSpaceSetting = {
  apiKey: "",
  baseURL: "",
  modelName: "",
};

class ChatSpaceSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private plugin: ChatSpace,
  ) {
    super(app, plugin);
  }

  /** Add plugin settings when the tab is rendered. */
  display(): void {
    const container = this.containerEl;
    container.empty();

    this.addSecretSetting(container, "Api Key", "Example: sk-thisIsAnExampleApiKey", "apiKey");

    this.addTextSetting(
      container,
      "Base URL",
      "Example: https://dashscope.aliyuncs.com/compatible-mode/v1",
      "baseURL",
    );

    this.addTextSetting(container, "Model Name", "Example: qwen-flash", "modelName");
  }

  /** Create and return a `Setting` instance */
  private makeSetting(container: HTMLElement, name: string, desc: string): Setting {
    // Create an element and append it to the container element
    const setting = new Setting(container);

    return setting.setName(name).setDesc(desc);
  }

  /** Create and return an async updater for the setting identified by `key`. */
  private makeUpdater(key: keyof ChatSpaceSetting): settingUpdater {
    return async (value: string): Promise<void> => {
      this.plugin.settings[key] = value;
      await this.plugin.saveSettings();
    };
  }

  /**
   * Add secret setting element to the given container element.
   *
   * Populate the element with plugin setting value and add a save on modification watcher for it.
   *
   * @param container The container element to hold the text setting
   * @param name Name of the secret setting
   * @param desc Description of the secret setting
   * @param key Key name of the secret setting
   */
  private addSecretSetting(
    container: HTMLElement,
    name: string,
    desc: string,
    key: keyof ChatSpaceSetting,
  ): void {
    const setting = this.makeSetting(container, name, desc);
    const makeComponent = (element: HTMLElement): SecretComponent => {
      const component = new SecretComponent(this.app, element);
      return component.setValue(this.plugin.settings[key]).onChange(this.makeUpdater(key));
    };

    setting.addComponent(makeComponent);
  }

  /**
   * Add text setting element to the given container element.
   *
   * Populate the element with plugin setting value and add a save on modification watcher for it.
   *
   * @param container The container element to hold the text setting
   * @param name Name of the text setting
   * @param desc Description of the text setting
   * @param key Key name of the text setting
   */
  private addTextSetting(
    container: HTMLElement,
    name: string,
    desc: string,
    key: keyof ChatSpaceSetting,
  ): void {
    const setting = this.makeSetting(container, name, desc);
    const onAddText = (component: TextComponent): void => {
      component.setValue(this.plugin.settings[key]).onChange(this.makeUpdater(key));
    };

    setting.addText(onAddText);
  }
}

export type { ChatSpaceSetting };
export { ChatSpaceSettingTab, DEFAULT_SETTING };
