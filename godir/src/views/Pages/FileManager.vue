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
            <div class="files w-full bg-white shadow-xl rounded-lg p-5 pt-8 overflow-scroll">
                <div class="title">
                    <h3 class='text-2xl mb-8'>Explorer</h3>
                </div>

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
                            <tr v-for="(currentDirectoryFile, index) in currentDirectoryFiles" :key="currentDirectoryFile.id" :class='{"per-file":true, "selected":selectedFile.includes(index)}' @click="selectFile(index)">
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

export default {
    mounted() {
        this.getCurrentDirectory();
        this.currentDirectoryFiles.map(file => {
            file.selected = false;
        });
    },
    data() {
        return {
            selectedFile: [],
            currentDirectoryFiles: [],
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
        selectFile(index) {
            if(this.selectedFile.includes('index')) {
                var indexDiArray = this.selectedFile.indexOf(index);
                console.log('ada');
                if (indexDiArray > -1) {
                    this.selectedFile.splice(indexDiArray, 1);
                }
            }else{
                this.selectedFile.push(index)
            }
        },
        getCurrentDirectory() {
            let rootdir = this.$auth.root_path;
            this.$axios.post('/directory', { Path: rootdir }, { headers: { auth_key: this.$auth.auth_key, user_id: this.$auth.id } })
                .then(res => {
                    this.currentDirectoryFiles = res.data.returned_data;
                    console.log(res.data);
                })
        },
    }
}   
</script>