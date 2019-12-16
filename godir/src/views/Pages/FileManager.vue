<template>
    <div class='flex px-8  h-screen items-center'>
        <div class="w-1/5 pr-4">
            <div class="files w-full bg-white shadow-xl rounded-lg p-5 pt-8">
                <div class="title">
                    <h3 class='text-2xl mb-8'>File Directory</h3>
                </div>
                <div class="file-content">
                    <ul>
                        <li v-for="rootDir in fromRootDirectoryFiles" :key="rootDir.id" class='inline-flex w-full'>
                            <span v-if="rootDir.children.length" class='mr-2'> [+]</span>
                            <img src="@/assets/images/svg/icons8-folder.svg" alt="" v-if="rootDir.type == 'folder'">
                            <img src="@/assets/images/svg/icons8-folder.svg" alt="" v-else>
                            <span class='ml-2'>{{ rootDir.name }}</span> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="w-4/5 px-4">
            <div class="files w-full bg-white shadow-xl rounded-lg overflow-scroll relative">
                <div id='card-files' class="flex items-center justify-center  h-full w-full absolute" v-if="file_manager_loading">
                    <div>
                        <semipolar-spinner
                        :animation-duration="2000"
                        :size="65"
                        color="#40B582"
                        />
                    </div>
                        <div class='ml-2 text-xl text-loading'>
                            Loading..
                        </div>
                </div>
                <div class="title p-5 pt-8 ">
                    <h3 class='text-2xl'>Explorer</h3>
                </div>
                
                <div class="file-actions mb-4 mx-8">
                    <button class='btn-action' v-if="historyFolderView.length > 1" @click="prevFolder">
                        <font-awesome-icon :icon="['fas', 'chevron-left']" />
                        <span class='ml-2'>Back</span>
                    </button>
                    <button class='btn-action btn-disabled' v-else>
                        <font-awesome-icon :icon="['fas', 'chevron-left']" />
                        <span class='ml-2'>Back</span>
                    </button>
                    <button class='btn-action' @click="reloadFiles">
                        <font-awesome-icon :icon="['fas', 'sync']" />
                        <span class='ml-2'>Reload</span>
                    </button>
                    <button class='btn-action' @click="newFolderModalShow=true">
                        <font-awesome-icon :icon="['fas', 'folder']" />
                        <span class='ml-2'>New Folder</span>
                    </button>
                    <button class='btn-action' @click="deleteFiles" v-if="selectedFile.length > 0">
                        <font-awesome-icon :icon="['fas', 'trash']" />
                        <span class='ml-2'>Delete</span>
                    </button>
                    <button class='btn-action btn-disabled' v-else>
                        <font-awesome-icon :icon="['fas', 'trash']" />
                        <span class='ml-2'>Delete</span>
                    </button>
                    <button class='btn-action' @click="uploadFiles">
                        <font-awesome-icon :icon="['fas', 'upload']" />
                        <span class='ml-2'>Upload</span>
                    </button>
                </div>
                <modal :showing="newFolderModalShow" @close="newFolderModalShow = false">
                    <h2 class="text-xl font-bold text-gray-900 mb-6">Create New Folder</h2>
                    <input type="text" name="folder_name" required  id="" class="form-control border-solid border-b-2 w-full px-2 py-2 border-grey-200" v-model="newFolderName" placeholder="Folder Name">
                    <div class="modal-footer mt-4">
                        <button class='bg-blue-400 hover:bg-blue-500 float-right py-2 px-2 text-white rounded-sm mr-2' @click="newFolder">Submit</button>
                    </div>
                </modal>
                <div class="file-content ">
                    <table class="table-auto w-full table-files">
                        <thead>
                            <tr class=''>
                                <th class='bg-gray-300 w-1 px-4 py-4 text-md tracking-wider rounded-tl-sm'></th>
                                <th class=" bg-gray-300 w-1/2 px-4 py-4 text-md tracking-wider rounded-tl-sm">Filename</th>
                                <th class=" bg-gray-300 w-1/4 px-4 py-4 text-md">Size</th>
                                <th class=" bg-gray-300 w-1/4 px-4 py-4 text-md rounded-tr-sm">Last Modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="(currentDirectoryFile, index) in currentDirectoryFiles" :key="currentDirectoryFile.id" :class='{"per-file":true, "selected":selectedFile.includes(index)}' @click="selectFile(index, $event)" @dblclick="goToFile(currentDirectoryFile)">
                                <td class='px-2'>
                                    <template v-if="currentDirectoryFile.file_type == 'Folder'">
                                        <img src="@/assets/images/svg/icons8-folder.svg" alt="">
                                    </template>
                                    <template v-else>
                                        <img src="@/assets/images/svg/icons8-file.svg" alt="">
                                    </template>
                                </td>
                                <td class=" px-4 py-2">
                                    {{ currentDirectoryFile.file_name }}
                                </td>
                                <td class=" px-4 py-2">{{ currentDirectoryFile.file_size }}KB</td>
                                <td class=" px-4 py-2">{{ moment(currentDirectoryFile.last_modified).format("LL H:m") }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { SemipolarSpinner  } from 'epic-spinners'
export default {
    mounted() {
        let rootdir = this.$auth.root_path;
        this.historyFolderView = [rootdir];
        this.currentDirectoryPath = rootdir;
        this.getDirectoryFiles(rootdir);
        this.currentDirectoryFiles.map(file => {
            file.selected = false;
        });

        // window.onkeydown = function(event){
        //     if(event.which=="17"){
        //         this.ctrl_pressed = true;
        //     }
        //         // cntrlIsPressed = true;
        // };

        // window.onkeyup = function(event){
        //     // cntrlIsPressed = false;
        // };

    },
    components: {
        SemipolarSpinner,
    },
    data() {
        return {
            file_manager_loading: true,
            selectedFile: [],
            ctrl_pressed: false,
            currentDirectoryFiles: [],
            currentDirectoryPath: '',
            historyFolderView: [],
            newFolderModalShow: false,
            newFolderName: '',
            fromRootDirectoryFiles: [
                {
                    id: "141312",
                    name: "composer",
                    type: "folder",
                    date_modified: "2018-09-09 14:00:04",
                    size: "1412321KB",
                    children: [
                        {
                            name: "Games"
                        }
                    ]
                },
                {
                    id: "1413112",
                    name: "Program Files",
                    type: "folder",
                    date_modified: "2018-09-09 14:00:04",
                    size: "1412321KB",
                    children: [
                        {
                            name: "Games",
                            type: "folder"
                        }
                    ]
                },
            ]
        }
    },
    watch: {
        currentDirectoryFiles: {
            handler(val, oldVal) {
                console.log(`selected ${val} -  ${oldVal}`);
            },
            deep: true
        }
    },
    computed: {
        isFolder: function () {
            return this.children &&
            this.children.length
        },
        isSelected() {
            return this.selected; 
        },
        moment() {
            return moment
        }
    },
    methods: {
        selectFile(index, event) {
            
            if(this.selectedFile.includes(index)) {
                var indexDiArray = this.selectedFile.indexOf(index);
                if (indexDiArray > -1) {
                    this.selectedFile.splice(indexDiArray, 1);
                }
            }else{
                if(event.ctrlKey) {
                    console.log("with ctrl");
                    this.selectedFile.push(index)
                }else{
                    this.selectedFile = [index]
                }
            }
        },
        getDirectoryFiles(path) {
            this.file_manager_loading = true;
            this.$axios.post('/directory', { path }, { headers: { auth_key: this.$auth.auth_key, user_id: this.$auth.id } })
                .then(res => {
                    this.currentDirectoryFiles = res.data.returned_data;
                    this.file_manager_loading = false;
                    this.currentDirectoryPath = path;

                })
        },
        goToFile(file_choosed) {
            console.log('doubleclick')
            if(file_choosed.file_type == 'Folder') {
                this.historyFolderView.push(file_choosed.file_path)
                this.currentDirectoryFiles = [];
                this.file_manager_loading = true;
                let file_path = file_choosed.file_path;
                this.getDirectoryFiles(file_path)
            }
        },
        reloadFiles() {
            // console.log(this.currentDirectoryPath)
            this.currentDirectoryFiles = [];
            return this.getDirectoryFiles(this.currentDirectoryPath);
        },
        prevFolder() {
            let latest_folder_path = this.historyFolderView[this.historyFolderView.length-2];
            this.currentDirectoryFiles = [];
            this.getDirectoryFiles(latest_folder_path)
            this.currentDirectoryPath = latest_folder_path;

            this.historyFolderView.pop();
            console.log(this.historyFolderView)
        },
        newFolder() {
            let folderName = this.newFolderName;
            let path = this.currentDirectoryPath+folderName;
            
            this.$axios.post("directory/create", { Path: path,headers: { auth_key: this.$auth.auth_key, user_id: this.$auth.id } })
                .then(res => {
                    this.currentDirectoryFiles = [];
                    this.getDirectoryFiles(this.currentDirectoryPath);
                    this.newFolderModalShow = false;
                    this.$toasted.show('Folder Created!', {
                        duration: 5000,
                        type: 'success',
                        position: 'bottom-right',
                    });
                })
        },
        deleteFiles() {
            let path  = this.selectedFile[0];
            this.$axios.post('directory/delete', { path }, {headers: { auth_key: this.$auth.auth_key, user_id: this.$auth.id }})
                .then(res => {
                    this.currentDirectoryFiles = [];
                    this.getDirectoryFiles(this.currentDirectoryPath);
                    this.newFolderModalShow = false;
                    this.$toasted.show('Deleted Successfully!', {
                        duration: 5000,
                        type: 'success',
                        position: 'bottom-right',
                    });
                })
            
        },
        uploadFiles() {

        }
    }
}   
</script>

<style >
    .text-loading {
        transition: all .2s;
        animation: breathing-opacity 2s infinite;
    }

    .btn-action {
        color: #428bca;
        margin-right: 2rem;
    }

    .btn-action:hover {
        color: #2A64AD;
    }

    .btn-action.btn-disabled {
        cursor: not-allowed;
        color: #999;
    }

    @keyframes breathing-opacity {
        0% {
            opacity: 40%;
        }

        40% {
            opacity: 100%;
        }

        80% {
            opacity: 0%
        }
    }
</style>