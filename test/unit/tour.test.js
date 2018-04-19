const { assert } = require('chai');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {
    it('Valid and good model', () => {
        const data = {
            title: 'The Test Tour',
            activities: ['testing models', 'testing validations', 'testing testing'],
            launchDate: new Date('January 1, 1900 00:00:00'),
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'OR',
                    zip: '97205'
                },
                weather: {
                    condition: 'Sunny',
                    windSpeed: '5mph',
                    sunset: 'Like 6 or whatever',
                }
            }]
        };

        const tour = new Tour(data);

        data._id = tour._id;
        data.stops[0]._id = tour.stops[0]._id;
        assert.deepEqual(tour.toJSON(), data);

        assert.isUndefined(tour.validateSync());
    });

    it('Has default date of "now"', () => {
        const tour = new Tour({ title: 'Right Now!', activities: ['this is just a test anyway']});
        assert.ok(tour.launchDate);
        assert.isAtMost(tour.launchDate - Date.now(), 5);
    });

});