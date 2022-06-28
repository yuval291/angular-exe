export class Cell{

  status : 'empty'|'wrong'|'exist'|'exact';
  content : ''|string;

  constructor(status:'empty'|'wrong'|'exist'|'exact',content:''|string) {
    this.status=status;
    this.content=content;
  }

}
