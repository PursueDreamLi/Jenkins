import index from '@/components/index.vue'
import add from '@/components/add.vue'
import edit from '@/components/edit.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/',
            name: 'add',
            component: add
        },
        {
            path: '/',
            name: 'edit',
            component: edit
        }
    ]
})

