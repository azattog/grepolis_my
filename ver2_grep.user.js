

// ==UserScript==
// @name скрипт для нашего альянса
// @namespace azattog
// @version 0.01
// @source https://github.com/azattog/grepolis_my/raw/master/ver2_grep.user.js
// @description по поводу работы этого скрипта спрашивайте всю инфу у босов
// @downloadURL https://github.com/azattog/grepolis_my/raw/master/ver2_grep.user.js
// @updateURL https://github.com/azattog/grepolis_my/raw/master/ver2_grep.user.js
// @include *grepolis.com*
// ==/UserScript==


alert('все ахуенно, установились');


getTown: function(id) {
    var town = ITowns.getTown(id);
    if (town) {
        town.isOwn = true;
        return town;
    }
    town = this.towns[id];
    if (town) return town;
    return {
        id: id
    };
},
townName: function(townId) {
    var town = this.getTown(townId);
    return town.name ? town.name : this.str.format("[town]{0}[/town]", townId);
},
townLink: function(townId, townName) {
    var town = ITowns.getTown(townId);
    if (town)
        if (typeof town.getLinkFragment === "function") return this.str.format('<a class="gp_town_link" href="#{0}">{1}</a>', town.getLinkFragment(), town.name);
        else if (typeof town.createTownLink === "function") return town.createTownLink();
    town = this.towns[townId];
    if (town) {
        var link = this.str.format('{"id":{0},"ix":{1},"iy":{2},"name":"{3}"}', town.id, town.x, town.y, town.name);
        return this.str.format('<a class="gp_town_link" href="#{0}">{1}</a>', b978dae75.str.btoa(link), town.name);
    }
    if (townName) {
        var link = this.str.format("<b>{0}</b>", townName);
        if (townId) link += this.str.format("([town]{0}[/town])", townId);
        return link;
    }
    return this.str.format("[town]{0}[/town]", townId);
},
loadTownList: function() {
    var that = this;
    that.request("custom:townList", {}, function(data) {
        angular.forEach(data.result, function(item, key) {
            if (!that.towns[item.id]) that.towns[item.id] = {};
            t = that.towns[item.id];
            t.id = item.id;
            t.x = item.x;
            t.y = item.y;
            t.name = item.name;
        });
        that.logger.debug("Town list loaded: {0}", data.result.length);
    });
}
