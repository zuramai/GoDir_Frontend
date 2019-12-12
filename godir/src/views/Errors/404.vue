<template>
    <div class="container mx-auto">
        <div class='h-screen flex justify-center items-center '>
            <div class='w-1/3'></div>
            <div class="w-1/3   w-100">
                <div class="card pb-12 shadow-2xl  rounded-lg bg-white">
                    <div class="card-body pt-10 px-10 text-center ">
                        <h1 class='text-4xl'>404 Not Found</h1>
                        <a @click="$router.go(-1)" href="#" class='mt-4 block text-blue-600 hover:text-blue-400'>Go Back</a>
                    </div>
                </div>
            </div>
            <div class='w-1/3'></div>
        </div>
    </div>
</template>