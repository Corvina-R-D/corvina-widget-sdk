import { VuexModule } from "vuex-module-decorators";
import { Route } from "vue-router";
export interface HistoryEntry {
    path: string;
    query: Route["query"];
}
export default class NavigationHistoryStore extends VuexModule {
    stack: HistoryEntry[];
    isNavigatingBack: boolean;
    get peekPrevious(): HistoryEntry | undefined;
    PUSH_ENTRY(entry: HistoryEntry): void;
    POP_ENTRY(): void;
    SET_NAVIGATING_BACK(value: boolean): void;
    CLEAR(): void;
    trackNavigation(to: Route): void;
}
