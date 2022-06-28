export class Cell{

    status : 'empty'|'wrong'|'exists'|'exact';
    content : ''|string;

    constructor(status:'empty'|'wrong'|'exists'|'exact',content:''|string) {
        this.status=status;
        this.content=content;
    }

}