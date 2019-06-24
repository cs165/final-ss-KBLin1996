class Diary
{
	constructor(diaryElem,homeCB)
	{
		this.MONTH=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
		
		this.elem=diaryElem
		const navElem=this.elem.querySelector('#navi')
		this.nav=new Navi(navElem,this.backward,this.forward,homeCB)
		
		this.textarea=this.elem.querySelector('#textarea')
		this.dateText=this.elem.querySelector('#date')
		this.promptText=this.elem.querySelector('#prompt')
		this.date=new Date()
		this.dateText.innerText=this.MONTH[this.date.getMonth()]+' '+this.date.getDate()
		this.textarea.addEventListener('click',e=>{e.stopPropagation();this.nav.edit()})
		document.body.addEventListener('click',()=>{
			if(!this.nav.chk.classList.contains('inactive'))
				{
					this.nav.view()
					this.update()
				}
			})
		this.PROMPTS=[]
		const PROMPTS_URL='https://fullstackccu.github.io/final-project/diary-assets/prompts.txt'
		fetch(PROMPTS_URL).then(response=>response.text()).then(txt=>{
			txt=txt.split(',')
			txt.forEach(item=>{
				item=item.replace(/'/g,"").replace("\n","")
				this.PROMPTS.push(item)
			})
			this.promptText.innerText=this.PROMPTS[parseInt(this.date.getTime()/86400000)%this.PROMPTS.length]
		})
		fetch('/'+(this.date.getMonth()+1)+'/'+this.date.getDate(),{'method':'GET'}).then(resp=>{return resp.json()}).then(json=>{if(json.stat===undefined)this.textarea.value=unescape(json.res)})
	}
	

	update()
	{
		const opt={'method':'POST','body':'{\"text\":\"'+escape(this.textarea.value)+'\"}','headers':{'Accept':'application/json','Content-Type':'application/json'}}
		fetch('/'+(this.date.getMonth()+1)+'/'+this.date.getDate(),opt).then(response=>{return response.json()}).then(json=>{
			if(json.error!==undefined)
				console.error(json.error)
		})
	}

	backward=()=>
	{
		this.textarea.value=''
		this.date.setTime(this.date.getTime()-86400000);
		this.dateText.innerText=this.MONTH[this.date.getMonth()]+' '+this.date.getDate();
		const promptid=(this.date.getTime()/86400000)%this.PROMPTS.length
		this.promptText.innerText=this.PROMPTS[parseInt(promptid)]
		fetch('/'+(this.date.getMonth()+1)+'/'+this.date.getDate(),{'method':'GET'}).then(resp=>{return resp.json()}).then(json=>{if(json.stat===undefined)this.textarea.value=unescape(json.res)})
	}
	forward=()=>
	{
		this.textarea.value=''
		this.date.setTime(this.date.getTime()+86400000);
		this.dateText.innerText=this.MONTH[this.date.getMonth()]+' '+this.date.getDate();
		const promptid=(this.date.getTime()/86400000)%this.PROMPTS.length
		this.promptText.innerText=this.PROMPTS[parseInt(promptid)]
		fetch('/'+(this.date.getMonth()+1)+'/'+this.date.getDate(),{'method':'GET'}).then(resp=>{return resp.json()}).then(json=>{if(json.stat===undefined)this.textarea.value=unescape(json.res)})

	}
	
	show=()=>this.elem.classList.remove('inactive')
	hide=()=>this.elem.classList.add('inactive')
}