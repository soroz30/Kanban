const express = require('express')
const router = express.Router()
import * as LaneController from '../controllers/lane.controller';

router.route('/lanes').get(LaneController.getLanes);

router.route('/lanes').post(LaneController.addLane);

router.route('/lanes/:laneId').delete(LaneController.deleteLane);

router.route('/lanes/:laneId/name').post(LaneController.editName);

router.route('/lanes/update').post(LaneController.updateLanes);

module.exports = router;