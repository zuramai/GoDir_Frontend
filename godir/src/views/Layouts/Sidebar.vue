<template>
    <div class='sidebar-view h-screen'>
        <div class="topbar h-16 bg-topbar px-24 shadow-lg">
            <div class="flex h-full">
                <div class="w-1/3 ">
                   <button class='h-full text-white font-bold text-2xl'>GoDIR</button>
                </div>
                <div class="w-1/3"></div>
                <div class="w-1/3 ">
                    <button class='h-full block float-right text-bold text-white hover:bg-gray-700 px-3' @click="logout()">Sign Out</button>
                </div>
            </div>
        </div>
        <router-view/>
    </div>
</template>
<script>
export default {
    
    
    methods: {
        logout() {
            localStorage.removeItem('godir_user');

            this.$router.push('/login');
        }
    }
}
</script>
<style >
    body {
            background: #ECE9E6;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>