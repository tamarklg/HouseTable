const House = require('../models/house');

class HouseCtrl {
    static async list(ctx) {
        try {
            const houses = await House.findAll({ order: ["id"] });

            ctx.body = houses;
        } catch (err) {
            console.error(err);

            ctx.body = 'Failed to get list of houses';
            ctx.status = 500;
        }
    }

    static async retrieve(ctx) {
        try {
            const houseId = ctx.params.id;
            const house = await House.findByPk(houseId);

            if (!house) {
                throw new Error('House does not exist');
            }
      
            ctx.body = house;
        } catch (err) {
            console.error(err);
        
            ctx.body = 'Failed to retrieve house';
            ctx.status = 500;
        }
    }

    static async create(ctx) {
        try {
            const data = ctx.request.body;
            const house = await House.create(data);
      
            ctx.body = house;
            ctx.status = 201;
        } catch (err) {
            console.error(err);
        
            ctx.body = 'Failed to create house';
            ctx.status = 500;
        }
    }

    static async update(ctx) {
        try {
            const houseId = ctx.params.id;
            const { id, ...data } = ctx.request.body;

            const query = { where: { id: houseId }, returning: true };

            const house = await House.update(data, query);
      
            ctx.body = house;
            ctx.status = 200;
        } catch (err) {
            console.error(err);
        
            ctx.body = 'Failed to update house';
            ctx.status = 500;
        }
    }
}

module.exports = HouseCtrl;