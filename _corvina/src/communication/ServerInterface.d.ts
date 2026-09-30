export interface TrendSample {
    value: any;
    iso8601Timestamp: string;
}
export default class ServerInterface {
    constructor(options: any);
    /**
     * @retrun {object} Return JSON with alarms configuration
     * {
     *     "defaultColors":{
     *        <color json>
     *      },
     *     "alarms":{
     *         "Alarm1":{
     *            <alarm1 json>
     *         },
     *         ...
     *         "AlarmN":{
     *           <alarmN json>
     *         }
     *     }
     *  }
     */
    getAlarmConf(): void;
    /**
     * @retrun {object} Return JSON with alarms configuration
     *  * {
     *     <GroupName1> : {
     *                   "tgs":{
     *                         <TagX>: <value>,
     *                         ...
     *                         <TagZ>: <value>
     *                    }
     *    }
     *    ...
     *    <GroupNameN> : {
     *                   "tgs":{
     *                         <TagY>: <value>,
     *                         ...
     *                         <TaK>: <value>
     *                    }
     *    }
     */
    getGroupsConf(): void;
    /**
     * @return {object} Return JSON with tag configuration
     * {
     *     <tag_name_1>: {
     *                     t: <Interger code that indentify the tag type>
     *                     rt: <Value of refresh time>
     *                   }
     *      ...
     *     <tag_name_N>: {
     *                     t: <Interger code that indentify the tag type>
     *                     rt: <Value of refresh time>
     *                   }
     * }
     */
    getTagsConf(): void;
    /**
     * @return {object} Return JSON with trend configuration
     * {
     *     <trend_name_1>: {
     *                     st: <Sampling time>
     *                     ac: <Activate>
     *                     sz: <Size>
     *                   }
     *      ...
     *     <trend_name_N>: {
     *                     st: <Sampling time>
     *                     ac: <Activate>
     *                     sz: <Size>
     *                   }
     * }
     */
    getTrendsConf(): void;
    /**
     * @return {boolean} true if actually I'm logged
     */
    isLogged(): void;
    /**
     *
     * @param {string} reqTag - The JMobile tag name
     * @param {Boolean} sync
     * @return {Promise} - Promise to State
     */
    readTag(reqTag: any, sync: any): void;
    /**
     *
     * @param {string} reqTag - The JMobile tag name
     * @param {Boolean} sync
     */
    writeTag(reqTag: any, sync: any): void;
    /**
     *
     * @param {string} reqGroup - The JMobile group name
     * @param {Boolean} sync
     * @return {Promise} - Promise to Group
     */
    readGroup(reqGroup: any, sync: any): void;
    /**
     *
     * @param {string[]} reqGroups - Array of JMobile groups name
     * @param {Boolean} sync
     * @return {Promise} - Promise to Array of Groups
     */
    readGroups(reqGroups: any, sync: any): void;
    /**
     *
     * @param {String} name
     * @param {Number} startTime
     * @param {Number} endTime
     * @param {Number} nSample
     * @param {Number} deltaTime
     * @return {Promise} - Promise to a trend data:
     * {
     *      n: <TrendName>
     *      d: [
     *         <Sample0>,
     *         ...
     *         <SampleN>
     *         ]
     *  }
     */
    readTrend(name: string, startTime: number, endTime: number, nSample: number, deltaTime: number): void;
    /**
     * @params {string} trendName
     * @params {boolean} sync
     * @return {Promise}
     */
    deleteTrend(trendName: any, sync: any): void;
    /**
     * @params {string} trendName
     * @params {string} folder
     * @params {Number} dumpFormat
     * @params {Boolean} dateTimePrefix
     * @params {Boolean} localTimeSpec
     * @params {string} fileFormat
     * @params {boolean} sync
     * @return {Promise}
     */
    dumpTrend(trendName: any, folder: any, dumpFormat: any, dateTimePrefix: any, localTimeSpec: any, fileFormat: any, sync: any): void;
    /**
     *
     * @param {string} reqGroup - JMobile group name
     * @param {Boolean} sync
     */
    activateGroup(reqGroup: any, sync: any): void;
    /**
     *
     * @param {string} reqGroup - JMobile group name
     * @param {Boolean} sync
     */
    deactivateGroup(reqGroup: any, sync: any): void;
    /**
     * @param {string[]} reqAlarms - Array of  JMobile alarms name.
     * @param {Boolean} sync
     * @return {Promise} - Promise to Array of Alarms
     */
    readAlarms(reqAlarms: any, sync: any): void;
    /**
     * @param {string[]} reqAlarms - Array of  JMobile alarms name
     * @param {Boolean} sync
     */
    resetAlarms(reqAlarms: any, sync: any): void;
    /**
     *
     * @param {string[]} reqAlarms - Array of JMobile alarms name
     * @param {Boolean} sync
     */
    acknowledgeAlarms(reqAlarms: any, sync: any): void;
    /**
     *
     * @param {string[]} reqAlarms
     * @param {Boolean} isEnabled
     * @param {Boolean} sync
     */
    enableAlarms(reqAlarms: any, isEnabled: any, sync: any): void;
    /**
     *
     * @param {Boolean} sync
     */
    saveConfiguration(sync: any): void;
    /**
     *
     * @param  {string[]} reqTags - Array of JMobile tags name
     * @param {Boolean} sync
     * @return {Promise} - Promise to Array of Tags
     */
    readTags(reqTags: any, sync: any): void;
    /**
     *
     * @param {string[]} reqTags - Array of JMobile tags name
     * @param {object[]} tagValues - Array of values
     * @param {Boolean} sync
     */
    writeTags(reqTags: any, tagValues: any, sync: any): void;
    /**
     *
     * @param {string} reqGroups - Array of JMobile groups name
     * @param {Boolean} sync
     */
    activateGroups(reqGroups: any, sync: any): void;
    /**
     *
     * @param {string} reqGroups - Array of JMobile groups name
     * @param {Boolean} sync
     */
    deactivateGroups(reqGroups: any, sync: any): void;
    /**
     *
     * @param {string} archive
     * @param {Boolean}sync
     */
    deleteEventArchive(archive: any, sync: any): void;
    setLocalTime(sec: any, min: any, hour: any, day: any, month: any, year: any, sync: any): void;
    getLocalTime(sync: any): void;
    getDLSSettings(sync: any): void;
    getProperty(reqProps: any, sync: any): void;
    getRecipeList(sync: any): void;
    getRecipeSetList(recipeName: any, sync: any): void;
    getRecipeSet(recipeName: any, recipeSet: any, sync: any): void;
    getRecipeParams(recipeName: any, recipeParams: any, sync: any): void;
    getRecipeElemParam(recipeId: any, setId: any, elemId: any, attr: any, sync: any): void;
    setRecipeParam(recipeId: any, value: any, sync: any): void;
    setRecipeSetParam(recipeId: any, setId: any, attr: any, value: any, sync: any): void;
    setRecipeElemParam(recipeId: any, setId: any, elId: any, attr: any, value: any, sync: any): void;
    downloadRecipe(recipeName: any, recipeSet: any, sync: any): void;
    uploadRecipe(recipeName: any, recipeSet: any, sync: any): void;
    setRecipeSet(recipeName: any, recipeSet: any, sync: any): void;
    setCurrentRecipe(recipeName: any, recipeSet: any, sync: any): void;
    resetRecipe(recipeName: any, sync: any): void;
    /**
     * @return {object}
     * {
     *     code: [S_OK|FAILED|INVALIDARGS],
     *     status: STATUS_CODE,
     *     msg: <string>
     * }
     *
     * STATUS_CODE:
     *  0: DefaultState=0,
     *  1: In Progress,
     *	2: Success,
     *	3: Failed
     *
     */
    dumpRecipeData(recipeId: any, dataSet: any, path: any, fileName: any, tagName: any, dtPrefix: any, ts: any, sync: any): void;
    restoreRecipeData(rId: any, setId: any, sysPath: any, fileName: any, tagName: any, browse: any, rType: any, sync: any): void;
    getProperties(reqProps: any, sync: any): void;
    setProperties(reqProps: any, sync: any): void;
    /**
     * Subscribe Widget to a specific event type.
     * @param {String} eventType
     * @param {Function} callback
     * @return {String} callbackId
     */
    subscribeNotification(eventType: any, callback: any): void;
    /**
     * Unsubscribe Widget callback from a specific event type.
     * @param {String} eventType
     * @param {String} callbackId
     */
    unsubscribeNotification(eventType: any, callbackId: any): void;
    /**
     *
     * @param {string[]} reqAlarms - Array of  JMobile alarms name. Note: "*" select all alarms
     * @param callbacks
     * @return {string[]} callbacksId
     */
    subscribeAlarms(reqAlarms: any, callbacks: any): void;
    /**
     *
     * @param reqAlarms
     * @param callback
     * @return {string[]} callbacksId
     */
    subscribeEvent(reqEvent: any, callback: any): void;
    /**
     * @param {string} callbackId
     */
    unsubscribeEvent(callbackId: any): void;
    /**
     *
     * @param reqGroup
     * @param callback
     * @return {string} callbacksId
     */
    subscribeGroups(reqGroups: any): void;
    /**
     *
     * @param {string[]} listId
     */
    unsubscribeGroups(listId: any): void;
    /**
     *
     * @param reqTags
     * @param callbacks
     * @return {string} callbackId
     */
    subscribeTags(reqTags: any, callback: any): void;
    /**
     *
     * @param listId
     * @return {string[]} listId
     */
    unsubscribeTags(reqTags: any, callback: any): void;
    /**
     *
     * @param recipeId {string} - recipe identifier
     * @param callback {function}
     */
    subscribeRecipe(recipeId: any, callback: any): void;
    /**
     *
     * @param recipeId {string} - recipe identifier
     * @param callback {function}
     */
    subscribeRecipeSetList(recipeId: any, callback: any): void;
    /**
     *
     * @param recipeId {string} - recipe identifier
     * @param setId  {string} - set identifier
     * @param callback {function} - callback function
     */
    subscribeRecipeSet(recipeId: any, setId: any, callback: any): void;
    /**
     *
     * @param recipeId {string}
     * @param setId {string}
     * @param elemId {string}
     * @param callback {function}
     */
    subscribeRecipeSetElem(recipeId: any, setId: any, elemId: any, callback: any): void;
    /**
     *
     * @param {object} trend
     * @param callback
     */
    /**
     * @param {Array.string}listId
     */
    /**
     *
     * @param {string} - projectName
     * @return {object}
     * {
     *     status: <0|1>
     *     activeProject: <last_active_projectName>
     * }
     */
    isSessionAlive(): void;
    /**
     * Call the callback function when the connection with the server has be established
     * @param callback
     */
    onConnectionReady(callback: any): void;
    /**
     * @return {number} return 1 if the connectin with the server is opened, 0 otherwise
     */
    getConnectionStatus(): void;
    conf: {
        exception: {
            ipad1: boolean;
        };
        ssemode: number;
    };
    /**
     * @return {number} return the object
     */
    getOptions(): {
        exception: {
            ipad1: boolean;
        };
        ssemode: number;
    };
    /**
     * @return {number} return the object
     */
    enableOption(key: any): void;
    logOut(): void;
}
