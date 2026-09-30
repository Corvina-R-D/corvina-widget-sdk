import { Dashboard } from "@/corvina-model";
export default abstract class Action {
    args: any;
    dashboard: Dashboard;
    constructor(args: any, dashboard: Dashboard);
    abstract do(): any;
    abstract undo(): any;
    redo(): any;
}
