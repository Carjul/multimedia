<template>
    <Nav></Nav>
    <div v-if="multimediaItem" class="flex flex-col wp-4 w-full max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-5 mb-20 px-4">
        <div class="font-medium text-black">{{ multimediaItem.file.originalname }}</div>

        <div v-if="multimediaItem.type === 'document'" class="mb-4 w-full">
            <iframe id="vista" v-if="multimediaItem.file.mimetype === 'application/pdf'" :src="multimediaItem.image" class="w-full h-auto" frameborder="0"></iframe>
            <div v-if="multimediaItem.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'" v-html="docxContent" class="w-full h-auto"></div>
            <div v-if="multimediaItem.file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'" class="w-full h-auto">
                <img :src="multimediaItem.image" alt="Preview" class="w-4/4 h-2/4 rounded-lg" />
            </div>
            <table v-if="multimediaItem.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'" class="table table-xs w-full h-2/4 full border border-bg-green">
                <tr v-for="(row, rowIndex) in excelContent" :key="rowIndex" class="border">
                    <td class="border " v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                </tr>
            </table>
           
        </div>

        <div v-if="multimediaItem.type === 'image'" class="mb-4 w-full">
            <img :src="multimediaItem.image" alt="Preview" class="w-4/4 h-2/4 rounded-lg" />
        </div>

        <div v-if="multimediaItem.type === 'video'" class="mb-4 w-full">
            <video :src="multimediaItem.image" controls class="w-4/4 h-2/4 rounded-lg"></video>
        </div>

        <div v-if="multimediaItem.type === 'audio'" class="mb-4 w-full">
            <audio :src="multimediaItem.image" controls class="w-full rounded-lg shadow-md"></audio>
        </div>

        <div class="text-gray-500"><strong>Date: </strong>{{ formattedDate }}</div>
        <div class="text-gray-700"><strong>Description: </strong>{{ multimediaItem.description }}</div>
        <div class="text-gray-700"><strong>Size: </strong>{{ multimediaItem.file.size }} bytes</div>

        <div class="flex flex-row flex-wrap justify-end py-3">
            <input v-if="swithcz" type="text" class="input input-bordered w-3/5 max-w-xs" v-model="description" placeholder="Actualizar descripcion">
            <button v-if="!swithcz" @click="changeOpen" class="btn btn-info">Update</button>
            <button v-else @click="OnsendDesc" class="btn btn-info">Send</button>
            <a class="btn btn-error" :href="`http://localhost:8000/multimedia/download/${multimediaItem.file.filename}`" target="_blank">Download</a>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue';
    import { useRoute } from 'vue-router';
    import { useMultimediaStore } from '../store/Main';
    import mammoth from 'mammoth';
    import pptx2json from 'pptx2json';
    import * as XLSX from 'xlsx';

    const route = useRoute();
    const multimediaItem = ref(null);
    const store = useMultimediaStore();
    const swithcz = ref(false);
    const description = ref('');

    const docxContent = ref(null);
    const pptContent = ref([]);
    const excelContent = ref([]);

    const changeOpen = () => {
        swithcz.value = !swithcz.value;
    };

    const OnsendDesc = () => {
        store.setUpdateMultimedia(multimediaItem.value._id, description.value);
        changeOpen();
        description.value = '';
    };

    function mostrarFile(filename) {
        return `http://localhost:8000/multimedia/vista/${filename}`;
    }

    onBeforeUnmount(() => {
        store.documento = {};
    });

    onMounted(() => {
        const id = route.params.id;
        store.setMultimedia(id);
    });

    watch(() => store.documento, async (newItems) => {
        console.log('Nuevo ítem:', newItems);
        if (newItems.type !== 'document' || newItems.file.mimetype === 'application/pdf') {
            newItems.image = mostrarFile(newItems.file.filename);
        } else if (newItems.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const response = await fetch(mostrarFile(newItems.file.filename));
            const arrayBuffer = await response.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            docxContent.value = result.value;
            console.log('Contenido DOCX:', docxContent.value);
        
        } else if (newItems.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const response = await fetch(mostrarFile(newItems.file.filename));
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            excelContent.value = sheet;
            console.log('Contenido Excel:', excelContent.value);
        }
        multimediaItem.value = newItems;
    });

    const formattedDate = computed(() => {
        if (multimediaItem.value) {
            const date = new Date(multimediaItem.value.fecha);
            const options = {
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
            };
            return date.toLocaleDateString('en-US', options);
        }
        return '';
    });
</script>

<style>
    #vista {
        height: 540px;
        width: 400px;
    }
</style>
