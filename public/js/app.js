class App
{
	constructor(){
		this.element=document.querySelector('#home');
		const diaryElem=document.querySelector('#diary')
		this.diary=new Diary(diaryElem,this.homeCB);

		document.querySelector('#newJournal').addEventListener('click',()=>{this.hide();this.diary.show()});
	}

	hide=()=>this.element.classList.add('inactive');
	show=()=>this.element.classList.remove('inactive');

	homeCB=()=>{
		this.show();
		this.diary.hide();
	}
}
