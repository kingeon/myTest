// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import BaseController from '../../../app/controller/baseController';
import Common from '../../../app/controller/common';
import Dashboard from '../../../app/controller/dashboard';
import OpenAPI from '../../../app/controller/openAPI';
import Plan from '../../../app/controller/plan';
import PlanTask from '../../../app/controller/planTask';

declare module 'egg' {
  interface IController {
    baseController: BaseController;
    common: Common;
    dashboard: Dashboard;
    openAPI: OpenAPI;
    plan: Plan;
    planTask: PlanTask;
  }
}
