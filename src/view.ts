import { ItemView, WorkspaceLeaf } from "obsidian";

class ChatView extends ItemView {
  static viewType = "chatspace:chatview";

  /** Create a new `ChatView` on `leaf`. */
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  /** Return the unique identifier of the view. */
  getViewType(): string {
    return ChatView.viewType;
  }

  /** Return the human readable name of the view. */
  getDisplayText(): string {
    return "Chat View";
  }

  async onOpen(): Promise<void> {
    const container = this.contentEl;
    container.empty();
    container.createEl("h4", { text: "Example view" });
  }

  async onClose(): Promise<void> {
    // Nothing to clean up.
  }
}

export { ChatView };
