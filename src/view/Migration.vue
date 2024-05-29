<template>
    <div>
        <TheHeader />
        <div class = "migrationPage">
            <div class="migrationContainer">
                <b-button @click="DownloadData()">Export Data</b-button>
                <div class = "importContainer">
                    <p>Select JSON file:</p>
                    <input v-on:change="handleFileUpload($event)" type="file"/>
                    <div class="fileContentContainer">
                        {{ jsonHTML }}
                    </div>
                    <b-button>Import Data</b-button>
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
</template>


<script>
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';
import download from 'downloadjs';

export default {
    name: 'MigrationPage',
    data (){
        return {
            fileContent: "",
            jsonHTML: ""
        }
    },
    created(){
    },
    methods: {
        DownloadData: async function () {
            let data = await this.$store.dispatch("exportData");
            download(JSON.stringify(data),"data.json", "text/plain");
        },
        handleFileUpload: async function (e) {
            let reader = new FileReader();
            reader.onload = e => {
                let json = JSON.parse(e.target.result);
                this.fileContent = json;
                this.jsonHTML = JSON.stringify(json, undefined, 2);
                console.log(this.jsonHTML);
            };
            let files = e.target.files || e.dataTranfer.files;
            if(!files.length) {
                this.fileContent = "No File";
            }
            reader.readAsText(files[0], "UTF-8");
        }
    },
    components: {
        TheFooter,
        TheHeader,
    }
  }
</script>

<style>
.migrationPage {
    min-height: 80vh;
}

.migrationContainer {
    display:flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 3vh 5%;
}

.importContainer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 5vh 0;
    gap: 0.5vw;
}

.fileContentContainer {
    width: 100%;
    height: auto;
    border: solid black 1px;
    margin: 3vh 0;
    padding: 2vh 2vw;
    background-color: rgb(252, 252, 252);
}
</style>