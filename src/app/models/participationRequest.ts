export class ParticipationRequest {
    activityId: number;
    contactsIds: number[];

    constructor(activityId: number, contactsIds: number[]){
        this.activityId = activityId;
        this.contactsIds = contactsIds;
    }
}