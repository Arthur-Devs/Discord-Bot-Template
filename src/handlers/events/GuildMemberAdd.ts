import { EmbedBuilder } from '@discordjs/builders';
import { GuildMember } from 'discord.js';

import Bot from '../../Bot';
import Event from '../../libs/Event';

export const EVENT = new Event('guildMemberAdd', (member: GuildMember) => {
  const guild = member.guild.channels.cache.get('983444836306808912');
  if (guild && guild.isTextBased()) {
    const embedBuilder = new EmbedBuilder();
    embedBuilder.setTitle(`Bienvenue ${member.user.username}`);
    embedBuilder.setDescription(`Nous sommes désormais **${member.guild.memberCount}** membres !`);
    embedBuilder.setThumbnail(member.user.displayAvatarURL());
    const bot = Bot.getInstance();
    if (bot.user) {
      embedBuilder.setFooter({ text: bot.user?.username, iconURL: bot.user.displayAvatarURL() });
    }
    embedBuilder.setTimestamp(Date.now());
    embedBuilder.setColor([44, 200, 76]);
    const embed = embedBuilder.toJSON();
    guild.send({ embeds: [embed] });
  }
});
