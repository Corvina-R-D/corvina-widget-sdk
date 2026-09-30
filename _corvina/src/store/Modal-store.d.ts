import { VuexModule } from 'vuex-module-decorators';
import ModalEnum from '@/constant/ModalEnum';
import { SnackbarPosition, SnackbarType } from '@/constant/ModalSnackbar';
export interface IModalData {
    id: ModalEnum;
    instanceId?: string;
    isVisible: boolean;
    title: string;
    message: string;
    htmlMessage?: string;
    snackbarType?: SnackbarType;
    snackbarPosition?: SnackbarPosition;
    error?: any;
    list: string;
    type: string;
    timeout?: number;
    onSuccess?: Function;
    onClose?: Function;
    clickOnTextFunction?: Function;
}
export interface IModalArgs {
    id: ModalEnum;
    title: string;
    message: string;
    htmlMessage?: string;
    isVisible?: boolean;
    list?: string;
    type?: string;
    onSuccess?: Function;
    onClose?: Function;
    timeout?: number;
    instanceId?: string;
    error?: any;
    [key: string]: any;
}
export default class ModalStore extends VuexModule {
    modalData: IModalData;
    SHOW_MODAL(modalData: IModalArgs): void;
    HIDE_MODAL(modalId: string): void;
    showModal(modalData: IModalArgs): void;
    hideModal(modalId: string): void;
    get getModalData(): IModalData;
}
