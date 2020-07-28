;(function(){
	// const todos=[
	// 	{
	// 		id:1,
	// 		title:'吃饭',
	// 		completed:true
	// 	},
	// 	{
	// 		id:2,
	// 		title:'睡觉',
	// 		completed:true
	// 	},
	// 	{
	// 		id:3,
	// 		title:'打豆豆',
	// 		completed:true
	// 	},
	// ]
	// 聚焦
	Vue.directive('focus',{
		inserted:function(el){
			el.focus()
		}	
	})
	Vue.directive('todo-focus',{
		update:function(el,binding){
			if(binding.value){
				el.focus()
			}
		}	
	})

	window.vm=new Vue({
		el:'#app',
		data:{
			todos:JSON.parse(window.localStorage.getItem('todos') || '[]'),
			currentEditing:null,
			filterText:'all'
		},
		watch:{
			// 监视todos的改变，当发生变化时作相应的处理
			todos:{
				// 当改变时会自动调用
				handler(){
					window.localStorage.setItem('todos',JSON.stringify(this.todos))
				},
				deep:true
			}
		},
		computed:{
			remaningCount(){
				return this.todos.filter(t=>!t.completed).length
			},

			toggleAll:{
				get(){
					return this.todos.every(t=>t.completed)
				},
				// 表单控件双向绑定了toggleAll，所以checkbox的变化时会调用set()
				set(){
					//得到当前checkbox的选择状态
					// 把所有任务项的选中状态都设置为toggleAll的选中状态
					const checked=!this.toggleAll
					this.todos.forEach(item=>{
						item.completed=checked
					})
				}
			},

			filterTodos(){
				// all return this.todos
				// active    return this.todos.fliter(t=>!t.completed)
				//  completed    return this.todos.filter(t=>t.completed)
				switch (this.filterText) {
					case 'active':
						return this.todos.filter(t=>!t.completed)
						break;
					case 'completed':
						return this.todos.filter(t=>t.completed)
						break;
					default:
						return this.todos
						break;
				}
			}
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
					// 如果 数组是空就给1，否则就是最后一个元素的id+1
					id:todos.length?todos[todos.length-1].id+1:1,
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
			},

			handleRemoveToDoClick(index,e){
				this.todos.splice(index,1)
			},

			handleGetEditingDblclick(todo){
				// 中间变量，等于当前双击的todo
				this.currentEditing=todo
			},

			handleSaveEditKeyDown(todo,index,e){
				// 注册绑定事件函数
				// 获取编辑文本框的数据
				// 数据校验
				const target=e.target
				const value=target.value.trim()
				//数据被编辑为空时直接删除
				if(!value.length){
					 this.todos.splice(index,1)
				}else{
					todo.title=value
					// 去除编辑样式
					this.currentEditing=null
				}
			},

			handleClearAllDoneClick(){
				// 方法一
				for(let i=0;i<this.todos.length;i++){
					if(this.todos[i].completed){
						this.todos.splice(i,1)
						i--
					}
				}
				// 方法二：把需要的结果过滤出来再重新赋值到todos
				// this.todos=this.todos.filter(item=>!item.completed)


			}
			
		}
	})

	// 页面初始化时调用一次，用于保存路由状态
	handlehashchange()
	// 注册hash改变事件
	window.onhashchange=handlehashchange
	function handlehashchange(){
		window.vm.filterText=window.location.hash.substr(2)
	}
})()