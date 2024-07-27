<template>
    <div class="card bg-base-100 w-96 shadow-xl mt-3 mx-5">
        <div class="badge badge-accent badge-outline">
            {{ category }}
        </div>
        <figure class="px-10 pt-10">
            <img :src="image" alt="Preview" class="rounded-xl w-1/4 h-auto" />
        </figure>
        <div class="card-body ">

            <h2 class="card-title">{{ filename }}</h2>

            <p>{{ description }}</p>

            <div class="card-actions">
                <button class="btn btn-info" @click="() => redirectToDetail(item._id)">Ver Detalle</button>
                <button class="btn btn-error" @click="() => deleteDocument(item._id)">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, defineProps } from 'vue';
    import { useMultimediaStore } from '../store/Main';
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2';

    const router = useRouter();
    const store = useMultimediaStore();
    const redirectToDetail = (id) => {
        router.push(`/detalle/${id}`);
    };
    const props = defineProps({
        item: {
            type: Object,
            required: true
        }
    });
    const description = computed(() => props.item.description);
    const filename = computed(() => props.item.file.originalname);
    const category = computed(() => props.item.category);
    const image = computed(() => props.item.image);

    const deleteDocument = (id) => {
        Swal.fire({
            title: "Estás seguro?",
            text: "No podrás recuperar el documento una vez eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await store.setDeleteMultimedia(id);
                Swal.fire({
                    icon: "success",
                    title: "Your file has been deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };
</script>

<style scoped></style>
