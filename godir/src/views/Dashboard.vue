<template>
    <div class='container mx-auto mt-24'>
        <div class='flex'>
            <div class="w-3/4 px-4">
                <div class="card mb-8">
                    <div class="card-header rounded-t-lg bg-blue2 text-white px-4 py-2">
                        Application
                    </div>
                    <div class="card-body rounded-b-lg p-5 shadow-xl">
                        <div class="flex">
                            <div class="w-1/4 ">
                                <router-link to="/file-manager" class='inline-flex btn-feature p-3 rounded-sm '>
                                    <img src="@/assets/images/svg/filemanager.svg" class='w-8 h-8' alt="">
                                    <p class='ml-2 leading-loose'>File Manager</p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-8">
                    <div class="card-header rounded-t-lg bg-blue2 text-white px-4 py-2">
                        Databases
                    </div>
                    <div class="card-body rounded-b-lg p-5 shadow-xl">
                        <div class="flex">
                            <div class="w-1/4 ">
                                <router-link to="/file-manager" class='inline-flex btn-feature p-3 rounded-sm '>
                                    <img src="@/assets/images/svg/filemanager.svg" class='w-8 h-8' alt="">
                                    <p class='ml-2 leading-loose'>PHPMyAdmin</p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-8">
                    <div class="card-header rounded-t-lg bg-blue2 text-white px-4 py-2">
                        CPU
                    </div>
                    <div class="card-body rounded-b-lg p-5 shadow-xl">
                        <div class="flex">
                            <div class="w-1/4 ">
                                <router-link to="/file-manager" class='inline-flex btn-feature p-3 rounded-sm '>
                                    <img src="@/assets/images/svg/filemanager.svg" class='w-8 h-8' alt="">
                                    <p class='ml-2 leading-loose'>Terminal</p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/4 px-4">
                <div class="card mb-6">
                    <div class="card-header rounded-t-lg bg-blue2 text-white px-4 py-2">
                        Disk
                    </div>
                    <div class="card-body rounded-b-lg p-5 shadow-xl">
                        <div class="per-statistic mb-6">
                            <div>
                                <p class='float-left'>Disk Usage</p>
                                <p class='float-right text-gray-600 text-sm'>4096GB / 2TB</p>
                            </div>
                            <vs-progress :height="8" :percent="60" color="success">danger</vs-progress>
                        </div>
                        <div class="per-statistic mb-6">
                            <div>
                                <p class='float-left'>MySQL Disk Usage</p>
                                <p class='float-right text-gray-600 text-sm'>10MB / 11MB</p>
                            </div>
                            <vs-progress :height="8" :percent="89" color="danger">danger</vs-progress>
                        </div>
                        <div class="per-statistic mb-6">
                            <div>
                                <p class='float-left'>Bandwith</p>
                                <p class='float-right text-gray-600 text-sm'>30990 MB</p>
                            </div>
                            <vs-progress :height="8" :percent="89" color="warning">danger</vs-progress>
                        </div>
                    </div>
                </div>
                <div class="card mb-6">
                    <div class="card-header rounded-t-lg bg-blue2 text-white px-4 py-2">
                        Server
                    </div>
                    <div class="card-body rounded-b-lg p-5 shadow-xl">
                        <div class="per-statistic mb-6">
                            <div>
                                <p class='float-left'>CPU Usage</p>
                                <p class='float-right text-gray-600 text-sm'>30%</p>
                            </div>
                            <vs-progress :height="8" :percent="30" color="success">danger</vs-progress>
                        </div>
                        <div class="per-statistic mb-6">
                            <div>
                                <p class='float-left'>I/O Usage</p>
                                <p class='float-right text-gray-600 text-sm'>10MB / 11MB</p>
                            </div>
                            <vs-progress :height="8" :percent="65" color="warning">danger</vs-progress>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>