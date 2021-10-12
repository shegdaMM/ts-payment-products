import { ENotifyType } from '@/models/ENotifyType';

export default interface INotify {
    message: string,
    type: ENotifyType
}
