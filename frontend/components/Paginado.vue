<template>
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
</template>

<script>
export default {
    props: {
        totalPages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    methods: {
        changePage(page) {
            if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
                this.$emit('page-changed', page);
            }
        }
    }
};
</script>

<style scoped>
    /* Aquí puedes añadir estilos personalizados si lo necesitas */
</style>
