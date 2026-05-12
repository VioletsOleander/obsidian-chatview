import type { ChatSpaceSetting } from "./setting";
import { Plugin, WorkspaceLeaf } from "obsidian";
import { ChatSpaceSettingTab, DEFAULT_SETTING } from "./setting";
import { ChatView } from "./view";

class ChatSpace extends Plugin {
  settings: ChatSpaceSetting;

  async onload(): Promise<void> {
    console.log("Loading ChatSpace plugin");

    await this.loadSettings();
    this.addSettingTab(new ChatSpaceSettingTab(this.app, this));

    this.registerView(ChatView.viewType, (leaf) => new ChatView(leaf));
    this.addRibbonIcon("dice", "Activate chat view", () => {
      this.activateView(ChatView.viewType);
    });
  }

  async onunload(): Promise<void> {
    console.log("Unloading ChatSpace plugin");

    this.app.workspace.detachLeavesOfType(ChatView.viewType);
  }

  /** Save settings to `data.json`. */
  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  /** Load `this.settings` from `data.json` or default values. */
  private async loadSettings(): Promise<void> {
    // Later source overwrite earlier ones
    this.settings = Object.assign({}, DEFAULT_SETTING, await this.loadData());
  }

  /** Reveal existing view or create a new one. */
  private async activateView(viewType: string): Promise<void> {
    const workspace = this.app.workspace;
    const firstLeaf = workspace.getLeavesOfType(viewType)[0];

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
