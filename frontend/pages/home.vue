<template>
    <Nav></Nav>
    <div class="flex flex-col items-center justify-center mt-5 mb-5 space-y-4 px-4 md:flex-row md:space-x-4 md:space-y-0">
        <div class="join">
            <div>
                <div>
                    <input type="text" v-model="searchTerm" placeholder="Search" class="input input-bordered join-item w-auto" />
                </div>
            </div>
            <select v-model="filter" class="select select-bordered join-item">
                <option value="">Filter</option>
                <option value="image">Imagen</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="document">Documento</option>
            </select>
            <div class="indicator">
                <button @click="buscarItems" class="btn join-item">Search</button>
            </div>
        </div>
        <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <select @change="onChangesortFecha" class="select w-full max-w-xs">
                <option value="">Fecha</option>
                <option value="asc">Antiguos</option>
                <option value="desc">Recientes</option>
            </select>
        </div>
        <select @change="onChangeCatSort" class="select w-full max-w-xs">
            <option value="">Categorias</option>
            <option value="matematicas">Matematicas</option>
            <option value="sociales">Sociales</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="ciencias">Ciencias</option>
            <option value="lenguaje">Lenguaje</option>
        </select>
    </div>
    <p class="text-center mt-20" v-if="multimediaItemspages.length === 0">No hay documentos</p>
    <div v-else class="flex flex-wrap mx-4">
        <Card v-for="item in multimediaItemspages" :key="item._id" :item="item" class="px-4 mb-8"></Card>
    </div>
    <div class="flex flex-col items-center py-10 mx-auto mt-20">
        <div>
            <nav aria-label="Page navigation">
                <ul class="flex flex-row bg-white">
                    <li v-if="currentPage > 1">
                        <a @click.prevent="changePage(currentPage - 1)" href="#" class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </li>
                    <li v-for="page in totalPages" :key="page">
                        <a @click.prevent="changePage(page)" href="#" :class="['py-2 px-3 leading-tight', { 'bg-gray-200': currentPage === page, 'text-gray-700': currentPage === page, 'text-gray-500': currentPage !== page, 'hover:bg-gray-100': currentPage !== page, 'hover:text-gray-700': currentPage !== page, 'bg-white': currentPage !== page, 'border': true, 'border-gray-300': true }]">{{ page }}</a>
                    </li>
                    <li v-if="currentPage < totalPages">
                        <a @click.prevent="changePage(currentPage + 1)" href="#" class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            <span class="sr-only">Next</span>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useMultimediaStore } from '../store/Main';

    const store = useMultimediaStore();

    const multimediaItems = ref([]);
    var multimediaItemspages = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const itemsPerPage = ref(6);
    const searchTerm = ref('');
    const filter = ref('');

    const changePage = (page) => {
        if (page !== currentPage.value && page > 0 && page <= totalPages.value) {
            currentPage.value = page;
        }
    };

    const ordenarPorFecha = (arr, orden) => {
        return arr.slice().sort((a, b) => {
            const fechaA = new Date(a.fecha);
            const fechaB = new Date(b.fecha);
            return orden === 'asc' ? fechaA - fechaB : fechaB - fechaA;
        });
    };

    const filtrarPorCategoria = (arr, categoria) => {
        return arr.filter(item => item.category === categoria);
    };

     const onChangeCatSort =async (event) => {
        const categoria = event.target.value;
        if (categoria === "") {
            await store.setMultimedias();
            setTimeout(() => {
                updatePagination();
            }, 1000);
            
        }
        const filteredItems = filtrarPorCategoria(multimediaItems.value, categoria);
        multimediaItemspages.value = filteredItems;
    };

    const onChangesortFecha = (event) => {
        const orden = event.target.value;
        const sortedItems = ordenarPorFecha(multimediaItems.value, orden);
        multimediaItems.value = sortedItems;
        updatePagination();
    };

    const buscarItems = async () => {
        await store.setMultimedias(); // Reset multimedia items from the store
        let filteredItems = store.documentos;

        if (searchTerm.value !== "" || filter.value !== "") {
            if (searchTerm.value !== "" && filter.value !== "") {
                filteredItems = filteredItems.filter(item =>
                    item.file.originalname.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
                    item.type === filter.value
                );
            } else if (searchTerm.value !== "") {
                filteredItems = filteredItems.filter(item =>
                    item.file.originalname.toLowerCase().includes(searchTerm.value.toLowerCase())
                );
            } else if (filter.value !== "") {
                filteredItems = filteredItems.filter(item =>
                    item.type === filter.value
                );
            }
        }

        multimediaItems.value = filteredItems;
        updatePagination();
    };

    const updatePagination = () => {
        totalPages.value = Math.ceil(multimediaItems.value.length / itemsPerPage.value);
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        multimediaItemspages.value = multimediaItems.value.slice(start, end);
    };

    onMounted(async () => {
        await store.setMultimedias();
        multimediaItems.value = store.documentos;
        updatePagination();
    });

    watch(() => store.documentos, (newItems) => {
        multimediaItems.value = newItems;
        updatePagination();
    });

    watch(currentPage, () => {
        updatePagination();
    });

</script>
