import {App, MarkdownView, Notice, Plugin, TFile} from 'obsidian';
import {DEFAULT_SETTINGS, RandomNoteSettings, RandomNoteSettingTab} from "./settings";

export default class RandomNotePlugin extends Plugin {
	settings: RandomNoteSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('dice', 'Open Random Note', () => {
			this.openRandomNote();
		});

		this.addCommand({
			id: 'open-random-note',
			name: 'Open Random Note',
			callback: () => {
				this.openRandomNote();
			}
		});

		this.addSettingTab(new RandomNoteSettingTab(this.app, this));
	}

	async openRandomNote() {
		const files = this.app.vault.getMarkdownFiles();
		const excludedFolders = this.settings.excludedFolders;

		const filteredFiles = files.filter(file => {
			for (const excludedFolder of excludedFolders) {
				if (file.path.startsWith(excludedFolder + '/')) {
					return false;
				}
			}
			return true;
		});

		if (filteredFiles.length === 0) {
			new Notice('No notes found (or all notes are excluded).');
			return;
		}

		const randomFile = filteredFiles[Math.floor(Math.random() * filteredFiles.length)];
		if (randomFile) {
			const leaf = this.app.workspace.getLeaf(false);
			await leaf.openFile(randomFile);
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<RandomNoteSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
