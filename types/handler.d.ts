import { Awaitable, CacheType, CommandInteraction } from 'discord.js';

type handler = (interaction: CommandInteraction<CacheType>) => Awaitable<void>;
