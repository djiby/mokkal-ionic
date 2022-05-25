export class Beuyit{
    num: number;
    isDownload: boolean = false;
    picture: string;
    audio: string;
    isLearned: boolean = false;

    constructor(num: number, isDownload: boolean){
        this.num = num;
        this.isDownload = isDownload;
    }
}
