import {App, PluginSettingTab, Setting} from "obsidian";
import RandomNotePlugin from "./main";

export interface RandomNoteSettings {
	excludedFolders: string[];
}

export const DEFAULT_SETTINGS: RandomNoteSettings = {
	excludedFolders: []
}

export class RandomNoteSettingTab extends PluginSettingTab {
	plugin: RandomNotePlugin;

	constructor(app: App, plugin: RandomNotePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Excluded folders')
			.setDesc('Enter folders to exclude (one per line). For example, "templates" or "archive".')
			.addTextArea(text => text
				.setPlaceholder('Enter excluded folders...')
				.setValue(this.plugin.settings.excludedFolders.join('\n'))
				.onChange(async (value) => {
					this.plugin.settings.excludedFolders = value.split('\n')
						.map(s => s.trim())
						.map(s => s.startsWith('/') ? s.slice(1) : s)
						.map(s => s.endsWith('/') ? s.slice(0, -1) : s)
						.filter(s => s.length > 0);
					await this.plugin.saveSettings();
				}));
	}
}
