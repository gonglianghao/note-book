import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible' //自动设置根字体大小
import './assets/style/reset.css'
// 1. 引入你需要的组件
import { Button ,Form, Field, CellGroup,Icon,Uploader,ActionSheet   } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

import router from './router';
const app = createApp(App)
app.use(router);
app.use(Button); 
app.use(Form);
app.use(Field);
app.use(CellGroup); 
app.use(Icon)
app.use(Uploader)
app.use(ActionSheet )
app.mount('#app')
