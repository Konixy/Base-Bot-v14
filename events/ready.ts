import { Client } from "discord.js";
import colors from "colors";

export default {
  name: "ready",
  once: true,
  async execute(client: Client) {
    console.log(
      colors.blue(
        `[READY] ${client.user.tag} (${
          client.user.id
        }) est prêt | ${client.guilds.cache.size.toLocaleString(
          "fr-FR"
        )} serveurs | ${client.guilds.cache
          .reduce((acc, guild) => acc + guild.memberCount, 0)
          .toLocaleString("fr-FR")} utilisateurs`
      )
    );
  },
};
