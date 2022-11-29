import colors from "colors";
import { InteractionType, Client, Interaction } from "discord.js";
import { ClientType } from "../Types";
import { replyEphemeral } from "../util";

export default {
  name: "interactionCreate",
  async execute(client: Client, Client: ClientType, interaction: Interaction) {
    if (!interaction.guild) return;

    if (interaction.type == InteractionType.ApplicationCommand) {
      const command = Client.commands.get(interaction.commandName);
      if (!command) return;

      // check permissions
      if (command.permissions) {
        if (command.botOwnerOnly) {
          if (!Client.config.owners.includes(interaction.user.id))
            return replyEphemeral(
              interaction,
              `:x: **Vous devez être le propriétaire du bot pour exécuter cette commande.**`
            ).catch(() => {});
        }

        if (command.guildOwnerOnly) {
          if (
            interaction.guild.ownerId != interaction.user.id &&
            !Client.config.owners.includes(interaction.user.id)
          )
            return replyEphemeral(
              interaction,
              `:x: **Vous devez être le propriétaire du serveur pour exécuter cette commande.**`
            ).catch(() => {});
        }

        const authorPerms = interaction.guild.channels.cache
          .get(interaction.channelId)
          .permissionsFor(interaction.user);
        if (
          (!authorPerms || !authorPerms.has(command.permissions)) &&
          !Client.config.owners.includes(interaction.user.id)
        )
          return replyEphemeral(
            interaction,
            `:x: **Vous n'avez pas les permissions d'utiliser cette commande.**`
          ).catch(() => {});
      }

      command.executeSlash(client, Client, interaction);
      const args: any[] = [];
      interaction.options.data.forEach((e) => args.push(e));
      console.log(
        `${`[CMD-S]`.blue} ${`@${interaction.user.tag}`.bgBlue.black} in ${
          interaction.guild.name.bgWhite.black
        } in ${`#${interaction.channel.name}`.bgWhite.black} : /${
          command.name
        }${args.map((e) => (e = ` ${e.name}="${e.value}"`)).join("")}`
      );
    }
  },
};
