const twitch_create = {
    stream_url: 'https://player.twitch.tv/?channel=',
    anchor: document.getElementById('anchorpoint'),
    createdElements: [],
    createChannel: function (channelname) {
        let new_embed = document.createElement("IFRAME");
        new_embed.id = channelname.toString();
        new_embed.src = twitch_create.stream_url + channelname.toString();
        new_embed.frameborder = "0";
        new_embed.allowfullscreen = "true";
        new_embed.scrolling = "no";
        new_embed.height = "378";
        new_embed.width = "620";
        //stick it to anchor::
        twitch_create.anchor.appendChild(new_embed);
        //track elements in list::
        twitch_create.createdElements.push(new_embed);
        return twitch_create;
    },
}

twitch_create.createChannel('d74g0n');
