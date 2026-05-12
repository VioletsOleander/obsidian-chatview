import type { ChatSpaceSetting } from "./setting";
import { Plugin, WorkspaceLeaf } from "obsidian";
import { ChatSpaceSettingTab, DEFAULT_SETTING } from "./setting";
import { ChatView } from "./view";

class ChatSpace extends Plugin {
  settings: ChatSpaceSetting;

  async onload() {
    console.log("Loading ChatSpace plugin");

    await this.loadSettings();
    this.addSettingTab(new ChatSpaceSettingTab(this.app, this));

    this.registerView(ChatView.viewType, (leaf) => new ChatView(leaf));
    this.addRibbonIcon("dice", "Activate chat view", () => {
      this.activateView(ChatView.viewType);
    });
  }

  async onunload() {
    console.log("Unloading ChatSpace plugin");
  }

  /** Save settings to `data.json`. */
  async saveSettings() {
    await this.saveData(this.settings);
  }

  /** Load `this.settings` from `data.json` or default values. */
  private async loadSettings() {
    // Later source overwrite earlier ones
    this.settings = Object.assign({}, DEFAULT_SETTING, await this.loadData());
  }

  /** Reveal exsiting view or create a new one. */
  private async activateView(viewType: string) {
    const workspace = this.app.workspace;
    const firstLeaf = workspace.getLeavesOfType(ChatView.viewType)[0];

    let leaf: WorkspaceLeaf;

    if (firstLeaf === undefined) {
      leaf = workspace.getLeaf(true);
      await leaf.setViewState({ type: viewType, active: true });
    } else {
      leaf = firstLeaf;
    }

    workspace.revealLeaf(leaf);
  }
}

export { ChatSpace as default };
