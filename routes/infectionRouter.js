const Router = require('@koa/router');
const controller = require('../controllers/infectionController');

const router = new Router();

router.get('/infection/timestamps', async ctx => {
    json(ctx, controller.getTimeList());
});

router.get('/infection/timestamps/:time', async ctx => {
    let { time } = ctx.params;
    if (time === 'latest') {
        let infectionInfo = controller.getLatestInfectionInfo();
        controller.filterInfectionInfo(infectionInfo, ctx.request.query);
        json(ctx, infectionInfo);
    } else {
        time = parseInt(time);
        let infectionInfo = controller.getInfectionInfo(time);
        if (infectionInfo === undefined) {
            ctx.throw(404, `No infection data announced at ${new Date(time)}.`);
        } else {            
            controller.filterInfectionInfo(infectionInfo, ctx.request.query);
            json(ctx, infectionInfo);
        }
    }
});

module.exports = router;

function json(ctx, body) {
    ctx.body = body;
    ctx.type = 'json';
}