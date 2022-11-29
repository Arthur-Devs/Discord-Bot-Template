import { CommandInteraction, Embed } from 'discord.js';

export async function replyTemporaMessage(
  message: { message?: string; embeds?: Embed[] },
  interaction: CommandInteraction,
  delay = 5000
): Promise<void> {
  await interaction.editReply(message.message ? message.message : { embeds: message.embeds });
  setTimeout(() => {
    interaction.deleteReply();
  }, delay);
}
