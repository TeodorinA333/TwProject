import express from 'express';
import {getGroupsById, getGroups, createGroup, deleteGroup, getGroupWithFilterAndPagination} from "../dataAccess/GrupaEventsDA.js";

let groupEventsRouter = express.Router();

groupEventsRouter.route('/group').post(async (req, res) => {
    return res.status(201).json(await createGroup(req.body));
})

groupEventsRouter.route('/group').get(async (req, res) => {
    return res.json(await getGroups());
})

groupEventsRouter.route('/group/:id').get(async (req, res) => {
    return res.json(await getGroupsById(req.params.id));
})

groupEventsRouter.route('/group/:id').delete(async (req, res) => {
    return res.json(await deleteGroup(req.params.id));
})

groupEventsRouter.route('/groupFilter').get( async (req, res) => {
    return res.json(await getGroupWithFilterAndPagination(req.query));
  })

export default groupEventsRouter;