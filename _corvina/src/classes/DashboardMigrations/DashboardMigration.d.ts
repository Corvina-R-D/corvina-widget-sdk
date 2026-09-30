import { IDashboardSerialization } from '../../interfaces/dashboard';
export default abstract class DashboardMigration {
    message: string;
    abstract check(initState: IDashboardSerialization): boolean;
    abstract migrate(initState: IDashboardSerialization): Promise<void>;
}
