export class Document {
    id: number;
    fileName: string;
    data: Blob;

    constructor(id: number, fileName: string, data: Blob){
        this.id = id;
        this.fileName = fileName;
        this.data = data;
    }

}