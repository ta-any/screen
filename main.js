const list = ['cup', 'deer', 'snow', 'candles', 'pullover', 'snowman', 'ball',
 'tree', 'candy', 'star', 'toy', 'skate', 'fire', 'box', 'lights']

class generationString{
	symbol = ''
	data = []
	time = 0
	constructor(array, width, widthComponent){
		this.array = array
		this.width = width
		this.widthComponent = widthComponent
	}
	renderUnderlining(element){
		let p = document.createElement('p');
		p.classList.add('msg');
		p.id = 'msg'
		p.textContent = '_'
		element.appendChild(p);
		return p
	}
	animationUnderlining(element){
		const styles = window.getComputedStyle(element);
		if(styles.display === 'inline'){
			element.style.display = 'none'
		} else {
			element.style.display = 'inline'
		}
	}
	randomValue(max, min){
		return Math.floor(Math.random() * (max - min) + min)
	}
	randomNameImg(){
		let len = this.array.length 
		let index = this.randomValue(len, 0)
		if(this.array[index] !== this.symbol){
			this.symbol = this.array[index]
			return this.symbol 
		} 
		return this.randomNameImg()
	}
	createComponent(){
		let img = document.createElement('img');
		img.src = 'img/' + this.randomNameImg() + '.svg'
		img.classList.add('txt')
		img.style.width = this.widthComponent + 'px'
		return img
	}
	count(){
		let randomWidth = this.randomValue(this.width - 150, 100)
		let count = Math.floor(randomWidth / this.widthComponent)
		return count
	}
	getData(node){
		this.data.push([node, this.count()])
	}
	renderString(blockStr, steps){
		let start = this.renderUnderlining(blockStr)
		let i = 0
		
		setInterval(() => {
			this.animationUnderlining(start)
		}, 400);
		
		let moveSymbol = setInterval(() => {
			i++;		
			if (steps == i) {
				start.remove()
				clearInterval(moveSymbol);
			} else {
				blockStr.insertBefore(this.createComponent(), 
				start)
			}
		}, 500);
		return steps
	}

	renderMsg(block){
		const nodes = Array.from(block.children);

		nodes.forEach(node => {
			this.getData(node)
		})

		this.data.forEach((item, index) => {
			setTimeout(() => {
				this.renderString(item[0], item[1])
			}, this.time);
			this.time = 500 * item[1] + this.time
		})
	}
}
 
const screen = document.getElementById("screen")
const str = new generationString(list, screen.clientWidth, 24)
str.renderMsg(screen)


