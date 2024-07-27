<template>
    <div class="max-w-sm mx-auto p-4 bg-white w-2/4 shadow-lg rounded-lg">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Archivo
            </label>
            <div class="flex items-center justify-center w-full">
                <label class="flex flex-col items-center w-full px-4 py-6 bg-gray-50 text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-100">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3.707 6.707a1 1 0 00-1.414-1.414L5 9.586V8a1 1 0 00-2 0v4a1 1 0 001 1h4a1 1 0 100-2H6.414l1.293-1.293zM10 10a1 1 0 100-2h4a1 1 0 100 2h-4zm1 4a1 1 0 100-2h4a1 1 0 100 2h-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="mt-2 text-base leading-normal">Seleccione un archivo</span>
                    <input type="file" @change="onFileChange" class="hidden" />
                </label>
            </div>
            <details>
                <summary class="text-sm font-medium text-gray-700 mb-2">Add imagen</summary>
                <label class="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Imagen
                </label>
                <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col items-center w-full px-4 py-6 bg-gray-50 text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-100">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zM3 13l2.293-2.293a1 1 0 011.414 0L9 13l4-4 3 3v2H3v-2zm3-7a1 1 0 112 0 1 1 0 01-2 0z"></path>
                        </svg>
                        <span class="mt-2 text-base leading-normal">Seleccione una imagen</span>
                        <input type="file" @change="onImageChange" class="hidden" />
                    </label>
                </div>
            </details>

            <textarea v-model="description" placeholder="Descripción del archivo" class="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">

            </textarea>

            <label class="block text-sm font-medium text-gray-700 mt-4 mb-2">
                Categoría
            </label>
            <select v-model="category" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="">Categorias</option>
                <option value="matematicas">Matematicas</option>
                <option value="sociales">Sociales</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="ciencias">Ciencias</option>
                <option value="lenguaje">Lenguaje</option>
            </select>

            <div class="flex justify-end space-x-2 mt-4">
                <button @click="addFile" class="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 w-2/6">Aceptar</button>
                <button @click="clearInput" class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-6001 w-2/6">Cancelar</button>
            </div>
        </div>
    </div>

    <section v-if="files.length > 0" class="w-5/6 mb-10 mt-4 p-4 rounded-lg shadow-inner border bg-green-100">
        <div v-if="estado"  class="flex justify-center items-center mb-4">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div v-else>
            <div class="flex justify-center items-center mb-4">
                <h3 class="text-lg font-semibold">Vista Previa </h3>
            </div>
            <div class="flex flex-wrap border bg-gray-50">
                <div v-for="(file, index) in files" :key="index" class="flex flex-col items-start w-1/5 mb-4 p-4 bg-white rounded-lg shadow-lg relative mr-4">
                    <button @click="removeFile(index)" class="absolute top-2 right-2 text-red-500 font-bold">X</button>
                    <div v-if="file.type === 'document'" class="mb-4">
                        <img :src="file.preview" alt="Preview" class="w-full h-auto rounded-lg" />
                    </div>
                    <div v-if="file.type === 'image'" class="mb-4">
                        <img :src="file.preview" alt="Preview" class="w-full h-auto rounded-lg" />
                    </div>
                    <div v-if="file.type === 'video'" class="mb-4">
                        <video :src="file.preview" controls class="w-full h-auto rounded-lg"></video>
                    </div>
                    <div v-if="file.type === 'audio'" class="mb-4 w-full">

                        <audio :src="file.preview" controls class="w-full  rounded-lg shadow-md"></audio>
                    </div>
                    <div v-if="file.file" class="flex mb-4 flex-wrap">
                        <strong>Nombre del archivo:</strong> {{ file.file.name }}
                    </div>
                    <div v-if="file.description" class="flex mb-4 flex-wrap">
                        <strong>Descripción:</strong> {{ file.description }}
                    </div>
                    <div v-if="file.category" class="flex mb-4 flex-wrap">
                        <strong>Categoría:</strong> {{ file.category }}
                    </div>
                </div>
            </div>
            <button @click="uploadFiles"
                    class="mt-4  w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
                Subir Archivos
            </button>
        </div>
       
    </section>


</template>

<script setup>
    import { ref } from 'vue';
    import Swal from 'sweetalert2';
    import { useMultimediaStore } from '../store/Main';
    import pptIcon from '@/assets/ppt_icon.png';
    import wordIcon from '@/assets/word_icon.svg';
    import pdfIcon from '@/assets/pdf_icon.svg';
    import excelIcon from '@/assets/excel_icon.svg';
    import defaultIcon from '@/assets/Default.png';
    import rar from '@/assets/rar.png';
    import music from '@/assets/music.png';
    import video from '@/assets/video.png';
    import apk from '@/assets/apk.png';
    import img from '@/assets/img.png';

    var fileType = ref('');
    const file = ref(null);
    var estado = ref(false);
    const image = ref('');
    const preview=ref('');
    const description = ref('');
    const category = ref('');
    const store = useMultimediaStore();
    const files = ref([]);

    const removeFile = (index) => {
        files.value.splice(index, 1);
    };

    const onFileChange = (event) => {
        file.value = event.target.files[0];
        const mimeType = file.value.type;
   

        if (mimeType.includes('image')) {
            fileType.value = 'image';
        }
        else if (mimeType.includes('video')) {
            fileType.value = 'video';
        }
        else if (mimeType.includes('audio')) {
            fileType.value = 'audio';
        }
        else {
            fileType.value = 'document';
        }
        switch (mimeType) {
            case 'application/vnd.ms-powerpoint':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                image.value = pptIcon;
                preview.value = pptIcon;
                break;
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                image.value = wordIcon;
                preview.value = wordIcon;
                break;
            case 'application/pdf':
                image.value = pdfIcon;
                preview.value = pdfIcon;
                break;
            case 'application/vnd.ms-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                image.value = excelIcon;
                preview.value = excelIcon;
                break;
            case 'application/x-rar-compressed':
            case 'application/zip':
            case 'application/x-7z-compressed':
            case 'application/x-tar':
            case 'application/x-zip-compressed':
                image.value = rar;
                preview.value = rar;
                break;
            case 'application/vnd.android.package-archive':
            case 'application/x-msdownload':
                image.value = apk;
                preview.value = apk;
                break;
            case 'audio/mpeg':
            case 'audio/ogg':
            case 'audio/wav':
            case 'audio/webm':
            case 'audio/flac':
            case 'audio/aac':
            case 'audio/mp3':
            case 'audio/x-ms-wma':
                image.value = music;
                createUrlAudio(file.value)
                
                break;
            case 'video/mp4':
            case 'video/ogg':
            case 'video/webm':
            case 'video/3gpp':
            case 'video/3gpp2':
            case 'video/avi':
            case 'video/mpeg':
                image.value = video;
                preview.value= createObjectURL(file.value);
                break;
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/gif':
            case 'image/bmp':
            case 'image/webp':
            case 'image/png':
            case 'image/psd':
            case 'image/svg+xml':
            case 'image/svg':
            case 'image/tiff':
            case 'image/webp':
                image.value = img;
                preview.value = createObjectURL(file.value);
                break;
            default:
                image.value = defaultIcon;
                preview.value = defaultIcon;

        }
      
    };

    const onImageChange = (event) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            image.value = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
   
    };

    const clearInput = () => {
        file.value = null;
        image.value = '';
        preview.value = '';
        description.value = '';
        category.value = '';
    };

    const addFile = () => {

        if (!description.value || !category.value || !file.value) {
            Swal.fire({
                title: 'Error!',
                text: 'No se han ingresado los datos correctamente',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
            return;
        } else {
            files.value.push({
                file: file.value,
                preview: preview.value,
                image: image.value,
                type: fileType.value,
                description: description.value,
                category: category.value
            });
            
            clearInput();
        }
    };

    const uploadFiles = async () => {
        if (files.value.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'No hay archivos para subir',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
            return;
        }
        estado.value = true;
        for (const file of files.value) {
            await store.setUploadFile(file.file, file.image, file.description, file.category, file.type);
        }
        Swal.fire({
            icon: "success",
            title: "Archivos cargados correctamente!",
            showConfirmButton: false,
            timer: 1500
        });
        files.value = [];
        estado.value = false;

    };

    const createObjectURL = (file) => {
        return URL.createObjectURL(file);
    };
    const createUrlAudio= (file) =>{
      var reader = new FileReader();
      reader.onload = (e) => {
        preview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
</script>