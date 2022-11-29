import { ButtonInteraction, CacheType, CommandInteraction, Interaction } from 'discord.js';

import Event from '../../libs/Event';
import Logger from '../../utils/Logger';
import HandlerManager from '../HandlerManager';

export const EVENT = new Event('interactionCreate', (interaction: Interaction<CacheType>) => {
  if (interaction.isCommand()) commandInteraction(interaction);
  else if (interaction.isButton()) buttonInteraction(interaction);
  else Logger.getInstance().warning(`Interaction type not supported!`);
});

const commandInteraction = (interaction: CommandInteraction) => {
  const command = HandlerManager.getAllCommands()[interaction.commandName];
  if (command) {
    command.handleInteraction(interaction);
  } else {
    Logger.getInstance().error(`Command not found!`);
  }
};

const buttonInteraction = (interaction: ButtonInteraction) => {
  const button = HandlerManager.getButtons()[interaction.customId];
  if (button) {
    button.handleInteraction(interaction);
  } else {
    Logger.getInstance().error(`Button not found!`);
  }
};
