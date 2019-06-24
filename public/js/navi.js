class Navi
{
	backImage=null
	forwardImage=null
	checkImage=null
	constructor(navElem,back,fwd,homeCB)
	{
		this.elem=navElem
		this.back=this.elem.querySelector('#back')
		this.back.addEventListener('click',back)
		const BACK_IMGURL='https://fullstackccu.github.io/final-project/diary-assets/back.png'
		this.back.src=BACK_IMGURL;
		this.fwd=this.elem.querySelector('#forward')
		this.fwd.addEventListener('click',fwd)
		const FWD_IMGURL='https://fullstackccu.github.io/final-project/diary-assets/forward.png'
		this.fwd.src=FWD_IMGURL;
		this.home=this.elem.querySelector('#backHome')
		this.chk=this.elem.querySelector('#check')
		this.home.addEventListener('click',homeCB)
		const CHK_IMGURL='https://fullstackccu.github.io/final-project/diary-assets/checked.png'
		this.chk.src=CHK_IMGURL;
	}
	
	view=()=>{
		this.back.classList.remove('inactive')
		this.home.classList.remove('inactive')
		this.fwd.classList.remove('inactive')
		this.chk.classList.add('inactive')
	}
	edit=()=>{
		this.back.classList.add('inactive')
		this.home.classList.add('inactive')
		this.fwd.classList.add('inactive')
		this.chk.classList.remove('inactive')
	}
	
}