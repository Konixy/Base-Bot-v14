import Discord, { ColorResolvable, CommandInteraction, DateResolvable, Message } from "discord.js";

export const embedColor = "#2f3136";

export function convertDate(date: DateResolvable, addon: string) {
  date = new Date(date);
  let epoch: DateResolvable;

  try {
    epoch = date.getTime() / 1000.0;
  } catch {
    console.log("Une erreur s'est produite en essayant de convertir la date");
    epoch = null;
    return epoch;
  }

  let time = `<t:${epoch}${addon ? addon : ""}>`;

  return time;
}

export function sendEmbed(
  message: Message,
  embedTitle?: string,
  embedDescription?: string,
  embedColorParam?: ColorResolvable
): Promise<Discord.Message<true>> | Promise<Discord.Message<false>> {
  if (!message || (!embedTitle && !embedDescription)) return;
  const embed = new Discord.EmbedBuilder();
  if (embedTitle) embed.setTitle(embedTitle);
  if (embedColorParam) embed.setColor(embedColorParam);
  else embed.setColor(embedColor);
  if (embedDescription) embed.setDescription(embedDescription);
  return message.channel.send({ embeds: [embed] });
}

export function genEmbed(
  embedTitle?: string,
  embedDescription?: string,
  embedColorParam?: ColorResolvable
) {
  if (!embedTitle && !embedDescription) return;
  const embed = new Discord.EmbedBuilder();
  if (embedTitle) embed.setTitle(embedTitle);
  if (embedColorParam) embed.setColor(embedColorParam);
  else embed.setColor(embedColor);
  if (embedDescription) embed.setDescription(embedDescription);
  return embed;
}

export async function reply(
  interaction: CommandInteraction,
  embedTitle?: string,
  embedDescription?: string,
  embedColorParam?: ColorResolvable
): Promise<Discord.Message<boolean>> {
  if (!embedTitle && !embedDescription) return;
  const embed = new Discord.EmbedBuilder();
  if (embedTitle) embed.setTitle(embedTitle);
  embedColorParam
    ? embed.setColor(embedColorParam)
    : embed.setColor(embedColor);
  if (embedDescription) embed.setDescription(embedDescription);
  try {
    if (!interaction.replied && !interaction.deferred)
      return await interaction.reply({ embeds: [embed], fetchReply: true });
    else return await interaction.channel.send({ embeds: [embed] });
  } catch (err) {
    return interaction.channel.send({ embeds: [embed] });
  }
}

export function replyEphemeral(interaction: CommandInteraction, embedTitle?: string, embedDescription?: string): Promise<Discord.InteractionResponse<boolean>> {
	if(interaction.replied || !embedTitle && !embedDescription) return;
	const embed = new Discord.EmbedBuilder()
	if(embedTitle) embed.setTitle(embedTitle);
	embed.setColor(embedColor);
	if(embedDescription) embed.setDescription(embedDescription);
	return interaction.reply({embeds: [embed], ephemeral: true});
}