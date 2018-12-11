// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import BaseService from '../../../app/service/baseService';
import Common from '../../../app/service/common';
import Dashboard from '../../../app/service/dashboard';
import Plan from '../../../app/service/plan';
import PlanTask from '../../../app/service/planTask';

declare module 'egg' {
  interface IService {
    baseService: BaseService;
    common: Common;
    dashboard: Dashboard;
    plan: Plan;
    planTask: PlanTask;
  }
}
