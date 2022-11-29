import { HandlerManager } from '../../HandlerManager';
import Button from './Button';

class ButtonManager extends HandlerManager {
  private buttonss: { [key: string]: Button } = {};

  public getButtons(): { [key: string]: Button } {
    return this.buttonss;
  }

  public async load(): Promise<void> {
    const files = await this.getFilesFromFolder('..');
    this.setButtonsInDict(files);
  }

  private async setButtonsInDict(listOfButtonsFile: string[]): Promise<{ [key: string]: Button }> {
    const buttons: { [key: string]: Button } = {};

    for (const file of listOfButtonsFile) {
      const button: Button = (await import(file)).default;
      buttons[button.getID()] = button;
    }

    return buttons;
  }
}

const buttonManager = new ButtonManager();
export default buttonManager;
