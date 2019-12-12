<template>
    <div class="container mx-auto">
        <div class='h-screen flex justify-center items-center '>
            <div class='w-1/3'></div>
            <div class="w-1/3   w-100">
                <div class="card pb-12 shadow-2xl  rounded-lg bg-white">
                  <vs-progress indeterminate color="primary" v-if="loading">primary</vs-progress>
                    <div class="card-body pt-10 px-10">
                        <div class="logo mb-12">
                            <h3 class='text-center mt-4 text-3xl'>Go Directory</h3> 
                        </div>
                        <form action="" method="post" @submit.prevent="login()">
                            <vs-alert active="true" class='mb-4' color='danger' v-if="errors != false">
                            Invalid Credentials
                            </vs-alert>
                            <vs-alert active="true" class='mb-4' color='success' v-if="success != false">
                            Success login! You will be redirected in few seconds
                            </vs-alert>

                            <div class="form-group mb-4">
                                <label for="">Username:</label>
                                <input type="text" class="form-control px-2 py-2 border border-solid border-gray-300 mt-1 rounded-sm w-full"  v-model="username" required>
                            </div>
                            <div class="form-group mb-4">
                                <label for="">Password:</label>
                                <input type="text" class="form-control px-2 py-2 border border-solid border-gray-300 mt-1 rounded-sm w-full"  v-model="password" required>
                            </div>
                            <button type="submit" class='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-sm float-right'>Login</button>
                            <div class="clearfix"></div>
                        </form>
                        
                    </div>
                </div>
            </div>
            <div class='w-1/3'></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            loading: false,
            errors: false,
            success: false,
        }
    },
    methods: {
        login() {
            console.log('login');
            this.loading = true;

            let username = this.username;
            let password = this.password;
            
            this.$axios.post('/auth', {username, password} )
                .then(res => {
                    console.log(res.data);

                    let godir_user = JSON.stringify(res.data.returned_data);

                    localStorage.setItem("godir_user", godir_user);

                    this.errors = false;
                    this.success = true;
    
                    setTimeout(() => {
                        window.location = "/dashboard"
                    }, 1500);
                }).catch(err  => {
                    this.errors = true;
                    console.log(err);
                });
            
            
            

            // if(this.username === 'admin' && this.password === 'admin') {
            //     this.loading = false;
            //     this.errors=false; this.success=true; this.loading=false; 
            //     setTimeout(() => { window.location = "/dashboard" }, 1000)
            // }else{
            //     setTimeout(() => {this.errors=true; this.loading=false}, 1000)
            // }

            
        }
    }
}
</script>
<style>
    
</style>