function ClientService() {
    this.all = [];
    this.getAll = function() {
        return this.all;
    };
    this.getById = function (id) {
        for(var i = 0;i < this.all.length; i++) {
            if(this.all[i].id == id) {
                return this.all[i];
            }
        }
        return null;
    };
    this.add = function (client) {
        this.all.push(client)
    };
    this.delete = function (id) {
        for(var i = 0;i < this.all.length; i++) {
            if(this.all[i].id == id) {
                this.all.splice(i, 1);
                break;
            }
        }
    };
}