import { HandlerManager } from '../../HandlerManager';
import Modal from './Modal';

class ModalManager extends HandlerManager {
  private modals: { [key: string]: Modal } = {};

  public async load(): Promise<void> {
    const files = await this.getFilesFromFolder('..');
    for (const file of files) {
      const modal: Modal = (await import(file)).default;
      this.modals[modal.getID()] = modal;
    }
  }
}

const modalManager = new ModalManager();
export default modalManager;
