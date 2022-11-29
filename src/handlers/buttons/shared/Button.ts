import { ButtonBuilder } from '@discordjs/builders';
import { ButtonInteraction, ButtonStyle } from 'discord.js';
import { Subject } from 'rxjs';

export default class Button {
  private id: string;
  private buttonBuilder: ButtonBuilder;

  private observable: Subject<ButtonInteraction> = new Subject<ButtonInteraction>();

  constructor(id: string, buttonBuilder: ButtonBuilder) {
    this.id = id;
    this.buttonBuilder = buttonBuilder;
    this.buttonBuilder.setCustomId(id).setStyle(ButtonStyle.Primary);
  }

  public getID(): string {
    return this.id;
  }

  public getButton(): ButtonBuilder {
    return this.buttonBuilder;
  }

  public getObservable(): Subject<ButtonInteraction> {
    return this.observable;
  }

  public handleInteraction(interaction: ButtonInteraction): void {
    this.observable.next(interaction);
  }
}
