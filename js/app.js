;(function(){
	const todos=[
		{
			id:1,
			title:'吃饭',
			completed:true
		},
		{
			id:2,
			title:'睡觉',
			completed:true
		},
		{
			id:3,
			title:'打豆豆',
			completed:false
		},
	]
	new Vue({
		el:'#app',
		data:{
			todos,
		},
		methods:{
			handleNewTodo(e){
				// 绑定文本框的keydown事件
				// 获取文本框内容
				// 数据校验	
				// 添加到todos列表
				// 清空文本框
				const target=e.target
				const value=target.value.trim()
				// console.log(value)
				if(!value.length){
					return
				}
				const todos=this.todos
				todos.push({
					id:todos[todos.length-1].id+1,
					title:value,
					completed:false
				})
				target.value=''
				
			},
			handleToggleAllChange(e){
				// 绑定checkbox的change事件
				// 获取checkbox的选中状态
				// 直接循环所有子任务项的选中状态
				const checked=e.target.checked
				this.todos.forEach(item=>{
					item.completed=checked
				})
			}
		}
	})
})()