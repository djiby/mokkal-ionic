import { Beuyit } from "./beuyit.model";

export class Xassaid{
    name: string;
    countBeuyite: number;
    isLearned: boolean;
    isToLearn: boolean;
    countLearned: number = 0;
    beuyits: Array<Beuyit>;

    constructor (name: string, countBeuyite: number, isLearned: boolean, isToLearn: boolean){
        this.name = name;
        this.countBeuyite = countBeuyite;
        this.isLearned = isLearned;
        this.isToLearn = isToLearn;
    }
}

export const XASSAIDS: Array<Xassaid> = [
    new Xassaid('Jazbu Xulob', 185, false, false),
    new Xassaid('Mawahibu Nafih', 166, false, false),
    new Xassaid('Madal Xabiru', 12, false, false),
    new Xassaid('Lissanu Chukri', 12, false, false),
    new Xassaid('Mafatihul Jinaan', 108, false, false),
    new Xassaid('Muxadamaatul Amdah', 192, false, false),
    new Xassaid('Midadi', 66, false, false),
    new Xassaid('Yassuru', 12, false, false),
    new Xassaid('Rafahna', 12, false, false),
    new Xassaid('Liyanqada', 12, false, false),
    new Xassaid('Madahtu', 12, false, false),
    new Xassaid('Salatu Rahimi', 12, false, false),
    new Xassaid('Hadani', 12, false, false),
    new Xassaid('Mahawta', 12, false, false),
    new Xassaid('Waxani', 17, false, false),
    new Xassaid('Salahi Bi Fadlillah', 12, false, false),
    new Xassaid('Salahi Bi Islahin', 12, false, false),
    new Xassaid('Salatu Wa Taslimun', 12, false, false),
    new Xassaid('Safatli', 12, false, false),
    new Xassaid('Hadaya', 12, false, false),
    new Xassaid('Yamukrima', 12, false, false),
    new Xassaid('Zalat', 9, false, false),
    new Xassaid('Rabbi', 9, false, false),
    new Xassaid('Wajahtu Lillahi Hamdan', 16, false, false),
    new Xassaid('Buchra', 25, false, false),
    new Xassaid('Yaaman', 6, false, false),
    new Xassaid('Ajaabani', 6, false, false),
    new Xassaid('Wajahtu Wajhi Yaa Za', 25, false, false),
    new Xassaid('Bismilahi Lazi', 20, false, false),
    new Xassaid('Ahonzu Billahi', 24, false, false),
    new Xassaid('Ya Khayra Dayfin', 14, false, false),
    new Xassaid('Lillahi Kulliyati', 22, false, false),
    new Xassaid('Lillahi Rabbil Lazi', 49, false, false),
    new Xassaid('Rumna Shakur', 89, false, false),
    new Xassaid('Walaqad Karamna', 86, false, false),
    //new Xassaid('Rahiyatu', 132, false, false),
    new Xassaid('Khalo', 10, false, false),
    new Xassaid('Rabbiya Ahmadu', 25, false, false),
    new Xassaid('Wakana Haqqan', 152, false, false),
    //new Xassaid('Bismil ilahi Ikfini', 101, false, false),
    //new Xassaid('Hisnul Abrar', 1, false, false),
];